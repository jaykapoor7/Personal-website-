"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { person, portrait } from "@/content/site";
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
        <h1 className="display text-[clamp(44px,7.4vw,116px)] !leading-[1.04] [text-wrap:balance]">
          <RiseWords text="I'm Jay" delay={0.05} />
          <span className="whitespace-nowrap">
            <motion.span
              className="relative mx-[0.08em] inline-block h-[0.84em] overflow-hidden rounded-full align-[-0.11em]"
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
            text="I find broken systems and try to find solutions."
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
      </motion.div>
    </section>
  );
}
