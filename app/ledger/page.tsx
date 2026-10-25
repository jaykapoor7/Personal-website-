import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { LedgerBoard } from "@/components/LedgerBoard";
import { Counter, Reveal } from "@/components/motion";
import { ledger, ledgerStats as s, type Verdict } from "@/content/ledger";

export const metadata: Metadata = {
  title: "Forecast ledger",
  description:
    "Dated forecasts on Indian healthtech, fintech and health AI, with stated probabilities and outcomes.",
};

const verdictStyle: Record<Verdict, string> = {
  BUY: "bg-emerald-100 text-emerald-800",
  HOLD: "bg-slate-100 text-slate-700",
  WATCH: "bg-amber-100 text-amber-800",
  PASS: "bg-rose-100 text-rose-800",
};

const order = [
  "Dec 2026",
  "FY26 results",
  "Mar 2027",
  "Jun 2027",
  "Jul 2027",
  "Dec 2027",
  "Open-ended",
];

export default function Ledger() {
  const upcoming = order
    .map((d) => ({
      d,
      calls: ledger.calls.filter((c) => c.result === "OPEN" && c.due === d),
    }))
    .filter((g) => g.calls.length);
  const brierPct = (Number(s.brier) / 0.25) * 100;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-mesh absolute inset-0" aria-hidden="true" />
        <div
          className="bg-grid fade-mask pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative pb-10 pt-28 md:pt-32">
          <Reveal>
            <p className="label">Forecast ledger</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(44px,6.5vw,88px)] font-semibold leading-[0.95] tracking-[-0.045em]">
              Every forecast, with its probability and result.
            </h1>
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-fg/75">
              Each forecast gets a date and a probability when I make it. Indian
              healthtech, fintech and health AI, mostly from the memo library.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                [String(s.calls), "calls made"],
                [String(s.open), "still open"],
                [`${s.hits}/${s.resolved}`, "resolved right"],
                [`${s.avgConviction}%`, "average conviction"],
                [s.brier, "Brier score"],
              ].map(([v, l]) => (
                <div key={l} className="card p-5">
                  <dd className="text-[34px] font-semibold tracking-[-0.03em]">
                    <Counter value={v} />
                  </dd>
                  <dt className="text-[13px] text-muted">{l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal className="card p-6 sm:p-8">
          <p className="label">How it is scored</p>
          <p className="mt-3 text-[16px] leading-relaxed text-fg/80">
            The Brier score is the squared gap between the probability I gave
            and what happened, averaged over resolved calls. Zero is perfect;
            always saying 50% scores 0.25.
          </p>
          <div className="mt-8">
            <div className="relative h-3 rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400">
              <span
                className="absolute top-1/2 h-6 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg ring-2 ring-white"
                style={{ left: `${brierPct}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="mt-2 flex justify-between text-[12.5px] text-muted">
              <span>0 perfect</span>
              <span className="font-semibold text-fg">Mine: {s.brier}</span>
              <span>0.25 coin flip</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="card p-6 sm:p-8">
          <p className="label">Resolving next</p>
          <ol className="mt-4 space-y-4">
            {upcoming.map((g) => (
              <li key={g.d} className="grid grid-cols-[96px_1fr] gap-4">
                <span className="pt-0.5 text-[13px] font-semibold text-accent">
                  {g.d}
                </span>
                <ul className="space-y-1 text-[14px] leading-snug text-fg/80">
                  {g.calls.map((c) => (
                    <li key={c.prediction}>{c.prediction}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="shell pt-12">
        <Reveal>
          <h2 className="mb-5 text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.035em]">
            Every call
          </h2>
          <LedgerBoard calls={ledger.calls} />
        </Reveal>
      </section>

      <section className="shell pt-12">
        <Reveal>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.035em]">
              Coverage
            </h2>
            <a
              href="/research/Memo-Library-and-Ledger.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-accent hover:underline"
            >
              Memo library PDF <Arrow />
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ledger.coverage.map((m) => (
              <li key={m.id}>
                <a
                  href={
                    m.company === "Qure.ai"
                      ? "/research/Qure-AI-Investment-Memo.pdf"
                      : "/research/Memo-Library-and-Ledger.pdf"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="card block h-full p-4 transition-shadow hover:shadow-lg"
                >
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11.5px] font-bold ${verdictStyle[m.verdict]}`}
                  >
                    {m.verdict}
                  </span>
                  <span className="mt-3 block text-[15px] font-semibold leading-snug">
                    {m.company}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-muted">
                    {m.tag}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[12px] leading-relaxed text-faint">
            {ledger.disclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
