import { proofGroups } from "@/content/proof";
import { Arrow } from "@/components/Arrow";
export const metadata = {
  title: "Artifacts",
  description:
    "Open the work: live products, research papers, operating case studies, datasets, and investment memos by Jay Kapoor.",
};
export default function Artifacts() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">THE ARTIFACT INDEX</span>
        <h1>
          Open the work.
          <br />
          <em>Make up your mind.</em>
        </h1>
        <p>
          Live builds, field notes, and the original files.
          <br />
          Work-sample limitations stay with each document.
        </p>
      </header>
      <div className="shell artifact-groups">
        {proofGroups.map((g) => (
          <section key={g.title}>
            <div className="section-rule">
              <h2>{g.title}</h2>
              <span>{String(g.items.length).padStart(2, "0")} ARTIFACTS</span>
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
