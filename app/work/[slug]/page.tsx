import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { ScrollShot } from "@/components/CaseHero";
import { Counter, Reveal } from "@/components/motion";
import { Redirect } from "@/components/Redirect";
import { SmartLink } from "@/components/ui";
import { cases, type Entry } from "@/content/archive";
import {
  legacy,
  type Link as L,
  type Metric,
  type Proof,
  type Shot,
} from "@/content/site";

export function generateStaticParams() {
  return [...cases.map((c) => c.slug), ...Object.keys(legacy)].map((slug) => ({
    slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = cases.find((c) => c.slug === params.slug);
  return e ? { title: e.title, description: e.line } : { title: "Moved" };
}

/** Everything a case page needs, whichever list the entry came from. */
function details(e: Entry) {
  const c = e.caseOf!;
  if (c.type === "venture") {
    const v = c.v;
    return {
      kicker: `${v.role}, ${v.period}`,
      lede: v.summary,
      points: v.points,
      metrics: v.metrics,
      site: v.site,
      links: v.links ?? [],
      shot: v.shot,
      proof: v.proof,
      logo: v.logo,
      photos: undefined,
    };
  }
  if (c.type === "role") {
    const r = c.r;
    return {
      kicker: `${r.role}, ${r.period}, ${r.place}`,
      lede: r.context ?? r.role,
      points: r.points,
      metrics: [] as Metric[],
      site: r.site,
      links: [] as L[],
      shot: undefined as Shot | undefined,
      proof: r.proof,
      logo: r.logo,
      photos: r.photos,
    };
  }
  const l = c.l;
  return {
    kicker: `${l.role}, ${l.period}${l.lead ? `, with ${l.lead}` : ""}`,
    lede: l.summary,
    points: [] as string[],
    metrics: [] as Metric[],
    site: l.site,
    links: [] as L[],
    shot: l.shot,
    proof: [] as Proof[],
    logo: l.logo,
    photos: undefined,
  };
}

function Papers({ proof }: { proof: Proof[] }) {
  const tilt = [-4, 3, -2, 5];
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-10">
      {proof.map((p, i) => (
        <li key={p.href} className="w-[150px] sm:w-[180px]">
          <SmartLink href={p.href} className="group block">
            {p.cover ? (
              <span
                className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:!rotate-0 group-hover:scale-105"
                style={{ rotate: `${tilt[i % tilt.length]}deg` }}
              >
                <Image
                  src={p.cover}
                  alt={`First page of ${p.label}`}
                  fill
                  sizes="180px"
                  className="object-cover object-top"
                />
              </span>
            ) : (
              <span className="grid aspect-[900/1273] place-items-center bg-fg p-4 text-center text-[13px] font-medium text-white transition-transform duration-500 group-hover:-translate-y-2">
                {p.label}
              </span>
            )}
            <span className="mt-4 flex items-center gap-1 text-[15px] font-semibold group-hover:text-accent">
              {p.label} <Arrow className="opacity-50" />
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const i = cases.findIndex((c) => c.slug === params.slug);
  if (i < 0)
    return <Redirect to={legacy[params.slug] ?? "/"} label="Jay Kapoor" />;
  const e = cases[i];
  const next = cases[(i + 1) % cases.length];
  const d = details(e);
  const name = `shot-${e.slug}`;

  return (
    <article className="pt-24 md:pt-28">
      <div className="shell">
        <div className="flex items-center justify-between text-[13px] font-medium text-muted">
          <Link
            href={
              e.verb === "Started"
                ? "/ventures"
                : e.verb === "Worked"
                  ? "/experience"
                  : "/research"
            }
            className="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <Arrow direction="left" />{" "}
            {e.verb === "Started"
              ? "Ventures"
              : e.verb === "Worked"
                ? "Experience"
                : "Research"}
          </Link>
          <span>
            {e.verb}, {e.when}
          </span>
        </div>
        <header className="mt-8 border-t border-fg pt-4">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-[clamp(52px,11vw,170px)] font-semibold leading-[0.85] tracking-[-0.06em]">
              {e.title}
            </h1>
            {d.logo && (
              <Image
                src={d.logo}
                alt=""
                width={72}
                height={72}
                className="mt-3 h-12 w-12 shrink-0 rounded-xl object-contain ring-1 ring-line md:h-[72px] md:w-[72px]"
              />
            )}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <p className="serif text-[clamp(26px,3.2vw,44px)] leading-[1.02]">
              {d.lede}
            </p>
            <div className="md:text-right">
              <p className="text-[13px] font-medium text-muted">{d.kicker}</p>
              <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                {d.site && (
                  <SmartLink href={d.site.href} className="btn-primary">
                    {d.site.label} <Arrow />
                  </SmartLink>
                )}
                {d.links.map((l) => (
                  <SmartLink key={l.href} href={l.href} className="btn-ghost">
                    {l.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="shell mt-14 md:mt-20">
        {d.shot ? (
          <ScrollShot shot={d.shot} label={e.title} name={name} />
        ) : d.photos ? (
          <ul className="mx-auto grid max-w-[880px] grid-cols-2 items-start gap-4 md:gap-8">
            {d.photos.map((p, i) => (
              <li key={p.src}>
                <Reveal delay={i * 0.12}>
                  <figure
                    className="bg-white p-2 pb-10 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] md:p-3 md:pb-14"
                    style={{
                      rotate: i % 2 ? "2deg" : "-2deg",
                      ...(i === 0 ? { viewTransitionName: name } : {}),
                    }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        priority
                        sizes="(max-width: 768px) 50vw, 440px"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-[14px] font-medium text-muted md:mt-4 md:text-[16px]">
                      {p.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : e.image ? (
          <Reveal>
            <div
              className="mx-auto w-[min(70vw,380px)] [rotate:2deg]"
              style={{ viewTransitionName: name }}
            >
              <span className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white">
                <Image
                  src={e.image}
                  alt={`First page of the ${e.title} document`}
                  fill
                  priority
                  sizes="380px"
                  className="object-cover object-top"
                />
              </span>
            </div>
          </Reveal>
        ) : null}
      </div>

      {d.metrics.length > 0 && (
        <div className="shell mt-20">
          <dl className="grid grid-cols-2 gap-y-10 border-t border-fg pt-6 md:grid-cols-3">
            {d.metrics.map((m) => (
              <div key={m.label}>
                <dd className="text-[clamp(52px,8vw,120px)] font-semibold leading-none tracking-[-0.06em]">
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-2 text-[13px] font-medium text-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      )}

      {d.points.length > 0 && (
        <div className="shell mt-20">
          <ol className="border-t border-fg">
            {d.points.map((p, n) => (
              <li key={p} className="border-b border-line">
                <Reveal className="grid grid-cols-[40px_1fr] gap-4 py-6 md:grid-cols-[120px_1fr] md:py-8">
                  <span className="text-[13px] text-faint">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[34ch] text-[clamp(22px,2.6vw,36px)] font-medium leading-[1.12] tracking-[-0.025em]">
                    {p}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      )}

      {d.proof.length > 0 && (
        <div className="shell mt-20">
          <p className="label">On paper</p>
          <div className="mt-8">
            <Papers proof={d.proof} />
          </div>
        </div>
      )}

      <div className="shell mt-28">
        <Link href={next.href} className="group block border-t border-fg pt-4">
          <span className="text-[13px] font-medium text-muted">Next</span>
          <span className="mt-2 flex items-center justify-between gap-6">
            <span className="text-[clamp(44px,9vw,140px)] font-semibold leading-[0.9] tracking-[-0.06em] transition-transform duration-500 ease-out group-hover:translate-x-3">
              {next.title}
            </span>
            <Arrow
              direction="right"
              className="text-[clamp(32px,5vw,72px)] transition-transform duration-500 group-hover:translate-x-2"
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
