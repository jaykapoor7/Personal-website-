"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { RiseWords, ease } from "../motion";

/** Who I am, in one sentence. */
export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className="shell pt-24 md:pt-28"
    >
      <h1 className="display text-[clamp(40px,5.6vw,84px)] !leading-[1.06]">
        <RiseWords text="I'm Jay" delay={0.05} />
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
        <RiseWords
          text=", an economics and statistics student at Pitt."
          delay={0.15}
        />
      </h1>

      <motion.p
        className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-8"
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
    </section>
  );
}
