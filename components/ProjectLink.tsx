import Link from "next/link";
import { ProjectVisual } from "./ProjectVisual";
import type { Project } from "@/content/site";

export function ProjectLink({project,index=0,featured=false}:{project:Project;index?:number;featured?:boolean}){
 return <Link href={`/work/${project.slug}`} className={`project-link ${featured ? "feature-link" : ""}`}>
  <ProjectVisual project={project}/>
  <div className="project-link-copy"><span className="eyebrow">{String(index+1).padStart(2,"0")} / {project.eyebrow}</span><div className="project-link-title"><h3>{project.title}</h3><span className="round-arrow" aria-hidden>↗</span></div><p>{project.summary}</p></div>
 </Link>
}
