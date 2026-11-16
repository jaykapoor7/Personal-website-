import Image from "next/image";
import { Link } from "next-view-transitions";
import { education, labs, life, person, portrait, roles } from "@/content/site";
import { byGroup, items, type Item } from "@/content/work";

/**
 * A calm, personal homepage: one readable column, direct access to the work,
 * then the resume, writing, small projects and a little life outside work.
 * The existing detailed case studies and project pages remain unchanged.
 */
const chosenIds = ["straypaw", "juno-ai", "project-nidaan", "cura"];
const selectedWork = chosenIds
  .map((id) => items.find((item) => item.id === id))
  .filter((item): item is Item => Boolean(item));

const selectedNotes: Record<string, string> = {
  straypaw:
    "Software for NGOs and city teams to record, coordinate and verify animal health work.",
  "juno-ai":
    "Health information and care navigation for rural India. My first startup, at 14.",
  "project-nidaan":
    "Exploring medication access for delivery riders, starting with 55 interviews.",
  cura: "A small tool that turns wearable health data into four daily scores.",
};

const writingLinks = [
  {
    name: "StrayPaw Research Models",
    note: "Five interactive experiments in public-health decisions.",
    href: "/research-models/",
    year: "2026",
  },
  {
    name: "Memo Library & Forecast Ledger",
    note: "Investment theses with dated forecasts and a public scorecard.",
    href: "/ledger",
    year: "2026",
  },
  {
    name: "India HealthTech Market Map",
    note: "36 companies across nine sectors, mapped and compared.",
    href: "/market-map",
    year: "2026",
  },
  {
    name: "Juno-AI research paper",
    note: "The system design and evaluation behind my first healthcare project.",
    href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
    year: "2024",
  },
];

const archiveGroups = byGroup.map(({ group, items: groupItems }) => ({
  group,
  items: groupItems.filter((item) => !chosenIds.includes(item.id)),
}));

function SectionHeading({
  number,
  children,
  id,
}: {
  number: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h2
      id={id}
      className="flex items-baseline gap-3 border-b border-line pb-3 text-[19px] font-semibold tracking-[-0.03em] text-fg"
    >
      <span className="w-7 shrink-0 text-[12px] font-medium tabular-nums tracking-normal text-muted">
        {number}
      </span>
      {children}
    </h2>
  );
}

function LocalOrExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href.startsWith("/") && href !== "/research-models/" && !/\.(pdf|xlsx|csv)$/i.test(href))
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function Home() {
  return (
    <div data-tone="light" className="bg-bg">
      <div className="mx-auto w-full max-w-[780px] px-5 pb-14 pt-28 sm:px-8 sm:pt-36">
        <section id="top" aria-labelledby="home-intro" className="scroll-mt-24">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
                Jay Kapoor · Bengaluru / Pittsburgh
              </p>
              <h1
                id="home-intro"
                className="max-w-[14ch] text-[clamp(32px,5.8vw,50px)] font-semibold leading-[1.08] tracking-[-0.055em]"
              >
                I’m Jay. I build things and study how systems work.
              </h1>
            </div>
            <div className="relative mt-1 h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[16px] border border-line bg-paper sm:h-[120px] sm:w-[120px]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(max-width: 640px) 92px, 120px"
                className="object-cover object-[50%_60%]"
              />
            </div>
          </div>

          <div className="mt-7 max-w-[62ch] space-y-3 text-[15.5px] leading-[1.72] text-fg sm:text-[16.5px]">
            <p>
              I’m Jay, a founder and researcher from Bengaluru, now studying
              economics and statistics at the University of Pittsburgh. I
              started building things at 14, and I’ve been curious about how
              useful ideas become things people can actually use ever since.
            </p>
            <p>
              Right now I’m building{" "}
              <Link href="/work/straypaw" className="underline decoration-line underline-offset-4 hover:decoration-accent">
                StrayPaw
              </Link>
              , software for animal health programmes in India. I also work on
              accessible technology and applied AI research at Pitt.
            </p>
            <p className="text-muted">
              I like the details, long football games, and making little
              experiments on the internet.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-medium">
            <a href={person.resume} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-accent">
              Resume ↗
            </a>
            <a href={`mailto:${person.email}`} className="underline decoration-line underline-offset-4 hover:decoration-accent">
              Email ↗
            </a>
            {person.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading" className="mt-14 scroll-mt-24 sm:mt-16">
          <span id="startups" className="relative -top-24" aria-hidden="true" />
          <SectionHeading id="work-heading" number="01">
            Selected work
          </SectionHeading>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            A few things I’ve started, researched or built. Open any project for
            the full story, screenshots and supporting links.
          </p>
          <ol className="mt-3">
            {selectedWork.map((item, i) => (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <LocalOrExternalLink
                  href={item.href}
                  className="group grid grid-cols-[25px_minmax(0,1fr)_78px] items-start gap-3 py-5 sm:grid-cols-[32px_minmax(0,1fr)_124px] sm:gap-4"
                >
                  <span className="pt-0.5 text-[12px] tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[19px] font-semibold tracking-[-0.035em] transition-colors group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-muted">
                        {item.year}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-[1.55] text-muted sm:text-[14.5px]">
                      {selectedNotes[item.id] ?? item.fact}
                    </span>
                    <span className="mt-2 block text-[12px] font-medium text-fg">
                      View case study ↗
                    </span>
                  </span>
                  <span className="relative block aspect-[5/4] overflow-hidden rounded-lg border border-line bg-paper sm:aspect-[3/2]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 78px, 124px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="grid h-full place-items-center text-[25px] font-semibold text-muted">
                        {item.name.charAt(0)}
                      </span>
                    )}
                  </span>
                </LocalOrExternalLink>
              </li>
            ))}
          </ol>
        </section>

        <section id="experience" aria-labelledby="experience-heading" className="mt-14 scroll-mt-24 sm:mt-16">
          <SectionHeading id="experience-heading" number="02">
            Experience
          </SectionHeading>
          <div className="mt-1">
            {[
              ...labs.slice(0, 3).map((lab) => ({
                name: lab.name,
                role: lab.role,
                period: lab.period.replace(" to present", "–now"),
                href: lab.site.href,
              })),
              ...roles.map((role) => ({
                name: role.org,
                role: role.role,
                period: role.period.replace(" to ", "–"),
                href: role.site?.href,
              })),
            ].map((job) => (
              <div key={job.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 border-b border-line py-3.5 last:border-b-0">
                <div className="min-w-0">
                  {job.href ? (
                    <a href={job.href} target="_blank" rel="noreferrer" className="font-semibold underline decoration-transparent underline-offset-4 hover:decoration-line">
                      {job.name} ↗
                    </a>
                  ) : (
                    <span className="font-semibold">{job.name}</span>
                  )}
                  <p className="mt-0.5 text-[13.5px] text-muted">{job.role}</p>
                </div>
                <span className="max-w-[108px] pt-0.5 text-right text-[12px] tabular-nums text-muted sm:max-w-none">
                  {job.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" aria-labelledby="writing-heading" className="mt-14 scroll-mt-24 sm:mt-16">
          <span id="research" className="relative -top-24" aria-hidden="true" />
          <SectionHeading id="writing-heading" number="03">
            Research & writing
          </SectionHeading>
          <ul className="mt-1">
            {writingLinks.map((entry) => (
              <li key={entry.href} className="border-b border-line last:border-b-0">
                <LocalOrExternalLink href={entry.href} className="group flex items-start justify-between gap-3 py-3.5">
                  <span className="min-w-0">
                    <span className="block font-semibold group-hover:text-accent">
                      {entry.name} ↗
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-muted">
                      {entry.note}
                    </span>
                  </span>
                  <span className="shrink-0 pt-0.5 text-[12px] text-muted">{entry.year}</span>
                </LocalOrExternalLink>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="mt-14 scroll-mt-24 sm:mt-16">
          <SectionHeading id="projects-heading" number="04">
            Small projects & experiments
          </SectionHeading>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Some useful, some just for fun. They’re all live and clickable.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {items
              .filter((item) => item.group === "Projects" && item.id !== "cura")
              .map((item) => (
                <li key={item.id}>
                  <LocalOrExternalLink
                    href={item.href}
                    className="group flex h-full items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-3 transition-colors hover:bg-paper"
                  >
                    <span>
                      <span className="block text-[14.5px] font-semibold group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-muted">
                        {item.fact || item.line}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-muted">↗</span>
                  </LocalOrExternalLink>
                </li>
              ))}
          </ul>
        </section>

        <section aria-labelledby="archive-heading" className="mt-12">
          <details className="group rounded-lg border border-line">
            <summary id="archive-heading" className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-[14px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              Browse the complete work archive
              <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-line px-4 pb-4 pt-2">
              {archiveGroups.map(({ group, items: all }) => (
                <div key={group} className="mt-4">
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {group}
                  </h3>
                  <ul>
                    {all.map((item) => (
                      <li key={item.id} className="border-t border-line/80">
                        <LocalOrExternalLink
                          href={item.href}
                          className="flex items-baseline justify-between gap-3 py-2 text-[13px] hover:text-accent"
                        >
                          <span>{item.name}</span>
                          <span className="shrink-0 text-[11px] text-muted">{item.year} ↗</span>
                        </LocalOrExternalLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section id="about" aria-labelledby="about-heading" className="mt-14 scroll-mt-24 sm:mt-16">
          <SectionHeading id="about-heading" number="05">
            A little more about me
          </SectionHeading>
          <p className="mt-4 text-[14.5px] leading-[1.7]">
            I grew up in Bangalore, spent summers working in Delhi and now live
            in Pittsburgh. I play football, make things on the internet and
            often learn by trying something before I know whether it’ll work.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[life[1], life[2], life[3]].map((photo) => (
              <figure key={photo.name}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper">
                  <Image
                    src={`/photos/${photo.name}-1280.webp`}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 30vw, 220px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-1.5 text-[11px] leading-tight text-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-7">
            {education.map((e) => (
              <div key={e.school} className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
                <span className="text-[13.5px] font-semibold">{e.school}</span>
                <span className="text-right text-[12px] text-muted">{e.short}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
