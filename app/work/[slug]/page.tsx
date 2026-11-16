import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { SmartLink, isExternal } from "@/components/ui";
import { Status } from "@/components/WorkRow";
import {
  caseBySlug,
  caseStudies,
  type CaseStudy,
  type OutcomeKind,
} from "@/content/cases";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = caseBySlug(params.slug);
  return c ? { title: c.name, description: c.line } : {};
}

/** One part of the page: a small mono heading beside its text. */
function Part({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-line pt-5 sm:grid-cols-[140px_minmax(0,1fr)]">
      <h2 className="label pt-[5px]">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const kindStyle: Record<OutcomeKind, string> = {
  Measured: "text-accent",
  Shipped: "text-fg",
  Partnership: "text-fg",
  Pilot: "text-muted",
  Published: "text-fg",
};

/** The picture for the case: a screenshot or photographs. */
function Visual({ c }: { c: CaseStudy }) {
  if (c.shot)
    return (
      <figure>
        <span
          className="deep-shadow relative block aspect-[16/10] overflow-hidden rounded-lg bg-card"
          style={{ viewTransitionName: `shot-${c.slug}` }}
        >
          <Image
            src={c.shot.src}
            alt={`${c.name}, ${c.shot.url}`}
            fill
            priority
            sizes="(max-width: 1040px) 100vw, 976px"
            className="object-cover object-top"
          />
        </span>
        <figcaption className="mt-2.5 text-[13px] text-muted">
          {c.shot.url}
        </figcaption>
      </figure>
    );
  if (c.photos)
    return (
      <ul className="grid grid-cols-2 gap-4 sm:gap-6">
        {c.photos.map((p) => (
          <li key={p.src}>
            <figure>
              <span className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-card ring-1 ring-fg/[0.08]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority
                  sizes="(max-width: 1040px) 50vw, 480px"
                  className="object-cover object-top"
                />
              </span>
              <figcaption className="mt-2.5 text-[13px] text-muted">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  // Work told in documents: its first page stands in for a screenshot.
  if (c.image)
    return (
      <figure className="mx-auto w-[min(62vw,300px)]">
        <span
          className="paper-shadow relative block aspect-[900/1273] -rotate-2 overflow-hidden bg-white"
          style={{ viewTransitionName: `shot-${c.slug}` }}
        >
          <Image
            src={c.image}
            alt={`First page of the ${c.name} document`}
            fill
            priority
            sizes="300px"
            className="object-cover object-top"
          />
        </span>
      </figure>
    );
  return null;
}

const fileKind = (href: string) =>
  /\.pdf$/.test(href)
    ? "PDF"
    : /\.xlsx$/.test(href)
      ? "Spreadsheet"
      : /github\.com/.test(href)
        ? "GitHub"
        : "Link";

/** Documents as their first pages; anything without one is a plain link. */
function Docs({ c }: { c: CaseStudy }) {
  const papers = c.docs.filter((d) => d.cover);
  const other = c.docs.filter((d) => !d.cover);
  return (
    <>
      {papers.length > 0 && (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3">
          {papers.map((d) => (
            <li key={d.href}>
              <SmartLink href={d.href} className="group block">
                <span className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <Image
                    src={d.cover!}
                    alt={`First page of ${d.label}`}
                    fill
                    sizes="(max-width: 640px) 45vw, 200px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="mt-2.5 flex items-center gap-1 text-[14px] font-medium transition-colors group-hover:text-accent">
                  {d.label}
                  <Arrow className="text-[0.85em]" />
                </span>
                <span className="text-[12.5px] text-muted">{fileKind(d.href)}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
      {other.length > 0 && (
        <ul className={papers.length ? "mt-6 space-y-1.5" : "space-y-1.5"}>
          {other.map((d) => (
            <li key={d.href}>
              <SmartLink
                href={d.href}
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                {d.label}
                <span className="text-[13px] text-muted">({fileKind(d.href)})</span>
                <Arrow className="text-[0.8em]" />
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = caseBySlug(params.slug);
  if (!c) notFound();
  const i = caseStudies.indexOf(c);
  const next = caseStudies[(i + 1) % caseStudies.length];
  const links = [...(c.site ? [c.site] : []), ...c.links];

  return (
    <article>
      <header className="col pt-4 md:pt-8">
        <Link
          href="/work/"
          className="group inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg"
        >
          <Arrow
            direction="left"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          All work
        </Link>
        <p className="label mt-10 flex flex-wrap items-center gap-x-2">
          <span>{c.kind}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{c.years}</span>
          {c.status && (
            <>
              <span aria-hidden="true">·</span>
              <Status status={c.status} />
            </>
          )}
        </p>
        <h1
          className="display mt-3 w-fit text-[clamp(38px,6.4vw,58px)]"
          style={{ viewTransitionName: `title-${c.slug}` }}
        >
          {c.name}
        </h1>
        <p className="mt-4 max-w-[600px] text-[18px] leading-[1.5] text-fg/90 sm:text-[19px]">
          {c.line}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-[14px] sm:grid-cols-4">
          <div>
            <dt className="label">Role</dt>
            <dd className="mt-1">{c.role}</dd>
          </div>
          <div>
            <dt className="label">When</dt>
            <dd className="mt-1 tabular-nums">{c.years}</dd>
          </div>
          {c.place && (
            <div>
              <dt className="label">Where</dt>
              <dd className="mt-1">{c.place}</dd>
            </div>
          )}
          {links.length > 0 && (
            <div className="col-span-2 sm:col-span-1">
              <dt className="label">Links</dt>
              <dd className="mt-1 flex flex-col items-start gap-0.5">
                {links.map((l) => (
                  <SmartLink
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    {l.label}
                    <Arrow
                      direction={isExternal(l.href) ? "up" : "right"}
                      className="text-[0.8em]"
                    />
                  </SmartLink>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {c.metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {c.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[13.5px] text-muted">{m.label}</dt>
                <dd className="display text-[clamp(34px,5vw,44px)] tabular-nums">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {(c.shot || c.photos || c.image) && (
        <div className="shell mt-12">
          <Visual c={c} />
        </div>
      )}

      <div className="col mt-12 space-y-10 text-[15.5px] leading-[1.65] sm:text-[16px]">
        {c.context && (
          <Part title="Context">
            <p>{c.context}</p>
          </Part>
        )}
        {c.problem && (
          <Part title="Problem">
            <p>{c.problem}</p>
          </Part>
        )}
        <Part title="What I did">
          <ul className="space-y-2.5">
            {c.did.map((d) => (
              <li key={d} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[12px] h-px w-3 shrink-0 bg-faint"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Part>
        {c.outcomes.length > 0 && (
          <Part title="Outcomes">
            <ul className="space-y-3">
              {c.outcomes.map((o) => (
                <li
                  key={o.text}
                  className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[100px_minmax(0,1fr)]"
                >
                  <span
                    className={`pt-[5px] font-mono text-[11px] uppercase tracking-[0.08em] ${kindStyle[o.kind]}`}
                  >
                    {o.kind}
                  </span>
                  <span>{o.text}</span>
                </li>
              ))}
            </ul>
          </Part>
        )}
        {c.docs.length > 0 && (
          <Part title="Documents">
            <Docs c={c} />
          </Part>
        )}
      </div>

      <nav aria-label="Next case" className="col mt-16">
        <Link
          href={`/work/${next.slug}/`}
          className="group flex items-end justify-between gap-6 border-t border-line pt-5"
        >
          <span>
            <span className="label">Next</span>
            <span className="display mt-1.5 block text-[26px] transition-colors group-hover:text-accent">
              {next.name}
            </span>
            <span className="mt-1 block text-[14px] text-muted">
              {next.line}
            </span>
          </span>
          <Arrow
            direction="right"
            className="mb-1 text-[20px] text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </nav>
    </article>
  );
}
