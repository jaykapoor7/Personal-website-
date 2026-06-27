import type { Metadata } from "next";
import Link from "next/link";
import { ledger } from "@/content/ledger";
import { Reveal } from "@/components/Reveal";
import { MetricRow } from "@/components/Metric";
import { Scramble } from "@/components/Scramble";
import { LedgerCalls } from "@/components/LedgerCalls";
import { CoverageIndex } from "@/components/CoverageIndex";

export const metadata: Metadata = {
  title: "Calibration Ledger",
  description:
    "Dated, conviction-weighted investment calls scored against what actually happened — 75% hit rate, 0.134 Brier across the book.",
};

export default function LedgerPage() {
  return (
    <>
      <section className="shell pt-20 pb-12 sm:pt-28">
        <Reveal>
          <Link href="/writing" className="link-underline text-sm text-muted">
            ← Writing
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="kicker mt-8 mb-4">
            <span className="text-accent">&gt;</span> independent research · investment memos
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display text-5xl leading-[0.95] sm:text-7xl">
            <Scramble text="The Calibration Ledger" />
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-muted">{ledger.intro}</p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="shell hr-line border-t py-12">
        <Reveal>
          <MetricRow metrics={ledger.stats} />
        </Reveal>
      </section>

      {/* Dated calls */}
      <section className="shell py-12">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="display text-3xl">15 dated calls</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              call the open ones &rarr;
            </span>
          </div>
        </Reveal>
        <LedgerCalls calls={ledger.calls} />
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm text-muted">{ledger.scoring}</p>
        </Reveal>
      </section>

      {/* Coverage index */}
      <section className="shell hr-line border-t py-12">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="display text-3xl">Coverage index</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              10 names · 4 verdicts
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <CoverageIndex />
        </Reveal>
      </section>

      {/* CTA + disclaimer */}
      <section className="shell py-12">
        <Reveal>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="/research/Memo-Library-and-Ledger.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-paper px-6 py-3 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Read the full memo library (PDF) ↗
            </a>
            <Link
              href="/thesis"
              className="rounded-full border border-line px-6 py-3 text-muted transition-colors duration-300 hover:border-paper hover:text-paper"
            >
              The thesis behind the calls →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
            {ledger.disclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
