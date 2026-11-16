"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { life } from "@/content/site";
import { useCalm } from "../motion";

/** Where the subject sits in each photo. */
const focus: Record<string, string> = {
  "02_childhood_running": "object-[55%_45%]",
  "04_childhood_football_team": "object-[50%_50%]",
  "01_trojans_team": "object-[50%_42%]",
  "07_school_ceremony": "object-[26%_50%]",
  pitt_portrait: "object-[50%_62%]",
};

/** Every personal photo, oldest first. */
const photos = [
  ...life.slice(0, 4).map((p) => ({
    src: `/photos/${p.name}-640.webp`,
    alt: p.alt,
    caption: p.caption,
    fit: focus[p.name],
  })),
  {
    src: "/work/crowwd/arthavaad-stage-640.webp",
    alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, in New Delhi",
    caption: "Arthavaad, New Delhi",
    fit: "object-[50%_44%]",
  },
  {
    src: "/straypaw/street-dog.webp",
    alt: "The street dog outside a cafe that started StrayPaw",
    caption: "The dog that started StrayPaw",
    fit: "object-[45%_12%]",
  },
  ...life.slice(4).map((p) => ({
    src: `/photos/${p.name}-640.webp`,
    alt: p.alt,
    caption: p.caption,
    fit: focus[p.name],
  })),
];

const tilt = [-5, 3, -2, 4, -3, 2, -4];

/**
 * The photos as prints on a shelf. Point at one, or tab to it, and it lifts
 * and straightens while its neighbours step aside. On a phone they are a
 * strip to swipe.
 */
export function Photos() {
  const calm = useCalm();
  const [on, setOn] = useState(photos.length - 1);

  return (
    <>
      {/* Wide screens: the shelf */}
      <div className="hidden md:block">
        <ul
          aria-label="Photos"
          className="relative flex h-[196px] items-end lg:h-[240px] justify-center overflow-x-clip border-b border-line pb-3"
        >
          {photos.map((p, i) => {
            const active = i === on;
            return (
              <motion.li
                key={p.src}
                className="relative -mx-[8px] w-[96px] shrink-0 lg:-mx-[10px] lg:w-[120px]"
                style={{ zIndex: active ? 20 : 10 - Math.abs(i - on) }}
                initial={false}
                animate={
                  calm
                    ? {}
                    : {
                        x: i < on ? -18 : i > on ? 18 : 0,
                        y: active ? -16 : 0,
                        rotate: active ? 0 : tilt[i % tilt.length],
                        scale: active ? 1.1 : 1,
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <button
                  type="button"
                  aria-label={p.caption}
                  aria-pressed={active}
                  onPointerMove={(e) =>
                    e.pointerType === "mouse" && !active && setOn(i)
                  }
                  onFocus={() => setOn(i)}
                  onClick={() => setOn(i)}
                  className="block w-full rounded-[6px] bg-white p-[5px] pb-[18px] shadow-[0_0_0_1px_rgb(var(--fg)/0.08),0_10px_24px_-14px_rgb(var(--fg)/0.45)]"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-card">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="120px"
                      className={`object-cover ${p.fit ?? ""}`}
                    />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
        <p className="mt-3 text-center text-[13px] text-muted" aria-live="polite">
          {photos[on].caption}
        </p>
      </div>

      {/* Phones: a strip */}
      <ul
        tabIndex={0}
        aria-label="Photos"
        className="no-bar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:hidden"
      >
        {[...photos].reverse().map((p) => (
          <li key={p.src} className="w-[58vw] max-w-[240px] shrink-0 snap-start">
            <figure>
              <span className="relative block aspect-[4/5] overflow-hidden rounded-md bg-card ring-1 ring-fg/[0.08]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="58vw"
                  className={`object-cover ${p.fit ?? ""}`}
                />
              </span>
              <figcaption className="mt-2 text-[12.5px] text-muted">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
