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
            Open the artifact index <Arrow />
          </Link>
        </div>
        <div className="selected-heading">
          <h2>
            Built.
            <br />
            <em>Out in the world.</em>
          </h2>
          <p>
            A live product. Fieldwork.
            <br />
            And the evidence behind them.
          </p>
        </div>
        <article className="stray-feature">
          <div className="stray-intro">
            <div>
              <span className="eyebrow">01 — STRAYPAW / SOLO FOUNDER</span>
              <h3>
                Every animal.
                <br />
                On the record.
              </h3>
            </div>
            <div>
              <p>
                Scattered sightings → shared records → coordinated care.
                <br />I built the product and its field workflows.
              </p>
              <div className="stray-metrics">
                <div>
                  <strong>30k+</strong>
                  <span>animal records</span>
                </div>
                <div>
                  <strong>28</strong>
                  <span>Indian cities</span>
                </div>
              </div>
              <div className="feature-links">
                <Link href="/work/straypaw">
                  Inside the project <Arrow />
                </Link>
                <a
                  href="https://straypaw.kapoorjay.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open StrayPaw <Arrow />
                </a>
              </div>
            </div>
          </div>
          <StrayPawExplorer />
          <CarePath />
          <div className="evidence-caption">
            <span>
              Record counts describe the register, not animals treated.
            </span>
            <a
              href="https://github.com/jaykapoor7/Pok-mon-go-dog-"
              target="_blank"
              rel="noreferrer"
            >
              Inspect the repository <Arrow />
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
                  I interviewed riders, coded responses,
                  <br />
                  and mapped barriers to medication access.
                </p>
                <a
                  className="artifact-inline"
                  href="/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the field brief <Arrow />
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
                <p>
                  I built a health-information platform,
                  <br />
                  then documented its design and evaluation.
                </p>
                <a
                  className="artifact-inline"
                  href="/work/juno-ai/Juno-AI-Research-Paper.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the research paper <Arrow />
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
          <span>02 / BUILT BEYOND THE BROWSER</span>
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
            <h3>Get people in the room.</h3>
            <p>
              I launched the speaker series. Ran outreach.
              <br />
              Built distribution and competitive research.
            </p>
            <a
              className="text-link"
              href="/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Open the strategy work <Arrow />
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
            <h3>
              Eight centres.
              <br />
              All the moving parts.
            </h3>
            <p>
              Technology, people, facilities, nutrition,
              <br />
              documentation, and finance.
            </p>
            <Link href="/work/tot-schools" className="text-link">
              See the operating work <Arrow />
            </Link>
            <a
              className="artifact-inline"
              href="/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Read the case study <Arrow />
            </a>
          </article>
        </div>
      </section>
      <section className="research-preview shell">
        <div className="section-rule">
          <span>03 / RESEARCH</span>
          <Link href="/research">
            Questions & evidence <Arrow />
          </Link>
        </div>
        <div className="research-intro">
          <h2>
            First,
            <br />
            <em>look closer.</em>
          </h2>
          <p>
            Public health. Accessible technology.
            <br />
            Human behavior. Data that needs context.
          </p>
        </div>
        <div className="research-rows">
          <Link href="/research#experience">
            <span>01</span>
            <h3>Technology people can use.</h3>
            <small>Accessible SmartTech Lab · Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <Link href="/work/upmc-emergency-medicine">
            <span>02</span>
            <h3>What happens before hospital?</h3>
            <small>UPMC Emergency Medicine · Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <Link href="/research#landscape">
            <span>03</span>
            <h3>Map the healthcare landscape.</h3>
            <small>India HealthTech · Research + dataset</small>
            <b>
              <Arrow />
            </b>
          </Link>
        </div>
      </section>
      <section className="play-preview">
        <div className="shell">
          <div className="section-rule">
            <span>04 / OFF THE CLOCK</span>
            <Link href="/play">
              Experiments <Arrow />
            </Link>
          </div>
          <div className="play-preview-layout">
            <div>
              <h2>
                Serious work.
                <br />
                <em>Playful mind.</em>
              </h2>
              <p>
                Sometimes the interface goes on strike.
                <br />
                Sometimes a dinosaur answers the call.
              </p>
              <Link className="pill dark" href="/play">
                Take a curious detour <Arrow />
              </Link>
            </div>
            <Link
              href="/play"
              className="play-art"
              aria-label="Explore the playable experiments"
            >
              <span className="orbit-word">PLEASE DO NOT PRESS</span>
              <div className="big-button">
                <Arrow />
              </div>
              <span className="play-note">(you were going to anyway)</span>
              <i className="spark s1">✳</i>
              <i className="spark s2">✦</i>
            </Link>
          </div>
        </div>
      </section>
      <section className="shell home-about">
        <div>
          <span className="eyebrow">05 / THE PERSON BEHIND IT</span>
          <h2>
            Different teams.
            <br />
            <em>Same game.</em>
          </h2>
          <Link className="text-link" href="/about">
            The story so far <Arrow />
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
            A FEW THINGS THAT STAYED <Arrow />
          </span>
        </Link>
      </section>
    </>
  );
}
