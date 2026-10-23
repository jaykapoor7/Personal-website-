import snapshot from "@/content/straypaw-snapshot.json";

const areas = snapshot.areas;
// Frame the dense core of the city (3rd–97th percentile of area centres);
// the few outlying areas are clipped by the viewBox.
const pct = (v: number[], q: number) =>
  [...v].sort((a, b) => a - b)[Math.floor(q * (v.length - 1))];
const cx = areas.map((a) => a.ring[0]);
const cy = areas.map((a) => a.ring[1]);
const pad = 0.006;
const [minX, maxX, minY, maxY] = [
  pct(cx, 0.03) - pad,
  pct(cx, 0.97) + pad,
  pct(cy, 0.03) - pad,
  pct(cy, 0.97) + pad,
];
const W = 600;
const scale = W / (maxX - minX);
const H = Math.round((maxY - minY) * scale * 1.02);
const project = (x: number, y: number) =>
  `${((x - minX) * scale).toFixed(1)},${(H - (y - minY) * scale * 1.02).toFixed(1)}`;

const openTotal = areas.reduce((n, a) => n + a.open, 0);
const [midX, midY] = [(minX + maxX) / 2, (minY + maxY) / 2];
const reach = Math.hypot(maxX - midX, maxY - midY);
// Entrance delay in ms: a ripple outward from the city centre.
const delay = (a: (typeof areas)[number]) =>
  Math.round(
    Math.min(1, Math.hypot(a.ring[0] - midX, a.ring[1] - midY) / reach) * 1400,
  );

/** The 254 Coimbatore areas from StrayPaw’s public archive, shaded by open requests. */
export function AreaMap({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hexmap w-full overflow-hidden"
        role="img"
        aria-label={`Map of ${areas.length} archived StrayPaw areas in ${snapshot.city}; ${openTotal} open requests at the time of the archive.`}
      >
        {areas.map((a, i) => (
          <polygon
            key={i}
            points={Array.from({ length: a.ring.length / 2 }, (_, j) =>
              project(a.ring[j * 2], a.ring[j * 2 + 1]),
            ).join(" ")}
            fill={
              a.crit > 0
                ? "#fb923c"
                : a.open > 0
                  ? "rgba(251,146,60,0.45)"
                  : "rgba(255,255,255,0.09)"
            }
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.8"
            className={a.crit > 0 ? "urgent-pulse" : undefined}
            style={{ "--d": delay(a) } as React.CSSProperties}
          >
            <title>{`${a.name}: ${a.open} open`}</title>
          </polygon>
        ))}
      </svg>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/50">
        <span>
          {snapshot.city} · {areas.length} areas
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-sm bg-[#fb923c]" /> urgent
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-sm bg-[#fb923c]/45" /> open request
        </span>
        <span>Archived {snapshot.retrievedAt}</span>
      </figcaption>
    </figure>
  );
}
