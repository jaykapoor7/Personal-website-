import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { Bet } from "@/components/Bet";
import { LedgerBoard } from "@/components/LedgerBoard";
import { Link } from "next-view-transitions";
import { Reveal } from "@/components/motion";
import { ledger, ledgerStats as s } from "@/content/ledger";

export const metadata: Metadata = {
  title: "Forecast ledger",
  description:
    "Dated forecasts on Indian healthtech, fintech and health AI, with stated probabilities and outcomes.",
};

export default function Ledger() {
  return (
    <>
      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <Link
            href="/#research"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-card px-4 text-[14px] font-semibold transition-colors hover:bg-fg hover:text-white"
          >
            <Arrow
              direction="left"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Research
          </Link>
          <h1 className="display mt-8 max-w-5xl text-[clamp(60px,10.5vw,170px)]">
            Forecast ledger
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(19px,1.7vw,24px)] font-medium leading-[1.3] text-muted">
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
                <dd className="display text-[clamp(48px,6vw,88px)] text-accent">
                  {v}
                </dd>
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

      <section aria-labelledby="bet-h" className="shell mt-16 md:mt-24">
        <div className="rounded-[28px] bg-paper p-6 sm:p-10 md:rounded-[40px] md:p-14">
          <h2 id="bet-h" className="display text-[clamp(34px,4.4vw,68px)]">
            Bet against me
          </h2>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            Pick your own odds on one of my open calls, then see mine.
          </p>
          <div className="mt-10">
            <Bet />
          </div>
        </div>
      </section>

      <section className="shell pt-20">
        <h2 className="display mb-6 text-[clamp(34px,4.4vw,68px)]">
          Every call
        </h2>
        <LedgerBoard calls={ledger.calls} />
      </section>

      <section className="shell pt-20">
        <h2 className="display text-[clamp(34px,4.4vw,68px)]">Coverage</h2>
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
