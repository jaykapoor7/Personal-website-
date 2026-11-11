"use client";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/**
 * True when scroll scenes may run. Server HTML assumes motion; visitors who ask
 * for reduced motion get the still layout right after mount.
 */
export function useMotionOK() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setOk(!q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return ok;
}

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

/** Scroll progress through an element, eased with a spring so wheel steps feel smooth. */
export function useProgress(
  ref: React.RefObject<HTMLElement>,
  offset: [string, string] = ["start end", "end start"],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    // framer's offset type is a long union of string literals
    offset: offset as never,
    // Wait for every ref to exist: the target may be a later sibling's element.
    layoutEffect: false,
  });
  return useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
    restDelta: 0.0005,
  });
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

/** A picture that wipes up into view and settles from a slight zoom. */
export function Wipe({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left";
}) {
  const reduce = useReducedMotion();
  const hidden =
    from === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
  return (
    <motion.div
      data-reveal
      className={`overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.5, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Drifts its children against the scroll. Positive `by` moves slower than the page. */
export function Parallax({
  children,
  className,
  by = 40,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  by?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = useProgress(ref);
  const y = useTransform(p, [0, 1], [by, -by]);
  const r = useTransform(p, [0, 1], [-rotate, rotate]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, rotate: r }}
    >
      {children}
    </motion.div>
  );
}

/** A frame that grows to full size as it scrolls in. */
export function ScrollScale({
  children,
  className,
  from = 0.84,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = useProgress(ref, ["start end", "start 0.25"]);
  const scale = useTransform(p, [0, 1], [from, 1]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { scale }}
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
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  );
}

/** A whole number that glides to each new value instead of jumping. */
export function Glide({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, {
    stiffness: 110,
    damping: 15,
    mass: 0.5,
    restDelta: 0.5,
  });
  useEffect(() => {
    mv.set(value);
  }, [mv, value]);
  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current && !reduce)
          ref.current.textContent = Math.round(v).toLocaleString("en-US");
      }),
    [spring, reduce],
  );
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value.toLocaleString("en-US")}
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
