import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { Reveal, RiseWords } from "@/components/motion";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { allProjects, groupLabels } from "@/content/site";

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
  const shelf = allProjects.filter((x) => x.group === p.group);
  const next = shelf[(shelf.indexOf(p) + 1) % shelf.length];
  // The numbers already sit beside the preview; only keep points that add something.
  const values = (p.metrics ?? []).map((m) => m.value.replace(/,/g, ""));
  const points = (p.highlights ?? []).filter(
    (h) => !values.some((v) => h.replace(/,/g, "").includes(v)),
  );

  return (
    <article className="bg-mesh">
      <header className="shell pb-10 pt-32 md:pt-36">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-fg"
        >
          <Arrow direction="left" /> {groupLabels[p.group]}
        </Link>
        <h1 className="display mt-6 text-[clamp(56px,9vw,140px)]">
          <RiseWords text={p.title} delay={0.05} />
        </h1>
      </header>

      <section className="shell">
        <Reveal>
          <ProjectBrowser items={[p]} groups={[p.group]} />
        </Reveal>
      </section>

      <section className="shell grid gap-10 pt-16 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-[clamp(20px,2.1vw,26px)] leading-[1.4]">
            {p.body[0]}
          </p>
        </Reveal>
        {points.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {points.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 rounded-2xl bg-white/80 p-4 text-[16px] leading-snug ring-1 ring-line backdrop-blur"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      {p.gallery && (
        <section className="shell pt-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.08}>
                <figure
                  className="bg-white p-3 pb-0 shadow-[0_20px_40px_-20px_rgba(30,27,75,0.45)]"
                  style={{ rotate: `${i % 2 ? 1.2 : -1.2}deg` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 540px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="hand py-2 text-center text-2xl">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {next.slug !== p.slug && (
        <nav aria-label="Next" className="shell pt-20">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[28px] bg-white/80 p-6 ring-1 ring-line backdrop-blur transition-shadow hover:shadow-xl md:p-8"
          >
            <span>
              <span className="text-[13px] font-medium text-accent">
                Next in {groupLabels[p.group].toLowerCase()}
              </span>
              <span className="display mt-1 block text-[clamp(32px,4.5vw,64px)]">
                {next.title}
              </span>
            </span>
            <Arrow
              direction="right"
              className="shrink-0 text-4xl transition-transform group-hover:translate-x-2"
            />
          </Link>
        </nav>
      )}
    </article>
  );
}
