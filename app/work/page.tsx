import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHeader, SectionHeader } from "@/components/ui";
import { featuredProjects, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Companies, operating roles, research, and prototypes by Jay Kapoor.",
};

export default function Work() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={
          <>
            Things I’ve started, run,{" "}
            <span className="font-serif font-normal italic">and shipped.</span>
          </>
        }
        lede="Two companies, an operations role across eight centres, a founder’s office, fieldwork, and a handful of prototypes. Each links to the original work."
      />
      <section className="shell">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section className="shell pt-28">
        <SectionHeader index="Also" title="Roles, research & prototypes" />
        <ul className="border-t border-line">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid items-baseline gap-1 border-b border-line py-5 transition-colors hover:bg-card/60 sm:grid-cols-[1.1fr_1.4fr_120px_24px] sm:gap-6"
              >
                <span className="text-lg font-medium tracking-tight">
                  {p.title}
                </span>
                <span className="text-[15px] text-muted">{p.summary}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-faint">
                  {p.period ?? p.category}
                </span>
                <Arrow className="hidden text-faint transition-colors group-hover:text-fg sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
