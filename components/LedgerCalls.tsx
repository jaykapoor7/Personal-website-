"use client";

import { useState } from "react";
import type { CallResult, LedgerCall } from "@/content/ledger";
import { Reveal } from "@/components/Reveal";

const RESULT_STYLE: Record<CallResult, string> = {
  HIT: "bg-accent text-ink",
  MISS: "border border-paper text-paper",
  OPEN: "border border-line text-muted",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest ${className}`}
    >
      {label}
    </span>
  );
}

// Renders the dated calls. Open calls let the visitor predict HIT/MISS before
// revealing Jay's conviction — turning the ledger into something you play.
export function LedgerCalls({ calls }: { calls: LedgerCall[] }) {
  const [guesses, setGuesses] = useState<Record<number, "HIT" | "MISS">>({});

  return (
    <ul className="hr-line border-t">
      {calls.map((c, i) => {
        const guess = guesses[i];
        const lean = c.conviction >= 50 ? "HIT" : "MISS";
        return (
          <Reveal as="li" key={i} delay={Math.min(i, 6) * 0.03}>
            <div className="flex flex-col gap-3 border-b border-line py-5 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <p className="text-base leading-snug text-paper">{c.prediction}</p>
                <p className="mt-1 text-sm text-muted">{c.detail}</p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {c.result !== "OPEN" ? (
                  <>
                    <span className="font-mono text-sm text-muted">
                      <span className="text-accent">{c.conviction}%</span> conv.
                    </span>
                    <Badge label={c.result} className={RESULT_STYLE[c.result]} />
                  </>
                ) : guess ? (
                  <>
                    <span className="font-mono text-xs text-muted">
                      you: <span className="text-paper">{guess}</span> · jay{" "}
                      <span className="text-accent">{c.conviction}%</span> →{" "}
                      {lean}
                    </span>
                    <Badge label="OPEN" className={RESULT_STYLE.OPEN} />
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted">your call?</span>
                    {(["HIT", "MISS"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGuesses((s) => ({ ...s, [i]: g }))}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        {g}
                      </button>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
