"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useCallback, useState } from "react";
import { ledgerStats } from "@/content/ledger";
import { labs, otherResearch, researchModels, writing } from "@/content/site";
import { useShown } from "@/lib/show";
import { Arrow } from "../Arrow";
import { Counter, Reveal, Stagger, StaggerItem } from "../motion";
import { SmartLink } from "../ui";
import { LogoTile, SectionHead, inertIf } from "./bits";

/** The labs as a short index. A row opens in place to say what the work was. */
function Labs() {
  const [open, setOpen] = useState<string | null>(labs[0].id);
  useShown(
    useCallback((id) => {
      if (labs.some((l) => l.id === id)) setOpen(id);
    }, []),
  );
  return (
    <ul className="border-t border-line">
      {labs.map((l) => {
        const on = open === l.id;
        const when = /present/.test(l.period)
          ? "Now"
          : /\d/.test(l.period)
            ? l.period
            : "";
        return (
          <li key={l.id} className="border-b border-line">
            <button
              type="button"
              aria-expanded={on}
              aria-controls={`lab-${l.id}`}
              onClick={() => setOpen(on ? null : l.id)}
              className="group flex w-full items-center gap-3.5 py-3 text-left"
            >
              <LogoTile
                src={l.logo}
                name={l.name}
                className="h-10 w-10 rounded-xl text-[15px]"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-semibold leading-tight transition-colors group-hover:text-accent">
                  {l.name}
                </span>
                <span className="mt-0.5 block text-[14.5px] leading-snug text-muted">
                  {l.role}
                  {l.lead ? `, with ${l.lead}` : ""}
                </span>
              </span>
              <span className="hidden shrink-0 text-[14px] font-medium tabular-nums text-muted sm:block">
                {when}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[18px] leading-none transition-all duration-300 ${
                  on ? "rotate-45 bg-accent text-white" : "bg-card"
                }`}
              >
                +
              </span>
            </button>
            <div
              id={`lab-${l.id}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              {...inertIf(!on)}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-4 pl-[54px] pr-2">
                  {(l.points ?? [l.summary]).map((p) => (
                    <p key={p} className="text-[15px] leading-snug">
                      {p}
                    </p>
                  ))}
                  <SmartLink
                    href={l.site.href}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[14px] font-semibold underline decoration-line decoration-2 underline-offset-[5px] hover:decoration-accent"
                  >
                    {l.site.label} <Arrow />
                  </SmartLink>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** The papers that are not already shown elsewhere on the page. */
const memos = writing.filter(
  (w) => !/juno-ai|Memo-Library|Market-Map/.test(w.href),
);
const tilt = [-6, 0, 6];

/** Three documents fanned in one tile. Each opens its PDF. */
function Memos() {
  const [hover, setHover] = useState<number | null>(null);
  const w = hover === null ? null : memos[hover];
  return (
    <div className="flex h-full min-h-[212px] flex-col justify-between gap-4 rounded-[28px] p-5 ring-2 ring-inset ring-accent sm:p-6">
      <ul className="flex justify-center" onMouseLeave={() => setHover(null)}>
        {memos.map((d, i) => (
          <li
            key={d.href}
            className={`w-[86px] transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:!rotate-0 hover:scale-110 ${
              i ? "-ml-3" : ""
            }`}
            style={{ rotate: `${tilt[i]}deg` }}
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
      <p className="text-[15px] leading-snug text-muted" aria-live="polite">
        <span className="block text-[19px] font-semibold leading-tight text-fg">
          {w ? w.title.split(":")[0] : "Memos and theses"}
        </span>
        {w ? `${w.kind}, ${w.year}` : "Healthcare and fintech in India"}
      </p>
    </div>
  );
}

/** My own research as four tiles, each a different shape of work. */
function Tiles() {
  return (
    <Stagger className="grid grid-cols-2 gap-3">
      <StaggerItem className="col-span-2 sm:col-span-1">
        <Link
          href="/ledger"
          data-cursor="Open"
          className="group flex h-full min-h-[212px] flex-col justify-between gap-5 rounded-[28px] bg-accent p-5 text-white sm:p-6"
        >
          <span className="flex items-start justify-between text-[19px] font-semibold leading-tight">
            Forecast ledger
            <Arrow className="text-[20px] transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span className="flex gap-6">
            {[
              [String(ledgerStats.calls), "dated calls"],
              [`${ledgerStats.hits}/${ledgerStats.resolved}`, "resolved right"],
              [ledgerStats.brier, "Brier score"],
            ].map(([v, l]) => (
              <span key={l}>
                <span className="display block text-[clamp(32px,3.2vw,46px)]">
                  <Counter value={v} />
                </span>
                <span className="mt-1 block text-[13px] font-medium text-white/85">
                  {l}
                </span>
              </span>
            ))}
          </span>
        </Link>
      </StaggerItem>

      <StaggerItem>
        <a
          href={researchModels.workPath}
          data-cursor="Open"
          className="group flex h-full min-h-[212px] flex-col overflow-hidden rounded-[28px] bg-card"
        >
          <span className="relative block min-h-[110px] flex-1 overflow-hidden">
            <Image
              src="/research-models/social.png"
              alt=""
              fill
              sizes="320px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </span>
          <span className="block p-5 pt-4">
            <span className="block text-[19px] font-semibold leading-tight">
              Research Models
            </span>
            <span className="mt-1 block text-[15px] leading-snug text-muted">
              Five interactive experiments
            </span>
          </span>
        </a>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/market-map"
          data-cursor="Open"
          className="group relative flex h-full min-h-[212px] flex-col justify-end overflow-hidden rounded-[28px] bg-card p-5"
        >
          <span
            aria-hidden="true"
            className="paper-shadow absolute -top-8 right-4 block aspect-[900/1165] w-[104px] rotate-6 overflow-hidden bg-white transition-transform duration-500 ease-out group-hover:translate-y-4 group-hover:rotate-0 sm:w-[124px]"
          >
            <Image
              src="/covers/India-HealthTech-Market-Map.webp"
              alt=""
              fill
              sizes="130px"
              className="object-cover object-top"
            />
          </span>
          <span className="relative block text-[19px] font-semibold leading-tight sm:max-w-[60%]">
            HealthTech Market Map
          </span>
          <span className="relative mt-1 block text-[15px] leading-snug text-muted">
            36 companies, nine sectors
          </span>
        </Link>
      </StaggerItem>

      <StaggerItem className="col-span-2 sm:col-span-1">
        <Memos />
      </StaggerItem>
    </Stagger>
  );
}

/** Labs on the left as an index; my own research on the right as tiles. */
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
      <div className="mt-7 grid gap-10 md:mt-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <Reveal>
          <Labs />
          <p className="mt-4 text-[15px] leading-snug text-muted">
            Also {otherResearch[0].name.replace(/^E/, "e")}, on{" "}
            {otherResearch[0].detail}
          </p>
        </Reveal>
        <Tiles />
      </div>
    </section>
  );
}
