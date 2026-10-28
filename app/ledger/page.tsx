import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { LedgerBoard } from "@/components/LedgerBoard";
import { Reveal } from "@/components/motion";
import { ledger, ledgerStats as s } from "@/content/ledger";

export const metadata: Metadata = {
  title: "Forecast ledger",
  description:
    "Dated forecasts on Indian healthtech, fintech and health AI, with stated probabilities and outcomes.",
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
  return (
    <>
      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <h1 className="max-w-4xl text-[clamp(44px,6.5vw,88px)] font-semibold leading-[0.95]">
            Forecast ledger
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">
            Each forecast gets a date and a probability when I make it, and is
            scored when it resolves. Indian healthtech, fintech and health AI,
            mostly from the memo library.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {[
              [String(s.calls), "calls made"],
              [String(s.open), "still open"],
              [`${s.hits} of ${s.resolved}`, "resolved right"],
              [s.brier, "Brier score"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="text-[40px] font-semibold leading-none">{v}</dd>
                <dt className="mt-2 text-[15px] text-muted">{l}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
            The Brier score is the squared gap between the probability I gave
            and what happened, averaged over resolved calls. Zero is perfect.
            Always saying 50% scores 0.25. Mine is {s.brier}.
          </p>
        </Reveal>
      </section>

      <section className="shell pt-20">
        <h2 className="text-[clamp(28px,3vw,40px)] font-semibold">
          Resolving next
        </h2>
        <ul className="mt-6 space-y-5">
          {upcoming.map((g) => (
            <li
              key={g.d}
              className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-6"
            >
              <span className="text-[15px] font-medium text-accent">{g.d}</span>
              <span className="space-y-1 text-[16px] leading-snug">
                {g.calls.map((c) => (
                  <span key={c.prediction} className="block">
                    {c.prediction}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-20">
        <h2 className="mb-6 text-[clamp(28px,3vw,40px)] font-semibold">
          Every call
        </h2>
        <LedgerBoard calls={ledger.calls} />
      </section>

      <section className="shell pt-20">
        <h2 className="text-[clamp(28px,3vw,40px)] font-semibold">Coverage</h2>
        <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group block"
              >
                <span className="block text-[17px] font-semibold group-hover:text-accent">
                  {m.company}{" "}
                  <span className="font-normal text-muted">
                    ({m.verdict.toLowerCase()})
                  </span>
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-muted">
                  {m.tag}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/research/Memo-Library-and-Ledger.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-[16px] font-medium text-accent hover:underline"
        >
          Memo library PDF <Arrow />
        </a>
        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-muted">
          {ledger.disclaimer}
        </p>
      </section>
    </>
  );
}
