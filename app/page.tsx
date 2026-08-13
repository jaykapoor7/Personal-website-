import Link from "next/link";
import { profile } from "@/content/profile";
import { featuredWork, orderedWriting } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { MetricStat } from "@/components/Metric";
import { WorkCard } from "@/components/WorkCard";
import { Portrait } from "@/components/Portrait";

export default function HomePage() {
  const featured = featuredWork();
  const research = orderedWriting()
    .filter((w) => w.kind !== "Building in public")
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-14 pt-24 pb-16 sm:pt-32 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal>
            <p className="kicker mb-6">Builder &amp; researcher · {profile.location}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display text-6xl leading-[1] tracking-tightest sm:text-7xl lg:text-8xl">
              Jay Kapoor
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-4 text-sm">
              <Link
                href="/work"
                className="rounded-full bg-ink px-6 py-3 text-paper transition-colors duration-300 hover:bg-accent"
              >
                See the work →
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-3 text-ink transition-colors duration-300 hover:border-ink"
              >
                Résumé ↗
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {profile.seeking}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="order-first lg:order-none">
          <Portrait className="max-w-[15rem] sm:max-w-xs lg:max-w-sm" />
        </Reveal>
      </section>

      {/* Headline stats */}
      <section className="shell border-t border-line py-16">
        <Reveal>
          <p className="kicker mb-10">By the numbers</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-6 sm:gap-10">
          {profile.highlights.slice(0, 3).map((m, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <MetricStat metric={m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="py-14">
        <div className="shell mb-4 flex items-baseline justify-between">
          <h2 className="display text-3xl tracking-tight sm:text-4xl">Selected work</h2>
          <Link
            href="/work"
            className="link-underline text-sm text-muted"
          >
            All work →
          </Link>
        </div>
        <div>
          {featured.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      {/* Selected research */}
      <section className="shell py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="display text-3xl tracking-tight sm:text-4xl">Selected research</h2>
          <Link href="/writing" className="link-underline text-sm text-muted">
            All writing →
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {research.map((item) => (
            <Link
              key={item.slug}
              href={item.slug === "investment-memo-series" ? "/ledger" : "/writing"}
              className="group flex flex-col gap-3 bg-paper p-6 transition-colors hover:bg-line/40 sm:p-8"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted">
                <span>{item.kind}</span>
                <span aria-hidden>·</span>
                <span>{item.year}</span>
              </div>
              <h3 className="display text-2xl leading-tight tracking-tight sm:text-3xl">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing line */}
      <section className="shell border-t border-line py-20">
        <Reveal>
          <p className="display max-w-3xl text-3xl leading-snug tracking-tight sm:text-4xl">
            A résumé tells you what I did.{" "}
            <span className="text-muted">This site lets you check.</span>
          </p>
        </Reveal>
      </section>
    </>
  );
}
