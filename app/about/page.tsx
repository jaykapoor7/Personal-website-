import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Intro, Mark, SectionMenu } from "@/components/About";
import { Thread } from "@/components/Thread";
import { Reveal } from "@/components/motion";
import { SmartLink } from "@/components/ui";
import { labSlug } from "@/content/archive";
import {
  education,
  labs,
  leadership,
  life,
  otherResearch,
  person,
  roles,
  skills,
  ventures,
} from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jay Kapoor: school in Bangalore, Economics and Statistics at Pitt, StrayPaw, research and work.",
};

const months = "JanFebMarAprMayJunJulAugSepOctNovDec";
/** Sort key from a period like "May to Aug 2025" or "Jun 2025 to Apr 2026". */
const start = (period: string) => {
  const y = Number(period.match(/\d{4}/)?.[0] ?? 0);
  const m = months.indexOf(period.match(/[A-Z][a-z]{2}/)?.[0] ?? "Jan") / 3;
  return y * 12 + m;
};

const experience = [
  ...ventures.map((v) => ({
    href: `/work/${v.id}`,
    org: v.name,
    role: v.role,
    period: v.period,
    logo: v.logo,
    badge:
      v.id === "juno-ai"
        ? "Published in IJEDR"
        : v.id === "straypaw"
          ? "19 NGO partners"
          : undefined,
  })),
  ...roles.map((r) => ({
    href: `/work/${r.id}`,
    org: r.org,
    role: r.role,
    period: r.period,
    logo: r.logo,
    badge: undefined,
  })),
  ...labs.map((l) => ({
    href: `/work/${labSlug[l.id]}`,
    org: l.name,
    role: l.role,
    period: l.period,
    logo: l.logo,
    badge: undefined,
  })),
].sort((a, b) => start(b.period) - start(a.period));

const sections = [
  { id: "intro", label: "Intro" },
  { id: "thread", label: "The thread" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "leadership", label: "Leadership" },
  { id: "life", label: "Photos" },
  { id: "resume", label: "Resume" },
];

function Logo({ src, name }: { src?: string; name: string }) {
  return src ? (
    <Image
      src={src}
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 rounded-md object-contain"
    />
  ) : (
    <span
      aria-hidden="true"
      className="grid h-7 w-7 shrink-0 place-items-center text-[13px] font-semibold text-muted"
    >
      {name[0]}
    </span>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-h`} className="text-[28px] font-semibold leading-none">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="shell grid gap-10 pt-28 md:pt-32 lg:grid-cols-[180px_minmax(0,660px)_1fr]">
      <aside>
        <SectionMenu items={sections} />
      </aside>

      <div>
        <section id="intro" aria-labelledby="intro-h" className="scroll-mt-28">
          <Reveal y={12}>
            <h1
              id="intro-h"
              className="text-[clamp(38px,5vw,56px)] font-medium leading-[1.05]"
            >
              My name is <Mark>Jay</Mark>. I notice problems, and then I build
              something about them.
            </h1>
            <p className="mt-6 text-[17px] text-muted">
              Pittsburgh. Economics and Statistics at Pitt. Founder of{" "}
              <Link
                href="/work/straypaw"
                className="text-fg underline decoration-1 underline-offset-4 hover:text-accent"
              >
                StrayPaw
              </Link>
              .
            </p>
          </Reveal>
          <div className="mt-12">
            <Intro
              paras={[
                <>
                  I grew up in Bangalore and went to The International School
                  Bangalore. At 14 I started{" "}
                  <Mark>my first company, Juno-AI</Mark>: health information for
                  families in rural India. It reached 10,000+ users and became a
                  paper in IJEDR.
                </>,
                <>
                  Summers were for working in Delhi. Wealth management at HDFC
                  Bank, the founder&apos;s office at Crowwd, operations for{" "}
                  <Mark>eight preschools</Mark> at TOT, and a feasibility study
                  for a housing site at TARC.
                </>,
                <>
                  Now I study Economics and Statistics at the University of
                  Pittsburgh, and do research at the Accessible SmartTech Lab
                  and as an SCI 3Sixty fellow. Before that: emergency medicine
                  at UPMC, and <Mark>bladder cells</Mark> in the Apodaca Lab.
                </>,
                <>
                  In June 2026 a dog outside a cafe turned into{" "}
                  <Mark>StrayPaw</Mark>, a shared record of every street animal
                  in India. Four months later it holds 30,288 animals across 28
                  cities.
                </>,
                <>
                  Away from work I play football, make small browser games, and{" "}
                  <Link
                    href="/research"
                    className="underline decoration-line underline-offset-4 hover:decoration-fg"
                  >
                    write down predictions
                  </Link>{" "}
                  so I can check how wrong I was.
                </>,
              ]}
            />
          </div>
        </section>

        <section
          id="thread"
          aria-labelledby="thread-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="thread">Why so many different things</H2>
          <div className="mt-6">
            <Thread />
          </div>
        </section>

        <section
          id="experience"
          aria-labelledby="experience-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="experience">Experience</H2>
          <ul className="mt-6">
            {experience.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="group flex items-start gap-3.5 py-3"
                >
                  <Logo src={e.logo} name={e.org} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] font-semibold leading-tight group-hover:text-accent">
                      {e.org}
                    </span>
                    <span className="block text-[14px] text-muted">
                      {e.role}
                    </span>
                    {e.badge && (
                      <span className="block text-[14px] text-muted">
                        {e.badge}
                      </span>
                    )}
                  </span>
                  <span className="hidden shrink-0 pt-0.5 text-[13px] text-muted sm:block">
                    {e.period}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 pt-5 text-[14px] text-muted">
            {otherResearch.map((o) => (
              <li key={o.name}>
                <span className="font-semibold text-fg">
                  {o.href ? (
                    <SmartLink href={o.href} className="hover:text-accent">
                      {o.name}
                    </SmartLink>
                  ) : (
                    o.name
                  )}
                </span>
                . {o.detail}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="education"
          aria-labelledby="education-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="education">Education</H2>
          <ul className="mt-6 space-y-4">
            {education.map((e) => (
              <li key={e.school} className="flex items-start gap-3.5">
                <Logo src={e.logo} name={e.school} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold leading-tight">
                    {e.school}
                  </span>
                  <span className="block text-[14px] text-muted">
                    {e.detail}
                  </span>
                </span>
                <span className="hidden shrink-0 pt-0.5 text-[13px] text-muted sm:block">
                  {e.period}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-muted">
            Tools: {skills.join(", ")}.
          </p>
        </section>

        <section
          id="leadership"
          aria-labelledby="leadership-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="leadership">Leadership</H2>
          <ul className="mt-4">
            {leadership.map((l) => (
              <li key={l.title + l.org} className="py-4">
                <p className="text-[16px] leading-snug">
                  <span className="text-[18px] font-semibold">
                    {l.href ? (
                      <SmartLink href={l.href} className="hover:text-accent">
                        {l.org}
                      </SmartLink>
                    ) : (
                      l.org
                    )}
                  </span>
                  <span className="text-muted">: {l.title}</span>
                  {/\d/.test(l.period) && (
                    <span className="ml-2 text-[13px] text-muted">
                      {l.period}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-fg">
                  {l.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="life"
          aria-labelledby="life-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="life">Photos</H2>
          <ul className="mt-6 grid grid-cols-3 gap-3">
            {[
              ...life.map((p) => ({
                src: `/photos/${p.name}-640.webp`,
                alt: p.alt,
                caption: p.caption,
              })),
            ].map((p, i) => (
              <li key={p.src} className={i === 0 ? "col-span-3" : ""}>
                <figure className="group h-full">
                  <div
                    className={`relative overflow-hidden rounded-xl ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-2 text-[14px] text-muted">
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="resume"
          aria-labelledby="resume-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="resume">Resume</H2>
          <p className="mt-5 flex gap-6 text-[16px] font-medium">
            <a
              href={person.resume}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              Open resume →
            </a>
            <a
              href={person.resume}
              download
              className="text-accent hover:underline"
            >
              Download
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
