"use client";
import { useState } from "react";
import companies from "@/content/healthtech.json";

type Co = (typeof companies)[number];
const sectors = Array.from(new Set(companies.map((c) => c.sector)));

/** India's healthtech landscape from the market map dataset: pick a sector, pick a company. */
export function MarketMap() {
  const [sector, setSector] = useState<string>("All");
  const [sel, setSel] = useState<Co>(companies[0]);
  const shown = companies.filter(
    (c) => sector === "All" || c.sector === sector,
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by sector"
        className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium"
      >
        {["All", ...sectors].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={sector === s}
            onClick={() => setSector(s)}
            className={
              sector === s
                ? "text-fg underline underline-offset-4"
                : "text-muted hover:text-fg"
            }
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          {shown.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                aria-pressed={sel.name === c.name}
                onClick={() => setSel(c)}
                className="w-full text-left"
              >
                <span
                  className={`block text-[16px] font-semibold leading-snug ${sel.name === c.name ? "text-accent" : "hover:text-accent"}`}
                >
                  {c.name}
                </span>
                <span className="block text-[14px] text-muted">{c.sector}</span>
              </button>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          <p className="text-[15px] text-muted">{sel.sector}</p>
          <h3 className="mt-1 text-[28px] font-semibold leading-tight">
            {sel.name}
          </h3>
          <p className="mt-2 text-[16px] leading-relaxed">{sel.what}</p>
          <dl className="mt-5 space-y-3 text-[15px]">
            <div>
              <dt className="text-muted">Funding</dt>
              <dd className="font-medium">{sel.funding}</dd>
            </div>
            <div>
              <dt className="text-muted">Backed by</dt>
              <dd>{sel.investors}</dd>
            </div>
            <div>
              <dt className="text-muted">Edge</dt>
              <dd>{sel.edge}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
