"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useState } from "react";
import type { Proof } from "@/content/site";
import { Arrow } from "../Arrow";
import { ease, useMedia } from "../motion";
import { SmartLink } from "../ui";
import { LogoTile, Paper } from "./bits";

export type Row = {
  slug: string;
  title: string;
  role: string;
  period: string;
  logo?: string;
  /** What I did there, in a line or two. */
  facts: string[];
  docs?: Proof[];
  photos?: { src: string; alt: string }[];
  shot?: string;
};

/** What the preview shows for a row: its documents, its photos, or the organisation's site. */
function Visual({ row }: { row: Row }) {
  const name = { viewTransitionName: `shot-${row.slug}` };
  if (row.photos)
    return (
      <div className="flex h-full items-center justify-center gap-3">
        {row.photos.map((p, i) => (
          <span
            key={p.src}
            className={`deep-shadow relative block aspect-[4/5] h-[86%] overflow-hidden rounded-2xl ${
              i ? "translate-y-3 rotate-3" : "-translate-y-3 -rotate-3"
            }`}
            style={i === 0 ? name : undefined}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </span>
        ))}
      </div>
    );
  const docs = row.docs?.filter((d) => d.cover) ?? [];
  if (docs.length)
    return (
      <div className="flex h-full items-center justify-center">
        {docs.map((d, i) => (
          <SmartLink
            key={d.href}
            href={d.href}
            aria-label={`${d.label}, PDF`}
            className={`block h-[92%] transition-transform duration-500 ease-out hover:z-10 hover:-translate-y-2 hover:!rotate-0 ${
              i ? "-ml-10 rotate-6" : "-rotate-3"
            }`}
          >
            <span
              className="block h-full"
              data-cursor="PDF"
              style={i === 0 ? name : undefined}
            >
              <Paper
                src={d.cover!}
                alt={`First page of ${d.label}`}
                className="h-full w-auto"
              />
            </span>
          </SmartLink>
        ))}
      </div>
    );
  if (row.shot)
    return (
      <div className="flex h-full items-center justify-center">
        <span
          className="deep-shadow relative block aspect-[16/10] h-[88%] max-w-full overflow-hidden rounded-xl"
          style={name}
        >
          <Image
            src={row.shot}
            alt={`${row.title} website`}
            fill
            sizes="460px"
            className="object-cover object-top"
          />
        </span>
      </div>
    );
  return (
    <div className="grid h-full place-items-center">
      <LogoTile
        src={row.logo}
        name={row.title}
        className="h-28 w-28 rounded-[32px] text-[52px]"
      />
    </div>
  );
}

/**
 * A list on the left, and on the right whatever the row you point at has to show.
 * On a phone it is just the list; each row opens its page.
 */
export function ListPreview({ id, rows }: { id: string; rows: Row[] }) {
  const [active, setActive] = useState(0);
  const wide = useMedia("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const row = rows[active];
  return (
    <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
      <ul className="flex flex-col gap-1.5">
        {rows.map((r, i) => {
          const on = wide && i === active;
          return (
            <li key={r.slug} className="flex-1">
              <Link
                href={`/work/${r.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="Open"
                className={`group relative flex h-full items-center gap-4 rounded-[22px] px-4 py-3.5 transition-colors duration-300 md:px-5 ${
                  on ? "text-white" : "bg-card text-fg lg:bg-transparent"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId={`row-${id}`}
                    className="absolute inset-0 rounded-[22px] bg-accent"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
                <LogoTile
                  src={r.logo}
                  name={r.title}
                  className="relative h-11 w-11 rounded-xl text-[16px]"
                />
                <span className="relative min-w-0 flex-1">
                  <span className="block text-[clamp(19px,1.75vw,23px)] font-semibold leading-tight">
                    {r.title}
                  </span>
                  <span
                    className={`mt-0.5 block text-[15px] leading-snug transition-colors duration-300 ${
                      on ? "text-white/85" : "text-muted"
                    }`}
                  >
                    {r.role}
                  </span>
                </span>
                <span
                  className={`relative hidden shrink-0 text-[14px] font-medium tabular-nums transition-colors duration-300 sm:block ${
                    on ? "text-white/85" : "text-muted"
                  }`}
                >
                  {r.period}
                </span>
                <Arrow
                  direction="right"
                  className={`relative text-[18px] transition-transform duration-300 ${
                    on ? "translate-x-0.5" : "lg:opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden min-h-[340px] overflow-hidden rounded-[32px] bg-card lg:block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={row.slug}
            className="absolute inset-0 flex flex-col gap-5 p-7"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="min-h-0 flex-1">
              <Visual row={row} />
            </div>
            <ul className="space-y-1.5 text-[15.5px] leading-snug">
              {row.facts.slice(0, 2).map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
