"use client";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import data from "@/content/straypaw-map.json";

export const K = 10;
export const COS = Math.cos((22 * Math.PI) / 180);
export const px = (lng: number) => (lng - 68) * K * COS;
export const py = (lat: number) => (37.6 - lat) * K;
const DELHI = { x: px(77.21), y: py(28.61) };
const dist = (x: number, y: number) => Math.hypot(x - DELHI.x, y - DELHI.y);

export const outline = (data.outline as number[][][])
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
  return (
    <section
      aria-labelledby="map-h"
      ref={ref}
      className={reduce ? "" : "h-[240vh]"}
    >
      <div
        className={`${reduce ? "" : "sticky top-0 h-[100svh]"} overflow-hidden`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2 pb-4 pt-20 md:grid md:grid-cols-[1fr_1.1fr] md:items-center md:gap-6 md:py-20">
          <div>
            <h2
              id="map-h"
              className="text-[clamp(26px,4vw,56px)] font-semibold leading-[1]"
            >
              {p < 0.15
                ? "June 2026: 50 dogs in Delhi."
                : done
                  ? "October 2026: 28 cities."
                  : "Across India."}
            </h2>
            <p className="mt-4 text-[clamp(56px,9vw,140px)] font-semibold leading-none md:mt-8">
              {p < 0.15 ? "50" : total.toLocaleString("en-US")}
            </p>
            <p className="mt-2 text-[15px] text-muted">animals on record</p>
            <motion.p
              className="mt-6 text-[17px] md:mt-8"
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              28 cities, 475 neighbourhoods and 19 NGO partners.
            </motion.p>
            <a
              href="https://www.straypaw.org/map"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-[16px] font-medium text-accent hover:underline md:mt-8"
            >
              Open the live map →
            </a>
          </div>

          <svg
            viewBox={`0 0 ${(29.5 * K * COS).toFixed(0)} 310`}
            className="mx-auto h-[40svh] w-auto max-w-full shrink-0 md:h-[78svh] md:w-full"
            role="img"
            aria-label="Map of India with every StrayPaw city"
          >
            <path
              d={outline}
              fill="none"
              stroke="rgb(var(--line))"
              strokeWidth="0.8"
            />
            {cities.map((c) => {
              const on = shown.includes(c) || c.name === "Delhi";
              return (
                <circle
                  key={c.name}
                  cx={c.x}
                  cy={c.y}
                  r={1.6 + Math.sqrt(c.n) * 0.08}
                  fill="rgb(var(--accent))"
                  style={{ opacity: on ? 1 : 0, transition: "opacity .5s" }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
