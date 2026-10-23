import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { AreaMap } from "@/components/AreaMap";
import { ProjectCard } from "@/components/ProjectCard";
import { Photo, SectionHeader, SmartLink } from "@/components/ui";
import {
  builds,
  experience,
  person,
  photos,
  projects,
  stats,
  writing,
} from "@/content/site";
import { ledger } from "@/content/ledger";

const straypaw = projects.find((p) => p.slug === "straypaw")!;
const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!;
const resolved = ledger.calls.filter((c) => c.result !== "OPEN");

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-12 pb-20 pt-12 md:grid-cols-[1.35fr_1fr] md:gap-16 md:pb-28 md:pt-20">
        <div className="rise">
          <Link
            href="/work/straypaw"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/60 py-1.5 pl-3 pr-4 text-[13px] text-muted transition-colors hover:text-fg"
          >
            <span className="live-dot" aria-hidden="true" />
            Currently building StrayPaw
            <Arrow direction="right" className="text-faint" />
          </Link>
          <h1 className="mt-7 text-[44px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
            I build software for{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em]">
              messy, real&#8209;world
            </span>{" "}
            systems.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-[19px]">
            I’m Jay — founder of{" "}
            <Link href="/work/straypaw" className="link text-fg">
              StrayPaw
            </Link>
            , infrastructure for the people who care for India’s street animals.
            I started my first company,{" "}
            <Link href="/work/juno-ai" className="link text-fg">
              Juno-AI
            </Link>
            , at 14. Economics &amp; Statistics at the University of Pittsburgh.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${person.email}`} className="btn-primary">
              Email me <Arrow />
            </a>
            <a
              href="/jay-kapoor-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Résumé
            </a>
            <div className="ml-1 flex items-center gap-4 text-sm text-muted">
              {person.links
                .filter((l) => ["LinkedIn", "GitHub", "X"].includes(l.label))
                .map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="rise relative mx-auto w-full max-w-sm md:max-w-none [animation-delay:120ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-card">
            <Photo
              name="pitt_portrait"
              alt="Jay Kapoor on the Cathedral of Learning lawn, University of Pittsburgh"
              priority
              className="h-full w-full object-cover object-[50%_62%]"
            />
          </div>
          <div className="absolute -bottom-4 left-5 right-5 flex items-center justify-between rounded-2xl border border-line bg-bg/85 px-4 py-3 text-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <div>
              <p className="font-medium">University of Pittsburgh</p>
              <p className="text-muted">Econ &amp; Stats · Class of 2028</p>
            </div>
            <span className="font-serif text-3xl italic text-accent">’28</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Highlights" className="border-y border-line">
        <dl className="shell grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 md:py-10 ${i % 2 === 1 ? "pl-6 md:pl-8" : ""} ${
                i > 0 ? "md:border-l md:border-line md:pl-8" : ""
              } ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}
            >
              <dd className="text-3xl font-medium tracking-[-0.035em] md:text-[42px]">
                {s.value}
              </dd>
              <dt className="mt-2 max-w-[24ch] text-sm leading-snug text-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* StrayPaw */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="now">
        <SectionHeader
          index="01 — Now"
          title={<span id="now">What I’m building</span>}
          action={{ label: "Case study", href: "/work/straypaw" }}
        />
        <article className="overflow-hidden rounded-[28px] bg-[#0b0b0b] text-white ring-1 ring-white/10">
          <div className="grid gap-12 p-6 sm:p-10 md:grid-cols-[1fr_1.1fr] md:p-14">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fb923c] text-xl text-black">
                  🐾
                </span>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight">
                    StrayPaw
                  </h3>
                  <p className="text-sm text-white/55">
                    Solo founder · 2026 – present
                  </p>
                </div>
              </div>
              <p className="mt-8 text-2xl font-medium leading-snug tracking-[-0.02em] md:text-[28px]">
                A shared record for India’s street animals — so feeders, NGOs,
                and cities can{" "}
                <span className="font-serif font-normal italic text-[#fdba74]">
                  coordinate care
                </span>{" "}
                instead of guessing.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-white/70">
                {straypaw.highlights!.slice(1, 4).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#fb923c]" />
                    {h}
                  </li>
                ))}
              </ul>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {straypaw.metrics!.map((m) => (
                  <div key={m.label}>
                    <dd className="text-2xl font-medium tracking-tight md:text-3xl">
                      {m.value}
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-white/50">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-wrap gap-3 md:mt-auto md:pt-10">
                <a
                  href="https://straypaw.kapoorjay.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-white text-black hover:bg-white/85"
                >
                  Visit StrayPaw <Arrow />
                </a>
                <Link
                  href="/work/straypaw"
                  className="btn border border-white/15 hover:bg-white/10"
                >
                  Read the case study
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-8">
              <AreaMap />
            </div>
          </div>
          <div className="relative aspect-[16/9] md:aspect-[21/8]">
            <Image
              src="/straypaw/field-observation.webp"
              alt="A street dog standing at a sunlit intersection, seen from above"
              fill
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-transparent to-transparent" />
          </div>
        </article>
      </section>

      {/* Selected work */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="work">
        <SectionHeader
          index="02 — Selected work"
          title={<span id="work">Companies, operations &amp; fieldwork</span>}
          action={{ label: "All work", href: "/work" }}
        />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {["juno-ai", "crowwd"].map((s) => (
            <ProjectCard key={s} project={bySlug(s)} />
          ))}
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {["tot-schools", "project-nidaan", "finer-things-club"].map((s) => (
            <ProjectCard key={s} project={bySlug(s)} />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="experience">
        <SectionHeader
          index="03 — Experience"
          title={<span id="experience">Where I’ve worked</span>}
          action={{ label: "Full experience", href: "/experience" }}
        />
        <ol className="border-t border-line">
          {experience.slice(0, 8).map((e) => {
            const row = (
              <>
                <span className="font-mono text-xs uppercase tracking-wider text-faint md:pt-1">
                  {e.period}
                </span>
                <div>
                  <p className="text-lg font-medium tracking-tight">{e.org}</p>
                  <p className="text-sm text-muted">{e.role}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">
                  {e.detail}
                </p>
                <span className="hidden justify-self-end text-faint transition-colors group-hover:text-fg md:block">
                  {e.href && <Arrow />}
                </span>
              </>
            );
            const cls =
              "group grid gap-2 border-b border-line py-6 md:grid-cols-[130px_1fr_1.3fr_24px] md:gap-8";
            return (
              <li key={e.org}>
                {e.href ? (
                  <Link
                    href={e.href}
                    className={`${cls} transition-colors hover:bg-card/60`}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className={cls}>{row}</div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Research & writing */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="research">
        <SectionHeader
          index="04 — Research & writing"
          title={
            <span id="research">I write down what I think will happen</span>
          }
          action={{ label: "All research", href: "/research" }}
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <Link
            href="/ledger"
            className="group flex flex-col rounded-[24px] border border-line bg-card p-6 transition-colors hover:border-fg/30 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">Forecast ledger</p>
              <Arrow className="text-faint transition-colors group-hover:text-fg" />
            </div>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-[-0.02em]">
              15 public, dated forecasts on healthcare and fintech — each with a
              stated probability, scored when it resolves.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {ledger.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dd className="text-3xl font-medium tracking-tight">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-muted">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {resolved.map((c) => (
                <li
                  key={c.prediction}
                  className="flex items-start gap-3 bg-bg px-4 py-3 text-sm"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                      c.result === "HIT"
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {c.result}
                  </span>
                  <span className="leading-snug">{c.prediction}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-faint">
                    {c.conviction}%
                  </span>
                </li>
              ))}
            </ul>
          </Link>
          <ul className="border-t border-line">
            {writing.slice(0, 6).map((w) => {
              const inner = (
                <>
                  <span className="chip w-fit">{w.type}</span>
                  <div>
                    <p className="font-medium leading-snug tracking-tight">
                      {w.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{w.description}</p>
                  </div>
                  <span className="hidden font-mono text-xs text-faint sm:block">
                    {w.year}
                  </span>
                </>
              );
              const cls =
                "group grid gap-3 border-b border-line py-5 sm:grid-cols-[92px_1fr_auto] sm:items-start sm:gap-6";
              return (
                <li key={w.title}>
                  {w.href ? (
                    <SmartLink href={w.href} className={cls}>
                      {inner}
                    </SmartLink>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Builds */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="builds">
        <SectionHeader
          index="05 — Side projects"
          title={<span id="builds">Things I’ve shipped for fun</span>}
          action={{ label: "Play", href: "/play" }}
        />
        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((b) => (
            <li key={b.title} className="bg-bg">
              <SmartLink
                href={b.href}
                className="group flex h-full min-h-[170px] flex-col justify-between p-6 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="chip">{b.kind}</span>
                  <Arrow className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
                <div className="mt-8">
                  <p className="font-medium tracking-tight">{b.title}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">
                    {b.detail}
                  </p>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="about">
        <SectionHeader
          index="06 — About"
          title={<span id="about">Off the screen</span>}
          action={{ label: "More about me", href: "/about" }}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{person.about[0]}</p>
            <p>{person.about[3]}</p>
            <Link href="/about" className="link inline-block text-fg">
              Read more
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.slice(1, 4).map((p, i) => (
              <figure
                key={p.name}
                className={`relative overflow-hidden rounded-2xl border border-line bg-card ${
                  i === 0
                    ? "col-span-2 aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-auto"
                    : "aspect-square"
                }`}
              >
                <Photo
                  name={p.name}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
            <figure className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-card">
              <Photo
                name="04_childhood_football_team"
                alt="Jay’s childhood football team on the pitch with their coach"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                First team
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
