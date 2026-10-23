import Link from "next/link";
import type { Project } from "@/content/site";
import { ProjectVisual } from "./ProjectVisual";
import { Arrow } from "./Arrow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
        <ProjectVisual project={project} />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <span>{project.role}</span>
            {project.period && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.period}</span>
              </>
            )}
          </div>
          <h3 className="mt-1.5 text-2xl font-medium tracking-[-0.025em]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
            {project.summary}
          </p>
        </div>
        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
          <Arrow />
        </span>
      </div>
      {project.metrics && (
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-4">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-lg font-medium tracking-tight">{m.value}</dd>
              <dd className="text-xs text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </Link>
  );
}
