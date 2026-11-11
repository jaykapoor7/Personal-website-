"use client";
import { motion, useInView, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { builds, type Build } from "@/content/site";
import { Arrow } from "../Arrow";
import {
  Reveal,
  RiseWords,
  useMedia,
  useMotionOK,
  useProgress,
} from "../motion";

const EverythingFalls = dynamic(
  () => import("../EverythingFalls").then((m) => m.EverythingFalls),
  { ssr: false, loading: () => <div className="h-full w-full bg-paper" /> },
);

/** Games first: they are the loudest pictures. */
const order = ["emergency", "strike", "cura", "llm-lab", "road360", "falls"];
const phones: Record<string, string> = {
  emergency: "/previews/emergency-m.webp",
  strike: "/previews/strike-m.webp",
  cura: "/previews/health-os-m.webp",
  "llm-lab": "/previews/search-visibility-m.webp",
  road360: "/previews/road360-m.webp",
};
const desktops: Record<string, string> = {
  road360: "/previews/road360-d.webp",
};
const list = order.map((id) => builds.find((b) => b.id === id)!);
const hrefOf = (b: Build) => (b.falls ? b.href! : `/play/${b.id}`);

/** The physics toy runs right in its card, but only while the card is on screen. */
function Toy() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "200px" });
  return (
    <div
      ref={ref}
      className="h-full [&_.falls-stage]:!h-[calc(100%-52px)] [&_.falls]:h-full [&_.falls]:rounded-none"
    >
      {near && <EverythingFalls compact />}
    </div>
  );
}

function Card({ b, i }: { b: Build; i: number }) {
  const label = b.kind === "Game" ? "Play it" : "Try it";
  const media = b.falls ? (
    <Toy />
  ) : (
    <>
      <Image
        src={desktops[b.id] ?? b.image!}
        alt={`${b.name} home page`}
        fill
        sizes="(max-width: 1024px) 84vw, 720px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {phones[b.id] && (
        <span className="deep-shadow absolute bottom-[-14%] right-[5%] block aspect-[390/800] w-[19%] overflow-hidden rounded-[14px] ring-4 ring-white transition-transform duration-700 ease-out group-hover:-translate-y-[10%] md:rounded-[22px] md:ring-[5px]">
          <Image
            src={phones[b.id]}
            alt={`${b.name} on a phone`}
            fill
            sizes="160px"
            className="object-cover object-top"
          />
        </span>
      )}
      <span className="absolute left-4 top-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-semibold text-[rgb(var(--fg))] transition-colors duration-300 group-hover:bg-accent2">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 fill-current"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {label}
      </span>
    </>
  );
  const text = (
    <span className="mt-5 flex items-start justify-between gap-6">
      <span>
        <span className="block text-[14px] font-medium text-white/85">
          {String(i + 1).padStart(2, "0")} /{" "}
          {String(list.length).padStart(2, "0")}
          {"  "}
          {b.kind}
        </span>
        <span className="display mt-2 block text-[clamp(30px,3.3vw,50px)]">
          {b.name}
        </span>
        <span className="mt-2.5 block max-w-[42ch] text-[16px] leading-snug text-white/85">
          {b.summary}
        </span>
      </span>
      <Arrow
        direction="right"
        className="mt-8 shrink-0 text-[26px] transition-transform duration-500 group-hover:translate-x-1.5"
      />
    </span>
  );
  const frame =
    "relative block aspect-[16/10] overflow-hidden rounded-2xl bg-white/10 md:rounded-3xl";
  return (
    <li className="w-[84vw] max-w-[720px] shrink-0 snap-start lg:w-[min(46vw,calc((100svh-430px)*1.6))]">
      {b.falls ? (
        <>
          <div className={frame}>{media}</div>
          <Link href={hrefOf(b)} className="group block">
            {text}
          </Link>
        </>
      ) : (
        <Link href={hrefOf(b)} className="group block">
          <span className={frame}>{media}</span>
          {text}
        </Link>
      )}
    </li>
  );
}

/** Tools and games. On a wide screen the page scrolls them past sideways. */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const ok = useMotionOK();
  const wide = useMedia("(min-width: 1024px) and (min-height: 640px)");
  const pinned = ok && wide;
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const el = track.current;
      if (el) setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const p = useProgress(ref, ["start start", "end end"]);
  const x = useTransform(p, [0, 1], [0, -travel]);

  return (
    <section
      id="projects"
      data-tone="dark"
      aria-labelledby="projects-h"
      className="bg-stars mx-2 mt-6 scroll-mt-4 rounded-[28px] bg-accent text-white md:mx-4 md:rounded-[44px]"
    >
      <div
        ref={ref}
        style={
          pinned ? { height: `calc(100svh + ${travel * 0.9}px)` } : undefined
        }
      >
        <div
          className={
            pinned
              ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16"
              : "py-20 md:py-28"
          }
        >
          <div className="shell flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
            <h2
              id="projects-h"
              className="display text-[clamp(52px,min(8.6vw,15vh),138px)]"
            >
              <RiseWords onView text="Built for fun." />
            </h2>
            <Reveal>
              <p className="max-w-[30ch] pb-2 text-[clamp(18px,1.6vw,23px)] font-medium leading-[1.3] text-white/85">
                Three games and three tools. Every one runs in your browser.
              </p>
            </Reveal>
          </div>

          <motion.ul
            ref={track}
            style={pinned ? { x } : undefined}
            className={
              pinned
                ? "mt-10 flex w-max gap-8 px-10 will-change-transform xl:px-[max(40px,calc((100vw-1320px)/2+40px))]"
                : "no-bar mt-10 flex snap-x scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 sm:scroll-px-8 sm:px-8"
            }
          >
            {list.map((b, i) => (
              <Card key={b.id} b={b} i={i} />
            ))}
          </motion.ul>

          {pinned && (
            <div className="shell mt-8" aria-hidden="true">
              <div className="h-[3px] overflow-hidden rounded-full bg-white/25">
                <motion.div
                  className="h-full origin-left bg-white"
                  style={{ scaleX: p }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
