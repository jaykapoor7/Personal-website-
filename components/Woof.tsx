"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Type "woof" anywhere and a StrayPaw dog runs across the bottom of the screen. */
export function Woof() {
  const [runs, setRuns] = useState<number[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    console.log(
      "%cHi. This site is hand-built with Next.js, framer-motion and matter-js.\nSay hi: jak581@pitt.edu",
      "font: 13px/1.6 ui-monospace, monospace",
    );
    let typed = "";
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed === "woof") setRuns((r) => [...r, Date.now()]);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  if (reduce) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-3 z-[90] h-16 overflow-hidden"
    >
      <AnimatePresence>
        {runs.map((id) => (
          <motion.div
            key={id}
            className="absolute bottom-0 h-14 w-14"
            initial={{ x: "-10vw" }}
            animate={{ x: "110vw", y: [0, -14, 0, -14, 0, -14, 0, -14, 0] }}
            transition={{ duration: 3.2, ease: "linear" }}
            onAnimationComplete={() =>
              setRuns((r) => r.filter((x) => x !== id))
            }
          >
            <Image
              src="/logos/straypaw.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
