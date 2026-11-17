"use client";
import {
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { HeroBackdrop } from "../Backdrop";
import { RiseWords, ease } from "../motion";

/**
 * Who I am: my name, the one sentence, and a proper photo. On a tall enough
 * screen it stays put while the rest of the page slides up over it.
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
  const opacity = useTransform(scrollY, [0, h * 0.85], [1, 0.15]);
  const y = useTransform(scrollY, [0, h], [0, -h * 0.08]);
  const photoY = useTransform(scrollY, [0, h], [0, -h * 0.12]);
  // While the page scrolls, the background holds still (no re-render: a class).
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
  // Once the page has slid over the hero, hide it so its moving background
  // stops costing anything while you scroll the rest of the page.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const now = v > h + 40;
    if (now !== covered) setCovered(now);
  });

  return (
    <section
      ref={ref}
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className={`hero-pin relative overflow-hidden ${covered ? "invisible" : ""}`}
    >
      <HeroBackdrop />
      <motion.div
        className="shell relative grid min-h-[100svh] items-center gap-x-16 gap-y-8 pb-24 pt-20 will-change-transform md:pt-24 md:pb-28 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
        style={reduce ? undefined : { opacity, y }}
      >
        <div className="order-2 lg:order-1">
          <h1
            aria-label="Jay Kapoor. I find broken systems and try to find solutions."
            className="hero-title [text-wrap:balance]"
          >
            <span className="block text-[clamp(48px,7.6vw,118px)] leading-[0.98] tracking-[-0.045em]">
              <RiseWords text="Jay Kapoor" delay={0.05} />
            </span>
            <span className="mt-3 block max-w-[17ch] text-[clamp(26px,3.3vw,50px)] font-medium leading-[1.12] tracking-[-0.025em] text-accent/90 md:mt-5">
              <RiseWords
                text={"I find broken systems and try to find solutions."}
                delay={0.2}
                stagger={0.04}
              />
            </span>
          </h1>

          <motion.p
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-11"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
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

        {/* The photo, straight, in a white border. */}
        <motion.div
          className="order-1 w-[min(46vw,200px)] sm:w-[min(50vw,260px)] lg:order-2 lg:mx-0 lg:w-full lg:max-w-[440px] lg:justify-self-end"
          style={reduce ? undefined : { y: photoY }}
        >
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            <div className="relative aspect-[820/1008] overflow-hidden rounded-[28px] bg-card shadow-[0_0_0_6px_rgb(255_255_255),0_30px_60px_-28px_rgb(var(--fg)/0.55)] md:rounded-[34px] md:shadow-[0_0_0_8px_rgb(255_255_255),0_40px_80px_-34px_rgb(var(--fg)/0.6)]">
              <Image
                src="/photos/jay-hero.webp"
                alt={portrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 440px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
