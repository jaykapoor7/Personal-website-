import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { PageHeader } from "@/components/ui";
import { ledger, type CallResult, type Verdict } from "@/content/ledger";

export const metadata: Metadata = {
  title: "Forecast ledger",
  description:
    "Dated forecasts on healthcare and fintech companies, with stated probabilities and outcomes.",
};

const resultStyle: Record<CallResult, string> = {
  HIT: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400",
  MISS: "bg-rose-500/15 text-rose-800 dark:text-rose-400",
  OPEN: "bg-fg/[0.06] text-muted",
};
const verdictStyle: Record<Verdict, string> = {
  BUY: "text-emerald-800 dark:text-emerald-400",
  HOLD: "text-muted",
  WATCH: "text-amber-800 dark:text-amber-400",
  PASS: "text-rose-800 dark:text-rose-400",
};

export default function Ledger() {
  return (
    <>
      <PageHeader
        title="Forecast ledger"
        lede="Every forecast is dated and given a probability when I make it. Then it gets scored, including the ones I got wrong."
      >
        <a
          href="/research/Memo-Library-and-Ledger.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost mt-8"
        >
          Memo library PDF <Arrow />
        </a>
      </PageHeader>

      <section className="shell" aria-label="Summary">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {ledger.stats.map((s) => (
            <div key={s.label} className="bg-bg p-6 md:p-8">
              <dd className="display text-5xl md:text-6xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
          {ledger.scoring}
        </p>
      </section>

      <section className="shell pt-20" aria-labelledby="calls">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 id="calls" className="display text-4xl">
            Forecasts
          </h2>
          <span className="text-[13px] tabular-nums text-faint">
            {ledger.calls.length} calls
          </span>
        </div>
        <ol>
          {ledger.calls.map((c, i) => (
            <li
              key={c.prediction}
              className="grid gap-3 border-b border-line py-5 sm:grid-cols-[40px_1fr_140px] sm:items-center sm:gap-6"
            >
              <span className="hidden text-[13px] tabular-nums text-faint sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[17px] leading-snug">{c.prediction}</p>
                <p className="mt-1 text-sm text-muted">{c.detail}</p>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <div
                  className="h-1.5 w-16 overflow-hidden rounded-full bg-line"
                  title={`${c.conviction}% conviction`}
                >
                  <div
                    className="h-full rounded-full bg-fg/70"
                    style={{ width: `${c.conviction}%` }}
                  />
                </div>
                <span className="w-8 text-[13px] tabular-nums text-muted">
                  {c.conviction}%
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[12px] font-semibold ${resultStyle[c.result]}`}
                >
                  {c.result}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pt-20" aria-labelledby="coverage">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 id="coverage" className="display text-4xl">
            Coverage
          </h2>
          <span className="text-[13px] tabular-nums text-faint">
            {ledger.coverage.length} memos
          </span>
        </div>
        <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2">
          {ledger.coverage.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between gap-4 bg-bg py-4 sm:pr-6 [&:nth-child(even)]:sm:pl-6"
            >
              <div>
                <p className="font-medium tracking-tight">{m.company}</p>
                <p className="text-sm text-muted">{m.tag}</p>
              </div>
              <span
                className={`text-[13px] font-semibold ${verdictStyle[m.verdict]}`}
              >
                {m.verdict}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-faint">
          {ledger.disclaimer}
        </p>
      </section>
    </>
  );
}
