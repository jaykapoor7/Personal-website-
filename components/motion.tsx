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
    <span ref={ref} className={`${className ?? ""}`}>
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
        hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease },
        },
      }}
    >
      {children}
    </M>
  );
}

/**
 * A card that leans toward the cursor and catches a soft light where it points.
 * Pure decoration: it does nothing with reduced motion or on touch.
 */
export function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, x: 50, y: 50, on: false });
  return (
    <div
      ref={ref}
      className={`tilt relative ${className}`}
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({
          rx: (0.5 - py) * max,
          ry: (px - 0.5) * max,
          x: px * 100,
          y: py * 100,
          on: true,
        });
      }}
      onPointerLeave={() => setT((s) => ({ ...s, rx: 0, ry: 0, on: false }))}
    >
      <div
        className="relative h-full rounded-[inherit] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: t.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${t.x}% ${t.y}%, rgba(99,102,241,0.10), transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}
