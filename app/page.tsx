import Image from "next/image";
import { Arrow } from "@/components/Arrow";
import { BuildsBrowser } from "@/components/BuildsBrowser";
import { Reveal, RiseWords } from "@/components/motion";
import { Dock, NowTicker, PortraitOrbit } from "@/components/Hero";
import { PortfolioTabs } from "@/components/PortfolioTabs";
import {
  Experience,
  Leadership,
  Research,
  Ventures,
  Writing,
} from "@/components/Sections";
import {
  builds,
  labs,
  life,
  person,
  portrait,
  roles,
  skills,
  ventures,
  writing,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Introduction */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#fbfbff]" aria-hidden="true" />
        <div
          className="drift-a pointer-events-none absolute -left-[10%] -top-[20%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(165,180,252,0.55),transparent)] blur-2xl"
          aria-hidden="true"
        />
        <div
          className="drift-b pointer-events-none absolute -right-[10%] top-[10%] h-[80%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(196,181,253,0.45),transparent)] blur-2xl"
          aria-hidden="true"
        />
        <div
          className="drift-a pointer-events-none absolute bottom-[-30%] left-[30%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(186,230,253,0.55),transparent)] blur-2xl"
          aria-hidden="true"
        />
        <div
          className="bg-grid fade-mask pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative grid items-center gap-8 pb-10 pt-24 md:pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:pb-14">
          <div>
            <Reveal y={8}>
              <NowTicker />
            </Reveal>
            <h1 className="mt-6 text-[clamp(56px,8.5vw,116px)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <RiseWords text="Jay Kapoor" delay={0.05} />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-[clamp(18px,1.6vw,21px)] leading-[1.5] text-fg/80">
                {person.intro}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={`mailto:${person.email}`} className="btn-primary">
                  Email me <Arrow />
                </a>
                <a
                  href={person.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Resume
                </a>
                <span className="ml-2 flex gap-4 text-[15px] font-medium text-muted">
                  {person.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-fg"
                    >
                      {l.label}
                    </a>
                  ))}
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <PortraitOrbit src={portrait.src} alt={portrait.alt} />
          </Reveal>
        </div>
      </section>

      {/* The work */}
      <section aria-label="Work" className="shell">
        <PortfolioTabs
          tabs={[
            {
              id: "ventures",
              label: "Ventures",
              count: ventures.length,
              intro:
                "Things I started, from a health app at 14 to a national record of street animals.",
              content: <Ventures />,
            },
            {
              id: "experience",
              label: "Experience",
              count: roles.length,
              intro: "Roles in operations, growth, finance and real estate.",
              content: <Experience />,
            },
            {
              id: "research",
              label: "Research",
              count: labs.length,
              intro:
                "Lab and clinical research at the University of Pittsburgh and UPMC.",
              content: <Research />,
            },
            {
              id: "writing",
              label: "Writing",
              count: writing.length,
              intro: "A published paper, investment memos and sector research.",
              content: <Writing />,
            },
            {
              id: "builds",
              label: "Builds",
              count: builds.length,
              intro:
                "Tools and games I built on the side. They run right here.",
              content: <BuildsBrowser />,
            },
            {
              id: "leadership",
              label: "Education & leadership",
              intro: "Where I studied, and the teams I led along the way.",
              content: <Leadership />,
            },
          ]}
        />
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-h"
        className="shell scroll-mt-24 pt-16"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="label">About</p>
            <h2
              id="about-h"
              className="mt-4 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              Outside the work
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-fg/80">
              {person.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">
              Tools
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-white px-3 py-1.5 text-[13.5px] font-medium ring-1 ring-line"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-3 gap-3">
              {life.map((p, i) => (
                <li key={p.name} className={i === 0 ? "col-span-3" : ""}>
                  <figure className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-line">
                    <div
                      className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}
                    >
                      <Image
                        src={`/photos/${p.name}-1280.webp`}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 300px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
                      {p.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <Dock
        email={person.email}
        resume={person.resume}
        linkedin={person.links[0].href}
      />
    </>
  );
}
