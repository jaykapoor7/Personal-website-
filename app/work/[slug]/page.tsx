import { Arrow } from "@/components/Arrow";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProjects, projects } from "@/content/site";
import { ProjectVisual } from "@/components/ProjectVisual";
import { CarePath } from "@/components/ProjectInteractions";
import { Rise } from "@/components/Scene";
export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = allProjects.find((x) => x.slug === params.slug);
  return { title: p?.title || "Work", description: p?.summary };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = allProjects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const i = allProjects.findIndex((x) => x.slug === p.slug),
    next = allProjects[(i + 1) % allProjects.length];
  return (
    <article className="project-page">
      <header className="wrap project-header">
        <Link href="/work" className="back-link">
          ← All work
        </Link>
        <Rise>
          <div className="project-meta">
            <span>{p.eyebrow}</span>
            <span>{p.period}</span>
          </div>
          <h1>
            {p.title}
            <span className="project-title-period">
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(allProjects.length).padStart(2, "0")}
            </span>
          </h1>
          <p>{p.summary}</p>
        </Rise>
      </header>
      <div className="project-page-image">
        <ProjectVisual project={p} large />
        {p.slug === "straypaw" && <CarePath />}
      </div>
      <div className="wrap project-body">
        <div className="body-label">
          <span className="eyebrow">The project</span>
          <span className="decor-line" />
        </div>
        <div className="body-content">
          {p.body.map((x) => (
            <p key={x}>{x}</p>
          ))}
          {p.did && (
            <div className="did-list">
              <span className="eyebrow">What I did</span>
              {p.did.map((x) => (
                <div key={x}>{x}</div>
              ))}
            </div>
          )}
          <div className="project-exits">
            {p.links.map((x) => (
              <a
                key={x.href}
                href={x.href}
                target={
                  x.href.startsWith("http") || x.href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
              >
                {x.label}
                <span>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {p.gallery && (
        <section className="project-gallery wrap">
          <div className="section-heading">
            <span className="eyebrow">In pictures</span>
          </div>
          <div className="project-gallery-grid">
            {p.gallery.map((g) => (
              <figure key={g.src}>
                <div>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 680px) 100vw, 50vw"
                  />
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <Link className="next-project" href={`/work/${next.slug}`}>
        <span className="eyebrow">Next project</span>
        <strong>{next.title}</strong>
        <span className="next-arrow">↗</span>
      </Link>
    </article>
  );
}
