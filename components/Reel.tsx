"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const frames = [
  {
    src: "/photos/02_childhood_running-1280.webp",
    alt: "A childhood sports day race",
    tag: "Early",
    caption: "Sports day",
    w: "w-[78vw] md:w-[46vw]",
    ratio: "aspect-[3/2]",
  },
  {
    src: "/photos/04_childhood_football_team-1280.webp",
    alt: "Jay's first football team, in green, with their coach",
    tag: "School",
    caption: "First team",
    w: "w-[78vw] md:w-[42vw]",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/photos/01_trojans_team-1280.webp",
    alt: "Jay with the Trojans, his school football team",
    tag: "TISB",
    caption: "The Trojans",
    w: "w-[70vw] md:w-[30vw]",
    ratio: "aspect-[1174/1280]",
  },
  {
    src: "/photos/07_school_ceremony-1280.webp",
    alt: "Jay on stage at his school graduation, 2023",
    tag: "2023",
    caption: "Graduation, TISB",
    w: "w-[78vw] md:w-[42vw]",
    ratio: "aspect-[3/2]",
  },
  {
    src: "/work/crowwd/arthavaad-audience-800.webp",
    alt: "Jay in the audience at an Arthavaad talk in New Delhi",
    tag: "2025",
    caption: "Arthavaad, New Delhi",
    w: "w-[56vw] md:w-[22vw]",
    ratio: "aspect-[4/7]",
  },
];

/** A strip of photos that slides sideways as you scroll down. */
export function Reel() {
  const ref = useRef<HTMLDivElement>(null);
  // Server HTML assumes motion; switch after mount so hydration matches.
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefers;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-72%"]);

  const strip = (
    <ul
      tabIndex={reduce ? 0 : undefined}
      aria-label="Photos"
      className={`flex items-end gap-6 md:gap-10 ${reduce ? "no-bar overflow-x-auto px-5 pb-4" : "w-max pl-[6vw] pr-[20vw]"}`}
    >
      {frames.map((f, i) => (
        <li key={f.src} className={`shrink-0 ${f.w}`}>
          <figure>
            <div className={`relative ${f.ratio} overflow-hidden bg-white/5`}>
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 768px) 80vw, 46vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="serif text-[clamp(20px,1.8vw,26px)]">
                {f.caption}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                {String(i + 1).padStart(2, "0")} / {f.tag}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="photos"
      aria-labelledby="photos-h"
      ref={ref}
      className={`scroll-mt-0 bg-fg text-white ${reduce ? "py-24" : "h-[300vh]"}`}
    >
      <div
        className={
          reduce
            ? ""
            : "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"
        }
      >
        <div className="shell mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <h2
            id="photos-h"
            className="text-[clamp(48px,8vw,120px)] font-semibold leading-[0.85] tracking-[-0.06em]"
          >
            Off the clock
          </h2>
          <p className="serif max-w-[24ch] text-[clamp(20px,2vw,28px)] leading-[1.05] text-white/70">
            Bangalore, then Pittsburgh. A lot of football in between.
          </p>
        </div>
        {reduce ? strip : <motion.div style={{ x }}>{strip}</motion.div>}
      </div>
    </section>
  );
}
