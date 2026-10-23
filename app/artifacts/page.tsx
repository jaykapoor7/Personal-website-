import { proofGroups } from "@/content/proof";
import { Arrow } from "@/components/Arrow";
export const metadata = {
  title: "Files",
  description:
    "Jay Kapoor’s project links, papers, datasets, and case studies.",
};
export default function Artifacts() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">DOCUMENTS & LINKS</span>
        <h1>Files.</h1>
      </header>
      <div className="shell artifact-groups">
        {proofGroups.map((g) => (
          <section key={g.title}>
            <div className="section-rule">
              <h2>{g.title}</h2>
              <span>{String(g.items.length).padStart(2, "0")} FILES</span>
            </div>
            <div className="archive-index">
              {g.items.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  target={
                    a.href.startsWith("http") || a.href.includes(".")
                      ? "_blank"
                      : undefined
                  }
                  rel="noreferrer"
                >
                  <div>
                    {a.title}
                    <small>{a.detail}</small>
                  </div>
                  <Arrow />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
