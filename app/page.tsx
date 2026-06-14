import Link from "next/link";
import { profile } from "@/content/profile";
import { featuredWork } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { MetricStat } from "@/components/Metric";
import { WorkCard } from "@/components/WorkCard";
import { Portrait } from "@/components/Portrait";

export default function HomePage() {
  const featured = featuredWork();

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-12 pt-20 pb-16 sm:pt-28 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <p className="mb-6 text-sm uppercase tracking-widest text-muted">
              Builder &amp; investor · {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display text-5xl leading-[0.95] tracking-tightest sm:text-7xl lg:text-8xl">
              Jay Kapoor
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link
                href="/work"
                className="rounded-sm border border-paper px-5 py-3 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                See the work →
              </Link>
              <a
                href={profile.resumeUrl}
                className="rounded-sm border border-line px-5 py-3 text-muted transition-colors hover:border-paper hover:text-paper"
              >
                Resume ↗
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="order-first lg:order-none">
          <Portrait className="max-w-[15rem] sm:max-w-xs lg:max-w-sm" />
        </Reveal>
      </section>

      <Marquee
        items={[
          "Fintech",
          "Healthtech",
          "Investment Research",
          "Venture Research",
          "Product",
          "Growth",
        ]}
      />

      {/* Headline stats */}
      <section className="shell py-20">
        <Reveal>
          <h2 className="mb-12 text-sm uppercase tracking-widest text-muted">
            By the numbers
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {profile.highlights.map((m, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <MetricStat metric={m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="py-10">
        <div className="shell mb-4 flex items-baseline justify-between">
          <h2 className="display text-3xl sm:text-4xl">Selected work</h2>
          <Link href="/work" className="link-underline text-sm text-muted">
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

      {/* Closing line */}
      <section className="shell py-24">
        <Reveal>
          <p className="display max-w-4xl text-3xl leading-snug sm:text-5xl">
            A resume tells you what I did.{" "}
            <span className="text-muted">
              This site lets you check.
            </span>
          </p>
        </Reveal>
      </section>
    </>
  );
}
