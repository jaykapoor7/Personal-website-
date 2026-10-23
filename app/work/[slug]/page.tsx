import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { Counter, Reveal, RiseWords } from "@/components/motion";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Showcase } from "@/components/Showcase";
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
  const next = allProjects[(allProjects.indexOf(p) + 1) % allProjects.length];
  const scroll = p.preview?.type === "site" ? p.preview.scroll : undefined;

  return (
    <article>
      <header className="shell pb-16 pt-32 md:pt-40">
        <Reveal y={10}>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-fg"
          >
            <Arrow direction="left" /> Work
          </Link>
        </Reveal>
        <h1 className="display mt-8 text-[clamp(60px,11vw,176px)]">
          <RiseWords text={p.title} delay={0.05} />
        </h1>
        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-2xl text-2xl leading-snug md:text-3xl">
              {p.summary}
            </p>
            <p className="text-right text-[15px] text-muted">
              {p.role}
              {p.period && <span className="block">{p.period}</span>}
            </p>
          </div>
          {p.links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
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
        </Reveal>
      </header>

      {p.preview && !scroll && (
        <Reveal className="shell">
          <ProjectPreview project={p} priority />
        </Reveal>
      )}
      {p.preview?.type === "site" && scroll && (
        <Showcase
          url={p.preview.url}
          scroll={scroll}
          scrollRatio={p.preview.scrollRatio ?? 3}
          phone={
            p.preview.mobile
              ? { src: p.preview.mobile, alt: `${p.title} on a phone` }
              : undefined
          }
          steps={(p.highlights ?? [p.summary]).map((h, i) => ({
            title: p.metrics?.[i]
              ? `${p.metrics[i].value} ${p.metrics[i].label}`
              : p.title,
            text: h,
          }))}
        />
      )}

      {p.metrics && !scroll && (
        <section aria-label="Numbers" className="shell pt-24">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-3">
            {p.metrics.map((m, j) => (
              <Reveal key={m.label} delay={j * 0.08}>
                <dd className="display text-[clamp(52px,7vw,104px)]">
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-2 text-[15px] text-muted">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      <section className="shell grid gap-10 pt-24 md:grid-cols-[1fr_1fr] md:gap-16">
        <Reveal>
          <p className="text-[clamp(22px,2.4vw,30px)] leading-[1.3] tracking-[-0.015em]">
            {p.body[0]}
          </p>
        </Reveal>
        {p.highlights && !scroll && (
          <ul className="border-t border-line">
            {p.highlights.map((h, j) => (
              <li key={h}>
                <Reveal
                  delay={j * 0.05}
                  className="flex gap-4 border-b border-line py-4 text-[17px]"
                >
                  <span className="text-faint tabular-nums">{j + 1}</span>
                  {h}
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      {p.gallery && (
        <section className="shell pt-24">
          <div className="grid gap-4 md:grid-cols-2">
            {p.gallery.map((g, j) => (
              <Reveal key={g.src} delay={j * 0.1}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[15px] text-muted">
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
          className="group block border-t border-line pt-8"
        >
          <span className="label">Next</span>
          <span className="mt-2 flex items-center justify-between gap-6">
            <span className="display text-[clamp(48px,8vw,128px)] transition-colors duration-300 group-hover:text-accent">
              {next.title}
            </span>
            <Arrow
              direction="right"
              className="shrink-0 text-5xl transition-transform duration-300 group-hover:translate-x-2"
            />
          </span>
        </Link>
      </nav>
    </article>
  );
}
