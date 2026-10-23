import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { AreaMap } from "@/components/AreaMap";
import {
  Counter,
  InView,
  Reveal,
  RiseWords,
  ScrollScale,
} from "@/components/motion";
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

const unitArt = ["project-nidaan", "tot-schools", "finer-things-club"];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = allProjects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const i = allProjects.indexOf(p);
  const next = allProjects[(i + 1) % allProjects.length];
  const hasVisual = p.image || unitArt.includes(p.slug);

  return (
    <article>
      <header className="shell pb-14 pt-32 text-center md:pt-40">
        <Reveal y={10}>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <Arrow direction="left" /> All work
          </Link>
          <p className="eyebrow mt-10">
            {p.category}
            {p.period && ` · ${p.period}`}
          </p>
        </Reveal>
        <h1 className="mt-6 text-[clamp(56px,11vw,168px)] font-medium leading-[0.88] tracking-[-0.065em]">
          <RiseWords text={p.title} delay={0.05} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-snug text-muted md:text-2xl">
            {p.summary}
          </p>
          {p.links.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {p.links.map((l, j) => (
                <SmartLink
                  key={l.href}
                  href={l.href}
                  className={
                    j === 0 ? "btn-primary h-11 px-6" : "btn-ghost h-11 px-6"
                  }
                >
                  {l.label} <Arrow />
                </SmartLink>
              ))}
            </div>
          )}
        </Reveal>
      </header>

      {hasVisual && (
        <div className="mx-auto max-w-[1240px] px-3 sm:px-6">
          <ScrollScale
            className={`relative overflow-hidden border border-line ${
              p.imageFit === "contain"
                ? "aspect-[3/2]"
                : "aspect-[4/5] sm:aspect-[16/10] md:aspect-[2/1]"
            }`}
          >
            <ProjectVisual
              project={p}
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
          </ScrollScale>
        </div>
      )}

      {p.metrics && (
        <section aria-label="Key numbers" className="shell pt-24 md:pt-32">
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {p.metrics.map((m, j) => (
              <Reveal
                key={m.label}
                delay={j * 0.1}
                className="border-t border-line pt-6"
              >
                <dd className="text-[clamp(56px,7vw,104px)] font-medium leading-none tracking-[-0.06em]">
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-3 text-muted">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      <section className="shell pt-24 md:pt-32">
        <Reveal>
          <p className="max-w-4xl text-[clamp(26px,3.2vw,42px)] font-medium leading-[1.15] tracking-[-0.03em]">
            {p.body[0]}
          </p>
        </Reveal>
        {p.highlights && (
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
            {p.highlights.map((h, j) => (
              <li key={h} className="bg-bg">
                <Reveal
                  delay={(j % 2) * 0.08}
                  className="flex h-full gap-5 p-7 md:p-9"
                >
                  <span className="pt-1 font-mono text-xs text-faint">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-snug">{h}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
        {p.note && <p className="mt-6 text-sm text-muted">{p.note}</p>}
      </section>

      {p.slug === "straypaw" && (
        <section className="mt-24 bg-[#0b0b0b] py-24 text-white md:mt-32 md:py-32">
          <div className="shell grid items-center gap-14 md:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <h2 className="text-[clamp(40px,5vw,72px)] font-medium leading-[0.95] tracking-[-0.05em]">
                Every neighbourhood.
                <br />
                <span className="text-white/40">One record.</span>
              </h2>
              <a
                href="https://github.com/jaykapoor7/Pok-mon-go-dog-/blob/main/src/data/landing-area-archive.json"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
              >
                Coimbatore archive data <Arrow />
              </a>
            </Reveal>
            <InView>
              <AreaMap />
            </InView>
          </div>
        </section>
      )}

      {p.gallery && (
        <section className="shell pt-24 md:pt-32">
          <div className="grid gap-4 md:grid-cols-2">
            {p.gallery.map((g, j) => (
              <Reveal key={g.src} delay={j * 0.1}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-card">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <nav aria-label="Next project" className="shell pt-32">
        <Link
          href={`/work/${next.slug}`}
          className="group block border-t border-line pt-10 text-center"
        >
          <p className="eyebrow">Next project</p>
          <p className="mt-5 text-[clamp(48px,9vw,136px)] font-medium leading-[0.9] tracking-[-0.06em] transition-colors duration-300 group-hover:text-accent">
            {next.title}
          </p>
          <span className="mx-auto mt-8 grid h-14 w-14 place-items-center rounded-full border border-line text-xl transition-all duration-300 group-hover:translate-x-2 group-hover:bg-fg group-hover:text-bg">
            <Arrow direction="right" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
