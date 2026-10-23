import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { SmartLink } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import { education, experience } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where Jay Kapoor has worked.",
};

export default function Experience() {
  const rows = [
    ...experience,
    ...education.map((e) => ({
      org: e.school,
      role: e.detail,
      period: e.period,
      href: undefined,
    })),
  ];
  return (
    <>
      <PageHeader title="Where I've worked">
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-8"
        >
          Resume <Arrow />
        </a>
      </PageHeader>
      <section className="shell">
        <ul className="border-t border-line">
          {rows.map((e) => {
            const row = (
              <>
                <span className="display text-[clamp(24px,3vw,40px)]">
                  {e.org}
                </span>
                <span className="text-muted">{e.role}</span>
                <span className="ml-auto shrink-0 tabular-nums text-faint">
                  {e.period}
                </span>
              </>
            );
            const cls =
              "flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line py-5";
            return (
              <li key={`${e.org}-${e.role}`}>
                {e.href ? (
                  <SmartLink
                    href={e.href}
                    className={`${cls} transition-colors hover:text-accent`}
                  >
                    {row}
                  </SmartLink>
                ) : (
                  <div className={cls}>{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
