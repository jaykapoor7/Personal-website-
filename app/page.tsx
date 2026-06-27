import Link from "next/link";
import { profile } from "@/content/profile";
import { featuredWork, orderedWriting } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { MetricStat } from "@/components/Metric";
import { WorkCard } from "@/components/WorkCard";
import { Portrait } from "@/components/Portrait";
import { MagneticButton } from "@/components/MagneticButton";
import { Scramble } from "@/components/Scramble";
import { CommandLine } from "@/components/CommandLine";

export default function HomePage() {
  const featured = featuredWork();
  // Lead with the investing / research A-material (exclude building-in-public).
  // Kept to 3 for a calmer landing — the rest live on /writing.
  const research = orderedWriting()
    .filter((w) => w.kind !== "Building in public")
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-14 pt-24 pb-20 sm:pt-32 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <p className="kicker mb-7">
              <span className="text-accent">&gt;</span> builder &amp; researcher ·{" "}
              {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display text-6xl lowercase leading-[0.95] tracking-tighter2 sm:text-7xl lg:text-8xl">
              <Scramble text="jay kapoor" />
              <span className="caret" aria-hidden />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-11 flex flex-wrap gap-4 text-sm">
              <MagneticButton
                href="/work"
                className="rounded-full border border-paper px-6 py-3 text-paper transition duration-300 hover:bg-paper hover:text-ink active:scale-[0.97]"
              >
                See the work →
              </MagneticButton>
              <MagneticButton
                href={profile.resumeUrl}
                external
                className="rounded-full border border-line px-6 py-3 text-muted transition duration-300 hover:border-paper hover:text-paper active:scale-[0.97]"
              >
                Resume ↗
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {profile.seeking}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="order-first lg:order-none">
          <Portrait className="max-w-[15rem] sm:max-w-xs lg:max-w-sm" />
        </Reveal>
      </section>

      {/* Interactive terminal */}
      <section className="shell pb-12">
        <Reveal>
          <p className="kicker mb-4">
            <span className="text-accent">&gt;</span> try the terminal — type{" "}
            <span className="text-paper">help</span>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <CommandLine />
        </Reveal>
      </section>

      {/* Headline stats */}
      <section className="shell py-20">
        <Reveal>
          <h2 className="kicker mb-12">// by the numbers</h2>
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
      <section className="py-10">
        <div className="shell mb-6 flex items-baseline justify-between">
          <h2 className="display text-3xl lowercase tracking-tighter2 sm:text-4xl">
            <span className="text-accent">//</span>{" "}
            <Scramble text="selected work" />
          </h2>
          <Link
            href="/work"
            className="link-underline font-mono text-xs uppercase tracking-widest text-muted"
          >
            all work →
          </Link>
        </div>
        <div>
          {featured.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      {/* Selected research — leads with the investing A-material */}
      <section className="shell py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="display text-3xl lowercase tracking-tighter2 sm:text-4xl">
            <span className="text-accent">//</span>{" "}
            <Scramble text="selected research" />
          </h2>
          <Link
            href="/writing"
            className="link-underline font-mono text-xs uppercase tracking-widest text-muted"
          >
            all writing →
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-sm border border-line md:grid-cols-2">
          {research.map((item, i) => (
            <Link
              key={item.slug}
              href={item.slug === "investment-memo-series" ? "/ledger" : "/writing"}
              className="group flex flex-col gap-4 bg-ink p-6 transition-colors hover:bg-line/40 sm:p-8"
            >
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="text-accent">[{String(i + 1).padStart(2, "0")}]</span>
                <span>{item.kind}</span>
                <span aria-hidden>·</span>
                <span>{item.year}</span>
              </div>
              <h3 className="display flex items-start gap-2 text-2xl lowercase leading-tight tracking-tighter2 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 sm:text-3xl">
                {item.title}
                <span
                  aria-hidden
                  className="text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  ↗
                </span>
              </h3>
            </Link>
          ))}
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
