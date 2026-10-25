import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Intro, Mark, SectionMenu } from "@/components/About";
import { Arrow } from "@/components/Arrow";
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
    "Jay Kapoor: Bangalore to Pittsburgh, StrayPaw, research at Pitt, and a lot of football.",
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
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "leadership", label: "Leadership" },
  { id: "life", label: "Off the clock" },
  { id: "resume", label: "Resume" },
];

function Logo({ src, name }: { src?: string; name: string }) {
  return src ? (
    <Image
      src={src}
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 rounded-md object-contain ring-1 ring-line"
    />
  ) : (
    <span
      aria-hidden="true"
      className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-card text-[13px] font-semibold ring-1 ring-line"
    >
      {name[0]}
    </span>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={`${id}-h`}
      className="text-[28px] font-semibold leading-none tracking-[-0.03em]"
    >
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
              className="serif text-[clamp(38px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontStyle: "normal" }}
            >
              My name is <Mark>Jay</Mark>. I notice problems, and then I build
              something about them.
            </h1>
            <ul className="mt-6 flex flex-wrap gap-2 text-[14px]">
              {[
                { label: "Pittsburgh, PA" },
                { label: "Founder, StrayPaw", href: "/work/straypaw" },
                { label: "Economics and Statistics, Pitt" },
                { label: "Resume", href: person.resume },
              ].map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <SmartLink
                      href={c.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 transition-colors hover:bg-fg hover:text-white"
                    >
                      {c.label} <Arrow className="opacity-60" />
                    </SmartLink>
                  ) : (
                    <span className="inline-block rounded-full bg-card px-3 py-1.5">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
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
                  className="group -mx-3 flex items-start gap-3.5 rounded-xl px-3 py-3 transition-colors hover:bg-card"
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
                      <span className="mt-1 inline-block rounded bg-accent/10 px-1.5 py-0.5 text-[12px] font-medium text-accent">
                        {e.badge}
                      </span>
                    )}
                  </span>
                  <span className="hidden shrink-0 pt-0.5 text-[13px] text-faint sm:block">
                    {e.period}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 border-t border-line pt-5 text-[14px] text-muted">
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
                <span className="hidden shrink-0 pt-0.5 text-[13px] text-faint sm:block">
                  {e.period}
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full px-2.5 py-1 text-[13px] text-muted ring-1 ring-line"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="leadership"
          aria-labelledby="leadership-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="leadership">Leadership</H2>
          <ul className="mt-4">
            {leadership.map((l) => (
              <li
                key={l.title + l.org}
                className="-mx-4 rounded-2xl px-4 py-4 transition-colors hover:bg-accent/[0.07]"
              >
                <p className="text-[16px] leading-snug">
                  <span className="text-[18px] font-semibold tracking-[-0.02em]">
                    {l.org}
                  </span>
                  <span className="text-muted">: {l.title}</span>
                </p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-fg/80">
                  {l.detail}
                </p>
                {l.href && (
                  <SmartLink
                    href={l.href}
                    className="mt-1 inline-flex items-center gap-1 text-[13px] text-muted hover:text-accent"
                  >
                    {l.href.replace(/^https?:\/\/(www\.)?/, "")} <Arrow />
                  </SmartLink>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="life"
          aria-labelledby="life-h"
          className="mt-24 scroll-mt-28"
        >
          <H2 id="life">Off the clock</H2>
          <ul className="mt-6 grid grid-cols-3 gap-3">
            {[
              ...life.map((p) => ({
                src: `/photos/${p.name}-640.webp`,
                alt: p.alt,
                caption: p.caption,
              })),
            ].map((p, i) => (
              <li key={p.src} className={i === 0 ? "col-span-3" : ""}>
                <figure className="group relative h-full overflow-hidden rounded-2xl bg-card">
                  <div
                    className={`relative h-full ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
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
          <div className="mt-5 flex gap-2">
            <a
              href={person.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-[14px] font-medium transition-colors hover:bg-fg hover:text-white"
            >
              Open resume <Arrow />
            </a>
            <a
              href={person.resume}
              download
              aria-label="Download resume"
              className="grid h-9 w-9 place-items-center rounded-full bg-card transition-colors hover:bg-fg hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
            </a>
          </div>
          <p className="mt-12 max-w-[52ch] text-[16px] leading-relaxed text-fg/85">
            The best things I have worked on started with someone saying
            &ldquo;nobody is keeping track of this.&rdquo; If that sounds like
            your problem, write to me.
          </p>
        </section>
      </div>
    </div>
  );
}
