"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { labSlug } from "@/content/archive";
import { ledgerStats } from "@/content/ledger";
import { labs, otherResearch, researchModels, writing } from "@/content/site";
import { Arrow } from "../Arrow";
import { Counter, Reveal, Stagger, StaggerItem } from "../motion";
import { SmartLink } from "../ui";
import { SectionHead } from "./bits";
import { ListPreview, type Row } from "./ListPreview";

const rows: Row[] = labs.map((l) => ({
  slug: labSlug[l.id],
  title: l.name,
  role: l.lead ? `${l.role}, with ${l.lead}` : l.role,
  period: /present/.test(l.period)
    ? "Now"
    : /\d/.test(l.period)
      ? l.period
      : "",
  logo: l.logo,
  facts: l.points ?? [l.summary],
  shot: l.shot?.src,
}));

const tilt = [-5, 4, -3, 5, -4, 3];

/** Six documents fanned in one card. Each opens its PDF. */
function Papers() {
  const [hover, setHover] = useState<number | null>(null);
  const w = hover === null ? null : writing[hover];
  return (
    <div className="flex h-full flex-col justify-between gap-5 rounded-[28px] p-6 ring-2 ring-inset ring-accent">
      <ul className="relative h-[136px]" onMouseLeave={() => setHover(null)}>
        {writing.map((d, i) => (
          <li
            key={d.href}
            className="absolute top-0 w-[92px] transition-transform duration-300 ease-out hover:z-20 hover:-translate-y-2.5 hover:!rotate-0 hover:scale-110"
            style={{
              left: `calc((100% - 92px) * ${i / (writing.length - 1)})`,
              rotate: `${tilt[i]}deg`,
              zIndex: i,
            }}
          >
            <SmartLink
              href={d.href}
              aria-label={`${d.title}, ${d.kind}, PDF`}
              className="block"
            >
              <span
                className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white"
                data-cursor="PDF"
                onMouseEnter={() => setHover(i)}
              >
                <Image
                  src={d.cover}
                  alt=""
                  fill
                  sizes="110px"
                  className="object-cover object-top"
                />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
      <p
        className="min-h-[3.1em] text-[15px] leading-snug text-muted"
        aria-live="polite"
      >
        <span className="block text-[19px] font-semibold leading-tight text-fg">
          {w ? w.title.split(":")[0] : "Papers and memos"}
        </span>
        {w ? `${w.kind}, ${w.year}` : "One published paper and five memos"}
      </p>
    </div>
  );
}

function Tiles() {
  return (
    <Stagger className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StaggerItem className="col-span-2 sm:col-span-1">
        <Link
          href="/ledger"
          data-cursor="Open"
          className="group flex h-full min-h-[190px] flex-col justify-between gap-5 rounded-[28px] bg-accent p-6 text-white sm:min-h-[236px]"
        >
          <span className="flex items-start justify-between text-[19px] font-semibold leading-tight">
            Forecast ledger
            <Arrow className="text-[20px] transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span>
            <span className="flex gap-6">
              {[
                [String(ledgerStats.calls), "dated calls"],
                [
                  `${ledgerStats.hits}/${ledgerStats.resolved}`,
                  "resolved right",
                ],
                [ledgerStats.brier, "Brier score"],
              ].map(([v, l]) => (
                <span key={l}>
                  <span className="display block text-[clamp(30px,2.9vw,42px)]">
                    <Counter value={v} />
                  </span>
                  <span className="mt-1 block text-[13px] font-medium text-white/85">
                    {l}
                  </span>
                </span>
              ))}
            </span>
          </span>
        </Link>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/market-map"
          data-cursor="Open"
          className="group relative flex h-full min-h-[236px] flex-col justify-end overflow-hidden rounded-[28px] bg-card p-5 sm:p-6"
        >
          <span
            aria-hidden="true"
            className="paper-shadow absolute -top-8 right-4 block aspect-[900/1165] w-[104px] rotate-6 sm:right-5 sm:w-[132px] overflow-hidden bg-white transition-transform duration-500 ease-out group-hover:translate-y-4 group-hover:rotate-0"
          >
            <Image
              src="/covers/India-HealthTech-Market-Map.webp"
              alt=""
              fill
              sizes="140px"
              className="object-cover object-top"
            />
          </span>
          <span className="relative block text-[19px] font-semibold leading-tight sm:max-w-[62%]">
            India HealthTech Market Map
          </span>
          <span className="relative mt-1.5 block text-[15px] leading-snug text-muted">
            36 companies, nine sectors
          </span>
        </Link>
      </StaggerItem>

      <StaggerItem>
        <a
          href={researchModels.workPath}
          data-cursor="Open"
          className="group flex h-full min-h-[236px] flex-col overflow-hidden rounded-[28px] bg-card"
        >
          <span className="relative block min-h-[120px] flex-1 overflow-hidden">
            <Image
              src="/research-models/social.png"
              alt=""
              fill
              sizes="320px"
              className="object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </span>
          <span className="block p-5 pt-4 sm:p-6 sm:pt-4">
            <span className="block text-[19px] font-semibold leading-tight">
              {researchModels.name}
            </span>
            <span className="mt-1.5 block text-[15px] leading-snug text-muted">
              Five interactive experiments
            </span>
          </span>
        </a>
      </StaggerItem>

      <StaggerItem className="col-span-2 sm:col-span-1">
        <Papers />
      </StaggerItem>
    </Stagger>
  );
}

export function Research() {
  return (
    <section
      id="research"
      data-tone="light"
      aria-labelledby="research-h"
      className="shell scroll-mt-20"
    >
      <SectionHead
        id="research-h"
        title="Research"
        note="Pitt, UPMC and my own"
      />
      <Reveal className="mt-7 md:mt-9">
        <ListPreview id="research" rows={rows} />
        <p className="mt-4 px-1 text-[15px] leading-snug text-muted">
          Also {otherResearch[0].name.replace(/^E/, "e")}, on{" "}
          {otherResearch[0].detail}
        </p>
      </Reveal>
      <Tiles />
    </section>
  );
}
