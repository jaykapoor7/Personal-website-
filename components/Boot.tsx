"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "> initializing kapoorjay.com",
  "> loading work [ 8 projects ] ... ok",
  "> loading ledger [ 15 calls · 75% hit ] ... ok",
  "> loading research [ memos · theses ] ... ok",
  "> mounting terminal ... ok",
  "> ready_",
];

// One-time terminal "boot" overlay on first visit per session. Skippable
// (click / any key), and skipped entirely for reduced-motion or repeat visits.
export function Boot() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [closing, setClosing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (
      sessionStorage.getItem("booted") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    sessionStorage.setItem("booted", "1");
    setShow(true);

    LINES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setCount(i + 1), 200 + i * 230));
    });
    const total = 200 + LINES.length * 230;
    timers.current.push(setTimeout(() => setClosing(true), total + 250));
    timers.current.push(setTimeout(() => setShow(false), total + 750));

    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!show) return;
    const dismiss = () => {
      setClosing(true);
      setTimeout(() => setShow(false), 500);
    };
    window.addEventListener("keydown", dismiss);
    window.addEventListener("click", dismiss);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("click", dismiss);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[80] flex flex-col justify-center bg-ink px-6 font-mono text-sm transition-opacity duration-500 sm:text-base ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="shell">
        {LINES.slice(0, count).map((line, i) => (
          <p
            key={i}
            className={i === LINES.length - 1 ? "text-accent" : "text-muted"}
          >
            {line}
          </p>
        ))}
        <p className="mt-6 text-xs uppercase tracking-widest text-muted/60">
          press any key to skip
        </p>
      </div>
    </div>
  );
}
