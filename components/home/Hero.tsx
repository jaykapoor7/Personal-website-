"use client";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { HeroBackdrop } from "../Backdrop";
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
 * Who I am: my name, the one sentence, and a photo. Behind them, a network
 * whose broken links keep getting mended. On a tall enough screen the hero
 * stays put while the rest of the page slides up over it.
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
  const opacity = useTransform(scrollY, [0, h * 0.8], [1, 0]);
  const y = useTransform(scrollY, [0, h], [0, -h * 0.1]);
  const photoY = useTransform(scrollY, [0, h], [0, -h * 0.16]);

  // While the page scrolls, the washes hold still (a class, no re-render).
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const on = () => {
      ref.current?.classList.add("is-scrolling");
      clearTimeout(t);
      t = setTimeout(() => ref.current?.classList.remove("is-scrolling"), 160);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", on);
    };
  }, []);

  // Once the page has slid over the hero, hide it so it costs nothing.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const now = v > h + 40;
    if (now !== covered) setCovered(now);
  });

  const words = ["I find", "BROKEN", "systems", "and", "try", "to", "find"];
  const at = 0.45;

  return (
    <section
      ref={ref}
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className={`hero-pin relative overflow-hidden ${covered ? "invisible" : ""}`}
    >
      <HeroBackdrop active={!covered} />
      <motion.div
        className="shell relative grid min-h-[100svh] items-center gap-x-16 gap-y-8 pb-24 pt-20 will-change-transform md:pb-28 md:pt-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
        style={reduce ? undefined : { opacity, y }}
      >
        <div className="order-2 lg:order-1">
          <h1
            aria-label="Jay Kapoor. I find broken systems and try to find solutions."
            className="hero-title"
          >
            <span className="block text-[clamp(52px,8vw,128px)] leading-[0.95] tracking-[-0.05em]">
              <Letters text="Jay Kapoor" delay={0.1} />
            </span>
            <span
              aria-hidden="true"
              className="mt-4 block max-w-[17ch] text-[clamp(26px,3.3vw,50px)] font-medium leading-[1.14] tracking-[-0.025em] text-accent md:mt-6"
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
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.2 }}
          >
            <a
              href={person.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-primary shadow-[0_10px_24px_-12px_rgb(var(--accent)/0.8)]"
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
                className="inline-flex items-center gap-1.5 underline decoration-fg/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                {l.label}
                {l.href.startsWith("http") && <Arrow />}
              </a>
            ))}
          </motion.p>
        </div>

        {/* The photo, straight, in a white border; it wipes up into view. */}
        <motion.div
          className="order-1 w-[min(46vw,200px)] sm:w-[min(50vw,260px)] lg:order-2 lg:w-full lg:max-w-[440px] lg:justify-self-end"
          style={reduce ? undefined : { y: photoY }}
        >
          <motion.div
            className="rounded-[30px] bg-white p-[6px] shadow-[0_30px_60px_-28px_rgb(var(--fg)/0.55)] md:rounded-[38px] md:p-2 md:shadow-[0_44px_80px_-34px_rgb(var(--fg)/0.6)]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            <motion.div
              className="relative aspect-[820/1008] overflow-hidden rounded-[24px] bg-card md:rounded-[30px]"
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
              animate={{
                clipPath: "inset(0% 0 0 0)",
                transitionEnd: { clipPath: "none" },
              }}
              transition={{ duration: 1.2, ease, delay: 0.35 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.18 }}
                animate={{ scale: 1, transitionEnd: { transform: "none" } }}
                transition={{ duration: 1.8, ease, delay: 0.35 }}
              >
                <Image
                  src="/photos/jay-hero.webp"
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 440px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
