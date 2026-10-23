import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { WorkIndex } from "@/components/WorkIndex";
import { featuredProjects, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Companies, operating roles, research and side projects by Jay Kapoor.",
};

export default function Work() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <>
      <PageHeader title="Work" lede="Hover a name to see the real thing." />
      <section className="shell">
        <WorkIndex items={featuredProjects} />
      </section>
      <section className="shell pt-28">
        <Reveal>
          <h2 className="display mb-8 text-[clamp(40px,5vw,72px)]">
            Side projects and research
          </h2>
        </Reveal>
        <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex items-baseline gap-3 border-b border-line py-4 text-[15px] transition-colors hover:text-accent"
              >
                <span className="font-semibold tracking-tight">{p.title}</span>
                <span className="truncate text-muted">{p.summary}</span>
                <Arrow className="ml-auto shrink-0 text-faint group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
