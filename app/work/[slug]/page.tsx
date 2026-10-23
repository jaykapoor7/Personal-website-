import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { AreaMap } from "@/components/AreaMap";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SmartLink } from "@/components/ui";
import { allProjects } from "@/content/site";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = allProjects.find((x) => x.slug === params.slug);
  return { title: p?.title ?? "Work", description: p?.summary };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = allProjects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const i = allProjects.indexOf(p);
  const next = allProjects[(i + 1) % allProjects.length];
  const hasVisual =
    p.image ||
    ["project-nidaan", "tot-schools", "finer-things-club"].includes(p.slug);

  return (
    <article>
      <header className="shell rise pb-12 pt-12 md:pt-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <Arrow direction="left" /> All work
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="chip">{p.category}</span>
          {p.period && <span className="chip">{p.period}</span>}
        </div>
        <h1 className="mt-5 text-5xl font-medium leading-[0.98] tracking-[-0.045em] md:text-7xl">
          {p.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{p.role}</p>
        <p className="mt-8 max-w-3xl text-2xl leading-snug tracking-[-0.015em] md:text-[28px]">
          {p.summary}
        </p>
        {p.links.length > 0 && (
          <div className="mt-9 flex flex-wrap gap-3">
            {p.links.map((l, j) => (
              <SmartLink
                key={l.href}
                href={l.href}
                className={j === 0 ? "btn-primary" : "btn-ghost"}
              >
                {l.label} <Arrow />
              </SmartLink>
            ))}
          </div>
        )}
      </header>

      {p.metrics && (
        <section aria-label="Key numbers" className="shell">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-bg p-6 md:p-8">
                <dd className="text-4xl font-medium tracking-[-0.035em] md:text-5xl">
                  {m.value}
                </dd>
                <dt className="mt-2 text-sm text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {hasVisual && (
        <div className="shell mt-8">
          <div
            className={`relative overflow-hidden rounded-[24px] border border-line ${
              p.imageFit === "contain"
                ? "aspect-[3/2]"
                : "aspect-[16/10] md:aspect-[2/1]"
            }`}
          >
            <ProjectVisual
              project={p}
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
            />
          </div>
        </div>
      )}

      <section className="shell grid gap-12 pt-20 md:grid-cols-[220px_1fr] md:gap-16">
        <p className="eyebrow md:pt-2">Overview</p>
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-fg/85">
          {p.body.map((x) => (
            <p key={x}>{x}</p>
          ))}
        </div>
        {p.highlights && (
          <>
            <p className="eyebrow md:pt-2">What I did</p>
            <ul className="max-w-2xl divide-y divide-line border-y border-line">
              {p.highlights.map((h, j) => (
                <li
                  key={h}
                  className="flex gap-5 py-4 text-[17px] leading-relaxed"
                >
                  <span className="pt-1 font-mono text-xs text-faint">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </>
        )}
        {p.note && (
          <>
            <p className="eyebrow md:pt-1">Note</p>
            <p className="max-w-2xl text-sm text-muted">{p.note}</p>
          </>
        )}
      </section>

      {p.slug === "straypaw" && (
        <section className="shell pt-20">
          <div className="grid gap-10 rounded-[24px] bg-[#0b0b0b] p-6 text-white sm:p-10 md:grid-cols-[1fr_1.3fr] md:p-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                From the public archive
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
                Every neighbourhood, one record.
              </h2>
              <p className="mt-4 text-white/65">
                StrayPaw’s public area archive for Coimbatore: 254 areas, shaded
                by the open and urgent requests they held when the snapshot was
                taken.
              </p>
              <a
                href="https://github.com/jaykapoor7/Pok-mon-go-dog-/blob/main/src/data/landing-area-archive.json"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
              >
                Source data <Arrow />
              </a>
            </div>
            <AreaMap />
          </div>
        </section>
      )}

      {p.gallery && (
        <section className="shell pt-20">
          <p className="eyebrow mb-6">In pictures</p>
          <div className="grid gap-4 md:grid-cols-2">
            {p.gallery.map((g) => (
              <figure key={g.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <nav aria-label="Next project" className="shell pt-24">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-end justify-between gap-6 border-t border-line pt-8"
        >
          <div>
            <p className="eyebrow">Next</p>
            <p className="mt-3 text-4xl font-medium tracking-[-0.035em] transition-colors group-hover:text-accent md:text-6xl">
              {next.title}
            </p>
            <p className="mt-2 text-muted">{next.summary}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-xl transition-all group-hover:bg-fg group-hover:text-bg">
            <Arrow direction="right" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
