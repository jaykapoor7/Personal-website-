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
        <span className="eyebrow">RESEARCH</span>
        <h1>Research.</h1>
      </header>
      <section className="shell research-focus">
        <div>
          <span className="eyebrow">FIELDWORK / BENGALURU</span>
          <h2 style={{ marginTop: 20 }}>Project Nidaan</h2>
          <p>
            Interviews and analysis on medication access for delivery riders.
          </p>
          <Link className="text-link" href="/work/project-nidaan">
            Details{" "}
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
        <div>
          <span className="eyebrow">RESEARCH ASSISTANT / UPMC</span>
          <h2 style={{ marginTop: 20 }}>UPMC Emergency Medicine</h2>
          <p>
            EMR abstraction, REDCap coding, and analysis of prehospital care.
          </p>
          <Link className="text-link" href="/work/upmc-emergency-medicine">
            Details{" "}
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
            PDF <Arrow />
          </a>
        </div>
        <HealthTechMap />
      </section>
      <section id="experience" className="shell editorial-list">
        <div className="section-label">
          <span>RESEARCH ROLES</span>
          <Link href="/experience">
            Experience <Arrow />
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
          Files <Arrow />
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
          Work samples; assumptions and illustrative figures are labelled in
          each file.
        </p>
      </section>
    </>
  );
}
