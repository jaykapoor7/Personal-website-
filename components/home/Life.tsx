"use client";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { education, leadership, life, skills } from "@/content/site";
import {
  Reveal,
  RiseWords,
  useMedia,
  useMotionOK,
  useProgress,
} from "../motion";
import { SmartLink } from "../ui";

/** How each print in the strip is sized and tilted; the photos themselves come from site.ts. */
const frames: Record<
  string,
  { w: number; h: number; size: string; rotate: number; lift: string }
> = {
  "02_childhood_running": {
    w: 1280,
    h: 853,
    size: "h-[230px] md:h-[330px]",
    rotate: -3,
    lift: "md:mt-10",
  },
  "04_childhood_football_team": {
    w: 843,
    h: 633,
    size: "h-[210px] md:h-[300px]",
    rotate: 2.5,
    lift: "md:mt-0",
  },
  "01_trojans_team": {
    w: 1174,
    h: 1280,
    size: "h-[250px] md:h-[380px]",
    rotate: -2,
    lift: "md:mt-14",
  },
  "07_school_ceremony": {
    w: 682,
    h: 455,
    size: "h-[200px] md:h-[280px]",
    rotate: 3,
    lift: "md:mt-2",
  },
  pitt_portrait: {
    w: 960,
    h: 1280,
    size: "h-[260px] md:h-[400px]",
    rotate: -2.5,
    lift: "md:mt-8",
  },
};
const strip = life.map((p) => ({
  ...p,
  ...frames[p.name],
  src: `/photos/${p.name}-1280.webp`,
}));

function Logo({ src, name }: { src?: string; name: string }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white text-[15px] font-semibold text-muted ring-1 ring-line">
      {src ? (
        <Image
          src={src}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ) : (
        name[0]
      )}
    </span>
  );
}

/** Five photos that slide past as the page scrolls. */
function Strip() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const ok = useMotionOK();
  const wide = useMedia("(min-width: 768px)");
  const drift = ok && wide;
  const [over, setOver] = useState(0);
  useEffect(() => {
    if (!drift) return;
    const measure = () => {
      const el = track.current;
      if (el) setOver(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [drift]);
  const p = useProgress(ref, ["start end", "end start"]);
  const x = useTransform(p, [0.33, 0.7], [0, -over]);
  return (
    <div
      ref={ref}
      role="group"
      aria-label="Photos, oldest first"
      tabIndex={drift ? undefined : 0}
      className={`mt-12 md:mt-20 ${drift ? "overflow-hidden" : "no-bar overflow-x-auto"}`}
    >
      <motion.ul
        ref={track}
        style={drift ? { x } : undefined}
        className="flex w-max items-start gap-5 px-5 pb-10 pt-6 sm:px-8 md:gap-9 lg:px-10 xl:px-[max(40px,calc((100vw-1320px)/2+40px))]"
      >
        {strip.map((ph) => (
          <li key={ph.src} className={`shrink-0 ${ph.lift}`}>
            <figure
              className="print transition-transform duration-500 ease-out hover:!rotate-0 hover:scale-[1.03]"
              style={{ rotate: `${ph.rotate}deg` }}
            >
              <Image
                src={ph.src}
                alt={ph.alt}
                width={ph.w}
                height={ph.h}
                sizes="(max-width: 768px) 80vw, 560px"
                className={`w-auto max-w-none ${ph.size}`}
              />
              <figcaption>{ph.caption}</figcaption>
            </figure>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/** Where I am from, what I do off the clock, and the short version of the CV. */
export function Life() {
  return (
    <section
      id="about"
      data-tone="light"
      aria-labelledby="about-h"
      className="scroll-mt-4 overflow-x-clip pt-28 md:pt-44"
    >
      <div className="shell">
        <h2 id="about-h" className="display text-[clamp(50px,8.6vw,138px)]">
          <RiseWords onView text="Bangalore, Delhi, Pittsburgh." />
        </h2>
        <Reveal className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-16">
          <p className="max-w-[34ch] text-[clamp(20px,1.9vw,27px)] font-medium leading-[1.28]">
            School in Bangalore, summers at work in Delhi, and now Economics and
            Statistics at Pitt.
          </p>
          <p className="max-w-[34ch] text-[clamp(20px,1.9vw,27px)] font-medium leading-[1.28] text-muted">
            Off the clock: football, small browser games, and predictions I
            write down so I can check how wrong I was.
          </p>
        </Reveal>
      </div>

      <Strip />

      <div className="shell mt-14 grid gap-14 md:mt-24 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <h3 className="text-[15px] font-medium text-muted">Education</h3>
          <ul className="mt-5 space-y-6">
            {education.map((e) => (
              <li key={e.school} className="flex gap-4">
                <Logo src={e.logo} name={e.school} />
                <p className="text-[16px] leading-snug text-muted">
                  <span className="block text-[clamp(20px,1.7vw,24px)] font-semibold leading-tight text-fg">
                    {e.school}
                  </span>
                  <span className="mt-1.5 block">{e.detail}</span>
                  <span className="block">{e.period}</span>
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mt-12 text-[15px] font-medium text-muted">Tools</h3>
          <p className="mt-4 max-w-[36ch] text-[17px] font-medium leading-relaxed">
            {skills.join(", ")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="text-[15px] font-medium text-muted">Leadership</h3>
          <ul className="mt-5 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {leadership.map((l) => (
              <li key={l.title + l.org} className="flex gap-4">
                <Logo src={l.logo} name={l.org} />
                <p className="text-[15.5px] leading-snug text-muted">
                  <span className="block text-[18px] font-semibold leading-tight text-fg">
                    {l.title}
                  </span>
                  <span className="mt-1 block font-medium">
                    {l.href ? (
                      <SmartLink
                        href={l.href}
                        className="underline decoration-line underline-offset-4 hover:text-accent"
                      >
                        {l.org}
                      </SmartLink>
                    ) : (
                      l.org
                    )}
                  </span>
                  <span className="mt-1.5 block">{l.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
