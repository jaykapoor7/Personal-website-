"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { person, portrait } from "@/content/site";
import { jumpTo } from "@/lib/jump";
import { Arrow } from "../Arrow";
import { ease } from "../motion";
import { Timeline } from "./Timeline";

type Group = "startups" | "experience" | "research" | "projects";

/** One soft wash of blue that drifts after the mouse. */
function Glow({ area }: { area: React.RefObject<HTMLElement> }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 30, damping: 20, mass: 1.2 });
  const sy = useSpring(y, { stiffness: 30, damping: 20, mass: 1.2 });
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    x.jump(el.clientWidth * 0.82);
    y.jump(el.clientHeight * 0.22);
    sx.jump(el.clientWidth * 0.82);
    sy.jump(el.clientHeight * 0.22);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move, { passive: true });
    return () => el.removeEventListener("pointermove", move);
  }, [area, x, y, sx, sy]);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      style={{ x: sx, y: sy }}
    >
      <div className="h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.15),transparent)]" />
    </motion.div>
  );
}

/** One plain sentence about me. The underlined words lead to each part of the page. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hot, setHot] = useState<Group | null>(null);
  const go = (id: Group) => (e: React.MouseEvent) => {
    e.preventDefault();
    jumpTo(id, { glide: true });
  };
  const watch = (id: Group) => ({
    onMouseEnter: () => setHot(id),
    onMouseLeave: () => setHot(null),
    onFocus: () => setHot(id),
    onBlur: () => setHot(null),
  });

  let n = 0;
  const step = 0.035;
  const rise = (i: number) => ({
    initial: reduce ? false : { y: "115%" },
    animate: { y: 0 },
    transition: { duration: 0.9, ease, delay: 0.1 + i * step },
  });
  /** Each word rises out of a mask, one after another. */
  const say = (text: string) =>
    text.split(" ").map((w) => {
      const i = n++;
      return (
        <span key={`${w}${i}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top">
            <motion.span className="inline-block" {...rise(i)}>
              {w}
            </motion.span>
          </span>{" "}
        </span>
      );
    });
  /** A word that leads to a section. */
  const link = (id: Group, word: string, tail = "") => {
    const i = n++;
    return (
      <>
        <a
          href={`#${id}`}
          onClick={go(id)}
          {...watch(id)}
          className="whitespace-nowrap"
        >
          <span className="-mx-[0.06em] -mb-[0.16em] inline-block overflow-hidden px-[0.06em] pb-[0.16em] align-top">
            <motion.span
              className={`-mx-[0.05em] inline-block rounded-[0.1em] px-[0.05em] underline decoration-[0.06em] underline-offset-[0.1em] transition-colors duration-200 ${
                hot === id
                  ? "bg-accent text-white decoration-transparent"
                  : "decoration-accent"
              }`}
              {...rise(i)}
            >
              {word}
            </motion.span>
          </span>
          {tail}
        </a>{" "}
      </>
    );
  };

  return (
    <section
      ref={ref}
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden lg:min-h-[max(92svh,660px)]"
    >
      <Glow area={ref} />
      <div className="shell relative flex flex-1 flex-col justify-center pb-10 pt-24 md:pb-12 md:pt-28">
        <h1 className="display text-[clamp(38px,min(5.6vw,9.4vh),86px)] !leading-[1.08]">
          {say("I'm Jay")}
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
          {say(
            ", an economics and statistics student at Pitt. Here is what I've",
          )}
          {link("startups", "started", ",")}
          {say("where I've")}
          {link("experience", "worked", ",")}
          {say("the")}
          {link("research", "research")}
          {say("I've done, and things I've")}
          {link("projects", "made", ".")}
        </h1>

        <motion.p
          className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] font-semibold md:mt-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
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

      <motion.div
        className="relative"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 1.3 }}
      >
        <Timeline hot={hot} onHot={setHot} />
      </motion.div>
    </section>
  );
}
