import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { PageHeader } from "@/components/ui";
import { education, experience } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Jay Kapoor’s founder, operating, and research experience.",
};

export default function Experience() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Everywhere I’ve worked."
        lede="Founder roles, operating jobs, and research — newest first."
      >
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-8"
        >
          Download résumé <Arrow />
        </a>
      </PageHeader>
      <section className="shell">
        <ol className="border-t border-line">
          {experience.map((e) => {
            const row = (
              <>
                <span className="font-mono text-xs uppercase tracking-wider text-faint md:pt-1.5">
                  {e.period}
                </span>
                <div>
                  <p className="text-xl font-medium tracking-tight">{e.org}</p>
                  <p className="text-[15px] text-muted">{e.role}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">
                  {e.detail}
                </p>
                <span className="hidden justify-self-end text-faint group-hover:text-fg md:block">
                  {e.href && <Arrow />}
                </span>
              </>
            );
            const cls =
              "group grid gap-2 border-b border-line py-7 md:grid-cols-[130px_1fr_1.3fr_24px] md:gap-8";
            return (
              <li key={e.org}>
                {e.href ? (
                  <Link
                    href={e.href}
                    className={`${cls} transition-colors hover:bg-card/60`}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className={cls}>{row}</div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="eyebrow mt-20">Education</p>
        <ul className="mt-5 border-t border-line">
          {education.map((e) => (
            <li
              key={e.school}
              className="grid gap-1 border-b border-line py-6 md:grid-cols-[130px_1fr] md:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-faint md:pt-1.5">
                {e.period}
              </span>
              <div>
                <p className="text-xl font-medium tracking-tight">{e.school}</p>
                <p className="text-[15px] text-muted">{e.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
