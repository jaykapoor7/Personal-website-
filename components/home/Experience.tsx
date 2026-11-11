"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useCallback, useState } from "react";
import { hasPage } from "@/content/archive";
import { roles, type Role } from "@/content/site";
import { hoverCounts, useShown } from "@/lib/show";
import { Arrow } from "../Arrow";
import { Stagger, StaggerItem } from "../motion";
import { SmartLink } from "../ui";
import { LogoTile, Paper, SectionHead, inertIf } from "./bits";

/** The front of a card: who, when, and the thing I made there. */
function Front({ r }: { r: Role }) {
  const docs = r.proof.filter((p) => p.cover).slice(0, 2);
  return (
    <span className="flex h-full flex-col p-5 text-left">
      <span className="flex items-center justify-between gap-3">
        <LogoTile
          src={r.logo}
          name={r.org}
          className="h-11 w-11 rounded-xl text-[16px]"
        />
        <span className="text-[14px] font-medium text-muted">{r.period}</span>
      </span>
      <span className="relative my-4 block min-h-0 flex-1">
        {r.photos
          ? r.photos.map((p, i) => (
              <span
                key={p.src}
                className={`deep-shadow absolute top-1/2 block aspect-[4/5] h-[92%] -translate-y-1/2 overflow-hidden rounded-xl ${
                  i ? "right-[6%] rotate-6" : "left-[6%] -rotate-6"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="180px"
                  className="object-cover object-top"
                />
              </span>
            ))
          : docs.map((d, i) => (
              <span
                key={d.href}
                className={`absolute top-1/2 block h-[96%] -translate-y-1/2 ${
                  docs.length === 1
                    ? "left-1/2 -translate-x-1/2 -rotate-3"
                    : i
                      ? "right-[8%] rotate-6"
                      : "left-[8%] -rotate-6"
                }`}
              >
                <Paper
                  src={d.cover!}
                  alt={`First page of ${d.label}`}
                  className="h-full w-auto"
                />
              </span>
            ))}
      </span>
      <span className="flex items-end justify-between gap-3">
        <span>
          <span className="display block text-[clamp(28px,2.5vw,36px)]">
            {r.org}
          </span>
          <span className="mt-1.5 block text-[15px] leading-snug text-muted">
            {r.role}
          </span>
        </span>
        {/* A small cue that the card turns over. */}
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card transition-colors group-hover:bg-accent group-hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5" />
          </svg>
        </span>
      </span>
    </span>
  );
}

/** The back: what I did, and where to read more. */
function Back({ r, close }: { r: Role; close: () => void }) {
  const chip =
    "inline-flex h-9 items-center gap-1.5 rounded-full bg-card px-3.5 text-[13.5px] font-semibold transition-colors hover:bg-fg hover:text-white";
  return (
    // A tap anywhere that is not a link turns the card back over.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="flex h-full flex-col p-5" onClick={close}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] font-medium leading-snug text-muted">
          <span className="block text-[18px] font-semibold text-fg">
            {r.org}
          </span>
          {r.place}
          {r.context ? `. ${r.context}` : ""}
        </p>
        <button
          type="button"
          aria-label={`Turn the ${r.org} card back over`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-[18px] leading-none transition-colors hover:bg-fg hover:text-white"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <ul className="mt-4 flex-1 space-y-2.5 text-[14.5px] leading-snug">
        {r.points.slice(0, 2).map((p) => (
          <li key={p} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            {p}
          </li>
        ))}
      </ul>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="flex flex-wrap gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {hasPage(r) && (
          <Link
            href={`/work/${r.id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-3.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent"
          >
            Case study <Arrow direction="right" />
          </Link>
        )}
        {r.proof.map((p) => (
          <SmartLink key={p.href} href={p.href} className={chip}>
            {p.label} <Arrow />
          </SmartLink>
        ))}
        {r.site && (
          <SmartLink href={r.site.href} className={chip}>
            {r.site.label} <Arrow />
          </SmartLink>
        )}
      </div>
    </div>
  );
}

/** A card that turns over: point at it with a mouse, or tap it. */
function Flip({ r }: { r: Role }) {
  const [hover, setHover] = useState(false);
  const [pin, setPin] = useState(false);
  const on = hover || pin;
  useShown(useCallback((id) => setPin(id === r.id), [r.id]));
  const face =
    "absolute inset-0 overflow-hidden rounded-[28px] bg-white text-fg [backface-visibility:hidden]";
  return (
    <div
      className="h-[430px] [perspective:1600px]"
      onMouseEnter={() => hoverCounts() && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
          on ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <button
          type="button"
          aria-expanded={on}
          aria-label={`${r.org}, ${r.role}, ${r.period}`}
          onClick={() => setPin((v) => !v)}
          className={`${face} group block w-full`}
        >
          <Front r={r} />
        </button>
        <div
          className={`${face} [transform:rotateY(180deg)]`}
          {...inertIf(!on)}
        >
          <Back
            r={r}
            close={() => {
              setPin(false);
              setHover(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Four jobs as cards on a blue band. Each one turns over to show what I did there. */
export function Experience() {
  return (
    <section
      id="experience"
      data-tone="accent"
      aria-labelledby="experience-h"
      className="mx-2 scroll-mt-3 rounded-[32px] bg-accent py-14 text-white md:mx-4 md:rounded-[44px] md:py-20"
    >
      <div className="shell">
        <SectionHead
          id="experience-h"
          title="Experience"
          note="2025 to 2026"
          onBlue
        />
      </div>
      <Stagger
        as="ul"
        gap={0.07}
        className="no-bar mt-7 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 sm:scroll-px-8 sm:px-8 md:mt-9 lg:mx-auto lg:grid lg:max-w-shell lg:grid-cols-4 lg:overflow-visible lg:px-10"
      >
        {roles.map((r) => (
          <StaggerItem
            as="li"
            key={r.id}
            className="w-[78vw] max-w-[320px] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <Flip r={r} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
