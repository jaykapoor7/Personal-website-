"use client";
import { useState } from "react";
import type { LedgerCall } from "@/content/ledger";

const filters = ["All", "Open", "Resolved"] as const;
const status = (c: LedgerCall) =>
  c.result === "HIT"
    ? "Right"
    : c.result === "MISS"
      ? "Wrong"
      : `Due ${c.due ?? ""}`;

/** Every call, filterable, with the probability I gave and how it turned out. */
export function LedgerBoard({ calls }: { calls: LedgerCall[] }) {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const match = (c: LedgerCall, x: (typeof filters)[number]) =>
    x === "All" || (x === "Open" ? c.result === "OPEN" : c.result !== "OPEN");
  const shown = calls.filter((c) => match(c, f));
  return (
    <div>
      <div
        role="group"
        aria-label="Filter calls"
        className="mb-4 flex gap-5 text-[16px] font-medium"
      >
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={
              f === x
                ? "text-fg underline underline-offset-4"
                : "text-muted hover:text-fg"
            }
          >
            {x} {calls.filter((c) => match(c, x)).length}
          </button>
        ))}
      </div>
      <ul>
        {shown.map((c) => (
          <li
            key={c.prediction}
            className="grid gap-1 py-4 sm:grid-cols-[1fr_160px] sm:gap-8"
          >
            <div>
              <p className="text-[16px] font-medium leading-snug">
                {c.prediction}
              </p>
              <p className="mt-1 text-[14px] leading-snug text-muted">
                {c.detail}
              </p>
            </div>
            <p className="text-[15px] sm:text-right">
              {c.conviction}%.{" "}
              <span
                className={c.result === "OPEN" ? "text-muted" : "font-medium"}
              >
                {status(c)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
