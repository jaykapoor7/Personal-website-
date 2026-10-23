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
    "Applied AI, accessibility, emergency-medicine, and field research by Jay Kapoor — plus investment memos and a healthtech market map.",
};

const labs = [
  {
    org: "Accessible SmartTech Lab",
    role: "Research Assistant · with Prof. Dan Ding",
    detail:
      "Human–machine interaction systems for accessible smart technologies.",
    period: "2026 – now",
  },
  {
    org: "SCI 3Sixty Fellowship",
    role: "3Sixty Fellow · with Prof. Rosta Farzan",
    detail: "Applied AI research, including how nonprofits adopt AI.",
    period: "2026 – now",
  },
  {
    org: "UPMC Emergency Medicine",
    role: "Research Assistant",
    detail:
      "EMR abstraction and REDCap coding for retrospective trauma studies.",
    period: "2025 – 2026",
    href: "/work/upmc-emergency-medicine",
  },
  {
    org: "Apodaca Lab, Pitt School of Medicine",
    role: "Research Assistant",
    detail:
      "Primary bladder urothelial cell culture for PIEZO/TMEM63 mechanotransduction studies; figures for manuscripts and grants.",
    period: "2024 – 2025",
    href: "/work/apodaca-lab",
  },
  {
    org: "Project Nidaan",
    role: "Co-founder & Research Coordinator",
    detail:
      "55 field interviews on medication access among delivery riders in Bengaluru.",
    period: "2022 – 2024",
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
        eyebrow="Research"
        title={
          <>
            From cell cultures to{" "}
            <span className="font-serif font-normal italic">
              field interviews.
            </span>
          </>
        }
        lede="Lab and clinical research at Pitt and UPMC, fieldwork in Bengaluru, and independent investment research I publish and score."
      />

      <section className="shell" aria-labelledby="labs">
        <SectionHeader
          index="01"
          title={<span id="labs">Labs &amp; fieldwork</span>}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {labs.map((l) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">
                    {l.period}
                  </span>
                  {l.href && (
                    <Arrow className="text-faint transition-colors group-hover:text-fg" />
                  )}
                </div>
                <p className="mt-6 text-xl font-medium tracking-tight">
                  {l.org}
                </p>
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
          index="02"
          title={<span id="writing">Papers, memos &amp; theses</span>}
          action={{ label: "Forecast ledger", href: "/ledger" }}
        />
        <WritingList items={writing} />
        <p className="mt-5 text-sm text-muted">
          Work samples. Assumptions and illustrative figures are labelled in
          each file.
        </p>
      </section>

      <section id="landscape" className="shell pt-24" aria-labelledby="map">
        <SectionHeader
          index="03"
          title={<span id="map">India healthtech, mapped</span>}
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
