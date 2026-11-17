"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { person, portrait, ventures } from "@/content/site";
import { Arrow } from "../Arrow";
import { HeroBackdrop } from "../Backdrop";
import { RiseWords, ease, useMedia } from "../motion";

/**
 * Who I am: my name, the one sentence, and a proper photo. On a tall enough
 * screen it stays put while the rest of the page slides up over it.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
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

  // The photo leans a little towards the pointer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-7, 7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [-1, 1], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });
  const lean = fine && !reduce;

  const now = ventures.find((v) => /present/.test(v.period)) ?? ventures[0];

  return (
    <section
      ref={ref}
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className={`hero-pin relative overflow-hidden ${covered ? "invisible" : ""}`}
      onPointerMove={
        lean
          ? (e) => {
              px.set((e.clientX / window.innerWidth) * 2 - 1);
              py.set((e.clientY / window.innerHeight) * 2 - 1);
            }
          : undefined
      }
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

        {/* The photo, framed like a print, with two small labels. */}
        <motion.div
          className="order-1 w-[min(46vw,200px)] sm:w-[min(50vw,260px)] [perspective:1200px] lg:order-2 lg:mx-0 lg:w-full lg:max-w-[440px] lg:justify-self-end"
          style={reduce ? undefined : { y: photoY }}
        >
          <motion.div
            className="relative"
            style={lean ? { rotateX, rotateY } : undefined}
            initial={
              reduce ? false : { opacity: 0, scale: 0.9, rotate: -6, y: 30 }
            }
            animate={{ opacity: 1, scale: 1, rotate: -2.5, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 16,
              delay: 0.15,
            }}
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

            <div className="float-a absolute -left-5 top-[12%] hidden sm:block md:-left-12">
              <motion.div
                className="rounded-2xl bg-white/90 px-4 py-2.5 text-[13.5px] font-semibold shadow-[0_12px_30px_-14px_rgb(var(--fg)/0.55)] ring-1 ring-line backdrop-blur"
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.9 }}
              >
                <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                  Studying
                </span>
                Economics & Statistics, Pitt
              </motion.div>
            </div>

            <div className="float-b absolute -right-[42%] bottom-[6%] sm:-right-3 md:-right-8">
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease, delay: 1.05 }}
              >
                <Link
                  href={`/work/${now.id}/`}
                  className="group flex items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-3 py-2 text-[12px] font-semibold sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-[13.5px] text-white shadow-[0_14px_30px_-12px_rgb(var(--accent)/0.9)] transition-transform hover:-translate-y-0.5"
                >
                  <span className="live text-white" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-white/80">
                      Building now
                    </span>
                    {now.name} · {now.metrics[0].value} records
                  </span>
                  <Arrow
                    direction="right"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
