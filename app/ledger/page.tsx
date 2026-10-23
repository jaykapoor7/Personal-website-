import { Arrow } from "@/components/Arrow";
import type { Metadata } from "next";
import { ledger } from "@/content/ledger";
export const metadata: Metadata = {
  title: "Calibration ledger",
  description: "Dated forecasts and their outcomes.",
};
export default function Ledger() {
  return (
    <>
      <header className="page-hero wrap">
        <span className="eyebrow">Research / Archive</span>
        <h1>
          Calibration
          <br />
          <em>ledger.</em>
        </h1>
        <p>
          A list of predictions I wrote down with probabilities. The resolved
          calls stay here alongside the open ones.
        </p>
        <a className="text-link" href="/research/Memo-Library-and-Ledger.pdf">
          Read the memo library{" "}
          <span>
            <Arrow />
          </span>
        </a>
      </header>
      <section className="ledger-section wrap">
        <div className="section-heading">
          <span className="eyebrow">Dated calls</span>
          <span className="quiet-link">{ledger.calls.length} total</span>
        </div>
        <div className="ledger-list">
          {ledger.calls.map((c, i) => (
            <article key={i} className="ledger-row">
              <span className="row-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{c.prediction}</h2>
                <p>{c.detail}</p>
              </div>
              <span
                className={`ledger-result result-${c.result.toLowerCase()}`}
              >
                {c.conviction}% · {c.result.toLowerCase()}
              </span>
            </article>
          ))}
        </div>
        <p className="source-note">{ledger.disclaimer}</p>
      </section>
    </>
  );
}
