import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Desk, DeskRow, type DeskItem } from "@/components/Desk";
import { BrowserFrame, Paper, PhoneFrame, Polaroid } from "@/components/frames";
import { LivePlay } from "@/components/LivePlay";
import { Counter, Reveal, RiseWords } from "@/components/motion";
import { Shelf } from "@/components/Shelf";
import { Showcase } from "@/components/Showcase";
import { WorkIndex } from "@/components/WorkIndex";
import {
  experience,
  featuredProjects,
  games,
  photos,
  projects,
  writing,
} from "@/content/site";

const site = (src: string, url: string, alt: string) => (
  <BrowserFrame url={url} className="deep-shadow">
    <div className="relative aspect-[16/10]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="460px"
        priority
        className="object-cover object-top"
        draggable={false}
      />
    </div>
  </BrowserFrame>
);

const heroItems: DeskItem[] = [
  {
    id: "straypaw",
    label: "StrayPaw",
    href: "/work/straypaw",
    x: 2,
    y: 14,
    rotate: -5,
    width: 440,
    node: site(
      "/previews/straypaw-d.webp",
      "straypaw.kapoorjay.com",
      "StrayPaw home page",
    ),
  },
  {
    id: "portrait",
    label: "About Jay",
    href: "/about",
    x: 78,
    y: 12,
    rotate: 6,
    width: 210,
    node: <Polaroid name="pitt_portrait" alt="Jay at Pitt" caption="Pitt" />,
  },
  {
    id: "arthavaad",
    label: "Crowwd",
    href: "/work/crowwd",
    x: 58,
    y: 12,
    rotate: -4,
    width: 180,
    node: (
      <Polaroid
        src="/work/crowwd/arthavaad-stage-640.webp"
        alt="Jay at an Arthavaad talk"
        caption="Arthavaad, Crowwd"
      />
    ),
  },
  {
    id: "juno",
    label: "Juno-AI paper",
    href: "/work/juno-ai",
    x: 5,
    y: 60,
    rotate: -9,
    width: 180,
    node: (
      <Paper
        src="/covers/Juno-AI-Research-Paper.webp"
        alt="Juno-AI research paper"
      />
    ),
  },
  {
    id: "emergency",
    label: "The World's Worst Emergency Service",
    href: "https://emergency.kapoorjay.com",
    x: 33,
    y: 68,
    rotate: -2,
    width: 340,
    node: site(
      "/previews/emergency-d.webp",
      "emergency.kapoorjay.com",
      "The World's Worst Emergency Service",
    ),
  },
  {
    id: "map",
    label: "StrayPaw map",
    href: "https://straypaw.kapoorjay.com/map",
    x: 66,
    y: 50,
    rotate: 7,
    width: 170,
    node: (
      <PhoneFrame className="deep-shadow">
        <div className="relative aspect-[390/844]">
          <Image
            src="/previews/straypaw-map-m.webp"
            alt="StrayPaw map on a phone"
            fill
            sizes="170px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      </PhoneFrame>
    ),
  },
  {
    id: "tot",
    label: "TOT Schools case study",
    href: "/work/tot-schools",
    x: 84,
    y: 58,
    rotate: 8,
    width: 160,
    node: (
      <Paper
        src="/covers/TOT-Schools-Operations-Case-Study.webp"
        alt="TOT Schools case study"
      />
    ),
  },
];

const photoItems: DeskItem[] = photos.slice(1).map((p, i) => ({
  id: p.name,
  label: p.caption,
  href: "/about",
  x: [4, 27, 52, 74][i],
  y: [14, 30, 8, 26][i],
  rotate: [-6, 4, -3, 7][i],
  width: [260, 240, 250, 240][i],
  node: <Polaroid name={p.name} alt={p.alt} caption={p.caption} />,
}));

const prototypes = projects.filter((p) =>
  [
    "juno-preventive-health",
    "recovery-intelligence",
    "seo-geo-optimiser",
  ].includes(p.slug),
);
const road360 = projects.find((p) => p.slug === "road360")!;

const heading = "display text-[clamp(56px,8vw,120px)]";

export default function Home() {
  return (
    <>
      {/* Hero: a desk of real things */}
      <section className="relative">
        <h1 className="sr-only">Jay Kapoor</h1>
        <Desk
          items={heroItems}
          className="hidden h-[100svh] min-h-[780px] lg:block"
        >
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p
              className="display text-[clamp(96px,13vw,210px)]"
              aria-hidden="true"
            >
              <RiseWords text="Jay Kapoor" delay={0.05} />
            </p>
            <Reveal delay={0.7} y={10}>
              <p className="mt-6 text-xl text-muted">
                Founder of StrayPaw. Economics and Statistics at Pitt.
              </p>
            </Reveal>
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-faint">
            Everything on this desk is real. Drag it around, click to open.
          </p>
        </Desk>
        <div className="pt-32 lg:hidden">
          <div className="shell text-center">
            <p
              className="display text-[clamp(64px,19vw,120px)]"
              aria-hidden="true"
            >
              <RiseWords text="Jay Kapoor" delay={0.05} />
            </p>
            <p className="mt-5 text-lg text-muted">
              Founder of StrayPaw. Economics and Statistics at Pitt.
            </p>
          </div>
          <DeskRow items={heroItems} />
        </div>
      </section>

      {/* Numbers */}
      <section aria-label="Numbers" className="shell pt-16 lg:pt-24">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
          {[
            ["30,288", "animal records on StrayPaw"],
            ["28", "cities in India"],
            ["10,000+", "rural users on Juno-AI"],
            ["0.134", "Brier score on 15 public forecasts"],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.08}>
              <dd className="display text-[clamp(44px,6vw,84px)]">
                <Counter value={v} />
              </dd>
              <dt className="mt-2 text-[15px] text-muted">{l}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* StrayPaw */}
      <section aria-labelledby="straypaw" className="pt-28 lg:pt-40">
        <Reveal className="shell flex items-end justify-between gap-6">
          <div>
            <p className="label">What I&apos;m building</p>
            <h2
              id="straypaw"
              className="display mt-3 text-[clamp(64px,11vw,168px)]"
            >
              StrayPaw
            </h2>
          </div>
          <p className="hidden max-w-xs pb-4 text-right text-muted md:block">
            A shared record for every stray animal in India. Live, and used
            every day.
          </p>
        </Reveal>
        <Showcase
          url="straypaw.kapoorjay.com"
          scroll="/previews/straypaw-scroll.webp"
          scrollRatio={5167 / 1200}
          phone={{
            src: "/previews/straypaw-map-m.webp",
            alt: "StrayPaw's map on a phone",
          }}
          steps={[
            {
              title: "Every stray in India.",
              text: "30,288 animal records across 28 cities, on one shared record.",
            },
            {
              title: "Every animal has a profile.",
              text: "Photos, locations and case history that anyone can look up.",
            },
            {
              title: "It runs on WhatsApp.",
              text: "Rescue groups post in their own group. The StrayPaw bot files it as a case.",
            },
            {
              title: "Followed to the end.",
              text: "Reported, team arrived, care recorded, case closed. Cities get the reports.",
            },
          ]}
          footer={
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://straypaw.kapoorjay.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Visit StrayPaw <Arrow />
              </a>
              <Link href="/work/straypaw" className="btn-ghost">
                The story
              </Link>
            </div>
          }
        />
        <div className="shell mt-10 flex flex-wrap gap-3 lg:hidden">
          <a
            href="https://straypaw.kapoorjay.com"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Visit StrayPaw <Arrow />
          </a>
          <Link href="/work/straypaw" className="btn-ghost">
            The story
          </Link>
        </div>
      </section>

      {/* Work */}
      <section aria-labelledby="work" className="shell pt-28 lg:pt-40">
        <Reveal className="mb-10 flex items-end justify-between">
          <h2 id="work" className={heading}>
            Work
          </h2>
          <Link
            href="/work"
            className="mb-3 inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-fg"
          >
            Everything <Arrow />
          </Link>
        </Reveal>
        <WorkIndex
          items={featuredProjects.filter((p) => p.slug !== "straypaw")}
        />
      </section>

      {/* Made for fun */}
      <section aria-labelledby="fun" className="shell pt-28 lg:pt-40">
        <Reveal className="mb-12 max-w-2xl">
          <h2 id="fun" className={heading}>
            For fun
          </h2>
          <p className="mt-4 text-lg text-muted">
            Things I built on weekends. They are all live. Press play and use
            them right here.
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          {games.map((g, i) => (
            <Reveal key={g.href} delay={i * 0.1}>
              <LivePlay
                title={g.title}
                href={g.href}
                url={g.url}
                image={g.image}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid items-end gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.6fr)]">
          {prototypes.map((p, i) =>
            p.preview?.type === "site" ? (
              <Reveal key={p.slug} delay={i * 0.08}>
                <LivePlay
                  title={p.title}
                  href={p.links[0].href}
                  url={p.preview.url}
                  image={p.preview.desktop}
                  cta="Try it here"
                />
              </Reveal>
            ) : null,
          )}
          {road360.preview?.type === "site" && (
            <Reveal delay={0.24}>
              <LivePlay
                title={road360.title}
                href={road360.links[0].href}
                url={road360.preview.url}
                image={road360.preview.mobile!}
                phone
                cta="Try it"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* Writing */}
      <section aria-labelledby="writing" className="pt-28 lg:pt-40">
        <Reveal className="shell flex flex-wrap items-end justify-between gap-6">
          <h2 id="writing" className={heading}>
            Writing
          </h2>
          <Link href="/ledger" className="group mb-3 text-right">
            <span className="display block text-4xl">
              <Counter value="0.134" />
            </span>
            <span className="inline-flex items-center gap-1 text-[15px] text-muted group-hover:text-fg">
              Brier score on my public forecasts <Arrow />
            </span>
          </Link>
        </Reveal>
        <Shelf items={writing} />
      </section>

      {/* Elsewhere */}
      <section aria-labelledby="elsewhere" className="shell pt-28 lg:pt-40">
        <Reveal>
          <h2 id="elsewhere" className={`mb-10 ${heading}`}>
            Elsewhere
          </h2>
        </Reveal>
        <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {experience.map((e) => {
            const row = (
              <>
                <span className="font-semibold tracking-tight">{e.org}</span>
                <span className="text-muted">{e.role}</span>
                <span className="ml-auto shrink-0 tabular-nums text-faint">
                  {e.period}
                </span>
              </>
            );
            const cls =
              "flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line py-4 text-[15px]";
            return (
              <li key={e.org}>
                {e.href ? (
                  <Link
                    href={e.href}
                    className={`${cls} transition-colors hover:text-accent`}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className={cls}>{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Photos */}
      <section aria-labelledby="photos" className="pt-28 lg:pt-40">
        <Reveal className="shell flex items-end justify-between">
          <h2 id="photos" className={heading}>
            Off the clock
          </h2>
          <Link
            href="/about"
            className="mb-3 inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-fg"
          >
            About me <Arrow />
          </Link>
        </Reveal>
        <div className="shell">
          <Desk items={photoItems} className="hidden h-[560px] lg:block" />
        </div>
        <div className="lg:hidden">
          <DeskRow items={photoItems} />
        </div>
      </section>
    </>
  );
}
