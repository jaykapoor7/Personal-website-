import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { AreaMap } from "@/components/AreaMap";
import {
  Counter,
  HorizontalGallery,
  InView,
  Reveal,
  RiseWords,
  ScrollScale,
  ScrollText,
  Spotlight,
  ZoomStage,
} from "@/components/motion";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Photo } from "@/components/ui";
import { photos, projects, stats } from "@/content/site";
import { ledger } from "@/content/ledger";
import companies from "@/content/healthtech-map.json";

const straypaw = projects.find((p) => p.slug === "straypaw")!;
const gallery = [
  "juno-ai",
  "crowwd",
  "tot-schools",
  "project-nidaan",
  "finer-things-club",
].map((s) => projects.find((p) => p.slug === s)!);
const orgs = [
  "Crowwd",
  "HDFC Bank",
  "TOT Schools",
  "UPMC Emergency Medicine",
  "Accessible SmartTech Lab",
  "SCI 3Sixty",
  "Apodaca Lab",
  "JumpStart · AmeriCorps",
  "Juno-AI",
  "Project Nidaan",
];
const hits = ledger.calls.filter((c) => c.result === "HIT").length;
const resolved = ledger.calls.filter((c) => c.result !== "OPEN").length;

function Marquee({
  children,
  speed = "40s",
}: {
  children: React.ReactNode;
  speed?: string;
}) {
  return (
    <div className="marquee-wrap fade-x overflow-hidden">
      <div
        className="marquee"
        style={{ "--speed": speed } as React.CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

const display =
  "text-[clamp(44px,6.5vw,96px)] font-medium leading-[0.9] tracking-[-0.055em]";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 md:pt-44">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl"
        />
        <div className="shell relative text-center">
          <Reveal y={12}>
            <Link
              href="/work/straypaw"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/60 py-1.5 pl-3 pr-4 text-[13px] text-muted backdrop-blur transition-colors hover:text-fg"
            >
              <span className="live-dot" aria-hidden="true" />
              Now building StrayPaw
              <Arrow direction="right" className="text-faint" />
            </Link>
          </Reveal>
          <h1 className="mt-8 text-[clamp(60px,13.5vw,196px)] font-medium leading-[0.86] tracking-[-0.065em]">
            <RiseWords text="Jay Kapoor." delay={0.1} />
          </h1>
          <p className="mt-4 font-serif text-[clamp(30px,5.4vw,72px)] italic leading-none tracking-[-0.02em] text-muted">
            <RiseWords
              text="Builds for the real world."
              delay={0.35}
              stagger={0.06}
            />
          </p>
          <Reveal delay={0.8} y={10}>
            <p className="mx-auto mt-9 max-w-md text-[15px] text-fg/75">
              Founder of StrayPaw &amp; Juno-AI · Econ &amp; Stats, Pitt ’28
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-[1240px] px-3 sm:px-6 md:mt-20">
          <ScrollScale className="relative aspect-[4/5] overflow-hidden bg-card sm:aspect-[16/10] md:aspect-[2/1]">
            <Photo
              name="pitt_portrait"
              alt="Jay Kapoor on the Cathedral of Learning lawn, University of Pittsburgh"
              priority
              className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
            />
          </ScrollScale>
        </div>
      </section>

      {/* Statement */}
      <section className="shell py-32 md:py-48">
        <ScrollText
          className="mx-auto max-w-4xl text-center text-[clamp(30px,4.6vw,60px)] font-medium leading-[1.08] tracking-[-0.035em]"
          text="I start companies where systems break — street animals with no records, villages with no doctor, riders who deliver medicine they can’t get themselves."
        />
      </section>

      {/* Numbers */}
      <section aria-label="By the numbers" className="shell">
        <dl className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 2) * 0.1}
              className="border-t border-line pt-6"
            >
              <dd className="text-[clamp(64px,10vw,136px)] font-medium leading-none tracking-[-0.06em]">
                <Counter value={s.value} />
              </dd>
              <dt className="mt-4 text-[17px] text-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Organisations */}
      <section aria-label="Organisations" className="pt-32 md:pt-44">
        <p className="eyebrow mb-8 text-center">Worked with</p>
        <Marquee speed="55s">
          {orgs.map((o) => (
            <span
              key={o}
              className="flex items-center whitespace-nowrap px-6 text-[clamp(28px,4vw,52px)] font-medium tracking-[-0.04em] text-fg/50 transition-colors hover:text-fg md:px-10"
            >
              {o}
              <span
                className="ml-12 text-[0.5em] text-accent/60 md:ml-20"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* StrayPaw */}
      <section
        aria-labelledby="straypaw"
        className="mt-32 bg-[#0b0b0b] text-white md:mt-44"
      >
        <ZoomStage
          image={
            <Image
              src="/straypaw/field-observation.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          }
        >
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
              Now · Solo founder
            </p>
            <h2
              id="straypaw"
              className="mt-5 text-[clamp(64px,14vw,200px)] font-medium leading-[0.85] tracking-[-0.065em]"
            >
              StrayPaw.
            </h2>
            <p className="mt-6 font-serif text-[clamp(26px,3.6vw,48px)] italic text-white/85">
              Every street animal. One record.
            </p>
          </div>
        </ZoomStage>
        <div className="shell grid items-center gap-16 py-28 md:grid-cols-[1fr_1.2fr] md:py-40">
          <div>
            <Reveal>
              <h3 className="text-[clamp(36px,4.4vw,60px)] font-medium leading-[1] tracking-[-0.045em]">
                254 neighbourhoods.
                <br />
                <span className="text-white/40">One map.</span>
              </h3>
            </Reveal>
            <dl className="mt-14 grid grid-cols-3 gap-6">
              {straypaw.metrics!.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.1}>
                  <dd className="text-[clamp(32px,4vw,52px)] font-medium tracking-[-0.05em]">
                    <Counter value={m.value} />
                  </dd>
                  <dt className="mt-1 text-sm text-white/55">{m.label}</dt>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2} className="mt-14 flex flex-wrap gap-3">
              <a
                href="https://straypaw.kapoorjay.com"
                target="_blank"
                rel="noreferrer"
                className="btn h-12 bg-white px-6 text-black hover:bg-white/85"
              >
                Visit StrayPaw <Arrow />
              </a>
              <Link
                href="/work/straypaw"
                className="btn h-12 border border-white/20 px-6 hover:bg-white/10"
              >
                Case study
              </Link>
            </Reveal>
          </div>
          <InView>
            <AreaMap />
          </InView>
        </div>
      </section>

      {/* Selected work */}
      <HorizontalGallery
        header={
          <div className="shell mb-10 flex items-end justify-between md:mb-14">
            <h2 className={display}>
              Selected{" "}
              <span className="font-serif font-normal italic">work.</span>
            </h2>
            <Link
              href="/work"
              className="hidden items-center gap-1.5 text-sm text-muted hover:text-fg sm:inline-flex"
            >
              All work <Arrow />
            </Link>
          </div>
        }
      >
        {gallery.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group block w-[80vw] shrink-0 snap-start sm:w-[400px] md:w-[440px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line">
              <ProjectVisual project={p} sizes="440px" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-5 pt-16 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm">View project</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
                  <Arrow />
                </span>
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-medium tracking-[-0.03em]">
                {p.title}
              </h3>
              {p.metrics && (
                <span className="shrink-0 text-sm text-muted">
                  <span className="font-medium text-fg">
                    {p.metrics[0].value}
                  </span>{" "}
                  {p.metrics[0].label}
                </span>
              )}
            </div>
            <p className="mt-1 text-[15px] text-muted">{p.role}</p>
          </Link>
        ))}
        <Link
          href="/work"
          className="group grid aspect-[4/5] w-[80vw] shrink-0 snap-start place-items-center rounded-[28px] border border-dashed border-line transition-colors hover:bg-card sm:w-[400px] md:w-[440px]"
        >
          <span className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-fg text-2xl text-bg transition-transform duration-500 group-hover:rotate-45">
              <Arrow />
            </span>
            <span className="mt-5 block text-2xl font-medium tracking-tight">
              Everything else
            </span>
            <span className="mt-1 block text-sm text-muted">
              {projects.length} projects
            </span>
          </span>
        </Link>
      </HorizontalGallery>

      {/* Bento */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="more">
        <Reveal>
          <h2 id="more" className={`mb-12 ${display}`}>
            And <span className="font-serif font-normal italic">more.</span>
          </h2>
        </Reveal>
        <Spotlight className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-4">
          <Reveal className="md:col-span-2 md:row-span-2">
            <Link
              href="/ledger"
              data-spot
              className="group flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-card p-7 md:p-9"
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow">Forecast ledger</p>
                <Arrow className="text-faint transition-colors group-hover:text-fg" />
              </div>
              <div className="mt-10">
                <p className="text-[clamp(72px,9vw,128px)] font-medium leading-none tracking-[-0.06em]">
                  <Counter value="0.134" />
                </p>
                <p className="mt-3 text-muted">
                  Brier score · {hits} of {resolved} resolved calls right
                </p>
              </div>
              <InView className="mt-10">
                <div className="flex h-28 items-end gap-1.5" aria-hidden="true">
                  {ledger.calls.map((c, i) => (
                    <i
                      key={i}
                      className={`grow-bar block flex-1 rounded-t-md ${
                        c.result === "HIT"
                          ? "bg-emerald-500"
                          : c.result === "MISS"
                            ? "bg-rose-500"
                            : "bg-fg/15"
                      }`}
                      style={
                        {
                          height: `${c.conviction}%`,
                          "--d": i * 60,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  15 calls · bar height = conviction
                </p>
              </InView>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.08}>
            <Link
              href="/research"
              data-spot
              className="group flex h-full flex-col justify-between rounded-[28px] border border-line p-7 md:p-9"
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow">Research</p>
                <Arrow className="text-faint transition-colors group-hover:text-fg" />
              </div>
              <div className="mt-8">
                <p className="text-[clamp(36px,4vw,56px)] font-medium leading-none tracking-[-0.05em]">
                  Pitt <span className="text-faint">×</span> UPMC
                </p>
                <p className="mt-3 text-muted">
                  Applied AI · accessibility · emergency medicine · cell biology
                </p>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              href="/research#landscape"
              data-spot
              className="group flex h-full flex-col justify-between rounded-[28px] border border-line p-7"
            >
              <InView>
                <div
                  className="grid w-fit grid-cols-9 gap-1.5"
                  aria-hidden="true"
                >
                  {companies.map((_, i) => (
                    <i
                      key={i}
                      className="grow-bar block h-2.5 w-2.5 rounded-full bg-accent"
                      style={
                        {
                          "--d": i * 25,
                          opacity: 0.35 + (i % 4) * 0.2,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </InView>
              <div className="mt-8">
                <p className="text-5xl font-medium tracking-[-0.05em]">
                  <Counter value={String(companies.length)} />
                </p>
                <p className="mt-2 text-sm text-muted">
                  Indian healthtech companies, mapped
                </p>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href="/work/juno-ai/Juno-AI-Research-Paper.pdf"
              target="_blank"
              rel="noreferrer"
              data-spot
              className="group flex h-full flex-col justify-between rounded-[28px] border border-line p-7"
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow">Paper</p>
                <Arrow className="text-faint transition-colors group-hover:text-fg" />
              </div>
              <div>
                <p className="font-serif text-3xl italic leading-tight">
                  Juno AI
                </p>
                <p className="mt-2 text-sm text-muted">
                  Retrieval-grounded health information for rural India
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.08}>
            <a
              href="https://strike.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[28px] bg-[#fde047] text-black"
            >
              <span className="-rotate-6 rounded-lg border-[5px] border-black px-6 py-2 font-mono text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110 md:text-5xl">
                ON STRIKE.
              </span>
              <span className="absolute bottom-5 left-6 text-sm font-medium">
                Everybody’s on Strike · Play ↗
              </span>
            </a>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.14}>
            <a
              href="https://emergency.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[28px] bg-[#b91c1c] text-white"
            >
              <span
                aria-hidden="true"
                className="text-8xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-8deg] group-hover:scale-110"
              >
                🦕
              </span>
              <span className="absolute bottom-5 left-6 text-sm font-medium">
                The World’s Worst Emergency Service · Play ↗
              </span>
            </a>
          </Reveal>
        </Spotlight>
      </section>

      {/* Photos */}
      <section aria-labelledby="clock" className="pt-32 md:pt-44">
        <Reveal className="shell mb-12 flex items-end justify-between">
          <h2 id="clock" className={display}>
            Off the{" "}
            <span className="font-serif font-normal italic">clock.</span>
          </h2>
          <Link
            href="/about"
            className="hidden items-center gap-1.5 text-sm text-muted hover:text-fg sm:inline-flex"
          >
            About me <Arrow />
          </Link>
        </Reveal>
        <Marquee speed="60s">
          {photos.slice(1).map((p, i) => (
            <figure
              key={p.name}
              className={`relative mx-2 h-[300px] shrink-0 overflow-hidden rounded-[24px] bg-card md:mx-3 md:h-[420px] ${
                i % 2 ? "w-[260px] md:w-[360px]" : "w-[380px] md:w-[540px]"
              }`}
            >
              <Photo
                name={p.name}
                alt={p.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </section>
    </>
  );
}
