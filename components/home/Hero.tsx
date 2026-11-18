"use client";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { ease } from "../motion";

/** Each letter rises out of a mask, one after another. */
function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            {[...word].map((ch, i) => {
              const n = words.slice(0, w).join("").length + i;
              return (
                <motion.span
                  key={i}
                  data-reveal
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: delay + n * 0.035 }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

/** A word that rises into place. */
function Word({
  children,
  i,
  delay,
}: {
  children: React.ReactNode;
  i: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
      <motion.span
        data-reveal
        className="inline-block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease, delay: delay + i * 0.045 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** "broken", split along its middle, which then snaps back together. */
function Broken({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  const half = (top: boolean) => (
    <motion.span
      className="absolute inset-0"
      style={{ clipPath: top ? "inset(0 0 50% 0)" : "inset(50% 0 0 0)" }}
      initial={reduce ? false : { x: top ? "-0.09em" : "0.09em" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 16, delay }}
    >
      broken
    </motion.span>
  );
  return (
    <span className="relative inline-block">
      <span className="invisible">broken</span>
      {half(true)}
      {half(false)}
    </span>
  );
}

/**
 * Who I am, over the photo it belongs to. The photo is printed as a cyanotype:
 * the sky is the page itself, so the picture has no frame, it is the
 * background. On load the print develops from the top down; as you scroll it
 * slowly closes in on me while the rest of the page slides up over it.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [h, setH] = useState(800);
  useEffect(() => {
    const on = () => setH(window.innerHeight);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, h * 0.7], [1, 0]);
  const y = useTransform(scrollY, [0, h], [0, -h * 0.12]);
  const zoom = useTransform(scrollY, [0, h], [1, 1.12]);

  // Once the page has slid over the hero, hide it so it costs nothing.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const now = v > h + 40;
    if (now !== covered) setCovered(now);
  });

  const words = ["I find", "BROKEN", "systems", "and", "try", "to", "find"];
  const at = 0.6;

  return (
    <section
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className={`hero-pin relative overflow-hidden bg-hero ${covered ? "invisible" : ""}`}
    >
      {/* The photo: full height on the right on wide screens, the top of the
          screen on phones. Its sky is the page colour, so only the trees, the
          tower and I show; gradients in the page colour melt the other edges. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[58svh] origin-[50%_55%] overflow-hidden will-change-transform md:h-[62svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[60%] lg:origin-[55%_62%]"
        style={reduce ? undefined : { scale: zoom }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.07 }}
          animate={{ scale: 1, transitionEnd: { transform: "none" } }}
          transition={{ duration: 2.6, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/jay-cyan.webp"
            srcSet="/photos/jay-cyan-640.webp 640w, /photos/jay-cyan.webp 960w"
            sizes="(min-width: 1024px) 60vw, 100vw"
            alt={portrait.alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[50%_100%] lg:object-[50%_35%]"
          />
        </motion.div>
        {/* Melting edges, painted in the page colour (cheaper than a mask). */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-hero via-hero/75 to-transparent lg:hidden" />
        <div className="absolute inset-y-0 left-0 hidden w-[46%] bg-gradient-to-r from-hero via-hero/70 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-[18%] bg-gradient-to-t from-hero/60 to-transparent lg:block" />
        {/* The print develops: a sheet of paper slides off it, top first.
            Always rendered (so server and client agree); hidden by CSS for
            reduced motion. */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[170%] bg-[linear-gradient(to_bottom,transparent_0%,rgb(var(--hero))_24%,rgb(var(--hero))_100%)] motion-reduce:hidden"
          initial={{ y: "-24%" }}
          animate={{ y: "62%", transitionEnd: { display: "none" } }}
          transition={{ duration: 1.9, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
        />
      </motion.div>

      <motion.div
        className="shell relative grid min-h-[100svh] items-end pb-20 pt-[50svh] will-change-transform md:pb-28 md:pt-[56svh] lg:items-center lg:pb-24 lg:pt-24"
        style={reduce ? undefined : { opacity, y }}
      >
        <div className="max-w-[640px]">
          <h1
            aria-label="Hi, I'm Jay Kapoor. I find broken systems and try to find solutions."
            className="hero-title"
          >
            <span className="block text-[clamp(24px,2.6vw,40px)] font-medium tracking-[-0.03em] text-accent">
              <Letters text="Hi, I'm" delay={0.35} />
            </span>
            <span className="mt-1 block text-[clamp(58px,8.6vw,140px)] leading-[0.95] tracking-[-0.055em] text-fg">
              <Letters text="Jay Kapoor" delay={0.5} />
            </span>
            <span
              aria-hidden="true"
              className="mt-5 block max-w-[17ch] text-[clamp(24px,2.8vw,42px)] font-medium leading-[1.14] tracking-[-0.025em] text-accent md:mt-7"
            >
              {words.map((wd, i) => (
                <Fragment key={i}>
                  <Word i={i} delay={at}>
                    {wd === "BROKEN" ? <Broken delay={at + 1.1} /> : wd}
                  </Word>{" "}
                </Fragment>
              ))}
              <Word i={words.length} delay={at}>
                <span className="relative inline-block">
                  solutions.
                  <motion.span
                    className="absolute -bottom-[0.02em] left-0 h-[0.07em] w-[calc(100%-0.25em)] origin-left rounded-full bg-accent"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease, delay: at + 1.35 }}
                  />
                </span>
              </Word>
            </span>
          </h1>

          <motion.p
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-11"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.3 }}
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
                className="inline-flex items-center gap-1.5 text-fg underline decoration-fg/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-fg"
              >
                {l.label}
                {l.href.startsWith("http") && <Arrow />}
              </a>
            ))}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
