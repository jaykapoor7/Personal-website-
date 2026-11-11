"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { builds, person, portrait, roles, ventures } from "@/content/site";
import { jumpTo } from "@/lib/jump";
import { Arrow } from "../Arrow";
import { ease } from "../motion";

/** A field of dots behind the intro. They swell where the mouse is. */
function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 28;
    let w = 0;
    let h = 0;
    let raf = 0;
    let live = false;
    const p = { x: -999, y: -999, tx: -999, ty: -999 };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgb(29 74 245)";
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) {
          const near = Math.max(0, 1 - Math.hypot(x - p.x, y - p.y) / 180);
          const k = near * near;
          const wave = calm
            ? 0.4
            : (Math.sin((x + y * 1.4) * 0.011 - t * 0.0011) + 1) / 2;
          ctx.globalAlpha = 0.1 + wave * 0.12 + k * 0.6;
          ctx.beginPath();
          ctx.arc(x, y, 1 + wave * 0.5 + k * 3.4, 0, 6.2832);
          ctx.fill();
        }
    };
    const loop = (t: number) => {
      draw(t);
      if (live && !calm) raf = requestAnimationFrame(loop);
    };
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = c.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => {
      const was = live;
      live = e.isIntersecting;
      if (live && !was && !calm) raf = requestAnimationFrame(loop);
    });
    size();
    io.observe(c);
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full [mask-image:linear-gradient(#000_55%,transparent)]"
    />
  );
}

type Tile = { src?: string; letter?: string; wide?: boolean };

/** Small logos set into the line of text. They fan out when their phrase is hovered. */
function Stack({ tiles, at }: { tiles: Tile[]; at: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="ml-[0.16em] inline-flex align-[-0.1em]">
      {tiles.map((t, n) => (
        <motion.span
          key={n}
          className={`relative inline-block h-[0.76em] overflow-hidden rounded-[0.2em] bg-white ring-[0.045em] ring-white transition-[margin,transform] duration-300 ease-out [box-shadow:0_0_0_0.045em_#fff,0_0.06em_0.16em_rgb(var(--fg)/0.35)] group-hover:-translate-y-[0.07em] ${
            t.wide ? "w-[1.2em]" : "w-[0.76em]"
          } ${n ? "-ml-[0.1em] group-hover:ml-[0.08em]" : ""}`}
          style={{ zIndex: 9 - n, transitionDelay: `${n * 35}ms` }}
          initial={reduce ? false : { scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: at + n * 0.06,
          }}
        >
          {t.src ? (
            <Image
              src={t.src}
              alt=""
              fill
              sizes="120px"
              className={
                t.wide ? "object-cover object-top" : "object-contain p-[10%]"
              }
            />
          ) : (
            <span className="grid h-full w-full place-items-center bg-accent text-[0.42em] font-bold leading-none text-white">
              {t.letter}
            </span>
          )}
        </motion.span>
      ))}
    </span>
  );
}

const logoOf = (name: string, src?: string): Tile =>
  src ? { src } : { letter: name.replace(/^The /, "")[0] };

const stacks = {
  startups: ventures.map((v) => logoOf(v.name, v.logo)),
  experience: roles.map((r) => logoOf(r.org, r.logo)),
  research: [
    { src: "/logos/pitt.png" },
    { src: "/logos/upmc.png" },
    { letter: "M" },
  ],
  projects: ["emergency", "strike", "cura"].map((id) => ({
    src: builds.find((b) => b.id === id)!.image,
    wide: true,
  })),
};

/** One sentence about me, with my photo and the logos set into the text. */
export function Hero() {
  const reduce = useReducedMotion();
  let n = 0;
  const step = 0.035;
  /** Each word rises out of a mask, one after another. */
  const say = (text: string) =>
    text.split(" ").map((w) => {
      const i = n++;
      return (
        <span key={`${w}${i}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 + i * step }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </span>
      );
    });
  /** A word that leads to a section, with that section's logos after it. */
  const go = (id: keyof typeof stacks, word: string, tail = "") => {
    const i = n++;
    n += 2;
    return (
      <>
        <a
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            jumpTo(id, { glide: true });
          }}
          className="group whitespace-nowrap"
        >
          <span className="-mx-[0.06em] -mb-[0.16em] inline-block overflow-hidden px-[0.06em] pb-[0.16em] align-top">
            <motion.span
              className="-mx-[0.05em] inline-block rounded-[0.1em] px-[0.05em] underline decoration-line decoration-[0.06em] underline-offset-[0.1em] transition-colors duration-200 group-hover:bg-accent group-hover:text-white group-hover:decoration-transparent"
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 + i * step }}
            >
              {word}
            </motion.span>
          </span>
          <Stack tiles={stacks[id]} at={0.25 + i * step} />
          {tail}
        </a>{" "}
      </>
    );
  };

  return (
    <section
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden lg:min-h-[max(88svh,640px)]"
    >
      <DotField />
      <div className="shell relative flex flex-1 flex-col justify-center pb-12 pt-28 md:pb-16 md:pt-32">
        <h1 className="display text-[clamp(36px,min(5.3vw,9vh),80px)] !leading-[1.1]">
          {say("I'm Jay")}
          <motion.span
            className="relative mx-[0.06em] inline-block h-[0.8em] overflow-hidden rounded-full align-[-0.1em] [box-shadow:0_0_0_0.05em_rgb(var(--accent))]"
            initial={
              reduce
                ? { width: "1.4em" }
                : { width: "1.4em", scale: 0, rotate: -30 }
            }
            animate={{ scale: 1, rotate: -4 }}
            whileHover={{ width: "2.6em", rotate: 0 }}
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
              sizes="260px"
              className="object-cover object-[50%_61%]"
            />
          </motion.span>
          {say(", an economics and statistics student at")}
          <span className="whitespace-nowrap">
            <Stack tiles={[{ src: "/logos/pitt.png" }]} at={0.45} />{" "}
            {say("Pitt.")}
          </span>
          {say("Here is what I've")}
          {go("startups", "started", ",")}
          {say("where I've")}
          {go("experience", "worked", ",")}
          {say("the")}
          {go("research", "research")}
          {say("I've done, and things I've")}
          {go("projects", "made", ".")}
        </h1>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-2.5 md:mt-12"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.25 }}
        >
          <a
            href={person.resume}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Resume <Arrow />
          </a>
          <a href={`mailto:${person.email}`} className="btn-ghost">
            {person.email}
          </a>
          {person.links.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              {l.label} <Arrow />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
