"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
const cities = (data.cities as [string, number, number, number][]).map(
  ([name, lng, lat, n]) => {
    const x = px(lng);
    const y = py(lat);
    return { name, n, x, y, d: dist(x, y) };
  },
);
const cells = (data.cells as number[][]).map(([lng, lat]) => {
  const x = px(lng);
  const y = py(lat);
  return { x, y, d: dist(x, y) };
});
const maxD = Math.max(...cities.map((c) => c.d)) * 1.03;
const pct = (v: number) => `${(v * 100).toFixed(2)}%`;

/**
 * StrayPaw's cities on a map of India, with one ring that spreads out from
 * Delhi when the map comes into view, or whenever `play` turns true. The map
 * itself is drawn once and never repainted; the ring is a single element that
 * only scales and fades, so none of this costs anything while scrolling.
 */
export function MiniMap({
  className = "",
  play,
}: {
  className?: string;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const on = play ?? seen;
  return (
    <span
      ref={ref}
      className={`minimap relative block ${on ? "is-on" : ""} ${className}`}
      style={{ aspectRatio: `${W.toFixed(0)} / ${H}` }}
    >
      <svg
        viewBox={`0 0 ${W.toFixed(0)} ${H}`}
        className="block h-full w-full"
        role="img"
        aria-label="Map of India with StrayPaw's 28 cities"
      >
        <path
          d={outline}
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="0.7"
        />
        {cells.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="0.5" fill="#fff" />
        ))}
        {cities.map((c) => (
          <circle
            key={c.name}
            cx={c.x}
            cy={c.y}
            r={1.5 + Math.sqrt(c.n) * 0.036}
            fill="#fff"
          />
        ))}
      </svg>
      <span
        aria-hidden="true"
        className="mm-ring absolute aspect-square rounded-full border-2 border-white"
        style={{
          left: pct(DELHI.x / W),
          top: pct(DELHI.y / H),
          width: pct((2 * maxD) / W),
        }}
      />
    </span>
  );
}
