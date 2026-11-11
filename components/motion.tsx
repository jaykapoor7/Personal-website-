"use client";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Matches a media query after mount (false on the server). */
export function useMedia(query: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const q = window.matchMedia(query);
    const f = () => setOn(q.matches);
    f();
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, [query]);
  return on;
}

/** Fades content up the first time it enters the viewport. */
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
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A line of text whose words rise out of a mask, on load or when scrolled to. */
export function RiseWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  onView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  onView?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const go = !onView || seen;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top"
          >
            <motion.span
              data-reveal
              className="inline-block"
              initial={reduce ? false : { y: "112%" }}
              animate={go ? { y: 0 } : undefined}
              transition={{ duration: 1, ease, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}

/** Counts a figure such as "30,288" or "$8k+" up from zero once it is on screen. */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);

  useEffect(() => {
    if (!m || reduce || !inView || !ref.current) return;
    const [, prefix, num, suffix] = m;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const target = parseFloat(num.replace(/,/g, ""));
    const el = ref.current;
    const fmt = (v: number) =>
      prefix +
      (num.includes(",")
        ? Math.round(v).toLocaleString("en-US")
        : v.toFixed(decimals)) +
      suffix;
    const c = animate(0, target, {
      duration: 1.4,
      ease,
      onUpdate: (v) => (el.textContent = fmt(v)),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  );
}

/** Children rise in one after another when the group comes into view. */
export function Stagger({
  children,
  className,
  gap = 0.07,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const M = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const M = as === "li" ? motion.li : motion.div;
  return (
    <M
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease },
        },
      }}
    >
      {children}
    </M>
  );
}

/** A button or link that leans a little toward the cursor. Mouse only. */
export function Magnetic({
  children,
  className = "",
  pull = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  pull?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * pull);
        y.set((e.clientY - (r.top + r.height / 2)) * pull);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
