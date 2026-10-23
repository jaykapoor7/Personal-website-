import { HealthTechMap } from "@/components/HealthTechMap";
import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import { writingItems, experience } from "@/content/site";
export const metadata = {
  title: "Research",
  description:
    "Fieldwork, emergency care, accessibility, and independent research by Jay Kapoor.",
};
const research = experience.filter((x) =>
  [
    "Accessible SmartTech Lab",
    "SCI 3Sixty",
    "Research with Prof. Rosta Farzan",
    "Prof. Yasir Khan",
  ].includes(x.name),
);
export default function Research() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">RESEARCH / QUESTIONS BEFORE ANSWERS</span>
        <h1>
          Questions first.
          <br />
          <em>Evidence always.</em>
        </h1>
        <p>
          Care access. Accessible technology. Human behavior. Here is what I
          worked on, and what you can inspect.
        </p>
      </header>
      <section className="shell research-focus">
        <div>
          <span className="eyebrow">FIELDWORK / BENGALURU</span>
          <h2 style={{ marginTop: 20 }}>
            What makes care
            <br />
            hard to reach?
          </h2>
          <p>
            For Project Nidaan, I interviewed delivery riders about medication
            and care access, then organized and analyzed their responses.
          </p>
          <Link className="text-link" href="/work/project-nidaan">
            Explore the fieldwork{" "}
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
        <div>
          <span className="eyebrow">RESEARCH ASSISTANT / UPMC</span>
          <h2 style={{ marginTop: 20 }}>
            Before the
            <br />
            hospital door.
          </h2>
          <p>
            My work included EMR abstraction and coding in REDCap for
            retrospective trauma studies, and analysis of prehospital care
            patterns and emergency outcomes.
          </p>
          <Link className="text-link" href="/work/upmc-emergency-medicine">
            See the contribution{" "}
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
      </section>
      <section id="landscape" className="shell">
        <div className="section-rule">
          <span>INDEPENDENT RESEARCH / INDIA HEALTHTECH</span>
          <a
            href="/research/India-HealthTech-Market-Map.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Full landscape <Arrow />
          </a>
        </div>
        <HealthTechMap />
      </section>
      <section id="experience" className="shell editorial-list">
        <div className="section-label">
          <span>RESEARCH ROLES & WORKSTREAMS</span>
          <Link href="/experience">
            Full experience <Arrow />
          </Link>
        </div>
        {research.map((e, i) => (
          <article key={e.name}>
            <span className="list-number">0{i + 1}</span>
            <div>
              <h2>{e.name}</h2>
              <p>{e.detail}</p>
              {"description" in e && e.description && (
                <small>{e.description}</small>
              )}
            </div>
          </article>
        ))}
        <article>
          <span className="list-number">05</span>
          <div>
            <h2>Apodaca Lab</h2>
            <p>Research assistant · 2024–2025</p>
            <small>
              Cultured primary bladder urothelial cells for PIEZO/TMEM63
              mechanotransduction studies; contributed figures toward
              manuscripts and grants.
            </small>
          </div>
          <Link href="/work/apodaca-lab" aria-label="Read about Apodaca Lab">
            <Arrow />
          </Link>
        </article>
        <article>
          <span className="list-number">06</span>
          <div>
            <h2>Pitt Sociology</h2>
            <p>Research assistant</p>
            <small>
              Literature reviews, survey data, and analysis in R and Stata.
            </small>
          </div>
          <Link
            href="/work/pitt-sociology"
            aria-label="Read about Pitt Sociology"
          >
            <Arrow />
          </Link>
        </article>
      </section>
      <div className="shell research-artifacts-cta">
        <a href="/artifacts">
          Open every research file, case study, and dataset <Arrow />
        </a>
      </div>
      <section className="shell writing-editorial reading-list">
        <div className="section-label">
          <span>INDEPENDENT RESEARCH & WRITING</span>
          <span>WORK SAMPLES</span>
        </div>
        {writingItems.map((x, i) => (
          <article key={x.title}>
            <span className="list-number">
              0{i + 1} / {x.type}
            </span>
            <div>
              <h2>{x.title}</h2>
              <p>{x.description}</p>
              <div>
                {x.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {l.label} <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
        <p className="source-note">
          Independent analyses and portfolio work samples. Illustrative figures
          and model assumptions are identified in the underlying documents.
        </p>
      </section>
    </>
  );
}
