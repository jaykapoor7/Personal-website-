import { Arrow } from "@/components/Arrow";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "About",
  description:
    "Jay Kapoor — Economics & Statistics at Pitt, building software and increasingly focused on public health.",
};
export default function About() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">ABOUT / A WORK IN PROGRESS</span>
        <h1>
          Hi, I’m Jay.
          <br />
          <em>I like figuring things out.</em>
        </h1>
        <p>
          I study Economics and Statistics at the University of Pittsburgh, with
          a minor in Information Sciences. I build software, work on research,
          and follow questions into unfamiliar places.
        </p>
      </header>
      <section className="shell about-editorial">
        <div className="about-portrait">
          <Image
            src="/jay-kapoor.jpg"
            alt="Jay Kapoor outdoors"
            fill
            sizes="(max-width:760px) 100vw, 42vw"
            priority
          />
        </div>
        <div className="about-editorial-copy">
          <span className="eyebrow">THE DIRECTION</span>
          <p>
            I’m increasingly focused on public health: how care reaches people,
            what gets lost between institutions, and where better data and
            software can help.
          </p>
          <p>
            StrayPaw is where I’m putting that into practice. It connects
            street-animal sightings, records, and care workflows in India.
            Nidaan took me into conversations with delivery riders about
            healthcare access. Research at Pitt has given me other ways to ask
            and test questions.
          </p>
          <p>
            I’m early in this. I want to keep getting closer to the people doing
            the work, and build things they can actually use.
          </p>
          <p>
            And sometimes I make a website where the buttons unionize. Curiosity
            has range.
          </p>
          <div className="about-details">
            <div>
              <span>Based in</span>
              <strong>Pittsburgh, PA</strong>
            </div>
            <div>
              <span>Studying</span>
              <strong>Economics & Statistics</strong>
            </div>
            <div>
              <span>Building now</span>
              <strong>StrayPaw</strong>
            </div>
          </div>
          <a
            href="/jay-kapoor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            The résumé{" "}
            <span>
              <Arrow />
            </span>
          </a>
        </div>
      </section>
      <section className="shell about-trail">
        <span className="eyebrow">FOLLOW A THREAD</span>
        <Link href="/research">
          Questions I’m working on{" "}
          <span>
            <Arrow />
          </span>
        </Link>
        <Link href="/play">
          Things I made for the fun of it{" "}
          <span>
            <Arrow />
          </span>
        </Link>
        <Link href="/experience">
          Places I’ve contributed{" "}
          <span>
            <Arrow />
          </span>
        </Link>
      </section>
    </>
  );
}
