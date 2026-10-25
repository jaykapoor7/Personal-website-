import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { Bet } from "@/components/Bet";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";
import { Shelf } from "@/components/Shelf";
import { Questions } from "@/components/Questions";
import { SmartLink } from "@/components/ui";
import { otherResearch } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Jay Kapoor's research at the University of Pittsburgh and UPMC.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Labs, memos and forecasts"
        title="Research"
        aside="Lab work at Pitt and UPMC, and my own research on healthcare and fintech."
      />
      <Questions kind="Lab" />
      <section aria-label="Other research" className="shell mt-16">
        <p className="label">Also</p>
        <ul className="mt-5 grid gap-6 border-t border-line pt-5 md:grid-cols-3">
          {otherResearch.map((o) => (
            <li key={o.name}>
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                {o.href ? (
                  <SmartLink href={o.href} className="hover:text-accent">
                    {o.name}
                  </SmartLink>
                ) : (
                  o.name
                )}
              </p>
              <p className="mt-1 text-[14.5px] text-muted">{o.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="own-h" className="shell mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-fg pt-4">
          <h2
            id="own-h"
            className="text-[clamp(30px,3.6vw,48px)] font-semibold leading-none tracking-[-0.045em]"
          >
            My own research
          </h2>
          <p className="max-w-[44ch] text-[15px] text-muted">
            Investment memos, sector theses and a market map on Indian
            healthcare and fintech.
          </p>
        </div>
        <div className="mt-10">
          <Shelf />
        </div>
      </section>
      <section aria-labelledby="calls-h" className="shell mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-fg pt-4">
          <h2
            id="calls-h"
            className="text-[clamp(30px,3.6vw,48px)] font-semibold leading-none tracking-[-0.045em]"
          >
            Forecasts
          </h2>
          <Link
            href="/ledger"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold hover:text-accent"
          >
            Every call, scored <Arrow direction="right" />
          </Link>
        </div>
        <p className="mt-3 max-w-[56ch] text-[15px] text-muted">
          The memos make calls. Each one gets a date and a probability, and is
          scored when it lands. Bet against me.
        </p>
        <Reveal className="mt-8">
          <Bet />
        </Reveal>
      </section>
    </>
  );
}
