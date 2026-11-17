"use client";
import Image from "next/image";
import { useState } from "react";
import { life } from "@/content/site";
import { Duo } from "./bits";

/** Where the subject sits in each photo, so a narrow slice still shows them. */
const focus: Record<string, string> = {
  "02_childhood_running": "object-[55%_45%]",
  "04_childhood_football_team": "object-[50%_50%]",
  "01_trojans_team": "object-[50%_42%]",
  "07_school_ceremony": "object-[26%_50%]",
  pitt_portrait: "object-[50%_62%]",
};

const duo = (name: string) => `/photos/duo/${name}.webp`;
const own = (p: (typeof life)[number]) => ({
  src: `/photos/${p.name}-1280.webp`,
  duo: duo(p.name),
  alt: p.alt,
  caption: p.caption,
  fit: focus[p.name],
});

/** Every photo on the site, oldest first. */
const photos = [
  ...life.slice(0, 4).map(own),
  {
    src: "/work/crowwd/arthavaad-stage-1280.webp",
    duo: duo("arthavaad-stage"),
    alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, in New Delhi",
    caption: "Arthavaad, New Delhi",
    fit: "object-[50%_44%]",
  },
  {
    src: "/work/crowwd/arthavaad-audience-800.webp",
    duo: duo("arthavaad-audience"),
    alt: "Jay in the audience at an Arthavaad talk",
    caption: "In the audience",
    fit: "object-[20%_45%]",
  },
  {
    src: "/straypaw/street-dog.webp",
    duo: duo("street-dog"),
    alt: "The street dog outside a cafe that started StrayPaw",
    caption: "The dog that started StrayPaw",
    fit: "object-[45%_12%]",
  },
  ...life.slice(4).map(own),
];

/**
 * The photos as slats. Folded, each is a blue slice; the one you point at
 * opens to the whole picture in colour.
 */
function Slats() {
  const [open, setOpen] = useState(photos.length - 1);
  return (
    <ul
      aria-label="Photos"
      className="hidden h-[min(440px,calc(100svh-220px))] min-h-[360px] flex-row gap-2 lg:flex"
    >
      {photos.map((p, i) => {
        const on = open === i;
        return (
          <li
            key={p.src}
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-[24px] transition-[flex-grow] duration-700 ease-out ${
              on ? "flex-[8]" : "flex-[1]"
            }`}
          >
            <button
              type="button"
              aria-pressed={on}
              aria-label={p.caption}
              onClick={() => setOpen(i)}
              // Real mouse movement only: a slat sliding under a still
              // cursor while you scroll should not open.
              onPointerMove={(e) =>
                e.pointerType === "mouse" && open !== i && setOpen(i)
              }
              onFocus={() => setOpen(i)}
              className="absolute inset-0 block h-full w-full"
            >
              <Duo
                src={p.src}
                duo={p.duo}
                alt={p.alt}
                on={on}
                fit={p.fit}
                sizes="760px"
              />
              <span
                className={`absolute bottom-4 left-4 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[rgb(var(--fg))] transition-all duration-500 ${
                  on
                    ? "translate-y-0 opacity-100 delay-300"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {p.caption}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** On phones: the photos in their own colours, newest first, to swipe through. */
function Strip() {
  return (
    <ul
      tabIndex={0}
      aria-label="Photos"
      className="no-bar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 lg:hidden"
    >
      {[...photos].reverse().map((p, i) => (
        <li
          key={p.src}
          className="relative aspect-[4/5] w-[72vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[18px] bg-accent"
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="72vw"
            priority={i === 0}
            className={`object-cover ${p.fit ?? ""}`}
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[rgb(var(--fg))]">
            {p.caption}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Every photo: slats on a wide screen, a strip to swipe on a phone. */
export function Photos() {
  return (
    <>
      <Slats />
      <Strip />
    </>
  );
}
