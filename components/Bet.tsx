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
    <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
      <div>
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="text-[clamp(26px,3.2vw,46px)] font-medium leading-[1.08]"
          >
            {call.prediction}
          </motion.p>
        </AnimatePresence>
        <p className="mt-4 text-[15px] text-muted">Resolves {call.due}</p>
        <button
          type="button"
          onClick={() => {
            const n = (i + 1) % picks.length;
            setI(n);
            setGuess(mine[n] ?? 50);
          }}
          className="mt-6 text-[15px] font-medium text-accent hover:underline"
        >
          Another call →
        </button>
      </div>

      <div className="flex flex-col justify-end">
        <label htmlFor="bet" className="text-[15px] text-muted">
          Your odds
        </label>
        <p className="text-[clamp(64px,8vw,112px)] font-semibold leading-none">
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
          className="mt-4 w-full accent-[rgb(var(--accent))]"
        />
        <div className="mt-6 min-h-[84px]">
          {locked ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[19px] leading-snug"
            >
              I said <span className="font-semibold">{call.conviction}%</span>.{" "}
              {Math.abs(gap) < 5
                ? "We basically agree."
                : `You are ${Math.abs(gap)} points ${gap > 0 ? "more" : "less"} sure than me.`}{" "}
              <span className="text-muted">Saved on this device.</span>
            </motion.p>
          ) : (
            <button type="button" onClick={lock} className="btn-primary">
              Compare with mine
            </button>
          )}
        </div>
        <Link
          href="/ledger"
          className="mt-4 text-[15px] text-muted hover:text-fg"
        >
          All {ledgerStats.calls} calls. Brier score so far: {ledgerStats.brier}{" "}
          <Arrow direction="right" />
        </Link>
      </div>
    </div>
  );
}
