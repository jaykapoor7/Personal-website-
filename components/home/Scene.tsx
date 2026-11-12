"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { person, portrait, ventures, type Venture } from "@/content/site";
import { Arrow } from "../Arrow";
import { RiseWords, ease } from "../motion";
import { inertIf } from "./bits";
import { Visual } from "./Featured";

/* The scene is measured in screens of scroll. First my photo grows out of the
   sentence; then each startup slides up over the one before, pauses, and gives way. */
const MORPH = 0.9;
const STEP = 0.7;
const WIPE = 0.35;
const HOLD = 0.5;
/** When each startup's picture starts and finishes sliding in. */
const wipes = ventures.map((_, k) => {
  const end = MORPH + k * STEP;
  return [end - WIPE, end] as const;
});
const LENGTH = MORPH + (ventures.length - 1) * STEP + HOLD;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const inOut = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const grown = (u: number) => inOut(clamp(u / MORPH));

type Rect = { x: number; y: number; w: number; h: number };
/** Where the frame starts (the gap in the sentence) and where it ends up. */
type Geo = { from: Rect; to: Rect; edge: number; wide: boolean };

/** One startup's picture, sliding up over whatever is in the frame. */
function Sheet({ v, k, u }: { v: Venture; k: number; u: MotionValue<number> }) {
  const clipPath = useTransform(
    u,
    (x) => `inset(${(1 - out(clamp((x - wipes[k][0]) / WIPE))) * 100}% 0 0 0)`,
  );
  return (
    <motion.div className="absolute inset-0" style={{ clipPath }}>
      <Visual v={v} />
    </motion.div>
  );
}

/** One startup's name, line and number, arriving with its picture. */
function Words({
  v,
  k,
  u,
  on,
}: {
  v: Venture;
  k: number;
  u: MotionValue<number>;
  on: boolean;
}) {
  const [a, b] = wipes[k];
  const next = wipes[k + 1];
  // In only after the previous one has gone, so two names never overlap.
  const stops = next
    ? [a + 0.2, b + 0.05, next[0], next[0] + 0.16]
    : [a + 0.2, b + 0.05];
  const opacity = useTransform(u, stops, next ? [0, 1, 1, 0] : [0, 1]);
  const y = useTransform(u, stops, next ? [48, 0, 0, -48] : [48, 0]);
  return (
    <motion.div
      className="[grid-area:1/1]"
      style={{ opacity, y }}
      {...inertIf(!on)}
    >
      <p className="text-[15px] font-medium tabular-nums text-muted">
        0{k + 1} / 0{ventures.length}
      </p>
      <h2 className="display mt-2 text-[clamp(44px,6.2vw,96px)] md:mt-3">
        {v.name}
      </h2>
      <p className="mt-3 max-w-[26ch] text-[clamp(18px,1.7vw,24px)] font-medium leading-snug md:mt-5">
        {v.short}
      </p>
      <p className="mt-1.5 text-[clamp(18px,1.7vw,24px)] font-medium leading-snug text-muted">
        {v.metrics[0].value} {v.metrics[0].label}
      </p>
      <Link href={`/work/${v.id}`} className="btn-primary mt-5 md:mt-8">
        Case study <Arrow direction="right" />
      </Link>
    </motion.div>
  );
}

/**
 * The landing page as one scroll. My photo sits in the sentence; scrolling
 * grows it into a single frame, and that frame steps through what I started.
 */
export function Scene() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [active, setActive] = useState(-1);
  const [left, setLeft] = useState(false);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.25,
    restDelta: 0.0004,
  });
  const u = useTransform(smooth, (v) => v * LENGTH);
  useMotionValueEvent(u, "change", (v) => {
    let a = -1;
    wipes.forEach((w, k) => {
      if (v >= w[0] + WIPE / 2) a = k;
    });
    setActive(a);
    setLeft(v > 0.3);
  });

  // Find the gap in the sentence and work out where the frame should end up.
  useEffect(() => {
    const measure = () => {
      const s = slot.current;
      const st = stage.current;
      if (!s || !st) return;
      // offset* ignores the transforms the sentence gets while scrolling.
      let x = 0;
      let y = 0;
      for (
        let el: HTMLElement | null = s;
        el && el !== st;
        el = el.offsetParent as HTMLElement | null
      ) {
        x += el.offsetLeft;
        y += el.offsetTop;
      }
      const W = st.clientWidth;
      const H = st.clientHeight;
      const wide = W >= 1024;
      const edge = Math.max(
        wide ? 40 : W >= 640 ? 32 : 20,
        (W - 1320) / 2 + 40,
      );
      let to: Rect;
      if (wide) {
        const w = Math.min(W * 0.5, 760);
        const room = H - 96 - 124;
        const h = Math.min(room, w * 0.82);
        to = { x: W - edge - w, y: 96 + (room - h) / 2, w, h };
      } else {
        const w = W - 2 * edge;
        to = { x: edge, y: 84, w, h: Math.min(H * 0.38, w * 0.8) };
      }
      setGeo({
        from: { x, y, w: s.offsetWidth, h: s.offsetHeight },
        to,
        edge,
        wide,
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (title.current) ro.observe(title.current);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  const g = geo;
  const x = useTransform(u, (v) => (g ? mix(g.from.x, g.to.x, grown(v)) : 0));
  const y = useTransform(u, (v) => (g ? mix(g.from.y, g.to.y, grown(v)) : 0));
  const width = useTransform(u, (v) =>
    g ? mix(g.from.w, g.to.w, grown(v)) : 0,
  );
  const height = useTransform(u, (v) =>
    g ? mix(g.from.h, g.to.h, grown(v)) : 0,
  );
  const borderRadius = useTransform(u, (v) =>
    g ? mix(g.from.h / 2, 28, grown(v)) : 999,
  );
  const rotate = useTransform(u, (v) => mix(-4, 0, grown(v)));
  const introOpacity = useTransform(u, [0.05, 0.45], [1, 0]);
  const introY = useTransform(u, [0.05, 0.45], [0, -64]);
  const progress = useTransform(u, [0, LENGTH], [0, 1]);

  const go = (k: number) => {
    const el = section.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((wipes[k][1] + 0.08) / LENGTH) * travel,
      behavior: "smooth",
    });
  };

  const face = (
    <Image
      src={portrait.src}
      alt=""
      fill
      priority
      sizes="(max-width: 1024px) 92vw, 760px"
      className="object-cover object-[50%_61%]"
    />
  );

  return (
    <section
      ref={section}
      id="top"
      data-tone="light"
      aria-label="Introduction and startups"
      style={{ height: `${(1 + LENGTH) * 100}svh` }}
    >
      <div
        ref={stage}
        className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden"
      >
        {/* Who I am. It lifts away as the photo grows. */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: introOpacity, y: introY }}
          {...inertIf(left)}
        >
          <div className="shell relative flex h-full flex-col justify-center pb-24 pt-20">
            <h1
              ref={title}
              className="display text-[clamp(44px,7.4vw,116px)] !leading-[1.04] [text-wrap:balance]"
            >
              <RiseWords text="I'm Jay" delay={0.05} />
              <span className="whitespace-nowrap">
                <span
                  ref={slot}
                  className="relative mx-[0.08em] inline-block h-[0.84em] w-[1.7em] -rotate-[4deg] overflow-hidden rounded-full align-[-0.11em]"
                >
                  {/* Until the page has measured itself, the photo sits here. */}
                  {!g && face}
                </span>
                <RiseWords text="." delay={0.15} />
              </span>
              <RiseWords
                text="I find broken systems and try to find solutions."
                delay={0.2}
              />
            </h1>
            <motion.p
              className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
            >
              <a
                href={person.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Resume <Arrow />
              </a>
              {[
                { label: person.email, href: `mailto:${person.email}` },
                ...person.links.slice(0, 2),
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent"
                >
                  {l.label}
                  {l.href.startsWith("http") && <Arrow />}
                </a>
              ))}
            </motion.p>
          </div>
        </motion.div>

        {/* What I started: the words for whichever picture is in the frame. */}
        {g && (
          <div
            className="absolute grid items-center"
            style={
              g.wide
                ? {
                    left: g.edge,
                    width: g.to.x - g.edge - 48,
                    top: 96,
                    bottom: 124,
                  }
                : {
                    left: g.edge,
                    right: g.edge,
                    top: g.to.y + g.to.h + 22,
                  }
            }
          >
            {ventures.map((v, k) => (
              <Words key={v.id} v={v} k={k} u={u} on={active === k} />
            ))}
          </div>
        )}

        {/* The one frame: my photo first, then each startup in turn. */}
        {g && (
          <motion.div
            className="absolute left-0 top-0 overflow-hidden bg-card"
            style={{ x, y, width, height, borderRadius, rotate }}
          >
            {face}
            {ventures.map((v, k) => (
              <Sheet key={v.id} v={v} k={k} u={u} />
            ))}
          </motion.div>
        )}

        {/* Where you are in the four, and a way to jump between them. */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-8">
          <div className="shell">
            <div className="relative h-[2px] overflow-hidden rounded-full bg-line">
              <motion.span
                className="absolute inset-0 origin-left bg-accent"
                style={{ scaleX: progress }}
              />
            </div>
            <ol className="mt-3 hidden grid-cols-4 gap-4 text-[14px] font-semibold sm:grid">
              {ventures.map((v, k) => (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => go(k)}
                    aria-current={active === k ? "true" : undefined}
                    className={`flex items-baseline gap-2 text-left transition-colors ${
                      active === k ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span className="font-medium tabular-nums">0{k + 1}</span>
                    {v.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
