import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import { allProjects } from "@/content/site";
import { ProjectVisual } from "@/components/ProjectVisual";
export const metadata = {
  title: "Selected work",
  description:
    "StrayPaw, Project Nidaan, Juno-AI, and the broader project index.",
};
const slugs = [
  "straypaw",
  "project-nidaan",
  "juno-ai",
  "crowwd",
  "tot-schools",
];
export default function Work() {
  const selected = slugs.map((s) => allProjects.find((p) => p.slug === s)!);
  const other = allProjects.filter((p) => !slugs.includes(p.slug));
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">PROJECTS & EXPERIENCE</span>
        <h1>Work.</h1>
      </header>
      <section className="shell all-work">
        {selected.map((p, i) => (
          <article key={p.slug} className="work-entry">
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <span className="eyebrow">{p.eyebrow}</span>
              <h2 style={{ marginTop: 18 }}>{p.title}</h2>
              <p>{p.summary}</p>
              <Link href={`/work/${p.slug}`} className="text-link">
                Details{" "}
                <span>
                  <Arrow />
                </span>
              </Link>
              <div className="work-source">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label} <Arrow />
                  </a>
                ))}
              </div>
            </div>
            <ProjectVisual project={p} />
          </article>
        ))}
      </section>
      <section className="shell">
        <div className="section-rule">
          <span>OTHER WORK</span>
          <Link href="/artifacts">
            Files <Arrow />
          </Link>
          <Link href="/experience">
            Experience <Arrow />
          </Link>
        </div>
        <div className="archive-index">
          {other.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`}>
              <div>
                {p.title}
                <small>
                  {p.eyebrow}
                  {p.period && ` · ${p.period}`}
                </small>
              </div>
              <span>
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
