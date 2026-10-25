"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef } from "react";
import { portrait } from "@/content/site";
import { HomeFlow } from "./HomeFlow";

const ease = [0.16, 1, 0.3, 1] as const;

/** Words get heavier as the cursor comes near them. */
function useWeight(ref: React.RefObject<HTMLElement>) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!root || reduce || !window.matchMedia("(pointer: fine)").matches)
      return;
    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
    let raf = 0;
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const w of words) {
          const b = w.getBoundingClientRect();
          const d = Math.hypot(
            e.clientX - (b.left + b.width / 2),
            e.clientY - (b.top + b.height / 2),
          );
          const k = Math.max(0, 1 - d / 360);
          w.style.fontVariationSettings = `"wght" ${Math.round(500 + 380 * k)}`;
        }
      });
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => {
      window.removeEventListener("pointermove", on);
      cancelAnimationFrame(raf);
    };
  }, [ref, reduce]);
}

function Words({ text, start }: { text: string; start: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            data-w
            className="inline-block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: start + i * 0.05 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Opening() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  useWeight(ref);
  return (
    <section aria-label="Introduction" className="shell pb-4 pt-28 md:pt-40">
      <h1
        ref={ref}
        className="mb-10 text-[clamp(44px,7.6vw,120px)] md:mb-14 font-medium leading-[0.95] tracking-[-0.055em]"
      >
        <span className="sr-only">
          I&apos;m Jay. Most things I make start with something I noticed.
        </span>
        <span aria-hidden="true">
          <Words text="I'm Jay" start={0.1} />
          <motion.span
            className="relative mx-[0.12em] inline-block h-[0.78em] w-[1.25em] -rotate-3 overflow-hidden rounded-full align-[-0.06em]"
            initial={reduce ? false : { scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -3 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 15,
              delay: 0.35,
            }}
          >
            <Image
              src={portrait.src}
              alt=""
              fill
              priority
              sizes="200px"
              className="object-cover object-[50%_58%]"
            />
          </motion.span>
          <Words text=". Most things I make start with something" start={0.3} />
          <span className="inline-block text-accent">
            <Words text="I noticed." start={0.75} />
          </span>
        </span>
      </h1>

      <Link
        href="/about#thread"
        className="group mb-20 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[17px] font-medium md:mb-28"
      >
        <span className="text-muted transition-colors group-hover:text-fg">
          A health app, a dog database, a bank, eight preschools:
        </span>
        <span className="underline decoration-line underline-offset-4 group-hover:decoration-fg">
          how they connect
        </span>
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
      <HomeFlow />
    </section>
  );
}
