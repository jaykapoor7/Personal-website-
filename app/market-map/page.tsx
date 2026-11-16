import type { Metadata } from "next";
import { Link } from "next-view-transitions";
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
        <div className="shell pb-12 pt-4 md:pt-8">
          <Reveal>
            <Link
              href="/#writing"
              className="group inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg"
            >
              <Arrow
                direction="left"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Research
            </Link>
            <h1 className="display mt-10 max-w-3xl text-[clamp(38px,6.4vw,58px)]">
              India healthtech, mapped.
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(19px,1.7vw,24px)] font-medium leading-[1.3] text-muted">
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
