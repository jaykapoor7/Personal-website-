import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import { writingItems, experience } from "@/content/site";
export const metadata = {
  title: "Research",
  description:
    "Fieldwork, emergency care, accessibility, and independent research by Jay Kapoor.",
};
const research = experience.filter(
  (x) => !["StrayPaw", "Crowwd", "HDFC Bank"].includes(x.name),
);
export default function Research() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">RESEARCH / QUESTIONS BEFORE ANSWERS</span>
        <h1>
          Go to the evidence.
          <br />
          <em>Stay curious.</em>
        </h1>
        <p>
          My research spans care access, accessibility, and human behavior. I’m
          learning how to turn observations into questions worth answering.
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
          <span className="eyebrow">
            RESEARCH ASSISTANT / AUG 2025–JAN 2026
          </span>
          <h2 style={{ marginTop: 20 }}>
            Before the
            <br />
            hospital door.
          </h2>
          <p>
            At UPMC Emergency Medicine, my work involved analysis of prehospital
            care patterns and emergency outcomes.
          </p>
          <Link className="text-link" href="/work/upmc-emergency-medicine">
            See the contribution{" "}
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
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
            <p>Research assistant · Aug 2024–May 2025</p>
            <small>
              Cultured primary bladder cells for research on cellular responses
              to stretch.
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
