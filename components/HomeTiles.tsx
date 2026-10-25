"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import data from "@/content/straypaw-map.json";
import { ledgerStats } from "@/content/ledger";
import { builds, labs, roles, writing } from "@/content/site";
import { Arrow } from "./Arrow";
import { COS, K, outline, px, py } from "./DogMap";

const ease = [0.16, 1, 0.3, 1] as const;

/** Runs a counter on an interval, unless the visitor prefers less motion. */
function useTick(ms: number, n: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [ms, n, reduce]);
  return i;
}

function Tile({
  href,
  no,
  title,
  note,
  dark,
  className = "",
  delay,
  children,
}: {
  href: string;
  no: string;
  title: string;
  note: string;
  dark?: boolean;
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] p-5 ring-1 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] md:p-6 ${
          dark ? "bg-fg text-white ring-fg" : "bg-paper ring-line"
        }`}
      >
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? "text-white/60" : "text-muted"}`}
            >
              {no}
            </p>
            <h2 className="mt-1 text-[clamp(30px,3.2vw,46px)] font-semibold leading-none tracking-[-0.05em]">
              {title}
            </h2>
            <p
              className={`mt-2 max-w-[30ch] text-[14.5px] leading-snug ${dark ? "text-white/70" : "text-muted"}`}
            >
              {note}
            </p>
          </div>
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300 group-hover:-rotate-45 ${
              dark
                ? "ring-white/40 group-hover:bg-white group-hover:text-fg"
                : "ring-fg group-hover:bg-fg group-hover:text-white"
            }`}
          >
            <Arrow direction="right" />
          </span>
        </div>
        <div className="relative mt-5 flex-1">{children}</div>
      </Link>
    </motion.li>
  );
}

/** Every StrayPaw city, pulsing on a small map of India. */
function MiniMap() {
  const cities = data.cities as [string, number, number, number][];
  return (
    <div className="grid h-full grid-cols-[1fr_1.1fr] items-end gap-4">
      <div>
        <p className="text-[clamp(44px,5vw,76px)] font-semibold leading-none tracking-[-0.06em] tabular-nums">
          30,288
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
          animals on StrayPaw, 28 cities
        </p>
      </div>
      <svg
        viewBox={`0 0 ${(29.5 * K * COS).toFixed(0)} 310`}
        className="h-full max-h-[340px] w-full"
        aria-hidden="true"
      >
        <path
          d={outline}
          fill="rgb(255 255 255 / 0.04)"
          stroke="rgb(255 255 255 / 0.3)"
          strokeWidth="0.7"
        />
        {cities.map(([name, lng, lat, n], i) => (
          <g key={name} transform={`translate(${px(lng)} ${py(lat)})`}>
            <circle
              r={1.6 + Math.sqrt(n) * 0.1}
              fill="rgb(129 140 248 / 0.35)"
            />
            <circle
              r="1.6"
              fill="#fff"
              className="ping"
              style={{ animationDelay: `${(i * 0.37) % 4}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** The questions, one at a time. */
function QuestionTicker() {
  const qs = [...roles, ...labs].map((x) => x.question);
  const i = useTick(2800, qs.length);
  return (
    <div className="flex h-full min-h-[110px] items-end">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease }}
          className="serif text-[clamp(24px,2.3vw,32px)] leading-[1.05]"
        >
          {qs[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** The memos as a small fanned stack that spreads on hover. */
function Fan() {
  const covers = writing.slice(0, 4);
  return (
    <div className="flex h-full items-end justify-between gap-4">
      <div>
        <p className="text-[clamp(40px,4vw,60px)] font-semibold leading-none tracking-[-0.06em]">
          {ledgerStats.brier}
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Brier score, {ledgerStats.calls} calls
        </p>
      </div>
      <div className="relative h-[130px] w-[150px] shrink-0">
        {covers.map((w, i) => (
          <span
            key={w.href}
            className="paper-shadow absolute bottom-0 left-1/2 block aspect-[900/1273] w-[78px] origin-bottom overflow-hidden bg-white transition-transform duration-500 ease-out [transform:translateX(-50%)_rotate(var(--r0))] group-hover:[transform:translateX(calc(-50%+var(--x)))_rotate(var(--r1))]"
            style={
              {
                "--r0": `${(i - 1.5) * 3}deg`,
                "--r1": `${(i - 1.5) * 14}deg`,
                "--x": `${(i - 1.5) * 16}px`,
              } as React.CSSProperties
            }
          >
            <Image
              src={w.cover}
              alt=""
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Screens from the builds, dealt like cards. */
function Deck() {
  const shots = builds.filter((b) => b.image && !b.phone);
  const i = useTick(2200, shots.length);
  return (
    <div className="relative mx-auto h-full min-h-[170px] w-full max-w-[360px]">
      {shots.map((b, n) => {
        const k = (n - i + shots.length) % shots.length;
        return (
          <motion.span
            key={b.id}
            className="absolute inset-x-0 bottom-0 block overflow-hidden rounded-lg bg-white ring-1 ring-black/10"
            animate={{
              y: -k * 12,
              scale: 1 - k * 0.05,
              opacity: k > 2 ? 0 : 1,
              zIndex: 10 - k,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <span className="relative block aspect-[16/9]">
              <Image
                src={b.image!}
                alt=""
                fill
                sizes="360px"
                className="object-cover object-top"
              />
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}

/** Pittsburgh time and what I am doing right now. */
function Now() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex h-full flex-col justify-end">
      <p className="text-[clamp(40px,4vw,60px)] font-semibold leading-none tracking-[-0.06em] tabular-nums">
        {t || " "}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        in Pittsburgh right now
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5 text-[13px]">
        {["StrayPaw", "SmartTech Lab", "SCI 3Sixty", "Econ + Stats"].map(
          (x) => (
            <li key={x} className="rounded-full px-2.5 py-1 ring-1 ring-line">
              {x}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/** The five pages of the site, each shown doing something. */
export function HomeTiles() {
  return (
    <ul className="grid gap-3 md:grid-cols-12 md:gap-4">
      <Tile
        href="/started"
        no="01"
        title="Started"
        note="Four things I started, and the moment each one began."
        dark
        className="md:col-span-7 md:row-span-2 md:min-h-[460px]"
        delay={0.8}
      >
        <MiniMap />
      </Tile>
      <Tile
        href="/questions"
        no="02"
        title="Questions"
        note={`${roles.length} jobs and ${labs.length} labs, each as a question.`}
        className="md:col-span-5"
        delay={0.88}
      >
        <QuestionTicker />
      </Tile>
      <Tile
        href="/predictions"
        no="03"
        title="Predictions"
        note="Calls with odds, scored when they land."
        className="md:col-span-5"
        delay={0.96}
      >
        <Fan />
      </Tile>
      <Tile
        href="/play"
        no="04"
        title="Play"
        note={`${builds.length} tools and games that run in your browser.`}
        className="md:col-span-6"
        delay={1.04}
      >
        <Deck />
      </Tile>
      <Tile
        href="/about"
        no="05"
        title="About"
        note="School, football, and Bangalore to Pittsburgh."
        className="md:col-span-6"
        delay={1.12}
      >
        <Now />
      </Tile>
    </ul>
  );
}
