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
      <section>
        <div className="shell pb-12 pt-28 md:pt-36">
          <Reveal>
            <h1 className="max-w-4xl text-[clamp(40px,6vw,80px)] font-semibold leading-[0.95]">
              India healthtech, mapped.
            </h1>
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">
              36 companies across nine sectors, from telemedicine to rural care.
              Pick a sector, then a company.
            </p>
            <p className="mt-6 flex flex-wrap gap-6 text-[16px] font-medium">
              <a
                href="/research/India-HealthTech-Market-Map.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                The full map (PDF) <Arrow />
              </a>
              <a
                href="/research/India-HealthTech-Companies.csv"
                download
                className="text-accent hover:underline"
              >
                Dataset (CSV)
              </a>
            </p>
          </Reveal>
        </div>
      </section>
      <section className="shell">
        <MarketMap />
      </section>
    </>
  );
}
