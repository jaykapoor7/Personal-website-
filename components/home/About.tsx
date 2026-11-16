import Image from "next/image";
import { education, leadership, life, skills } from "@/content/site";
import { items } from "@/content/work";
import { Thumb } from "../WorkRow";
import { Line, Section } from "./Section";

/** Where the subject sits in each photo. */
const focus: Record<string, string> = {
  "02_childhood_running": "object-[55%_45%]",
  "04_childhood_football_team": "object-[50%_50%]",
  "01_trojans_team": "object-[50%_42%]",
  "07_school_ceremony": "object-[26%_50%]",
  pitt_portrait: "object-[50%_62%]",
};

/** Every personal photo, oldest first. */
const photos = [
  ...life.slice(0, 4).map((p) => ({
    src: `/photos/${p.name}-640.webp`,
    alt: p.alt,
    caption: p.caption.replace("Bangalore", "Bengaluru"),
    fit: focus[p.name],
  })),
  {
    src: "/work/crowwd/arthavaad-stage-640.webp",
    alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, in New Delhi",
    caption: "Arthavaad, New Delhi",
    fit: "object-[50%_44%]",
  },
  {
    src: "/straypaw/street-dog.webp",
    alt: "The street dog outside a cafe that started StrayPaw",
    caption: "The dog that started StrayPaw",
    fit: "object-[45%_12%]",
  },
];

const play = items.filter((i) => i.group === "Play");

/** School and the teams I have led, one line each. */
const years: Record<string, string> = {
  "University of Pittsburgh": "Class of 2028",
  "The International School Bangalore": "2021–2023",
  "Team Leader": "",
  "Contingent Leader": "2023",
  "Founder, Entrepreneurship Club": "2021–2023",
  "Head of Vendor Acquisition": "2022",
};
const school = [
  ...education.map((e) => ({
    name: e.school,
    detail: e.detail,
    years: years[e.school] ?? "",
  })),
  ...leadership.map((l) => ({
    name: `${l.title}, ${l.org.replace("The International School Bangalore", "TISB")}`,
    detail: l.detail,
    years: years[l.title] ?? "",
  })),
];

/** The rest of me: where I am from, what I do for fun, and school. */
export function About() {
  return (
    <Section id="about" n="04" title="Outside work">
      <div className="mt-6 max-w-[560px] space-y-4 text-[15.5px] leading-[1.65] text-fg/90 sm:text-[16px]">
        <p>
          I grew up in Bengaluru, went to school at The International School
          Bangalore, spent summers working in New Delhi and now live in
          Pittsburgh. I play football; the photos below go back to my first
          team.
        </p>
        <p>
          StrayPaw started with one street dog outside a cafe. When I&apos;m not
          working, I make small browser games.
        </p>
      </div>

      <ul
        tabIndex={0}
        aria-label="Photos"
        className="no-bar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0"
      >
        {photos.map((p) => (
          <li key={p.src} className="w-[62vw] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <figure>
              <span className="relative block aspect-[4/5] overflow-hidden rounded-md bg-card ring-1 ring-fg/[0.08]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 62vw, 220px"
                  className={`object-cover ${p.fit ?? ""}`}
                />
              </span>
              <figcaption className="mt-2 text-[13px] text-muted">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <h3 id="play" className="label mt-12 scroll-mt-6">
        Play
      </h3>
      <ul className="mt-1">
        {play.map((p) => (
          <li key={p.id}>
            <Line
              name={p.name}
              detail={p.line}
              years={p.meta}
              href={p.href}
              thumb={
                <Thumb
                  src={p.image}
                  name={p.name}
                  sizes="44px"
                  className="aspect-square w-[44px] rounded-[4px]"
                />
              }
            />
          </li>
        ))}
      </ul>

      <h3 className="label mt-12">School and leadership</h3>
      <ul className="mt-1">
        {school.map((s) => (
          <li key={s.name + s.detail}>
            <Line name={s.name} detail={s.detail} years={s.years} />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[14px] text-muted">
        <span className="text-fg/80">Tools I use:</span> {skills.join(", ")}.
      </p>
    </Section>
  );
}
