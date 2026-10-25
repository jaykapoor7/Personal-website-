import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { Bet } from "@/components/Bet";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";
import { Shelf } from "@/components/Shelf";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Dated calls with odds, the memos behind them, and a chance to bet against Jay.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Memos, theses, papers, forecasts"
        title="Writing"
        aside="Memos and papers, plus the calls they make, with odds, scored when they land."
      />
      <div className="shell mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="label">Memos, theses and papers</p>
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
        <div className="mt-24 flex flex-wrap items-end justify-between gap-4">
          <p className="label">Forecasts. Bet against me</p>
        </div>
        <Reveal className="mt-8">
          <Bet />
        </Reveal>
      </div>
    </>
  );
}
