"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { forwardRef, useRef, useState } from "react";
import data from "@/content/straypaw-map.json";
import { ventures } from "@/content/site";
import { Arrow } from "../Arrow";
import {
  Glide,
  Parallax,
  Reveal,
  RiseWords,
  ScrollScale,
  useMotionOK,
} from "../motion";

/* Map geometry: an equirectangular projection squeezed for India's latitude. */
const K = 10;
const COS = Math.cos((22 * Math.PI) / 180);
const px = (lng: number) => (lng - 68) * K * COS;
const py = (lat: number) => (37.6 - lat) * K;
const W = 29.5 * K * COS;
const H = 310;
const DELHI = { x: px(77.21), y: py(28.61) };
const dist = (x: number, y: number) => Math.hypot(x - DELHI.x, y - DELHI.y);

const outline = (data.outline as number[][][])
  .map(
    (r) =>
      "M" +
      r.map(([a, b]) => `${px(a).toFixed(1)},${py(b).toFixed(1)}`).join("L") +
      "Z",
  )
  .join("");
const cities = (data.cities as [string, number, number, number][])
  .map(([name, lng, lat, n]) => {
    const x = px(lng);
    const y = py(lat);
    return { name, n, x, y, d: dist(x, y) };
  })
  .sort((a, b) => a.d - b.d);
const cells = (data.cells as number[][]).map(([lng, lat]) => {
  const x = px(lng);
  const y = py(lat);
  return { x, y, d: dist(x, y) };
});
const maxD = Math.max(...cities.map((c) => c.d)) * 1.03;
const TOTAL = cities.reduce((s, c) => s + c.n, 0);

/** Cities worth naming on the map, and which side the name sits on. */
const named: Record<string, "l" | "r" | "b"> = {
  Delhi: "l",
  Lucknow: "r",
  Ranchi: "l",
  Jamshedpur: "b",
  Hyderabad: "r",
  Bengaluru: "l",
  Chennai: "r",
  Coimbatore: "l",
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/* Scroll beats, as fractions of the pinned scene. */
const SHRINK = [0.12, 0.3] as const;
const WAVE = [0.32, 0.84] as const;

const captions = [
  "June 2026, Delhi. A dog outside a cafe that nobody was keeping track of.",
  "So I started the record. Fifty dogs first, then feeders and rescue groups across India.",
  "Four months on: 28 cities, 475 neighbourhoods, 19 NGO partners and a pilot with a municipality.",
];

const features = [
  "Case workspaces for rescue groups",
  "Sterilisation and vaccination analytics for cities",
  "Works offline in the field",
  "Widgets partners embed on their own sites",
];

function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const [raw, setRaw] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setRaw(Math.round(v * 360) / 360),
  );
  const p = ok ? raw : 1;

  // The photo shrinks from a full frame to a dot on Delhi.
  const t = smooth(clamp((p - SHRINK[0]) / (SHRINK[1] - SHRINK[0])));
  const full = { w: 228, h: 188 };
  const w = mix(full.w, 5, t);
  const h = mix(full.h, 5, t);
  const cx = mix(W / 2, DELHI.x, t);
  const cy = mix(154, DELHI.y, t);

  const wave = clamp((p - WAVE[0]) / (WAVE[1] - WAVE[0]));
  const reach = wave * maxD;
  const started = p >= SHRINK[1] - 0.02;
  const done = p >= WAVE[1];
  const reached = cities.filter((c) => started && c.d <= Math.max(reach, 1));
  const count = done
    ? TOTAL
    : !started
      ? 1
      : Math.max(
          50,
          reached.reduce((s, c) => s + c.n, 0),
        );
  const beat = done ? 2 : started ? 1 : 0;

  return (
    <div ref={ref} className={ok ? "h-[380vh]" : ""}>
      <div
        className={`overflow-hidden ${ok ? "sticky top-0 h-[100svh] min-h-[560px]" : "py-24"}`}
      >
        <div className="shell flex h-full flex-col gap-3 pb-4 pt-[84px] md:grid md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-8 md:pb-8">
          <div className="shrink-0">
            <p className="flex items-center gap-3 text-[14px] font-medium text-white/85">
              <span className="live" aria-hidden="true" />
              What I am building now
            </p>
            <h2 className="display mt-3 text-[clamp(52px,min(8.4vw,15vh),132px)] md:mt-5">
              StrayPaw
            </h2>
            <div className="relative mt-3 h-[4.2em] max-w-[30ch] text-[clamp(16px,min(1.7vw,2.9vh),24px)] font-medium leading-[1.3] md:mt-6 md:h-[5.3em]">
              {captions.map((c, i) => (
                <motion.p
                  key={c}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: beat === i ? 1 : 0,
                    y: beat === i ? 0 : beat > i ? -14 : 14,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden={ok && beat !== i ? "true" : undefined}
                >
                  {c}
                </motion.p>
              ))}
            </div>
            <p className="display mt-2 text-[clamp(60px,min(10vw,17vh),164px)] md:mt-6">
              <Glide value={count} />
            </p>
            <p className="mt-1 text-[15px] font-medium text-white/85 md:mt-2">
              {count === 1 ? "dog outside a cafe" : "animals on record"}
            </p>
          </div>

          <svg
            viewBox={`0 0 ${W.toFixed(0)} ${H}`}
            className="mx-auto min-h-0 w-auto max-w-full flex-1 md:h-[min(84svh,860px)] md:flex-none"
            role="img"
            aria-label="Map of India. StrayPaw spreads from one dog in Delhi to 30,288 animals in 28 cities."
          >
            <defs>
              <radialGradient id="sp-glow">
                <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <clipPath id="sp-photo">
                <rect
                  x={cx - w / 2}
                  y={cy - h / 2}
                  width={w}
                  height={h}
                  rx={mix(5, 2.5, t)}
                />
              </clipPath>
            </defs>
            <path
              d={outline}
              fill="rgba(255,255,255,0.09)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.6"
              style={{ opacity: mix(0.35, 1, t), transition: "opacity .3s" }}
            />
            {cells.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r="0.45"
                fill="#fff"
                style={{
                  opacity: started && c.d <= reach ? 0.9 : 0,
                  transition: "opacity .6s",
                }}
              />
            ))}
            {cities.map((c) => {
              const on = reached.includes(c);
              const r = 1.3 + Math.sqrt(c.n) * 0.034;
              const side = named[c.name];
              return (
                <g
                  key={c.name}
                  style={{ opacity: on ? 1 : 0, transition: "opacity .6s" }}
                >
                  <circle cx={c.x} cy={c.y} r={r * 2.8} fill="url(#sp-glow)" />
                  <circle cx={c.x} cy={c.y} r={r} fill="#fff" />
                  {c.name === "Delhi" && (
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={r + 2.4}
                      fill="none"
                      stroke="#fff"
                      strokeWidth="0.7"
                    />
                  )}
                  {side && (
                    <text
                      x={
                        side === "b"
                          ? c.x + 1
                          : c.x +
                            (side === "r" ? r + 2.5 : -r - 2.5) -
                            (c.name === "Delhi" ? 3 : 0)
                      }
                      y={side === "b" ? c.y + r + 6.5 : c.y + 1.8}
                      textAnchor={side === "r" ? "start" : "end"}
                      fontSize="5.2"
                      fontWeight="600"
                      fill="#fff"
                      className="hidden md:block"
                    >
                      {c.name}
                    </text>
                  )}
                </g>
              );
            })}
            {started && !done && (
              <circle
                cx={DELHI.x}
                cy={DELHI.y}
                r={Math.max(reach, 1)}
                fill="none"
                stroke="#fff"
                strokeWidth="0.7"
                opacity={0.8 * (1 - wave * 0.7)}
              />
            )}
            {t < 1 && (
              <image
                href="/straypaw/street-dog.webp"
                x={cx - w / 2}
                y={cy - h / 2}
                width={w}
                height={h}
                preserveAspectRatio="xMidYMin slice"
                clipPath="url(#sp-photo)"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function Product() {
  const v = ventures.find((x) => x.id === "straypaw")!;
  return (
    <div className="shell pb-24 pt-16 md:pb-40 md:pt-10">
      <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <h3 className="display text-[clamp(38px,5.4vw,84px)]">
          <RiseWords
            onView
            text="Feeders, rescuers and cities, all writing to one record."
          />
        </h3>
        <Reveal>
          <ul className="grid gap-x-8 gap-y-3 text-[16px] font-medium leading-snug sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/work/straypaw" className="btn-light">
              Case study <Arrow direction="right" />
            </Link>
            <a
              href={v.site!.href}
              target="_blank"
              rel="noreferrer"
              className="btn-glass"
            >
              {v.site!.label} <Arrow />
            </a>
            <a
              href="https://www.straypaw.org/map"
              target="_blank"
              rel="noreferrer"
              className="btn-glass"
            >
              Live map <Arrow />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-14 md:mt-20">
        <ScrollScale from={0.86} className="w-[92%] md:w-[76%]">
          <div className="deep-shadow relative aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl">
            <Image
              src="/previews/straypaw-d.webp"
              alt="The StrayPaw home page: every stray animal in India, seen, tracked, cared for"
              fill
              sizes="(max-width: 768px) 92vw, 960px"
              className="object-cover object-top"
            />
          </div>
        </ScrollScale>
        <Parallax
          by={70}
          className="absolute right-0 top-[34%] w-[52%] md:top-[18%] md:w-[44%]"
        >
          <div className="deep-shadow relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-2xl">
            <Image
              src="/previews/straypaw-map-d.webp"
              alt="The StrayPaw live map of India with city counts"
              fill
              sizes="(max-width: 768px) 52vw, 560px"
              className="object-cover object-top"
            />
          </div>
        </Parallax>
        <Parallax
          by={-40}
          className="absolute bottom-[-12%] right-[36%] w-[20%] md:bottom-[-16%] md:right-[30%] md:w-[15%]"
        >
          <div className="deep-shadow relative aspect-[390/800] overflow-hidden rounded-[14px] bg-white ring-[3px] ring-white md:rounded-[28px] md:ring-[6px]">
            <Image
              src="/previews/straypaw-m.webp"
              alt="StrayPaw on a phone"
              fill
              sizes="(max-width: 768px) 20vw, 200px"
              className="object-cover object-top"
            />
          </div>
        </Parallax>
      </div>

      <Reveal className="mt-24 md:mt-40">
        <p className="max-w-[52ch] text-[clamp(18px,1.7vw,24px)] font-medium leading-[1.35] text-white/85">
          Partners include{" "}
          <span className="text-white">
            PAWS Chennai, Pawsome People Project, The Kind Hour Foundation
          </span>{" "}
          and <span className="text-white">STRAW India</span>, with a pilot
          running in Ludhiana.
        </p>
      </Reveal>
    </div>
  );
}

/** StrayPaw: one dog in Delhi becomes a record of 30,288 animals as you scroll. */
export const StrayPaw = forwardRef<HTMLElement>(function StrayPaw(_, ref) {
  return (
    <section
      ref={ref}
      id="straypaw"
      data-tone="dark"
      aria-label="StrayPaw"
      className="bg-stars relative z-10 rounded-t-[28px] bg-accent text-white md:rounded-t-[44px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_72%_24%,rgba(255,255,255,0.2),transparent_70%)]"
      />
      <div className="relative">
        <Scene />
        <Product />
      </div>
    </section>
  );
});
