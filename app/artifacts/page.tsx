import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { PageHeader, SmartLink } from "@/components/ui";
import { proofGroups } from "@/content/proof";

export const metadata: Metadata = {
  title: "Files",
  description:
    "Jay Kapoor’s papers, datasets, case studies, and shipped products in one place.",
};

export default function Artifacts() {
  return (
    <>
      <PageHeader
        eyebrow="Files"
        title="The receipts."
        lede="Every paper, dataset, case study, and shipped product referenced on this site."
      />
      <div className="shell space-y-16">
        {proofGroups.map((g) => (
          <section key={g.title} aria-label={g.title}>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h2 className="text-2xl font-medium tracking-tight">{g.title}</h2>
              <span className="font-mono text-xs text-faint">
                {g.items.length} items
              </span>
            </div>
            <ul className="grid sm:grid-cols-2">
              {g.items.map((a) => (
                <li key={a.href} className="border-b border-line">
                  <SmartLink
                    href={a.href}
                    className="group flex items-center justify-between gap-4 py-4 sm:pr-6"
                  >
                    <span>
                      <span className="block font-medium tracking-tight">
                        {a.title}
                      </span>
                      <span className="block text-sm text-muted">
                        {a.detail}
                      </span>
                    </span>
                    <Arrow className="text-faint transition-colors group-hover:text-fg" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
