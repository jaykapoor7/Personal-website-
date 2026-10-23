import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import Image from "next/image";
import { LivingSystem } from "@/components/LivingSystem";
import {
  CarePath,
  FieldNotes,
  JunoPath,
} from "@/components/ProjectInteractions";
import { Reveal } from "@/components/Reveal";
export default function Home() {
  return (
    <>
      <LivingSystem />
      <section className="introduction shell">
        <span className="eyebrow">THE THREAD THROUGH MY WORK</span>
        <Reveal>
          <h2>
            Notice the gap.
            <br />
            Understand the pieces.
            <br />
            <em>Build the connection.</em>
          </h2>
        </Reveal>
        <p>
          From street-animal records to healthcare access, I keep coming back to
          the same question: what stops the right help from reaching the right
          place?
        </p>
      </section>
      <section id="selected" className="selected-work shell">
        <div className="section-rule">
          <span>01 / SELECTED WORK</span>
          <Link href="/work">
            Full project index <Arrow />
          </Link>
        </div>
        <Reveal className="flagship">
          <div className="flagship-image">
            <Image
              src="/straypaw/street-dog.webp"
              alt="A street dog in Delhi, photographed for StrayPaw"
              fill
              sizes="(max-width: 760px) 100vw, 60vw"
            />
            <span className="image-tag">ON THE STREET → ON THE RECORD</span>
            <span className="photo-caption">StrayPaw / Field photograph</span>
          </div>
          <div className="flagship-copy">
            <span className="eyebrow">01 — STRAYPAW / BUILDING NOW</span>
            <h2>
              Care starts
              <br />
              with a record.
            </h2>
            <p>
              Shared animal records and care workflows for residents, rescue
              teams, and cities in India.
            </p>
            <div className="project-stat">
              <strong>30k+</strong>
              <span>
                animal records
                <br />
                in the project register
              </span>
            </div>
            <Link className="text-link" href="/work/straypaw">
              Inside StrayPaw{" "}
              <span>
                <Arrow />
              </span>
            </Link>
          </div>
          <CarePath />
        </Reveal>
        <div className="two-projects">
          <Reveal className="nidaan-project">
            <FieldNotes />
            <div className="project-caption">
              <div>
                <span className="eyebrow">02 / FIELD RESEARCH · 2022–2024</span>
                <h3>Project Nidaan</h3>
                <p>
                  Understanding what stands between delivery riders and basic
                  care.
                </p>
              </div>
              <Link
                className="circle-link"
                href="/work/project-nidaan"
                aria-label="Explore Project Nidaan"
              >
                <Arrow />
              </Link>
            </div>
          </Reveal>
          <Reveal className="juno-project">
            <JunoPath />
            <div className="project-caption">
              <div>
                <span className="eyebrow">
                  03 / HEALTH INFORMATION · PROTOTYPE
                </span>
                <h3>Juno-AI</h3>
                <p>
                  Exploring a clearer route from a health question to the next
                  step.
                </p>
              </div>
              <Link
                className="circle-link"
                href="/work/juno-ai"
                aria-label="Explore Juno-AI"
              >
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="research-preview shell">
        <div className="section-rule">
          <span>02 / ASK BETTER QUESTIONS</span>
          <Link href="/research">
            Research & notes <Arrow />
          </Link>
        </div>
        <div className="research-intro">
          <h2>
            The evidence
            <br />
            <em>comes first.</em>
          </h2>
          <p>
            Research across emergency care, accessibility, and human behavior
            informs the things I want to build.
          </p>
        </div>
        <div className="research-rows">
          <Link href="/work/upmc-emergency-medicine">
            <span>01</span>
            <h3>What happens before the hospital?</h3>
            <small>UPMC Emergency Medicine / Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <Link href="/research#experience">
            <span>02</span>
            <h3>Who gets to use the technology?</h3>
            <small>Accessible SmartTech Lab / Research assistant</small>
            <b>
              <Arrow />
            </b>
          </Link>
          <a
            href="/research/India-HealthTech-Market-Map.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>03</span>
            <h3>Where is healthcare being rebuilt?</h3>
            <small>India HealthTech / Independent market map</small>
            <b>
              <Arrow />
            </b>
          </a>
        </div>
      </section>
      <section className="play-preview">
        <div className="shell">
          <div className="section-rule">
            <span>03 / THE OTHER SIDE OF MY BRAIN</span>
            <Link href="/play">
              Enter the experiments <Arrow />
            </Link>
          </div>
          <div className="play-preview-layout">
            <div>
              <h2>
                Serious problems.
                <br />
                <em>Occasional nonsense.</em>
              </h2>
              <p>
                I also make websites where buttons go on strike and emergency
                services deploy dinosaurs.
              </p>
              <Link className="pill dark" href="/play">
                Take a curious detour{" "}
                <span>
                  <Arrow />
                </span>
              </Link>
            </div>
            <Link
              href="/play"
              className="play-art"
              aria-label="Please do not press (you were going to anyway) — explore the experiments"
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
    </>
  );
}
