"use client";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Fades content up out of a soft blur the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline whose words rise into place on load. */
export function RiseWords({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <motion.span
            data-reveal
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease, delay: delay + i * stagger }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Counts a figure such as "30,000+" or "0.134" up from zero when it scrolls into view. */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);

  useIsoLayoutEffect(() => {
    if (!m || reduce || !ref.current) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!m || reduce || !inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, target, {
      duration: 1.8,
      ease,
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!m) return <span className={className}>{value}</span>;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const target = parseFloat(num.replace(/,/g, ""));
  function format(v: number) {
    const s = num.includes(",")
      ? Math.round(v).toLocaleString("en-US")
      : v.toFixed(decimals);
    return `${prefix}${s}${suffix}`;
  }
  return (
    <span
      ref={ref}
      className={`tabular-nums ${className ?? ""}`}
      aria-label={value}
    >
      {value}
    </span>
  );
}

/** A frame that grows to full size and squares its corners as it scrolls in. */
export function ScrollScale({
  children,
  className,
  from = 0.82,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.15"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 28]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? { borderRadius: 28 } : { scale, borderRadius: radius }}
    >
      {children}
    </motion.div>
  );
}
