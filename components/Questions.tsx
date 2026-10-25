"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { labSlug } from "@/content/archive";
import { labs, roles, type Link as L, type Proof } from "@/content/site";
import { Arrow } from "./Arrow";
import { SmartLink } from "./ui";

type Q = {
  slug: string;
  question: string;
  org: string;
  where: string;
  role: string;
  period: string;
  logo?: string;
  points: string[];
  site?: L;
  proof: Proof[];
  shot?: string;
  photos?: { src: string; alt: string; caption: string }[];
};

const year = (p: string) => Number(p.match(/\d{4}/g)?.slice(-1)[0] ?? 0);

const qs: Q[] = [
  ...roles.map((r) => ({
    slug: r.id,
    question: r.question,
    org: r.org,
    where: "Job",
    role: r.role,
    period: r.period,
    logo: r.logo,
    points: r.points,
    site: r.site,
    proof: r.proof,
    photos: r.photos,
  })),
  ...labs.map((l) => ({
    slug: labSlug[l.id],
    question: l.question,
    org: l.name,
    where: "Lab",
    role: l.lead ? `${l.role}, with ${l.lead}` : l.role,
    period: l.period,
    logo: l.logo,
    points: [l.summary],
    site: l.site,
    proof: [],
    shot: l.shot.src,
  })),
].sort(
  (a, b) =>
    year(b.period) - year(a.period) ||
    (/present/.test(b.period) ? 1 : 0) - (/present/.test(a.period) ? 1 : 0),
);

function Answer({ q }: { q: Q }) {
  return (
    <div className="grid gap-8 pb-10 pt-2 md:grid-cols-[1fr_auto] md:pl-[72px]">
      <div>
        <p className="text-[13px] font-medium text-muted">
          {q.role}, {q.period}
        </p>
        <ul className="mt-4 max-w-[60ch] space-y-3 text-[18px] leading-snug">
          {q.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/work/${q.slug}`}
            className="btn-primary h-10 text-[14px]"
          >
            Full story <Arrow direction="right" />
          </Link>
          {q.site && (
            <SmartLink
              href={q.site.href}
              className="btn-ghost h-10 text-[14px]"
            >
              {q.site.label} <Arrow />
            </SmartLink>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {q.proof.map((p, i) => (
          <SmartLink
            key={p.href}
            href={p.href}
            className="group w-[110px] md:w-[130px]"
          >
            <span
              className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:!rotate-0"
              style={{ rotate: `${i % 2 ? 3 : -3}deg` }}
            >
              {p.cover && (
                <Image
                  src={p.cover}
                  alt={`First page of ${p.label}`}
                  fill
                  sizes="130px"
                  className="object-cover object-top"
                />
              )}
            </span>
            <span className="mt-3 block text-[13px] font-medium leading-tight group-hover:text-accent">
              {p.label}
            </span>
          </SmartLink>
        ))}
        {q.photos?.map((p, i) => (
          <figure
            key={p.src}
            className="w-[110px] bg-white p-1.5 pb-5 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] md:w-[130px]"
            style={{ rotate: i % 2 ? "3deg" : "-3deg" }}
          >
            <span className="relative block aspect-[4/5] overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="130px"
                className="object-cover object-top"
              />
            </span>
            <figcaption className="mt-1.5 text-center text-[11px] leading-tight text-muted">
              {p.caption}
            </figcaption>
          </figure>
        ))}
        {q.shot && (
          <span className="block w-[260px] overflow-hidden rounded-lg ring-1 ring-line">
            <span className="relative block aspect-[16/10]">
              <Image
                src={q.shot}
                alt={`${q.org} website`}
                fill
                sizes="260px"
                className="object-cover object-top"
              />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

/** Jobs and labs, each written as the question it was really about. */
export function Questions({ kind }: { kind: "Job" | "Lab" }) {
  const list = qs.filter((q) => q.where === kind);
  const [open, setOpen] = useState<string | null>(list[0].slug);
  return (
    <section
      aria-label={kind === "Job" ? "Jobs" : "Labs"}
      className="shell mt-12"
    >
      <ol className="border-t border-fg">
        {list.map((q, i) => {
          const on = open === q.slug;
          return (
            <li key={q.slug} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`a-${q.slug}`}
                  onClick={() => setOpen(on ? null : q.slug)}
                  className="group grid w-full grid-cols-[40px_1fr_28px] items-start gap-3 py-6 text-left md:grid-cols-[72px_1fr_auto_40px] md:items-center md:py-8"
                >
                  <span className="pt-2 text-[13px] text-faint md:pt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(24px,3.4vw,52px)] font-medium leading-[1.02] tracking-[-0.04em] transition-colors duration-300 ${
                      on ? "text-fg" : "text-fg/55 group-hover:text-fg"
                    }`}
                  >
                    {q.question}
                  </span>
                  <span className="col-start-2 flex items-center gap-2.5 md:col-start-auto">
                    {q.logo && (
                      <Image
                        src={q.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-md object-contain ring-1 ring-line"
                      />
                    )}
                    <span className="text-[13px] font-medium text-muted">
                      {q.org}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`col-start-3 row-start-1 mt-1 grid h-7 w-7 place-items-center rounded-full ring-1 ring-fg transition-transform duration-300 md:col-start-4 md:mt-0 md:h-9 md:w-9 ${on ? "rotate-45 bg-fg text-white" : ""}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`a-${q.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <Answer q={q} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
