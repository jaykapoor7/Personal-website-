import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { ScrollShot } from "@/components/CaseHero";
import { Counter, Reveal, RiseWords } from "@/components/motion";
import { SmartLink } from "@/components/ui";
import { cases, type Case } from "@/content/archive";
import type { Link as L, Metric, Proof, Shot } from "@/content/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = cases.find((c) => c.slug === params.slug);
  return e ? { title: e.title, description: e.line } : {};
}

/** Everything a case page needs, whichever list the entry came from. */
function details(e: Case) {
  const c = e.caseOf;
  if (c.type === "venture") {
    const v = c.v;
    return {
      back: "/#startups",
      backLabel: "Startups",
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
  const r = c.r;
  return {
    back: "/#experience",
    backLabel: "Experience",
    kicker: `${r.role}, ${r.period}, ${r.place}`,
    lede: r.question,
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

function Papers({ proof }: { proof: Proof[] }) {
  const tilt = [-4, 3, -2, 5];
  return (
    <ul className="flex flex-wrap gap-x-10 gap-y-12">
      {proof.map((p, i) => (
        <li key={p.href} className="w-[150px] sm:w-[210px]">
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
                  sizes="210px"
                  className="object-cover object-top"
                />
              </span>
            ) : (
              <span className="grid aspect-[900/1273] place-items-center rounded-2xl bg-card p-4 text-center text-[17px] font-semibold transition-transform duration-500 group-hover:-translate-y-2">
                {p.label}
              </span>
            )}
            <span className="mt-5 flex items-center gap-1.5 text-[15px] font-semibold group-hover:text-accent">
              {p.label} <Arrow />
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const i = cases.findIndex((c) => c.slug === params.slug);
  if (i < 0) notFound();
  const e = cases[i];
  const next = cases[(i + 1) % cases.length];
  const d = details(e);
  const name = `shot-${e.slug}`;

  return (
    <article className="pt-28 md:pt-32">
      <div className="shell">
        <header>
          <div className="flex items-center justify-between gap-6">
            <Link
              href={d.back}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-card px-4 text-[14px] font-semibold transition-colors hover:bg-fg hover:text-white"
            >
              <Arrow
                direction="left"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              {d.backLabel}
            </Link>
            {d.logo && (
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-line md:h-14 md:w-14">
                <Image
                  src={d.logo}
                  alt=""
                  width={56}
                  height={56}
                  className="h-11 w-11 object-contain md:h-[52px] md:w-[52px]"
                />
              </span>
            )}
          </div>
          <h1 className="display mt-8 text-[clamp(56px,12.4vw,200px)] md:mt-10">
            <RiseWords text={e.title} />
          </h1>
          <div className="mt-7 grid gap-7 md:mt-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <p className="max-w-[24ch] text-[clamp(24px,2.9vw,42px)] font-medium leading-[1.1]">
              {d.lede}
            </p>
            <div className="md:text-right">
              <p className="text-[15px] font-medium text-muted">{d.kicker}</p>
              <div className="mt-4 flex flex-wrap gap-2.5 md:justify-end">
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

      <div className="shell mt-14 md:mt-24">
        {d.shot ? (
          <ScrollShot shot={d.shot} label={e.title} name={name} />
        ) : d.photos ? (
          <ul className="mx-auto grid max-w-[820px] grid-cols-2 items-start gap-5 md:gap-10">
            {d.photos.map((p, i) => (
              <li key={p.src} className={i % 2 ? "mt-10 md:mt-20" : ""}>
                <Reveal delay={i * 0.12}>
                  <figure
                    className="print"
                    style={{
                      rotate: `${i % 2 ? 3 : -3}deg`,
                      ...(i === 0 ? { viewTransitionName: name } : {}),
                    }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        priority
                        sizes="(max-width: 768px) 50vw, 400px"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption>{p.caption}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : e.image ? (
          <Reveal>
            <div
              className="mx-auto w-[min(70vw,400px)] -rotate-2"
              style={{ viewTransitionName: name }}
            >
              <span className="deep-shadow relative block aspect-[900/1273] overflow-hidden bg-white">
                <Image
                  src={e.image}
                  alt={`First page of the ${e.title} document`}
                  fill
                  priority
                  sizes="400px"
                  className="object-cover object-top"
                />
              </span>
            </div>
          </Reveal>
        ) : null}
      </div>

      {d.metrics.length > 0 && (
        <div className="shell mt-20 md:mt-28">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            {d.metrics.map((m) => (
              <div key={m.label}>
                <dd className="display text-[clamp(52px,9vw,144px)] text-accent">
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-3 text-[15px] font-medium text-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      )}

      {d.points.length > 0 && (
        <div className="shell mt-20 md:mt-28">
          <ol className="grid gap-x-16 gap-y-8 md:grid-cols-2 md:gap-y-12">
            {d.points.map((p, n) => (
              <li key={p}>
                <Reveal delay={(n % 2) * 0.08} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="display pt-1 text-[22px] text-accent"
                  >
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[30ch] text-[clamp(20px,2.1vw,30px)] font-medium leading-[1.18]">
                    {p}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      )}

      {d.proof.length > 0 && (
        <div className="shell mt-20 md:mt-28">
          <h2 className="display text-[clamp(34px,4.4vw,68px)]">On paper</h2>
          <div className="mt-10">
            <Papers proof={d.proof} />
          </div>
        </div>
      )}

      <div className="shell mt-24 md:mt-36">
        <Link
          href={next.href}
          className="group block rounded-[28px] bg-card p-7 transition-colors duration-500 hover:bg-fg hover:text-white sm:p-10 md:rounded-[40px]"
        >
          <span className="text-[15px] font-medium text-muted transition-colors duration-500 group-hover:text-white">
            Next
          </span>
          <span className="mt-3 flex items-center justify-between gap-6">
            <span className="display text-[clamp(44px,9vw,144px)] transition-transform duration-500 ease-out group-hover:translate-x-3">
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
