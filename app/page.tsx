import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Reveal, RiseWords } from "@/components/motion";
import { PhotoStack } from "@/components/PhotoStack";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { Timeline } from "@/components/Timeline";
import { ledger } from "@/content/ledger";
import { projects, writing } from "@/content/site";

const stack = [
  {
    src: "/photos/pitt_portrait-640.webp",
    alt: "Jay on the Cathedral of Learning lawn at Pitt",
    caption: "Pitt",
  },
  {
    src: "/work/crowwd/arthavaad-stage-640.webp",
    alt: "Jay at an Arthavaad talk he ran for Crowwd",
    caption: "Running Arthavaad",
  },
  {
    src: "/photos/01_trojans_team-640.webp",
    alt: "Jay with the Trojans football team",
    caption: "The Trojans",
  },
  {
    src: "/photos/07_school_ceremony-640.webp",
    alt: "Jay on stage at his school graduation",
    caption: "Graduation",
  },
  {
    src: "/photos/04_childhood_football_team-640.webp",
    alt: "Jay's childhood football team",
    caption: "First team",
  },
  {
    src: "/photos/02_childhood_running-640.webp",
    alt: "Jay running at a childhood sports day",
    caption: "Sports day",
  },
];

const quirks = [
  {
    href: "/about",
    text: "Football, always",
    icon: (
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4 3.5 2.5-1.3 4h-4.4l-1.3-4Z" />
    ),
  },
  {
    href: "/play",
    text: "I make silly browser games",
    icon: (
      <path d="M7 9v6M4 12h6M15 11h.01M18 13h.01M6 5h12a4 4 0 0 1 4 4v5a4 4 0 0 1-7 2.6L14 15h-4l-1 1.6A4 4 0 0 1 2 14V9a4 4 0 0 1 4-4Z" />
    ),
  },
  {
    href: "/ledger",
    text: "I score my own predictions",
    icon: <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  },
];

const resolved = ledger.calls.filter((c) => c.result !== "OPEN");
const papers = [
  "Juno-AI-Research-Paper",
  "Qure-AI-Investment-Memo",
  "India-GLP1-Sector-Thesis",
].map((n) => writing.find((w) => w.cover?.includes(n))!);

export default function Home() {
  return (
    <>
      {/* Hello */}
      <section className="bg-mesh relative overflow-hidden">
        <div
          className="bg-grid fade-mask pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative grid min-h-[100svh] items-center gap-16 pb-24 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-16">
          <div>
            <Reveal y={10}>
              <p className="hand text-[32px] text-accent">hey, I&apos;m</p>
            </Reveal>
            <h1 className="display -mt-1 text-[clamp(68px,10vw,148px)]">
              <RiseWords text="Jay Kapoor" delay={0.1} />
            </h1>
            <Reveal delay={0.45}>
              <p className="mt-6 max-w-xl text-[clamp(18px,1.6vw,21px)] leading-relaxed text-fg/80">
                I study Economics and Statistics at Pitt and build things for
                problems I&apos;ve seen up close in India. Right now that&apos;s{" "}
                <Link
                  href="/work/straypaw"
                  className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  StrayPaw
                </Link>
                , a shared record for the country&apos;s street animals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:jak581@pitt.edu" className="btn-primary">
                  Say hi <Arrow />
                </a>
                <a
                  href="/jay-kapoor-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Resume
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {quirks.map((q, i) => (
                  <li
                    key={q.text}
                    style={{ rotate: `${[-1.5, 1, -0.5][i]}deg` }}
                  >
                    <Link
                      href={q.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/85 px-3.5 py-2 text-[14px] font-medium shadow-[0_6px_16px_-8px_rgba(30,27,75,0.35)] ring-1 ring-white transition-transform hover:-translate-y-0.5 hover:rotate-0"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-none stroke-accent"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {q.icon}
                      </svg>
                      {q.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="pb-14">
            <PhotoStack photos={stack} />
          </Reveal>
        </div>
      </section>

      {/* Made */}
      <section
        id="made"
        aria-labelledby="made-h"
        className="shell scroll-mt-24 pt-24 md:pt-32"
      >
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="made-h" className="display text-[clamp(44px,6vw,88px)]">
              Things I&apos;ve made
            </h2>
            <p className="hand mt-1 text-[26px] text-accent">
              click a tab. the games and apps actually work in here
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-muted hover:text-fg"
          >
            Jobs and research too <Arrow />
          </Link>
        </Reveal>
        <Reveal>
          <ProjectBrowser
            items={projects}
            groups={["started", "side", "game"]}
          />
        </Reveal>
      </section>

      {/* Story */}
      <section aria-labelledby="story-h" className="relative mt-24 md:mt-32">
        <div
          className="bg-dots absolute inset-x-0 top-0 h-full [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]"
          aria-hidden="true"
        />
        <div className="shell relative py-10">
          <Reveal className="mb-6">
            <h2 id="story-h" className="display text-[clamp(44px,6vw,88px)]">
              The story so far
            </h2>
            <p className="hand mt-1 text-[26px] text-accent">
              tap any bar to see where it went
            </p>
          </Reveal>
          <Reveal>
            <Timeline />
          </Reveal>
        </div>
      </section>

      {/* Writing */}
      <section aria-labelledby="write-h" className="shell pt-24 md:pt-32">
        <Reveal>
          <h2 id="write-h" className="display mb-8 text-[clamp(44px,6vw,88px)]">
            I write things down
          </h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Link
              href="/ledger"
              className="bg-indigo-deep group relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 text-white md:p-9"
            >
              <p className="text-[15px] text-indigo-100">
                Every prediction gets a date and a probability, then a score.
              </p>
              <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
                {ledger.stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p className="display text-[56px]">{s.value}</p>
                    <p className="text-[13px] text-indigo-200">{s.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-8 space-y-2">
                {resolved.map((c) => (
                  <li
                    key={c.prediction}
                    className="flex items-start gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-[14px]"
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded-md px-1.5 text-[11px] font-bold ${c.result === "HIT" ? "bg-emerald-300 text-emerald-950" : "bg-rose-300 text-rose-950"}`}
                    >
                      {c.result}
                    </span>
                    {c.prediction}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                See every call{" "}
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/writing"
              className="bg-mesh group relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] ring-1 ring-line"
            >
              {papers.map((w, i) => (
                <span
                  key={w.title}
                  className="absolute w-[44%] max-w-[230px] transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${(i - 1) * 62}%) rotate(${(i - 1) * 9}deg)`,
                    zIndex: i === 1 ? 2 : 1,
                  }}
                >
                  <span className="paper-shadow relative block aspect-[900/1273] overflow-hidden rounded-[3px] bg-white transition-transform duration-500 group-hover:-translate-y-3">
                    <Image
                      src={w.cover!}
                      alt={`First page of ${w.title}`}
                      fill
                      sizes="230px"
                      className="object-cover object-top"
                    />
                  </span>
                </span>
              ))}
              <span className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-[14px] font-semibold shadow-lg">
                Papers, memos and theses <Arrow className="inline" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
