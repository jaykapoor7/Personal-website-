"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { person, portrait, ventures } from "@/content/site";
import { Arrow } from "../Arrow";
import { RiseWords, ease } from "../motion";

/**
 * Who I am, in one sentence. On a tall enough screen it stays put while the
 * rest of the page slides up over it, and settles back as it is covered.
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
  const opacity = useTransform(scrollY, [0, h * 0.85], [1, 0.12]);
  const y = useTransform(scrollY, [0, h], [0, -h * 0.08]);
  // What I am doing now, with its two strongest numbers.
  const now = ventures.find((v) => /present/.test(v.period)) ?? ventures[0];
  const [first, , third] = now.metrics;

  return (
    <section
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className="hero-pin bg-paper"
    >
      <motion.div
        className="shell flex min-h-[100svh] flex-col justify-center pb-28 pt-24 will-change-transform"
        style={reduce ? undefined : { opacity, y }}
      >
        <h1 className="hero-title text-[clamp(40px,7vw,108px)] [text-wrap:balance] max-[360px]:text-[33px]">
          <RiseWords text="I'm Jay" delay={0.05} />
          <span className="whitespace-nowrap">
            <motion.span
              className="relative mr-[0.06em] inline-block h-[0.84em] overflow-hidden rounded-full align-[-0.11em]"
              initial={
                reduce
                  ? { width: "1.7em" }
                  : { width: "1.7em", scale: 0, rotate: -30 }
              }
              animate={{ scale: 1, rotate: -4 }}
              whileHover={{ width: "3em", rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: 0.2,
              }}
            >
              <Image
                src={portrait.src}
                alt=""
                fill
                priority
                sizes="300px"
                className="object-cover object-[50%_61%]"
              />
            </motion.span>
            <RiseWords text="." delay={0.15} />
          </span>
          <RiseWords
            text={"I\u00a0find broken systems and try to find solutions."}
            delay={0.2}
          />
        </h1>

        <motion.p
          className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
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

        <motion.div
          className="mt-12 md:mt-16"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
        >
          <Link
            href={`/work/${now.id}`}
            className="group inline-flex max-w-full flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-line pt-4 text-[15.5px] md:text-[17px]"
          >
            <span className="live -translate-y-px self-center text-accent" />
            <span className="font-semibold">Now</span>
            <span className="font-semibold text-accent">{now.name}</span>
            <span className="text-muted">
              {now.short[0].toLowerCase() + now.short.slice(1, -1)},
            </span>
            <span className="whitespace-nowrap font-semibold tabular-nums">
              {first.value} {first.label}
              {third && (
                <span className="text-muted">
                  {" · "}
                  {third.value} {third.label}
                </span>
              )}
            </span>
            <Arrow
              direction="right"
              className="self-center transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
