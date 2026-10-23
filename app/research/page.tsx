import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { HealthTechMap } from "@/components/HealthTechMap";
import { PageHeader, SectionHeader } from "@/components/ui";
import { WritingList } from "@/components/WritingList";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied AI, accessibility, emergency medicine and field research by Jay Kapoor, plus investment memos and a healthtech market map.",
};

const labs = [
  {
    org: "Accessible SmartTech Lab",
    role: "Research Assistant, with Prof. Dan Ding",
    detail:
      "Human-machine interaction systems for accessible smart technologies.",
    period: "2026-now",
  },
  {
    org: "SCI 3Sixty Fellowship",
    role: "3Sixty Fellow, with Prof. Rosta Farzan",
    detail: "Applied AI research, including how nonprofits adopt AI.",
    period: "2026-now",
  },
  {
    org: "UPMC Emergency Medicine",
    role: "Research Assistant",
    detail:
      "Prehospital care patterns and emergency outcomes across UPMC's regional EMS system.",
    period: "2025-2026",
    href: "/work/upmc-emergency-medicine",
  },
  {
    org: "Apodaca Lab, Pitt",
    role: "Research Assistant",
    detail:
      "Urothelial mechanotransduction and urinary health, with Prof. Gerard Apodaca.",
    period: "2024-2025",
    href: "/work/apodaca-lab",
  },
  {
    org: "Project Nidaan",
    role: "Co-founder & Research Coordinator",
    detail:
      "55 field interviews on medication access among delivery riders in Bengaluru.",
    period: "2022-2024",
    href: "/work/project-nidaan",
  },
  {
    org: "Economics research",
    role: "with Prof. Yasir Khan",
    detail: "Economics research on India’s Kisan Rail.",
    period: "Pitt",
  },
  {
    org: "Pitt Sociology",
    role: "Research Assistant",
    detail: "Literature reviews and survey analysis in R and Stata.",
    period: "Pitt",
    href: "/work/pitt-sociology",
  },
];

export default function Research() {
  return (
    <>
      <PageHeader
        title="Research"
        lede="Labs at Pitt and UPMC, fieldwork in Bengaluru, and investment research I publish and score."
      />

      <section className="shell" aria-labelledby="labs">
        <SectionHeader
          index="Labs"
          title={<span id="labs">Labs and fieldwork</span>}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {labs.map((l) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[15px] tabular-nums text-faint">
                    {l.period}
                  </span>
                  {l.href && (
                    <Arrow className="text-faint transition-colors group-hover:text-fg" />
                  )}
                </div>
                <p className="display mt-6 text-3xl">{l.org}</p>
                <p className="mt-1 text-sm text-muted">{l.role}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg/80">
                  {l.detail}
                </p>
              </>
            );
            const cls =
              "group block h-full rounded-2xl border border-line p-6 transition-colors sm:p-7";
            return (
              <li key={l.org}>
                {l.href ? (
                  <Link
                    href={l.href}
                    className={`${cls} hover:border-fg/30 hover:bg-card/60`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="shell pt-24" aria-labelledby="writing">
        <SectionHeader
          index="Writing"
          title={<span id="writing">Papers, memos and theses</span>}
          action={{ label: "Forecast ledger", href: "/ledger" }}
        />
        <WritingList items={writing} />
      </section>

      <section id="landscape" className="shell pt-24" aria-labelledby="map">
        <SectionHeader
          index="Data"
          title={<span id="map">India healthtech, 36 companies</span>}
          action={{
            label: "Market map PDF",
            href: "/research/India-HealthTech-Market-Map.pdf",
          }}
        />
        <HealthTechMap />
      </section>
    </>
  );
}
