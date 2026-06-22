import type { Metadata } from "next";
import Link from "next/link";
import { ledger, type CallResult, type Verdict } from "@/content/ledger";
import { Reveal } from "@/components/Reveal";
import { MetricRow } from "@/components/Metric";
import { Scramble } from "@/components/Scramble";

export const metadata: Metadata = {
  title: "Calibration Ledger",
  description:
    "Dated, conviction-weighted investment calls scored against what actually happened — 75% hit rate, 0.134 Brier across the book.",
};

const RESULT_STYLE: Record<CallResult, string> = {
  HIT: "bg-paper text-ink",
  MISS: "border border-paper text-paper",
  OPEN: "border border-line text-muted",
};

const VERDICT_STYLE: Record<Verdict, string> = {
  BUY: "bg-paper text-ink",
  HOLD: "border border-paper text-paper",
  WATCH: "border border-line text-muted",
  PASS: "border border-dashed border-line text-muted",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest ${className}`}
    >
      {label}
    </span>
  );
}

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
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="display text-3xl">15 dated calls</h2>
            <span className="text-xs uppercase tracking-widest text-muted">
              Prediction · Conviction · Result
            </span>
          </div>
        </Reveal>
        <ul className="hr-line border-t">
          {ledger.calls.map((c, i) => (
            <Reveal as="li" key={i} delay={Math.min(i, 6) * 0.03}>
              <div className="flex flex-col gap-3 border-b border-line py-5 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="max-w-2xl">
                  <p className="text-base leading-snug text-paper">
                    {c.prediction}
                  </p>
                  <p className="mt-1 text-sm text-muted">{c.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-sm text-muted">
                    <span className="text-paper">{c.conviction}%</span> conv.
                  </span>
                  <Badge label={c.result} className={RESULT_STYLE[c.result]} />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm text-muted">{ledger.scoring}</p>
        </Reveal>
      </section>

      {/* Coverage index */}
      <section className="shell hr-line border-t py-12">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="display text-3xl">Coverage index</h2>
            <span className="text-xs uppercase tracking-widest text-muted">
              10 names · 4 verdicts
            </span>
          </div>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-sm border border-line sm:grid-cols-2">
          {ledger.coverage.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-4 bg-ink p-5"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  {c.id}
                </p>
                <p className="mt-1 text-lg leading-tight">{c.company}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted">
                  {c.tag}
                </p>
              </div>
              <Badge label={c.verdict} className={VERDICT_STYLE[c.verdict]} />
            </li>
          ))}
        </ul>
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
