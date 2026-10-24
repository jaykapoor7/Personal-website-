"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { LedgerCall } from "@/content/ledger";

const filters = ["All", "Open", "Resolved"] as const;
const pill: Record<LedgerCall["result"], string> = {
  HIT: "bg-emerald-100 text-emerald-800",
  MISS: "bg-rose-100 text-rose-800",
  OPEN: "bg-indigo-50 text-indigo-700",
};

/** Every call, filterable, with its stated probability drawn as a bar. */
export function LedgerBoard({ calls }: { calls: LedgerCall[] }) {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const shown = calls.filter(
    (c) =>
      f === "All" || (f === "Open" ? c.result === "OPEN" : c.result !== "OPEN"),
  );
  return (
    <div>
      <div role="group" aria-label="Filter calls" className="mb-5 flex gap-1.5">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
              f === x
                ? "bg-accent text-white"
                : "bg-white text-muted ring-1 ring-line hover:text-fg"
            }`}
          >
            {x}
            <span
              className={`ml-1.5 text-[12.5px] ${f === x ? "text-white/70" : "text-faint"}`}
            >
              {
                calls.filter(
                  (c) =>
                    x === "All" ||
                    (x === "Open" ? c.result === "OPEN" : c.result !== "OPEN"),
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      <ul className="card divide-y divide-line overflow-hidden">
        <AnimatePresence initial={false}>
          {shown.map((c) => (
            <motion.li
              key={c.prediction}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-3 p-5 sm:grid-cols-[1fr_210px] sm:items-center sm:gap-8"
            >
              <div>
                <p className="text-[15.5px] font-medium leading-snug">
                  {c.prediction}
                </p>
                <p className="mt-1 text-[13.5px] leading-snug text-muted">
                  {c.detail}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span
                    className={`rounded-md px-2 py-0.5 font-semibold ${pill[c.result]}`}
                  >
                    {c.result === "OPEN" ? `Due ${c.due ?? ""}` : c.result}
                  </span>
                  <span className="font-semibold tabular-nums">
                    {c.conviction}%
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-card"
                  aria-hidden="true"
                >
                  <motion.div
                    className={`h-full rounded-full ${c.result === "HIT" ? "bg-emerald-500" : c.result === "MISS" ? "bg-rose-500" : "bg-accent"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.conviction}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
