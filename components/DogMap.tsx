"use client";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import data from "@/content/straypaw-map.json";

const K = 10;
const COS = Math.cos((22 * Math.PI) / 180);
const px = (lng: number) => (lng - 68) * K * COS;
const py = (lat: number) => (37.6 - lat) * K;
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

/** A wave that starts at the first 50 dogs in Delhi and spreads to every city on the map. */
export function DogMap() {
  const ref = useRef<HTMLDivElement>(null);
  // Server HTML assumes motion; switch after mount so hydration matches.
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefers;
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    if (reduce) setP(1);
  }, [reduce]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setP(Math.round(v * 400) / 400);
  });

  const { cities, cells, maxD } = useMemo(() => {
    const cities = (data.cities as [string, number, number, number][])
      .map(([name, lng, lat, n]) => ({ name, n, x: px(lng), y: py(lat) }))
      .map((c) => ({ ...c, d: dist(c.x, c.y) }))
      .sort((a, b) => a.d - b.d);
    const cells = (data.cells as number[][]).map(([lng, lat, n]) => {
      const x = px(lng);
      const y = py(lat);
      return { x, y, n, d: dist(x, y) };
    });
    const maxD = Math.max(...cities.map((c) => c.d)) * 1.02;
    return { cities, cells, maxD };
  }, []);

  // 0 to 0.15: Delhi alone. 0.15 to 0.85: the wave travels. After: the totals.
  const reach = p < 0.15 ? 0 : Math.min(1, (p - 0.15) / 0.7) * maxD;
  const shown = cities.filter((c) => c.d <= reach || (p >= 0.15 && c.d < 5));
  const total = p >= 0.85 ? 30288 : shown.reduce((s, c) => s + c.n, 0);
  const done = p >= 0.85;
  const labels = new Set([
    "Delhi",
    "Jamshedpur",
    "Ranchi",
    "Coimbatore",
    "Chennai",
    "Bengaluru",
    "Lucknow",
    "Hyderabad",
    "Gangtok",
  ]);

  return (
    <section
      aria-labelledby="map-h"
      ref={ref}
      className={reduce ? "" : "h-[240vh]"}
    >
      <div
        className={`${reduce ? "" : "sticky top-0 h-[100svh]"} overflow-hidden bg-fg text-white`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2 pb-4 pt-20 md:grid md:grid-cols-[1fr_1.1fr] md:items-center md:gap-6 md:py-20">
          <div className="relative z-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              StrayPaw, live map
            </p>
            <h2
              id="map-h"
              className="mt-3 text-[clamp(26px,4vw,56px)] md:mt-4 font-semibold leading-[1] tracking-[-0.045em]"
            >
              {p < 0.15 ? (
                <>June 2026: 50 dogs in Delhi.</>
              ) : done ? (
                <>
                  By October:{" "}
                  <span className="serif font-normal text-white/70">
                    every dot is a real neighbourhood.
                  </span>
                </>
              ) : (
                <>Then it spread.</>
              )}
            </h2>
            <p className="mt-4 text-[clamp(56px,9vw,140px)] md:mt-8 font-semibold leading-none tracking-[-0.06em] tabular-nums">
              {p < 0.15 ? "50" : total.toLocaleString("en-US")}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              animals on record
            </p>
            <motion.dl
              className="mt-4 flex gap-8 md:mt-8 md:gap-10"
              animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
              transition={{ duration: 0.5 }}
            >
              {[
                ["28", "cities"],
                ["475", "neighbourhoods"],
                ["19", "NGO partners"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dd className="text-[32px] font-semibold tracking-[-0.04em]">
                    {n}
                  </dd>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60">
                    {l}
                  </dt>
                </div>
              ))}
            </motion.dl>
            <a
              href="https://www.straypaw.org/map"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white md:mt-8 px-4 py-2 text-[14px] font-medium text-fg transition-colors hover:bg-accent hover:text-white"
            >
              Open the real map
            </a>
          </div>

          <svg
            viewBox={`0 0 ${(29.5 * K * COS).toFixed(0)} 310`}
            className="mx-auto h-[40svh] w-auto max-w-full shrink-0 md:h-[82svh] md:w-full"
            role="img"
            aria-label="Map of India with every StrayPaw city and neighbourhood"
          >
            <path
              d={outline}
              fill="rgb(255 255 255 / 0.04)"
              stroke="rgb(255 255 255 / 0.35)"
              strokeWidth="0.6"
            />
            {reach > 0 && (
              <circle
                cx={DELHI.x}
                cy={DELHI.y}
                r={reach}
                fill="none"
                stroke="rgb(129 140 248 / 0.5)"
                strokeWidth="0.6"
                opacity={done ? 0 : 1}
              />
            )}
            {cells.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={0.9}
                fill="#a5b4fc"
                style={{
                  opacity: c.d <= reach ? 0.9 : 0,
                  transition: "opacity .4s",
                }}
              />
            ))}
            {cities.map((c) => {
              const on = shown.includes(c) || c.name === "Delhi";
              const r = 1.4 + Math.sqrt(c.n) * 0.12;
              return (
                <g
                  key={c.name}
                  style={{ opacity: on ? 1 : 0, transition: "opacity .5s" }}
                >
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={r}
                    fill="rgb(99 102 241 / 0.35)"
                    stroke="#c7d2fe"
                    strokeWidth="0.5"
                  />
                  <circle cx={c.x} cy={c.y} r={1} fill="#fff" />
                  {labels.has(c.name) && (
                    <text
                      x={c.x + r + 2}
                      y={c.y + 2}
                      fontSize="7"
                      fill="#fff"
                      fontFamily="var(--font-mono)"
                    >
                      {c.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
