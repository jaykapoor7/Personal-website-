"use client";

import { useState } from "react";
import { ledger, type Verdict } from "@/content/ledger";

const VERDICT_STYLE: Record<Verdict, string> = {
  BUY: "bg-accent text-ink",
  HOLD: "border border-paper text-paper",
  WATCH: "border border-line text-muted",
  PASS: "border border-dashed border-line text-muted",
};

const FILTERS = ["All", "BUY", "HOLD", "WATCH", "PASS"] as const;

// Slim, filterable coverage index — verdict chips over a row list.
export function CoverageIndex() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const rows =
    active === "All"
      ? ledger.coverage
      : ledger.coverage.filter((c) => c.verdict === active);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f === "All"
              ? ledger.coverage.length
              : ledger.coverage.filter((c) => c.verdict === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 ${
                active === f
                  ? "border-accent text-accent"
                  : "border-line text-muted hover:border-paper hover:text-paper"
              }`}
            >
              {f === "All" ? "all" : f.toLowerCase()}
              <span className="ml-1.5 text-muted/50">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="hr-line border-t">
        {rows.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-4 border-b border-line py-4"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                {c.id.replace("JK-2026-", "#")}
              </span>
              <div>
                <p className="leading-tight">{c.company}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {c.tag}
                </p>
              </div>
            </div>
            <span
              className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest ${VERDICT_STYLE[c.verdict]}`}
            >
              {c.verdict}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
