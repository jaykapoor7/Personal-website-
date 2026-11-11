"use client";
import { useState } from "react";
import { education, leadership, life, skills } from "@/content/site";
import { Reveal } from "../motion";
import { SmartLink } from "../ui";
import { Duo, LogoTile, SectionHead } from "./bits";

/** Where the subject sits in each photo, so a narrow slice still shows them. */
const focus: Record<string, string> = {
  "02_childhood_running": "object-[55%_45%]",
  "04_childhood_football_team": "object-[50%_50%]",
  "01_trojans_team": "object-[50%_42%]",
  "07_school_ceremony": "object-[26%_50%]",
  pitt_portrait: "object-[50%_62%]",
};

/** Every photo on the site, oldest first. */
const photos = [
  ...life.slice(0, 4).map((p) => ({
    src: `/photos/${p.name}-1280.webp`,
    alt: p.alt,
    caption: p.caption,
    fit: focus[p.name],
  })),
  {
    src: "/work/crowwd/arthavaad-stage-1280.webp",
    alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, in New Delhi",
    caption: "Arthavaad, New Delhi",
    fit: "object-[50%_44%]",
  },
  {
    src: "/work/crowwd/arthavaad-audience-800.webp",
    alt: "Jay in the audience at an Arthavaad talk",
    caption: "In the audience",
    fit: "object-[20%_45%]",
  },
  {
    src: "/straypaw/street-dog.webp",
    alt: "The street dog outside a cafe that started StrayPaw",
    caption: "The dog that started StrayPaw",
    fit: "object-[45%_12%]",
  },
  ...life.slice(4).map((p) => ({
    src: `/photos/${p.name}-1280.webp`,
    alt: p.alt,
    caption: p.caption,
    fit: focus[p.name],
  })),
];

/**
 * Eight photos as slats. Folded, each is a blue slice; the one you point at
 * opens to the whole picture in colour.
 */
function Slats() {
  const [open, setOpen] = useState(photos.length - 1);
  return (
    <ul className="flex h-[600px] flex-col gap-2 lg:h-[min(440px,calc(100svh-220px))] lg:min-h-[360px] lg:flex-row">
      {photos.map((p, i) => {
        const on = open === i;
        return (
          <li
            key={p.src}
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-[20px] transition-[flex-grow] duration-700 ease-out lg:rounded-[28px] ${
              on ? "flex-[8]" : "flex-[1]"
            }`}
          >
            <button
              type="button"
              aria-pressed={on}
              aria-label={p.caption}
              onClick={() => setOpen(i)}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              className="absolute inset-0 block h-full w-full"
            >
              <Duo
                src={p.src}
                alt={p.alt}
                on={on}
                fit={p.fit}
                sizes="(max-width: 1024px) 92vw, 760px"
              />
              <span
                className={`absolute bottom-3 left-3 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[rgb(var(--fg))] transition-all duration-500 lg:bottom-4 lg:left-4 ${
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

export function About() {
  return (
    <section
      id="about"
      data-tone="light"
      aria-labelledby="about-h"
      className="shell scroll-mt-20"
    >
      <SectionHead
        id="about-h"
        title="About"
        note="Bangalore, Delhi, Pittsburgh"
      />
      <Reveal className="mt-7 md:mt-9">
        <Slats />
      </Reveal>

      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <p className="max-w-[32ch] text-[clamp(19px,1.7vw,23px)] font-medium leading-[1.32]">
            School in Bangalore, summers working in Delhi, now Pittsburgh.
            Outside of work I play football and make small browser games.
          </p>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            {skills.join(", ")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="text-[15px] font-medium text-muted">Education</h3>
          <ul className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {education.map((e) => (
              <li key={e.school} className="flex gap-3.5">
                <LogoTile src={e.logo} name={e.school} />
                <p className="text-[15px] leading-snug text-muted">
                  <span className="block text-[18px] font-semibold leading-tight text-fg">
                    {e.school}
                  </span>
                  <span className="mt-1 block">{e.detail}</span>
                  <span className="block">{e.period}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-10 md:mt-12">
        <h3 className="text-[15px] font-medium text-muted">Leadership</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((l) => (
            <li key={l.title + l.org} className="flex gap-3.5">
              <LogoTile src={l.logo} name={l.org} />
              <p className="text-[15px] leading-snug text-muted">
                <span className="block text-[18px] font-semibold leading-tight text-fg">
                  {l.title}
                </span>
                <span className="mt-1 block font-medium">
                  {l.href ? (
                    <SmartLink
                      href={l.href}
                      className="underline decoration-line underline-offset-4 hover:text-accent"
                    >
                      {l.org}
                    </SmartLink>
                  ) : (
                    l.org
                  )}
                </span>
                <span className="mt-1 block">{l.detail}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
