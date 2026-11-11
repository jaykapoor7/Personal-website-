"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { roles } from "@/content/site";
import { Arrow } from "../Arrow";
import { Reveal, RiseWords, Stagger, StaggerItem } from "../motion";

/** The three ways a card can be blue and white. */
type Tone = "solid" | "tint" | "line";
const tones: Record<Tone, { card: string; quiet: string; knob: string }> = {
  solid: {
    card: "bg-accent text-white",
    quiet: "text-white/85",
    knob: "bg-white/20 group-hover:bg-white group-hover:text-[rgb(var(--fg))]",
  },
  tint: {
    card: "bg-card text-fg",
    quiet: "text-muted",
    knob: "bg-white group-hover:bg-fg group-hover:text-white",
  },
  line: {
    card: "bg-white text-fg ring-2 ring-inset ring-accent",
    quiet: "text-muted",
    knob: "bg-card group-hover:bg-fg group-hover:text-white",
  },
};

type Look = {
  tone: Tone;
  /** What I did there, in one line. */
  did: string;
  papers?: { src: string; alt: string }[];
  photos?: { src: string; alt: string; fit: string }[];
};

const looks: Record<string, Look> = {
  tarc: {
    tone: "tint",
    did: "Feasibility for a housing site in Gurugram: zoning, pricing and development assumptions.",
    papers: [
      {
        src: "/covers/Development-Feasibility-Memo-2025.webp",
        alt: "First page of the development feasibility memo",
      },
    ],
  },
  "tot-schools": {
    tone: "line",
    did: "Technology, hiring, facilities and finance across 8 centres.",
    papers: [
      {
        src: "/covers/TOT-Schools-Operations-Case-Study.webp",
        alt: "First page of the TOT Schools operations case study",
      },
    ],
  },
  crowwd: {
    tone: "solid",
    did: "Acquisition for an investing app with about 20,000 users, and Arthavaad, a speaker series I launched.",
    photos: [
      {
        src: "/work/crowwd/arthavaad-audience-800.webp",
        alt: "Jay in the audience at an Arthavaad talk",
        fit: "object-[30%_45%]",
      },
      {
        src: "/work/crowwd/arthavaad-stage-640.webp",
        alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, in New Delhi",
        fit: "object-[50%_42%]",
      },
    ],
  },
  "hdfc-bank": {
    tone: "tint",
    did: "Equity, fund and macro research for HNI portfolio reviews.",
    papers: [
      {
        src: "/covers/HNI-Portfolio-Allocation-Review.webp",
        alt: "First page of the HNI portfolio allocation review",
      },
      {
        src: "/covers/Apollo-Hospitals-Research-Note-Aug-2025.webp",
        alt: "First page of the Apollo Hospitals research note",
      },
    ],
  },
};

const tilt = [-5, 6];

/** Four jobs, each written as the question it was really about. */
export function Experience() {
  return (
    <section
      id="experience"
      data-tone="light"
      aria-labelledby="experience-h"
      className="shell scroll-mt-10 pt-28 md:pt-44"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
        <h2
          id="experience-h"
          className="display text-[clamp(52px,8.6vw,138px)]"
        >
          <RiseWords onView text="Four jobs, four questions." />
        </h2>
        <Reveal>
          <p className="max-w-[28ch] pb-2 text-[clamp(18px,1.6vw,23px)] font-medium leading-[1.3] text-muted">
            Real estate, preschools, fintech and banking. I went inside each to
            see how it runs.
          </p>
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-12 grid gap-5 md:mt-20 lg:grid-cols-2">
        {roles.map((r) => {
          const look = looks[r.id];
          const t = tones[look.tone];
          const quiet = t.quiet;
          return (
            <StaggerItem as="li" key={r.id}>
              <Link
                href={`/work/${r.id}`}
                className={`group relative grid h-full min-h-[430px] overflow-hidden rounded-[28px] sm:grid-cols-[1.12fr_0.88fr] md:rounded-[36px] ${t.card}`}
              >
                <div className="flex flex-col justify-between gap-10 p-6 sm:p-9">
                  <div className="flex items-center gap-3">
                    {r.logo && (
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-line">
                        <Image
                          src={r.logo}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                      </span>
                    )}
                    <span className="text-[15px] font-semibold leading-tight">
                      {r.org}
                      <span className={`block font-medium ${quiet}`}>
                        {r.period}
                      </span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[clamp(27px,2.9vw,42px)] font-semibold leading-[1.06]">
                      {r.question}
                    </h3>
                    <p
                      className={`mt-4 max-w-[36ch] text-[15.5px] leading-snug ${quiet}`}
                    >
                      {r.role}. {look.did}
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[210px]" aria-hidden={false}>
                  {look.papers?.map((p, i) => (
                    <span
                      key={p.src}
                      className="paper-shadow absolute block aspect-[900/1273] w-[150px] overflow-hidden bg-white transition-transform duration-700 ease-out group-hover:-translate-y-5 group-hover:!rotate-0 sm:w-[72%]"
                      style={{
                        rotate: `${tilt[i % 2]}deg`,
                        left:
                          look.papers!.length > 1 ? `${2 + i * 34}%` : "12%",
                        top: `${24 + i * 13}%`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="260px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                  {look.photos?.map((p, i) => (
                    <span
                      key={p.src}
                      className="print absolute block w-[140px] !pb-[7px] transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:!rotate-0 sm:w-[60%]"
                      style={{
                        rotate: `${tilt[i % 2]}deg`,
                        left: `${4 + i * 34}%`,
                        top: `${21 + i * 25}%`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="260px"
                          className={`object-cover ${p.fit}`}
                        />
                      </span>
                    </span>
                  ))}
                </div>

                <span
                  aria-hidden="true"
                  className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full text-[18px] transition-all duration-500 ease-out group-hover:rotate-45 sm:right-7 sm:top-7 ${t.knob}`}
                >
                  <Arrow />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
