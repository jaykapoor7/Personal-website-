import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import Image from "next/image";
import { LivingSystem } from "@/components/LivingSystem";
import { StrayPawExplorer } from "@/components/StrayPawExplorer";
import {
  CarePath,
  FieldNotes,
  JunoPath,
} from "@/components/ProjectInteractions";
export default function Home() {
  return (
    <>
      <LivingSystem />
      <section id="selected" className="selected-work shell">
        <div className="section-rule">
          <span>01 / SELECTED WORK</span>
          <Link href="/artifacts">
            Files <Arrow />
          </Link>
        </div>
        <div className="selected-heading">
          <h2>Projects.</h2>
        </div>
        <article className="stray-feature">
          <div className="stray-intro">
            <div>
              <span className="eyebrow">01 / FOUNDER</span>
              <h3>StrayPaw</h3>
            </div>
            <div>
              <p>Street-animal records and care coordination in India.</p>
              <div className="feature-links">
                <Link href="/work/straypaw">
                  Details <Arrow />
                </Link>
                <a
                  href="https://straypaw.kapoorjay.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website <Arrow />
                </a>
              </div>
            </div>
          </div>
          <StrayPawExplorer />
          <CarePath />
          <div className="evidence-caption">
            <span>Archived area data.</span>
            <a
              href="https://github.com/jaykapoor7/Pok-mon-go-dog-"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
          </div>
        </article>
        <div className="two-projects">
          <article className="nidaan-project">
            <FieldNotes />
            <div className="project-caption">
              <div>
                <span className="eyebrow">02 / FIELDWORK · BENGALURU</span>
                <h3>Project Nidaan</h3>
                <p>
                  Interviews and analysis on medication access for delivery
                  riders.
                </p>
                <a
                  className="artifact-inline"
                  href="/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Field brief <Arrow />
                </a>
              </div>
              <Link
                className="circle-link"
                href="/work/project-nidaan"
                aria-label="Explore Project Nidaan"
              >
                <Arrow />
              </Link>
            </div>
          </article>
          <article className="juno-project">
            <JunoPath />
            <div className="project-caption">
              <div>
                <span className="eyebrow">
                  03 / HEALTH INFORMATION · PROTOTYPE
                </span>
                <h3>Juno-AI</h3>
                <p>Health information and care navigation.</p>
                <a
                  className="artifact-inline"
                  href="/work/juno-ai/Juno-AI-Research-Paper.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Paper <Arrow />
                </a>
              </div>
              <Link
                className="circle-link"
                href="/work/juno-ai"
                aria-label="Explore Juno-AI"
              >
                <Arrow />
              </Link>
            </div>
          </article>
        </div>
      </section>
      <section className="shell operating-section">
        <div className="section-rule">
          <span>02 / EXPERIENCE</span>
          <Link href="/work">
            All work <Arrow />
          </Link>
        </div>
        <div className="operating-layout">
          <article className="crowwd-feature">
            <Link href="/work/crowwd" className="crowwd-photo">
              <picture>
                <source
                  media="(max-width:760px)"
                  srcSet="/work/crowwd/arthavaad-stage-640.webp"
                />
                <Image
                  src="/work/crowwd/arthavaad-stage-1280.webp"
                  alt="Jay at Arthavaad, the event series he launched at Crowwd"
                  fill
                  sizes="(max-width:760px) 100vw, 55vw"
                />
              </picture>
              <span>ARTHAVAAD / CROWWD</span>
            </Link>
            <h3>Crowwd</h3>
            <p>Growth, research, and the Arthavaad speaker series.</p>
            <a
              className="text-link"
              href="/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Research & strategy <Arrow />
            </a>
          </article>
          <article className="tot-feature">
            <span className="eyebrow">TOT SCHOOLS / OPERATIONS LEAD</span>
            <div className="centres-art" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </i>
              ))}
            </div>
            <h3>TOT Schools</h3>
            <p>Operations across eight childcare centres.</p>
            <Link href="/work/tot-schools" className="text-link">
              Details <Arrow />
            </Link>
            <a
              className="artifact-inline"
              href="/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Case study <Arrow />
            </a>
          </article>
        </div>
      </section>
      <section className="research-preview shell">
        <div className="section-rule">
          <span>03 / RESEARCH</span>
          <Link href="/research">
            Research <Arrow />
          </Link>
        </div>
        <div className="research-intro">
          <h2>Research.</h2>
        </div>
        <div className="research-rows">
          <Link href="/research#experience">
            <span>01</span>
            <h3>Accessible SmartTech Lab</h3>
            <small>Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <Link href="/work/upmc-emergency-medicine">
            <span>02</span>
            <h3>UPMC Emergency Medicine</h3>
            <small>Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <Link href="/research#landscape">
            <span>03</span>
            <h3>India HealthTech</h3>
            <small>Market map & dataset</small>
            <b>
              <Arrow />
            </b>
          </Link>
        </div>
      </section>
      <section className="play-preview">
        <div className="shell">
          <div className="section-rule">
            <span>04 / EXPERIMENTS</span>
            <Link href="/play">
              Experiments <Arrow />
            </Link>
          </div>
          <div className="play-preview-layout">
            <div>
              <h2>Experiments.</h2>
              <p>Small browser games and prototypes.</p>
              <Link className="pill dark" href="/play">
                Play <Arrow />
              </Link>
            </div>
            <Link
              href="/play"
              className="play-art"
              aria-label="Explore the playable experiments"
            >
              <span className="orbit-word">BROWSER GAMES</span>
              <div className="big-button">
                <Arrow />
              </div>
              <i className="spark s1">✳</i>
              <i className="spark s2">✦</i>
            </Link>
          </div>
        </div>
      </section>
      <section className="shell home-about">
        <div>
          <span className="eyebrow">05 / ABOUT</span>
          <h2>About.</h2>
          <Link className="text-link" href="/about">
            Photos <Arrow />
          </Link>
        </div>
        <Link href="/about" className="home-memory">
          <Image
            src="/photos/04_childhood_football_team-1280.webp"
            alt="Jay’s childhood football team on the pitch with their coach"
            fill
            sizes="(max-width:760px) 100vw, 55vw"
          />
          <span>
            FOOTBALL <Arrow />
          </span>
        </Link>
      </section>
    </>
  );
}
