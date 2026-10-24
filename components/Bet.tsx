"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { ledger, ledgerStats } from "@/content/ledger";
import { Arrow } from "./Arrow";

const picks = [
  "Zepto lists",
  "UPI processes 30",
  "Generic semaglutide",
  "PhonePe lists",
]
  .map(
    (k) =>
      ledger.calls.find(
        (c) => c.prediction.startsWith(k) && c.result === "OPEN",
      )!,
  )
  .filter(Boolean);

const KEY = "jk-bets";

/** Pick your own odds on a few of my open calls, then see mine. */
export function Bet() {
  const [i, setI] = useState(0);
  const [mine, setMine] = useState<Record<number, number>>({});
  const [guess, setGuess] = useState(50);
  const call = picks[i];
  const locked = mine[i] !== undefined;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      if (saved && typeof saved === "object") setMine(saved);
    } catch {}
  }, []);

  const lock = () => {
    const next = { ...mine, [i]: guess };
    setMine(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const gap = locked ? mine[i] - call.conviction : 0;

  return (
    <div className="grid gap-10 rounded-[28px] bg-fg p-6 text-white md:grid-cols-[1.3fr_1fr] md:p-12">
      <div>
        <div className="flex gap-1.5" role="group" aria-label="Choose a call">
          {picks.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-pressed={i === n}
              aria-label={`Call ${n + 1}`}
              onClick={() => {
                setI(n);
                setGuess(mine[n] ?? 50);
              }}
              className={`h-9 w-9 rounded-full font-mono text-[12px] transition-colors ${
                i === n
                  ? "bg-white text-fg"
                  : "ring-1 ring-white/30 hover:bg-white/10"
              }`}
            >
              {n + 1}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-[clamp(26px,3.2vw,46px)] font-medium leading-[1.05] tracking-[-0.035em]"
          >
            {call.prediction}
          </motion.p>
        </AnimatePresence>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
          Resolves {call.due}
        </p>
      </div>

      <div className="flex flex-col justify-end">
        <label
          htmlFor="bet"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60"
        >
          Your odds
        </label>
        <p className="text-[clamp(64px,8vw,112px)] font-semibold leading-none tracking-[-0.06em] tabular-nums">
          {locked ? mine[i] : guess}%
        </p>
        <input
          id="bet"
          type="range"
          min={1}
          max={99}
          value={locked ? mine[i] : guess}
          disabled={locked}
          onChange={(e) => setGuess(Number(e.target.value))}
          className="mt-4 w-full accent-[#818cf8]"
        />
        <div className="mt-6 min-h-[92px]">
          {locked ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[20px] leading-snug">
                I said <span className="font-semibold">{call.conviction}%</span>
                .{" "}
                {Math.abs(gap) < 5
                  ? "We basically agree."
                  : `You are ${Math.abs(gap)} points ${gap > 0 ? "more" : "less"} sure than me.`}
              </p>
              <p className="mt-1 text-[14px] text-white/60">
                Saved on this device. Come back in {call.due}.
              </p>
            </motion.div>
          ) : (
            <button
              type="button"
              onClick={lock}
              className="rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-fg transition-colors hover:bg-accent hover:text-white"
            >
              Lock it in
            </button>
          )}
        </div>
        <Link
          href="/ledger"
          className="mt-6 inline-flex items-center gap-1.5 border-t border-white/15 pt-4 text-[14px] text-white/80 hover:text-white"
        >
          All {ledgerStats.calls} calls. Brier score so far: {ledgerStats.brier}{" "}
          <Arrow direction="right" />
        </Link>
      </div>
    </div>
  );
}
