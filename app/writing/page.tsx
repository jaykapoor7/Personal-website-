import type { Metadata } from "next";
import { orderedWriting } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { ProofGrid } from "@/components/Proof";
import { MetricRow } from "@/components/Metric";

export const metadata: Metadata = {
  title: "Writing & Research",
  description:
    "Investment memos, market maps, and published research on Indian health tech and fintech.",
};

export default function WritingPage() {
  const items = orderedWriting();

  return (
    <>
      <section className="shell pt-20 pb-12 sm:pt-28">
        <Reveal>
          <p className="kicker mb-6">
            <span className="text-accent">&gt;</span> writing &amp; research
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-4xl text-4xl leading-tight sm:text-6xl">
            Research, memos, and building in public.
          </h1>
        </Reveal>
      </section>

      <section className="pb-10">
        {items.map((item, i) => (
          <div key={item.slug} className="border-t border-line">
            <div className="shell py-12">
              <Reveal>
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
                      <span>{item.kind}</span>
                      <span aria-hidden>·</span>
                      <span>{item.year}</span>
                    </div>
                    <h2 className="display mt-3 text-3xl sm:text-4xl">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-muted">{item.summary}</p>
                  </div>
                  <span className="text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              {item.metrics && item.metrics.length > 0 && (
                <Reveal delay={0.05}>
                  <div className="mt-8">
                    <MetricRow metrics={item.metrics} />
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.1}>
                <div className="mt-8">
                  <ProofGrid proof={item.proof} />
                </div>
              </Reveal>
            </div>
          </div>
        ))}
        <div className="border-t border-line" />
      </section>
    </>
  );
}
