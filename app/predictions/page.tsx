import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { Bet } from "@/components/Bet";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";
import { Shelf } from "@/components/Shelf";

export const metadata: Metadata = {
  title: "Predictions",
  description:
    "Dated calls with odds, the memos behind them, and a chance to bet against Jay.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Calls, memos, papers"
        title="Predictions"
        aside="I write down what I think will happen, with odds, then score myself."
      />
      <div className="shell mt-12">
        <Reveal>
          <Bet />
        </Reveal>
        <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <p className="label">The memos and papers behind the calls</p>
          <Link
            href="/ledger"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold hover:text-accent"
          >
            Every call <Arrow direction="right" />
          </Link>
        </div>
        <div className="mt-8">
          <Shelf />
        </div>
      </div>
    </>
  );
}
