import Image from "next/image";
import { ledger } from "@/content/ledger";
import {
  education,
  labs,
  leadership,
  otherResearch,
  roles,
  ventures,
  writing,
  type Link as L,
  type Proof,
  type Shot,
  type Venture,
} from "@/content/site";
import { Arrow } from "./Arrow";
import { BrowserFrame } from "./frames";
import { Counter, Stagger, StaggerItem, Tilt } from "./motion";
import { SmartLink } from "./ui";

/* Small building blocks */

export function OrgMark({
  logo,
  name,
  size = 40,
}: {
  logo?: string;
  name: string;
  size?: number;
}) {
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-line"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={size}
          height={size}
          className="h-[78%] w-[78%] object-contain"
        />
      ) : (
        <span className="text-[15px] font-semibold text-accent">
          {name
            .replace(/^The /, "")
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </span>
      )}
    </span>
  );
}

function SiteButton({ link }: { link: L }) {
  return (
    <SmartLink href={link.href} className="btn-primary h-10 px-4 text-[14px]">
      {link.label} <Arrow />
    </SmartLink>
  );
}

function TextLink({ link }: { link: L }) {
  return (
    <SmartLink
      href={link.href}
      className="inline-flex h-10 items-center gap-1 px-2 text-[14px] font-medium text-muted hover:text-fg"
    >
      {link.label} <Arrow />
    </SmartLink>
  );
}

/** Supporting documents: the real first page, small, like a file on a desk. */
export function ProofDocs({
  items,
  compact = false,
}: {
  items: Proof[];
  compact?: boolean;
}) {
  if (!items.length) return null;
  return (
    <div>
      <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">
        Supporting documents
      </p>
      <ul className="flex flex-wrap gap-3">
        {items.map((d) => (
          <li key={d.href}>
            <SmartLink
              href={d.href}
              className="group flex items-center gap-3 rounded-xl bg-card p-2 pr-3.5 ring-1 ring-line transition-all hover:bg-white hover:shadow-md"
            >
              {d.cover ? (
                <span className="relative h-[52px] w-[37px] shrink-0 overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:-rotate-3">
                  <Image
                    src={d.cover}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </span>
              ) : (
                <span className="grid h-[52px] w-[37px] shrink-0 place-items-center rounded-[3px] bg-white text-[10px] font-bold text-accent ring-1 ring-line">
                  {d.href.endsWith(".xlsx") ? "XLSX" : "DOC"}
                </span>
              )}
              <span
                className={`text-[13.5px] font-medium leading-snug ${compact ? "max-w-[150px]" : ""}`}
              >
                {d.label}
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Screen({
  shot,
  className = "",
  scroll = false,
  label,
}: {
  shot: Shot;
  className?: string;
  scroll?: boolean;
  label: string;
}) {
  return (
    <BrowserFrame url={shot.url} className={className}>
      {scroll && shot.scroll ? (
        <div
          className="h-[360px] overflow-y-auto md:h-[420px]"
          tabIndex={0}
          aria-label={`${label}: scroll to see the whole home page`}
        >
          <Image
            src={shot.scroll}
            alt={`${label} home page`}
            width={1200}
            height={Math.round(1200 * (shot.ratio ?? 3))}
            sizes="(max-width: 1024px) 100vw, 640px"
            className="w-full"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10]">
          <Image
            src={shot.src}
            alt={`${label} home page`}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover object-top"
          />
        </div>
      )}
    </BrowserFrame>
  );
}

function Metrics({
  items,
  big = false,
}: {
  items: { value: string; label: string }[];
  big?: boolean;
}) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((m) => (
        <div key={m.label}>
          <dd
            className={`font-semibold tracking-[-0.03em] ${big ? "text-[34px]" : "text-[26px]"}`}
          >
            <Counter value={m.value} />
          </dd>
          <dt className="text-[13px] text-muted">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function Head({
  logo,
  name,
  sub,
}: {
  logo?: string;
  name: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <OrgMark logo={logo} name={name} size={44} />
      <div className="min-w-0">
        <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.02em]">
          {name}
        </h3>
        <p className="text-[14px] text-muted">{sub}</p>
      </div>
    </div>
  );
}

/* Ventures */

function VentureCard({ v }: { v: Venture }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="bg-dots relative h-[200px] overflow-hidden bg-[#f1f2fb] px-6 pt-6">
        {v.shot ? (
          <Screen
            shot={v.shot}
            label={v.name}
            className="shadow-[0_18px_40px_-20px_rgba(30,27,75,0.5)]"
          />
        ) : (
          <SmartLink
            href={v.proof[0].href}
            className="group block"
            aria-label={`${v.proof[0].label}, PDF`}
          >
            <span className="relative mx-auto block aspect-[900/1273] w-[62%] overflow-hidden rounded-[3px] bg-white shadow-[0_18px_40px_-16px_rgba(30,27,75,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={v.proof[0].cover!}
                alt={`First page of ${v.proof[0].label}`}
                fill
                sizes="240px"
                className="object-cover object-top"
              />
            </span>
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold shadow-md">
              {v.proof[0].label} <Arrow />
            </span>
          </SmartLink>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <Head logo={v.logo} name={v.name} sub={`${v.role}, ${v.period}`} />
        <p className="text-[15px] leading-relaxed text-fg/80">{v.summary}</p>
        <Metrics items={v.metrics} />
        {v.points.length > 1 && (
          <ul className="space-y-1.5 text-[14px] leading-snug text-muted">
            {v.points.slice(0, 2).map((p) => (
              <li key={p} className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto space-y-4">
          {(v.site || v.links) && (
            <div className="flex flex-wrap items-center gap-1">
              {v.site && <SiteButton link={v.site} />}
              {v.links?.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </div>
          )}
          <ProofDocs items={v.shot ? v.proof : v.proof.slice(1)} compact />
        </div>
      </div>
    </article>
  );
}

export function Ventures() {
  const [lead, ...rest] = ventures;
  return (
    <div className="space-y-6">
      <Tilt className="rounded-2xl" max={2}>
        <article className="card grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
          <div className="bg-dots bg-[#eef0fb] p-5 sm:p-8">
            <Screen
              shot={lead.shot!}
              label={lead.name}
              scroll
              className="shadow-[0_30px_60px_-28px_rgba(30,27,75,0.55)]"
            />
          </div>
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <Head
              logo={lead.logo}
              name={lead.name}
              sub={`${lead.role}, ${lead.period}`}
            />
            <p className="text-[19px] leading-snug tracking-[-0.01em]">
              {lead.summary}
            </p>
            <Metrics items={lead.metrics} big />
            <ul className="space-y-2 text-[14.5px] leading-snug text-muted">
              {lead.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-1">
              <SiteButton link={lead.site!} />
              {lead.links?.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
              {lead.proof.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </div>
          </div>
        </article>
      </Tilt>
      <Stagger className="grid gap-6 md:grid-cols-3">
        {rest.map((v) => (
          <StaggerItem key={v.id} className="h-full min-w-0">
            <Tilt className="h-full rounded-2xl">
              <VentureCard v={v} />
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* Experience */

export function Experience() {
  return (
    <div className="relative pl-7 md:pl-10">
      <span
        aria-hidden="true"
        className="rail absolute bottom-6 left-[9px] top-6 w-[2px] rounded-full bg-gradient-to-b from-indigo-500 via-violet-400 to-sky-300 md:left-[13px]"
      />
      <Stagger as="ol" className="space-y-4" gap={0.1}>
        {roles.map((r) => (
          <StaggerItem as="li" key={r.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-7 top-8 grid h-5 w-5 place-items-center rounded-full bg-white ring-2 ring-indigo-500 md:-left-10 md:h-7 md:w-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 md:h-2 md:w-2" />
            </span>
            <div className="card grid gap-6 p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(30,27,75,0.35)] md:grid-cols-[250px_1fr] md:gap-10 md:p-7">
              <div className="space-y-4">
                <Head logo={r.logo} name={r.org} sub={r.period} />
                <p className="text-[13.5px] leading-snug text-muted">
                  {r.context ? `${r.context}, ` : ""}
                  {r.place}
                </p>
                {r.site && (
                  <SmartLink
                    href={r.site.href}
                    className="inline-flex items-center gap-1 text-[14px] font-semibold text-accent hover:underline"
                  >
                    {r.site.label} <Arrow />
                  </SmartLink>
                )}
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.01em]">
                    {r.role}
                  </p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-fg/80">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-start gap-4 lg:w-[300px] lg:flex-col">
                  {r.photo && (
                    <figure className="w-full max-w-[300px]">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-line">
                        <Image
                          src={r.photo.src}
                          alt={r.photo.alt}
                          fill
                          sizes="300px"
                          className="object-cover object-[50%_30%]"
                        />
                      </div>
                      <figcaption className="mt-1.5 text-[12.5px] text-muted">
                        {r.photo.caption}
                      </figcaption>
                    </figure>
                  )}
                  <ProofDocs items={r.proof} compact />
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* Research */

export function Research() {
  return (
    <div className="space-y-6">
      <Stagger className="grid gap-6 md:grid-cols-2">
        {labs.map((l) => (
          <StaggerItem key={l.id} className="h-full min-w-0">
            <Tilt className="h-full rounded-2xl">
              <article className="card flex h-full flex-col overflow-hidden">
                <SmartLink
                  href={l.site.href}
                  className="group block overflow-hidden bg-[#eef0fb] px-6 pt-6"
                  aria-label={`${l.name} website`}
                >
                  <span className="block h-[170px] overflow-hidden">
                    <span className="block transition-transform duration-[1800ms] ease-in-out group-hover:-translate-y-[38%]">
                      <Screen
                        shot={l.shot}
                        label={l.name}
                        className="shadow-[0_18px_40px_-20px_rgba(30,27,75,0.5)]"
                      />
                    </span>
                  </span>
                </SmartLink>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <Head
                    logo={l.logo}
                    name={l.name}
                    sub={`${l.role}, ${l.period}`}
                  />
                  {l.lead && (
                    <p className="text-[13.5px] font-medium text-accent">
                      With {l.lead}
                    </p>
                  )}
                  <p className="text-[15px] leading-relaxed text-fg/80">
                    {l.summary}
                  </p>
                  <SmartLink
                    href={l.site.href}
                    className="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold text-accent hover:underline"
                  >
                    {l.site.label} <Arrow />
                  </SmartLink>
                </div>
              </article>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="card p-6">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">
          Also
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {otherResearch.map((o) => (
            <li key={o.name}>
              {o.href ? (
                <SmartLink
                  href={o.href}
                  className="text-[15px] font-semibold hover:text-accent"
                >
                  {o.name} <Arrow className="inline" />
                </SmartLink>
              ) : (
                <p className="text-[15px] font-semibold">{o.name}</p>
              )}
              <p className="mt-0.5 text-[14px] text-muted">{o.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Writing */

const tilt = [-6, 3, -2, 5, -4, 2];

export function Writing() {
  const resolved = ledger.calls.filter((c) => c.result !== "OPEN");
  const hits = resolved.filter((c) => c.result === "HIT").length;
  return (
    <div className="space-y-6">
      <Stagger
        as="ul"
        className="bg-dots grid grid-cols-2 gap-x-5 gap-y-10 rounded-2xl bg-[#eef0fb] p-6 sm:grid-cols-3 sm:p-10 lg:grid-cols-6"
      >
        {writing.map((w, i) => (
          <StaggerItem as="li" key={w.href}>
            <SmartLink href={w.href} className="group block">
              <span
                className="paper-shadow relative block aspect-[900/1273] overflow-hidden rounded-[3px] bg-white transition-transform duration-500 ease-out [transform:rotate(var(--r))] group-hover:[transform:translateY(-10px)_rotate(0deg)_scale(1.04)]"
                style={
                  {
                    "--r": `${tilt[i % tilt.length]}deg`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={w.cover}
                  alt={`First page of ${w.title}`}
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </span>
              <span className="mt-4 block text-[14px] font-semibold leading-snug group-hover:text-accent">
                {w.title.split(":")[0]}
              </span>
              <span className="block text-[12.5px] text-muted">
                {w.kind}, {w.year}
              </span>
            </SmartLink>
            {w.extra && (
              <SmartLink
                href={w.extra.href}
                className="mt-1 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent hover:underline"
              >
                {w.extra.label} <Arrow />
              </SmartLink>
            )}
          </StaggerItem>
        ))}
      </Stagger>
      <SmartLink
        href="/ledger"
        className="bg-indigo-deep group flex flex-col gap-6 overflow-hidden rounded-2xl p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-md">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-indigo-200">
            Forecast ledger
          </p>
          <p className="mt-2 text-[19px] leading-snug">
            Every call in the memos gets a date and a probability, and is scored
            when it resolves.
          </p>
        </div>
        <dl className="flex gap-8">
          {[
            [String(ledger.calls.length), "calls"],
            [`${hits}/${resolved.length}`, "resolved right"],
            ["0.134", "Brier score"],
          ].map(([v, l]) => (
            <div key={l}>
              <dd className="text-[34px] font-semibold tracking-[-0.03em]">
                {v}
              </dd>
              <dt className="text-[13px] text-indigo-200">{l}</dt>
            </div>
          ))}
        </dl>
        <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold">
          See every call{" "}
          <Arrow className="transition-transform group-hover:translate-x-1" />
        </span>
      </SmartLink>
    </div>
  );
}

/* Leadership and education */

export function Leadership() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="space-y-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">
          Education
        </p>
        {education.map((e) => (
          <div key={e.school} className="card flex items-start gap-4 p-5">
            <OrgMark logo={e.logo} name={e.school} size={44} />
            <div>
              <p className="text-[17px] font-semibold tracking-[-0.01em]">
                {e.school}
              </p>
              <p className="text-[14.5px] text-fg/80">{e.detail}</p>
              <p className="text-[13.5px] text-muted">{e.period}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">
          Leadership
        </p>
        <ul className="card divide-y divide-line">
          {leadership.map((l) => {
            const body = (
              <>
                <OrgMark logo={l.logo} name={l.org} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="text-[15.5px] font-semibold">
                    {l.title}{" "}
                    <span className="font-normal text-muted">at {l.org}</span>
                  </p>
                  <p className="mt-0.5 text-[14px] text-fg/75">{l.detail}</p>
                </div>
                <span className="shrink-0 text-[13px] text-muted">
                  {l.period}
                </span>
              </>
            );
            return (
              <li key={l.title}>
                {l.href ? (
                  <SmartLink
                    href={l.href}
                    className="flex items-start gap-4 p-5 transition-colors hover:bg-card"
                  >
                    {body}
                  </SmartLink>
                ) : (
                  <div className="flex items-start gap-4 p-5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
