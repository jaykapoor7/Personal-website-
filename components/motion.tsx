"use client";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
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

function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  if (still) return <span>{word} </span>;
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph that lights up word by word as it scrolls through the viewport. */
export function ScrollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  // Full-strength text until mounted (server render, no JS, reduced motion).
  const [live, setLive] = useState(false);
  useEffect(() => setLive(!reduce), [reduce]);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!live}
        />
      ))}
    </p>
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

/** Vertical parallax: content drifts against the scroll. */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? {} : { y }}>
      {children}
    </motion.div>
  );
}

/** Pinned section: a full-bleed image zooms out while a title fades up over it. */
export function ZoomStage({
  image,
  children,
}: {
  image: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const dim = useTransform(scrollYProgress, [0, 0.6], [0.15, 0.65]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const titleO = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  return (
    <div ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduce ? {} : { scale }}
        >
          {image}
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: reduce ? 0.55 : dim }}
        />
        <motion.div
          data-reveal
          className="relative flex h-full items-center justify-center px-5"
          style={reduce ? {} : { y: titleY, opacity: titleO }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/** Horizontal gallery driven by vertical scroll on wide screens; swipeable on phones. */
export function HorizontalGallery({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      const on = mq.matches && !reduce;
      setPinned(on);
      if (track.current)
        setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={section}
      className="relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "py-24"
        }
      >
        {header}
        <div
          className={
            pinned
              ? ""
              : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          <motion.div
            ref={track}
            className="flex w-max gap-5 px-5 sm:px-8 md:gap-8 md:px-[max(2rem,calc((100vw-1120px)/2+2rem))]"
            style={pinned ? { x } : undefined}
          >
            {children}
          </motion.div>
        </div>
        {pinned && (
          <div className="shell mt-10">
            <div className="h-px w-full bg-line">
              <motion.div className="h-px bg-fg" style={{ width: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Sets data-inview on its element once visible, for CSS-driven entrance effects. */
export function InView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <div
      ref={ref}
      className={className}
      data-inview={inView ? "true" : "false"}
    >
      {children}
    </div>
  );
}

/** Tiles inside get a soft spotlight that follows the cursor. */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const tile = (e.target as HTMLElement).closest<HTMLElement>(
          "[data-spot]",
        );
        if (!tile) return;
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--x", `${e.clientX - r.left}px`);
        tile.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
