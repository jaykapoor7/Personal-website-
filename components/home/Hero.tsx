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

/** Where I stand in the photo box (fractions of it), and the box itself, in
 * container widths on laptops. The name is laid out around these numbers so
 * its two words tuck just behind my arms. */
const PHOTO = "lg:left-[4.8cqw] lg:w-[60cqw]";

/**
 * Who I am, as a poster. My photo is printed as a cyanotype whose sky is the
 * page itself, so it has no frame: it is the background. Its lower half fades
 * to paper, and a cut-out of me stays at full tone over it, so I step out of
 * the print. On a laptop I stand between "Jay" and "Kapoor": on load the two
 * words slide in from either side and tuck in behind me. As you scroll the
 * photo closes in on me while the rest of the page slides up over it.
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
  const y = useTransform(scrollY, [0, h], [0, -h * 0.1]);
  const zoom = useTransform(scrollY, [0, h], [1, 1.14]);

  // Once the page has slid over the hero, hide it so it costs nothing.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const now = v > h + 40;
    if (now !== covered) setCovered(now);
  });

  const words = ["I find", "BROKEN", "systems", "and", "try", "to", "find"];
  const at = 0.8;
  // Both photo layers move as one: same entrance, same zoom, same origin.
  const group = `absolute inset-x-0 top-0 h-[58svh] origin-[50%_55%] will-change-transform md:h-[62svh] lg:inset-x-auto lg:top-auto lg:bottom-0 lg:h-auto lg:aspect-[3/4] lg:origin-[54%_66%] ${PHOTO}`;
  const enter = {
    initial: reduce ? false : { opacity: 0, scale: 1.06 },
    animate: { opacity: 1, scale: 1, transitionEnd: { transform: "none" } },
    transition: {
      opacity: { duration: 1.3, ease: "easeOut" },
      scale: { duration: 2.6, ease },
    },
  } as const;

  return (
    <section
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className={`hero-pin relative isolate overflow-hidden bg-hero ${covered ? "invisible" : ""}`}
    >
      <div
        className="relative mx-auto min-h-[100svh] max-w-[1680px] [container-type:inline-size]"
      >
        {/* The print. Gradients in the page colour melt its edges and fade
            its lower half to paper (cheaper than a mask). */}
        <motion.div
          className={`${group} overflow-hidden`}
          style={reduce ? undefined : { scale: zoom }}
        >
          <motion.div className="absolute inset-0" {...enter}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/jay-cyan.webp"
              srcSet="/photos/jay-cyan-640.webp 640w, /photos/jay-cyan.webp 960w"
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt={portrait.alt}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[50%_100%]"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-hero via-hero/75 to-transparent lg:h-[58%] lg:from-hero lg:via-hero/90" />
          <div className="absolute inset-y-0 left-0 hidden w-[24%] bg-gradient-to-r from-hero to-transparent lg:block" />
          <div className="absolute inset-y-0 right-0 hidden w-[26%] bg-gradient-to-l from-hero to-transparent lg:block" />
        </motion.div>

        <motion.div
          className="shell relative grid min-h-[100svh] items-end pb-20 pt-[50svh] will-change-transform md:pb-28 md:pt-[56svh] lg:absolute lg:inset-0 lg:z-10 lg:block lg:min-h-0 lg:max-w-none lg:p-0"
          style={reduce ? undefined : { opacity, y }}
        >
          <h1 aria-label="Hi, I'm Jay Kapoor" className="hero-title">
            <span className="block text-[clamp(24px,2.6vw,40px)] font-medium tracking-[-0.03em] text-accent lg:absolute lg:bottom-[24.5cqw] lg:left-[7cqw] lg:text-[2.6cqw]">
              <Letters text="Hi, I'm" delay={0.35} />
            </span>
            <span className="mt-1 block text-[clamp(58px,15vw,140px)] leading-[0.95] tracking-[-0.055em] text-fg lg:contents lg:text-[14.6cqw]">
              <motion.span
                className="inline-block lg:absolute lg:bottom-[8.5cqw] lg:left-[7cqw] lg:leading-[0.92]"
                initial={reduce ? false : { x: "-0.4em" }}
                animate={{ x: "0em" }}
                transition={{ duration: 1.5, ease, delay: 0.45 }}
              >
                <Letters text="Jay" delay={0.5} />
              </motion.span>{" "}
              <motion.span
                className="inline-block lg:absolute lg:bottom-[8.5cqw] lg:left-[48cqw] lg:leading-[0.92]"
                initial={reduce ? false : { x: "0.4em" }}
                animate={{ x: "0em" }}
                transition={{ duration: 1.5, ease, delay: 0.45 }}
              >
                <Letters text="Kapoor" delay={0.62} />
              </motion.span>
            </span>
          </h1>

          <div className="lg:absolute lg:bottom-[29cqw] lg:left-[58cqw] lg:right-[7cqw]">
            <p
              className="mt-5 block max-w-[17ch] text-[clamp(24px,2.8vw,42px)] font-medium leading-[1.14] tracking-[-0.025em] text-accent md:mt-7 lg:mt-0 lg:text-[2.5cqw]"
            >
              <span className="sr-only">
                I find broken systems and try to find solutions.
              </span>
              <span aria-hidden="true">
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
            </p>

            <motion.p
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-11 lg:mt-8 lg:gap-x-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.5 }}
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

        {/* Me again, cut out, over the name: so the name passes behind me.
            I come in first; the print develops around me. */}
        <motion.div
          aria-hidden="true"
          className={`${group} pointer-events-none z-20 hidden lg:block`}
          style={reduce ? undefined : { scale: zoom }}
        >
          <motion.div
            className="absolute inset-0"
            {...enter}
            transition={{ ...enter.transition, opacity: { duration: 0.6, ease: "easeOut" } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/jay-cut.webp"
              alt=""
              decoding="async"
              className="h-full w-full object-cover object-[50%_100%]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
