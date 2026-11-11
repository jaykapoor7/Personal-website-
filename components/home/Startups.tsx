"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { ventures, type Venture } from "@/content/site";
import { hoverCounts, useShown } from "@/lib/show";
import { Arrow } from "../Arrow";
import { Counter, Reveal } from "../motion";
import { SmartLink } from "../ui";
import { LogoTile, Paper, SectionHead, inertIf } from "./bits";
import { MiniMap } from "./MiniMap";

const year = (v: Venture) => v.period.match(/\d{4}/)?.[0] ?? "";
/** What each venture shows beside its numbers. */
function Visual({ v }: { v: Venture }) {
  const name = { viewTransitionName: `shot-${v.id}` };
  if (v.id === "straypaw")
    return (
      <MiniMap className="mx-auto h-full max-h-[420px] w-auto max-w-full" />
    );
  if (v.shot)
    return (
      <div className="relative w-full pb-[14%] pr-[8%]">
        <div
          className="deep-shadow relative aspect-[16/10] overflow-hidden rounded-xl"
          style={name}
        >
          <Image
            src={v.shot.src}
            alt={`${v.name} home page`}
            fill
            sizes="(max-width: 1024px) 80vw, 420px"
            className="object-cover object-top"
          />
        </div>
        {v.proof[0]?.cover && (
          <Paper
            src={v.proof[0].cover}
            alt={`First page of ${v.proof[0].label}`}
            ratio="aspect-[900/1165]"
            className="!absolute bottom-0 right-0 w-[34%] rotate-6"
          />
        )}
      </div>
    );
  const doc = v.proof.find((p) => p.cover);
  return doc ? (
    <div className="mx-auto w-[min(62%,250px)] -rotate-3" style={name}>
      <Paper src={doc.cover!} alt={`First page of ${doc.label}`} />
    </div>
  ) : null;
}

function Body({ v }: { v: Venture }) {
  return (
    <div className="grid h-full gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
      <div className="flex h-full flex-col justify-between gap-6">
        <p className="flex items-center gap-3 text-[15px] font-medium text-white/85">
          <LogoTile
            src={v.logo}
            name={v.name}
            className="h-10 w-10 rounded-xl !bg-white text-[15px] !text-[rgb(var(--fg))]"
          />
          {v.role}, {v.period}
        </p>
        <div>
          <h3 className="display text-[clamp(40px,4.6vw,68px)]">{v.name}</h3>
          <p className="mt-3 max-w-[34ch] text-[17px] leading-snug text-white/85">
            {v.summary}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
            {v.metrics.map((m) => (
              <div key={m.label}>
                <dd className="display text-[clamp(34px,3.4vw,50px)]">
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-1 text-[14px] font-medium text-white/85">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href={`/work/${v.id}`} className="btn-light" data-cursor="Open">
            Case study <Arrow direction="right" />
          </Link>
          {v.site && (
            <SmartLink href={v.site.href} className="btn-glass">
              {v.site.label} <Arrow />
            </SmartLink>
          )}
        </div>
      </div>
      <div className="flex h-full min-h-0 items-center justify-center">
        <Visual v={v} />
      </div>
    </div>
  );
}

/** Four ventures side by side. The one you point at opens; the rest fold to a spine. */
function Deck() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(ventures[0].id);
  const [wide, setWide] = useState(780);
  useShown(
    useCallback((id) => {
      if (ventures.some((v) => v.id === id)) setOpen(id);
    }, []),
  );
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gap = 12;
    const n = ventures.length;
    const measure = () =>
      setWide(((el.clientWidth - gap * (n - 1)) * 6) / (6 + n - 1));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="hidden h-[min(520px,calc(100svh-190px))] min-h-[440px] gap-3 lg:flex"
    >
      {ventures.map((v) => {
        const on = open === v.id;
        return (
          <article
            key={v.id}
            aria-label={v.name}
            onMouseEnter={() => hoverCounts() && setOpen(v.id)}
            className={`relative min-w-0 overflow-hidden rounded-[32px] transition-[flex-grow,background-color,color] duration-700 ease-out ${
              on ? "flex-[6] bg-accent text-white" : "flex-[1] bg-card text-fg"
            }`}
          >
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(v.id)}
              onFocus={() => setOpen(v.id)}
              className={`absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 ${
                on ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
              }`}
              tabIndex={on ? -1 : 0}
            >
              <LogoTile
                src={v.logo}
                name={v.name}
                className="h-11 w-11 rounded-xl text-[16px]"
              />
              <span className="display rotate-180 whitespace-nowrap text-[32px] [writing-mode:vertical-rl]">
                {v.name}
              </span>
              <span className="text-[14px] font-medium text-muted">
                {year(v)}
              </span>
            </button>
            <div
              className={`absolute inset-y-0 left-0 transition-opacity duration-500 ${
                on ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
              }`}
              style={{ width: wide }}
              {...inertIf(!on)}
            >
              {/* Remounting replays the map and the counters each time a panel opens. */}
              <Body key={on ? "on" : "off"} v={v} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** The same four on a phone: a stack that opens one at a time. */
function Fold() {
  const [open, setOpen] = useState<string | null>(ventures[0].id);
  useShown(
    useCallback((id) => {
      if (ventures.some((v) => v.id === id)) setOpen(id);
    }, []),
  );
  return (
    <ul className="space-y-2.5 lg:hidden">
      {ventures.map((v) => {
        const on = open === v.id;
        return (
          <li
            key={v.id}
            className={`overflow-hidden rounded-[26px] transition-colors duration-500 ${
              on ? "bg-accent text-white" : "bg-card text-fg"
            }`}
          >
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : v.id)}
              className="flex w-full items-center gap-3.5 px-5 py-4 text-left"
            >
              <LogoTile
                src={v.logo}
                name={v.name}
                className={`h-10 w-10 rounded-xl text-[15px] ${on ? "!bg-white !text-[rgb(var(--fg))]" : ""}`}
              />
              <span className="display flex-1 text-[27px]">{v.name}</span>
              <span
                className={`text-[14px] font-medium ${on ? "text-white/85" : "text-muted"}`}
              >
                {year(v)}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              {...inertIf(!on)}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-5 pb-6">
                  <p className="text-[14px] font-medium text-white/85">
                    {v.role}, {v.period}
                  </p>
                  <p className="mt-2 text-[16px] leading-snug text-white/85">
                    {v.summary}
                  </p>
                  <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                    {v.metrics.map((m) => (
                      <div key={m.label}>
                        <dd className="display text-[32px]">{m.value}</dd>
                        <dt className="mt-0.5 text-[13px] font-medium text-white/85">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex h-[210px] items-center justify-center">
                    {on && <Visual v={v} />}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <Link href={`/work/${v.id}`} className="btn-light">
                      Case study <Arrow direction="right" />
                    </Link>
                    {v.site && (
                      <SmartLink href={v.site.href} className="btn-glass">
                        {v.site.label} <Arrow />
                      </SmartLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Startups() {
  return (
    <section
      id="startups"
      data-tone="light"
      aria-labelledby="startups-h"
      className="shell scroll-mt-20"
    >
      <SectionHead id="startups-h" title="Startups" note="2019 to now" />
      <Reveal className="mt-7 md:mt-9">
        <Deck />
        <Fold />
      </Reveal>
    </section>
  );
}
