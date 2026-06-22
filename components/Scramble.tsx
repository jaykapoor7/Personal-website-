"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*-_";
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between reveals; lower = faster decode. */
  speed?: number;
}

/**
 * Decodes `text` from random monospace characters into the final string when it
 * scrolls into view (once). SSR/no-JS and reduced-motion render the real text,
 * so it stays accessible and crawlable.
 */
export function Scramble({ text, as, className, speed = 38 }: Props) {
  const Tag: ElementType = as ?? "span";
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      let revealed = 0;
      const scramble = () => {
        setDisplay(
          text
            .split("")
            .map((ch, i) => (ch === " " ? " " : i < revealed ? ch : rand()))
            .join(""),
        );
      };
      const id = setInterval(() => {
        revealed += 1;
        scramble();
        if (revealed >= text.length) clearInterval(id);
      }, speed);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, speed]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
