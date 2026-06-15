import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { work } from "@/content/work";
import { getWork, orderedWork } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { MetricRow } from "@/components/Metric";
import { ProofGrid } from "@/components/Proof";
import { Gallery } from "@/components/Gallery";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getWork(params.slug);
  if (!item) return { title: "Work" };
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary },
  };
}

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getWork(params.slug);
  if (!item) notFound();

  // Next item in the ordered list, for sequential navigation.
  const ordered = orderedWork();
  const idx = ordered.findIndex((w) => w.slug === item.slug);
  const next = ordered[(idx + 1) % ordered.length];

  return (
    <>
      <article>
        {/* Header */}
        <header className="shell pt-20 pb-12 sm:pt-28">
          <Reveal>
            <Link href="/work" className="link-underline text-sm text-muted">
              ← All work
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>{item.category}</span>
              <span aria-hidden>·</span>
              <span>{item.role}</span>
              <span aria-hidden>·</span>
              <span>{item.period}</span>
              {item.location && (
                <>
                  <span aria-hidden>·</span>
                  <span>{item.location}</span>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-5xl leading-tight sm:text-7xl">
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg text-muted">{item.summary}</p>
          </Reveal>
        </header>

        {/* Metrics */}
        {item.metrics.length > 0 && (
          <section className="shell hr-line border-t py-12">
            <Reveal>
              <MetricRow metrics={item.metrics} />
            </Reveal>
          </section>
        )}

        {/* Context + contributions */}
        <section className="shell grid gap-12 py-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-sm uppercase tracking-widest text-muted">
              Context
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-5 text-lg leading-relaxed">
              {item.context.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="shell grid gap-12 py-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-sm uppercase tracking-widest text-muted">
              What I did
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-4">
              {item.contributions.map((c, i) => (
                <li key={i} className="flex gap-4 text-lg leading-relaxed">
                  <span className="text-muted">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {item.outcomes.length > 0 && (
          <section className="shell grid gap-12 py-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="text-sm uppercase tracking-widest text-muted">
                Outcomes
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="space-y-4">
                {item.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-4 text-lg leading-relaxed">
                    <span className="text-muted">→</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* Gallery */}
        {item.gallery && item.gallery.length > 0 && (
          <section className="shell hr-line border-t py-14">
            <Reveal>
              <h2 className="mb-8 text-sm uppercase tracking-widest text-muted">
                Gallery
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Gallery images={item.gallery} />
            </Reveal>
          </section>
        )}

        {/* Proof */}
        <section className="shell hr-line border-t py-14">
          <Reveal>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="display text-3xl">Proof</h2>
              <span className="text-xs text-muted">
                Links, docs, and screenshots
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ProofGrid proof={item.proof} />
          </Reveal>
        </section>

        {/* Tags */}
        {item.tags.length > 0 && (
          <section className="shell pb-8">
            <ul className="flex flex-wrap gap-3 text-xs text-muted">
              {item.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line py-16 transition-colors hover:bg-line/30"
      >
        <div className="shell flex items-baseline justify-between">
          <div>
            <span className="text-sm uppercase tracking-widest text-muted">
              Next
            </span>
            <h2 className="display mt-2 text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
              {next.title}
            </h2>
          </div>
          <span aria-hidden className="text-2xl text-muted">
            →
          </span>
        </div>
      </Link>
    </>
  );
}
