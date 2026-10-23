import { Arrow } from "@/components/Arrow";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Research archive",
  description: "Older research notes and theses by Jay Kapoor.",
};
export default function Thesis() {
  return (
    <section className="page-hero wrap archive-page">
      <span className="eyebrow">Research archive</span>
      <h1>Research archive.</h1>
      <div className="archive-links">
        <a href="/research/India-GLP1-Sector-Thesis.pdf">
          India’s GLP-1 Inflection <Arrow />
        </a>
        <a href="/research/India-Fintech-Sector-Thesis.pdf">
          India’s Retail-Investing Reset <Arrow />
        </a>
        <Link href="/ledger">
          Calibration ledger <Arrow />
        </Link>
        <Link href="/writing">
          All writing <Arrow />
        </Link>
      </div>
    </section>
  );
}
