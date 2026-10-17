import type { Metadata } from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Research archive",description:"Older research notes and theses by Jay Kapoor."};
export default function Thesis(){return <section className="page-hero wrap archive-page"><span className="eyebrow">Research archive</span><h1>Older <em>notes.</em></h1><p>These notes are still here, though they’re no longer a separate part of the site.</p><div className="archive-links"><a href="/research/India-GLP1-Sector-Thesis.pdf">India’s GLP-1 Inflection ↗</a><a href="/research/India-Fintech-Sector-Thesis.pdf">India’s Retail-Investing Reset ↗</a><Link href="/ledger">Calibration ledger ↗</Link><Link href="/writing">All writing ↗</Link></div></section>}
