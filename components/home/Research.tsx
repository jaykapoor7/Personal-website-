"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { labSlug } from "@/content/archive";
import { ledgerStats } from "@/content/ledger";
import { labs, otherResearch, researchModels, writing } from "@/content/site";
import { Arrow } from "../Arrow";
import {
  Counter,
  Reveal,
  RiseWords,
  Stagger,
  StaggerItem,
  ease,
} from "../motion";
import { SmartLink } from "../ui";

const tilt = [-4, 3, -2, 5, -3, 2];

function Labs() {
  return (
    <Stagger
      as="ul"
      gap={0.05}
      className="mt-12 grid gap-x-10 md:mt-16 lg:grid-cols-2"
    >
      {labs.map((l) => {
        const now = /present/.test(l.period);
        return (
          <StaggerItem as="li" key={l.id}>
            <Link
              href={`/work/${labSlug[l.id]}`}
              className="group -mx-4 flex gap-4 rounded-3xl px-4 py-5 transition-colors duration-300 hover:bg-white"
            >
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white text-[15px] font-semibold text-muted ring-1 ring-line">
                {l.logo ? (
                  <Image
                    src={l.logo}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                ) : (
                  l.name[0]
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[clamp(21px,1.9vw,27px)] font-semibold leading-[1.15] transition-colors group-hover:text-accent">
                  {l.question}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14.5px] font-medium text-muted">
                  {now && <span className="live" aria-hidden="true" />}
                  <span className="text-fg">{l.name}</span>
                  <span>
                    {l.role}
                    {now ? ", now" : /\d/.test(l.period) ? `, ${l.period}` : ""}
                  </span>
                </span>
              </span>
              <Arrow
                direction="right"
                className="mt-2 text-[20px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/** Where my Brier score sits between perfect and a coin flip. */
function Scale() {
  const reduce = useReducedMotion();
  const at = (Number(ledgerStats.brier) / 0.25) * 100;
  return (
    <div className="mt-8" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-white/25">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${at}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
          style={{ width: `${at}%` }}
        />
      </div>
      <div className="mt-2.5 flex justify-between text-[13px] font-medium text-white/85">
        <span>0, perfect</span>
        <span>0.25, a coin flip</span>
      </div>
    </div>
  );
}

function Tiles() {
  return (
    <div className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-[1.25fr_1fr]">
      <Reveal className="lg:row-span-2">
        <Link
          href="/ledger"
          className="group flex h-full flex-col justify-between gap-12 rounded-[28px] bg-accent p-7 text-white sm:p-10 md:rounded-[36px]"
        >
          <div>
            <p className="text-[15px] font-medium text-white/85">
              Forecast ledger
            </p>
            <h3 className="display mt-4 text-[clamp(38px,4.8vw,76px)]">
              I write my predictions down. Then I score them.
            </h3>
          </div>
          <div>
            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {[
                [String(ledgerStats.calls), "dated calls"],
                [
                  `${ledgerStats.hits}/${ledgerStats.resolved}`,
                  "resolved right",
                ],
                [ledgerStats.brier, "Brier score"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="display text-[clamp(46px,5vw,76px)]">
                    <Counter value={v} />
                  </dd>
                  <dt className="mt-1.5 text-[14px] font-medium text-white/85">
                    {l}
                  </dt>
                </div>
              ))}
            </dl>
            <Scale />
            <span className="btn-light mt-9 group-hover:bg-accent2">
              Bet against me <Arrow direction="right" />
            </span>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.08}>
        <a
          href={researchModels.workPath}
          className="group block overflow-hidden rounded-[28px] bg-white text-[rgb(var(--fg))] md:rounded-[36px]"
        >
          <span className="relative block aspect-[1200/560] overflow-hidden">
            <Image
              src="/research-models/social.png"
              alt="StrayPaw Research Models: same 70 percent vaccinated, different outbreaks"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </span>
          <span className="flex items-end justify-between gap-6 p-6 sm:p-8">
            <span>
              <span className="block text-[clamp(22px,2vw,28px)] font-semibold leading-tight">
                {researchModels.name}
              </span>
              <span className="mt-1.5 block text-[15px] leading-snug text-muted">
                Five public-health experiments you can run yourself.
              </span>
            </span>
            <Arrow className="shrink-0 text-[22px] transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.16}>
        <Link
          href="/market-map"
          className="group relative flex min-h-[230px] items-end overflow-hidden rounded-[28px] bg-card p-6 text-[rgb(var(--fg))] sm:p-8 md:rounded-[36px]"
        >
          <span
            aria-hidden="true"
            className="paper-shadow absolute -top-6 right-8 block aspect-[900/1165] w-[150px] rotate-6 overflow-hidden bg-white transition-transform duration-700 ease-out group-hover:translate-y-3 group-hover:rotate-0 sm:w-[190px]"
          >
            <Image
              src="/covers/India-HealthTech-Market-Map.webp"
              alt=""
              fill
              sizes="190px"
              className="object-cover object-top"
            />
          </span>
          <span className="relative max-w-[60%]">
            <span className="block text-[clamp(22px,2vw,28px)] font-semibold leading-tight">
              India HealthTech Market Map
            </span>
            <span className="mt-1.5 block text-[15px] leading-snug text-muted">
              36 companies, nine sectors. Filter it yourself.
            </span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

function Shelf() {
  return (
    <div className="mt-16 md:mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="display text-[clamp(34px,4.4vw,68px)]">On paper</h3>
        <p className="max-w-[40ch] text-[16px] leading-snug text-muted">
          One published paper, then memos and sector theses on Indian healthcare
          and fintech.
        </p>
      </Reveal>
      <Stagger
        as="ul"
        gap={0.06}
        className="no-bar -mx-5 mt-10 flex snap-x scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 pt-4 sm:scroll-px-8 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-8 lg:overflow-visible lg:px-0"
      >
        {writing.map((w, i) => (
          <StaggerItem
            as="li"
            key={w.href}
            className="w-[44vw] max-w-[220px] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <SmartLink href={w.href} className="group block">
              <span
                className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:!rotate-0 group-hover:scale-[1.05]"
                style={{ rotate: `${tilt[i % tilt.length]}deg` }}
              >
                <Image
                  src={w.cover}
                  alt={`First page of ${w.title}`}
                  fill
                  sizes="220px"
                  className="object-cover object-top"
                />
              </span>
              <span className="mt-5 block text-[15px] font-semibold leading-snug group-hover:text-accent">
                {w.title.split(":")[0]}
              </span>
              <span className="mt-0.5 block text-[13.5px] font-medium text-muted">
                {w.kind}, {w.year}
              </span>
            </SmartLink>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Labs, my own memos, and the forecasts I hold myself to. */
export function Research() {
  return (
    <section
      id="research"
      data-tone="light"
      aria-labelledby="research-h"
      className="mx-2 mt-28 scroll-mt-4 rounded-[28px] bg-paper py-20 md:mx-4 md:mt-44 md:rounded-[44px] md:py-32"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2
            id="research-h"
            className="display text-[clamp(60px,10.5vw,170px)]"
          >
            <RiseWords onView text="Research" />
          </h2>
          <Reveal>
            <p className="max-w-[30ch] pb-2 text-[clamp(18px,1.6vw,23px)] font-medium leading-[1.3] text-muted">
              Six labs and clinics, each a question I wanted answered. Then my
              own, on paper.
            </p>
          </Reveal>
        </div>
        <Labs />
        <Reveal>
          <p className="mt-6 text-[16px] leading-snug text-muted">
            Also:{" "}
            <span className="font-semibold text-fg">
              {otherResearch[0].name}
            </span>
            , on {otherResearch[0].detail}
          </p>
        </Reveal>
        <Tiles />
        <Shelf />
      </div>
    </section>
  );
}
