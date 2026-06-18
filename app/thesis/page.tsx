import type { Metadata } from "next";
import Link from "next/link";
import { thesis, type Verdict } from "@/content/thesis";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Investing Thesis",
  description:
    "How I think about backing health-tech and fintech companies — distribution, unit economics, regulatory moats, and a calibrated, dated approach to conviction.",
};

const VERDICT_STYLE: Record<Verdict, string> = {
  BUY: "bg-paper text-ink",
  HOLD: "border border-paper text-paper",
  WATCH: "border border-line text-muted",
  PASS: "border border-dashed border-line text-muted",
};

export default function ThesisPage() {
  return (
    <>
      <section className="shell pt-20 pb-12 sm:pt-28">
        <Reveal>
          <Link href="/ledger" className="link-underline text-sm text-muted">
            ← Calibration ledger
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-8 mb-4 text-sm uppercase tracking-widest text-muted">
            Investing · How I think
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display text-5xl leading-[0.95] sm:text-7xl">Thesis</h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-muted">{thesis.intro}</p>
        </Reveal>
      </section>

      {/* What I look for */}
      <section className="shell hr-line border-t py-12">
        <Reveal>
          <h2 className="mb-8 text-sm uppercase tracking-widest text-muted">
            What I look for
          </h2>
        </Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {thesis.lookFor.map((p, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 0.05}>
              <div className="flex gap-5">
                <span className="display text-2xl text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The verdict ladder */}
      <section className="shell hr-line border-t py-12">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="display text-3xl">The verdict ladder</h2>
            <Link href="/ledger" className="link-underline text-sm text-muted">
              See the calls →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {thesis.ladder.map((row) => (
            <Reveal key={row.verdict}>
              <div className="flex h-full flex-col gap-3 rounded-sm border border-line p-6">
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest ${VERDICT_STYLE[row.verdict]}`}
                >
                  {row.verdict}
                </span>
                <p className="text-paper">{row.meaning}</p>
                <p className="mt-auto text-sm text-muted">{row.examples}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Where I focus */}
      <section className="shell hr-line grid gap-10 border-t py-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-muted">
            Where I focus
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <p className="display text-2xl">{thesis.focus.markets}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {thesis.focus.sectors.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-4 py-2 text-sm"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Principles of the practice */}
      <section className="shell hr-line grid gap-10 border-t py-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-muted">
            How I keep it honest
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="space-y-6">
            {thesis.principles.map((p, i) => (
              <li key={i}>
                <h3 className="text-lg text-paper">{p.title}</h3>
                <p className="mt-1 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="shell py-12">
        <Reveal>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/ledger"
              className="rounded-sm border border-paper px-5 py-3 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              See the calibration ledger →
            </Link>
            <a
              href="/research/Memo-Library-and-Ledger.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-line px-5 py-3 text-muted transition-colors hover:border-paper hover:text-paper"
            >
              Read the memos (PDF) ↗
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
