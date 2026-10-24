import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { MarketMap } from "@/components/MarketMap";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "India HealthTech Market Map",
  description:
    "36 Indian healthtech companies across nine sectors: what they do, funding, investors and edge.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-mesh absolute inset-0" aria-hidden="true" />
        <div className="shell relative pb-8 pt-28 md:pt-32">
          <Reveal>
            <p className="label">Market map</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(40px,6vw,80px)] font-semibold leading-[0.95] tracking-[-0.045em]">
              India healthtech, mapped.
            </h1>
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-fg/75">
              36 companies across nine sectors, from telemedicine to rural care.
              Pick a sector, then a company.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="/research/India-HealthTech-Market-Map.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-primary h-10 px-4 text-[14px]"
              >
                The full map (PDF) <Arrow />
              </a>
              <a
                href="/research/India-HealthTech-Companies.csv"
                download
                className="btn-ghost h-10 px-4 text-[14px]"
              >
                Dataset (CSV)
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="shell">
        <MarketMap />
      </section>
    </>
  );
}
