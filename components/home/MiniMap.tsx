"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import data from "@/content/straypaw-map.json";

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

/** StrayPaw's cities on a map of India. The record spreads out from Delhi when it comes into view. */
export function MiniMap({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduce) return setT(1);
    const run = animate(0, 1, {
      duration: 2.6,
      delay: 0.25,
      ease: [0.3, 0, 0.2, 1],
      onUpdate: (v) => setT(Math.round(v * 80) / 80),
    });
    return () => run.stop();
  }, [seen, reduce]);
  const reach = t * maxD;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W.toFixed(0)} ${H}`}
      className={className}
      role="img"
      aria-label="Map of India with StrayPaw's 28 cities"
    >
      <defs>
        <radialGradient id="mm-glow">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={outline}
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="0.7"
      />
      {cells.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r="0.5"
          fill="#fff"
          style={{ opacity: c.d <= reach ? 0.9 : 0, transition: "opacity .5s" }}
        />
      ))}
      {cities.map((c) => {
        const r = 1.5 + Math.sqrt(c.n) * 0.036;
        return (
          <g
            key={c.name}
            style={{ opacity: c.d <= reach ? 1 : 0, transition: "opacity .5s" }}
          >
            <circle cx={c.x} cy={c.y} r={r * 2.8} fill="url(#mm-glow)" />
            <circle cx={c.x} cy={c.y} r={r} fill="#fff" />
          </g>
        );
      })}
      {t > 0 && t < 1 && (
        <circle
          cx={DELHI.x}
          cy={DELHI.y}
          r={Math.max(reach, 1)}
          fill="none"
          stroke="#fff"
          strokeWidth="0.8"
          opacity={0.8 * (1 - t * 0.8)}
        />
      )}
    </svg>
  );
}
