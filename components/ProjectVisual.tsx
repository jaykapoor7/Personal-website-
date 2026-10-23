import { Arrow } from "@/components/Arrow";
import Image from "next/image";
import { FieldNotes, JunoPath } from "./ProjectInteractions";
import type { Project } from "@/content/site";

export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual tone-${project.tone} ${large ? "project-visual-large" : ""}`}
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      {project.slug === "project-nidaan" ? (
        <FieldNotes />
      ) : project.slug === "juno-ai" ? (
        <JunoPath />
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt || project.title}
          fill
          sizes={
            large
              ? "(max-width: 800px) 100vw, 85vw"
              : "(max-width: 800px) 100vw, 55vw"
          }
          style={{ objectPosition: project.imagePosition || "center" }}
          priority={project.slug === "straypaw"}
        />
      ) : (
        <div className="visual-type" aria-hidden>
          {project.title}
        </div>
      )}
      {project.slug === "straypaw" && (
        <div className="visual-stamp">
          STRAYPAW{" "}
          <span>
            <Arrow />
          </span>
          <small>Animal records & care coordination.</small>
        </div>
      )}
    </div>
  );
}
