"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import companies from "@/content/healthtech.json";

type Co = (typeof companies)[number];
const sectors = Array.from(new Set(companies.map((c) => c.sector)));
const tint = [
  "#4338ca",
  "#6d28d9",
  "#0369a1",
  "#0f766e",
  "#15803d",
  "#b45309",
  "#be185d",
  "#475569",
  "#7e22ce",
];
const color = (s: string) => tint[sectors.indexOf(s) % tint.length];

/** India's healthtech landscape from the market map dataset: pick a sector, pick a company. */
export function MarketMap() {
  const [sector, setSector] = useState<string>("All");
  const [sel, setSel] = useState<Co>(companies[0]);
  const shown = companies.filter(
    (c) => sector === "All" || c.sector === sector,
  );
  const bySector = useMemo(
    () =>
      sectors
        .map((s) => ({
          s,
          total: companies
            .filter((c) => c.sector === s)
            .reduce((n, c) => n + (c.usdM ?? 0), 0),
          n: companies.filter((c) => c.sector === s).length,
        }))
        .sort((a, b) => b.total - a.total),
    [],
  );
  const max = bySector[0].total;

  return (
    <div className="space-y-6">
      <div
        role="group"
        aria-label="Filter by sector"
        className="flex flex-wrap gap-1.5"
      >
        {["All", ...sectors].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={sector === s}
            onClick={() => {
              setSector(s);
              const first = companies.find(
                (c) => s === "All" || c.sector === s,
              );
              if (first) setSel(first);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
              sector === s
                ? "bg-accent text-white"
                : "bg-white text-muted ring-1 ring-line hover:text-fg"
            }`}
          >
            {s !== "All" && (
              <span
                className="mr-1.5 inline-block h-2 w-2 rounded-full"
                style={{ background: color(s) }}
                aria-hidden="true"
              />
            )}
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <motion.ul
          layout
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence initial={false}>
            {shown.map((c) => (
              <motion.li
                key={c.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={() => setSel(c)}
                  aria-pressed={sel.name === c.name}
                  className={`group flex h-full w-full flex-col rounded-xl bg-white p-3.5 text-left ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    sel.name === c.name ? "ring-2 ring-accent" : "ring-line"
                  }`}
                >
                  <span
                    className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: color(c.sector) }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: color(c.sector) }}
                    />
                    {c.sector}
                  </span>
                  <span className="mt-1.5 text-[15px] font-semibold leading-snug">
                    {c.name}
                  </span>
                  <span className="mt-auto pt-2 text-[12.5px] text-muted">
                    {c.funding}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={sel.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="card overflow-hidden"
            >
              <div
                className="h-1.5"
                style={{ background: color(sel.sector) }}
              />
              <div className="space-y-4 p-6">
                <div>
                  <p
                    className="text-[12px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: color(sel.sector) }}
                  >
                    {sel.sector}, {sel.stage}
                  </p>
                  <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.03em]">
                    {sel.name}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-fg/80">
                    {sel.what}
                  </p>
                </div>
                <dl className="space-y-3 text-[14px]">
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                      Funding
                    </dt>
                    <dd className="font-medium">{sel.funding}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                      Backed by
                    </dt>
                    <dd>{sel.investors}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                      Edge
                    </dt>
                    <dd>{sel.edge}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <div className="card p-6">
        <p className="label">Disclosed funding by sector</p>
        <ul className="mt-5 space-y-2.5">
          {bySector.map((b) => (
            <li
              key={b.s}
              className="grid grid-cols-[150px_1fr_70px] items-center gap-3 text-[13.5px] sm:grid-cols-[190px_1fr_80px]"
            >
              <span className="truncate font-medium">{b.s}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-card">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: color(b.s) }}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${Math.max(2, (b.total / max) * 100)}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className="text-right tabular-nums text-muted">
                {b.total >= 1000
                  ? `$${(b.total / 1000).toFixed(1)}B`
                  : `$${Math.round(b.total)}M`}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12.5px] text-faint">
          Sums of approximate disclosed rounds in the dataset at the time of
          compilation.
        </p>
      </div>
    </div>
  );
}
