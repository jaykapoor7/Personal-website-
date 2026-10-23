"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  laneLabels,
  moments,
  now,
  timeline,
  type Lane,
  type Stint,
} from "@/content/site";
import { Arrow } from "./Arrow";
import { SmartLink } from "./ui";

const FROM = 2018;
// A stretched scale: recent years, where most things happen, get more room.
const stops: [number, number][] = [
  [2018, 0],
  [2019, 6],
  [2024, 38],
  [2028.3, 100],
];
const at = (t: number) => {
  const i = Math.max(
    0,
    stops.findIndex(([y], k) => t < (stops[k + 1]?.[0] ?? Infinity)),
  );
  const [y0, p0] = stops[Math.min(i, stops.length - 2)];
  const [y1, p1] = stops[Math.min(i, stops.length - 2) + 1];
  return p0 + ((t - y0) / (y1 - y0)) * (p1 - p0);
};
const lanes: Lane[] = ["started", "worked", "research", "school"];
const style: Record<Lane, { bar: string; chip: string }> = {
  started: {
    bar: "bg-indigo-600 text-white",
    chip: "bg-indigo-100 text-indigo-800",
  },
  worked: { bar: "bg-sky-300 text-sky-950", chip: "bg-sky-100 text-sky-900" },
  research: {
    bar: "bg-violet-600 text-white",
    chip: "bg-violet-100 text-violet-800",
  },
  school: {
    bar: "bg-amber-300 text-amber-950",
    chip: "bg-amber-100 text-amber-900",
  },
};
/** Rough width of a label as a share of the track, at the timeline's minimum width. */
const TRACK = 888;
const labelPct = (s: Stint) => ((s.title.length * 7.6 + 30) / TRACK) * 100;

/** Pack each lane into as few rows as possible without labels colliding. */
function pack(items: Stint[]) {
  const rows: number[] = [];
  return items
    .slice()
    .sort((a, b) => a.start - b.start)
    .map((s) => {
      // A label that does not fit inside its bar sits just after it.
      const barEnd = Math.max(at(s.end ?? now), at(s.start) + 0.9);
      const end =
        (barEnd - at(s.start) > labelPct(s) ? barEnd : barEnd + labelPct(s)) +
        0.8;
      let r = rows.findIndex((free) => free <= at(s.start));
      if (r === -1) r = rows.push(0) - 1;
      rows[r] = end;
      return { s, r };
    });
}

/** Everything I have done, laid out on one line of years. Click anything to see where it led. */
export function Timeline() {
  const [sel, setSel] = useState("straypaw");
  const packed = useMemo(
    () =>
      lanes.map((l) => ({
        l,
        items: pack(timeline.filter((s) => s.lane === l)),
      })),
    [],
  );
  const chosen = timeline.find((s) => s.id === sel)!;
  const years = Array.from({ length: 10 }, (_, i) => FROM + i);
  // On narrow screens, open on the recent years rather than 2018.
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <div>
      <div
        ref={scroller}
        className="overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        <div className="relative min-w-[980px] pl-[92px]">
          {/* year grid */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[92px] right-0"
            aria-hidden="true"
          >
            {years.map((y) => (
              <i
                key={y}
                className="absolute inset-y-0 w-px bg-indigo-950/[0.06]"
                style={{ left: `${at(y)}%` }}
              />
            ))}
            <i
              className="absolute inset-y-0 w-[2px] rounded-full bg-accent2"
              style={{ left: `${at(now)}%` }}
            />
            <span
              className="hand absolute -top-1 -translate-x-1/2 text-xl text-accent2"
              style={{ left: `${at(now)}%` }}
            >
              now
            </span>
          </div>

          {/* photos */}
          <div className="relative h-[124px]">
            {moments.map((m, i) => (
              <figure
                key={m.name}
                className="absolute top-5 w-[84px] -translate-x-1/2 bg-white p-1.5 pb-0 shadow-[0_8px_20px_-8px_rgba(30,27,75,0.45)] transition-transform duration-300 hover:z-10 hover:scale-[1.6]"
                style={{
                  left: `${at(m.at)}%`,
                  rotate: `${[-6, 5, -3][i % 3]}deg`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/photos/${m.name}-640.webp`}
                  alt={m.caption}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="hand py-0.5 text-center text-[15px] leading-tight text-fg">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* lanes */}
          {packed.map(({ l, items }) => {
            const rows = Math.max(...items.map((x) => x.r)) + 1;
            return (
              <div
                key={l}
                className="relative border-t border-indigo-950/[0.06] py-2"
                style={{ height: rows * 38 + 16 }}
              >
                <span className="absolute -left-[92px] top-3 text-[13px] font-semibold text-muted">
                  {laneLabels[l]}
                </span>
                {items.map(({ s, r }) => {
                  const left = at(s.start);
                  const width = Math.max(at(s.end ?? now) - left, 0.9);
                  const roomy = width > labelPct(s);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSel(s.id)}
                      aria-pressed={sel === s.id}
                      aria-label={`${s.title}, ${s.role}, ${s.when}`}
                      className="group absolute h-[30px] text-left"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        top: 8 + r * 38,
                      }}
                    >
                      <span
                        className={`flex h-full w-full min-w-[14px] items-center overflow-hidden rounded-full px-3 text-[13px] font-semibold transition-all ${style[l].bar} ${
                          sel === s.id
                            ? "ring-[3px] ring-offset-2 ring-offset-white ring-indigo-950/70"
                            : "group-hover:brightness-110"
                        } ${s.end === null ? "rounded-r-md" : ""}`}
                      >
                        {roomy && <span className="truncate">{s.title}</span>}
                      </span>
                      {!roomy && (
                        <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[13px] font-semibold text-fg">
                          {s.title}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* axis */}
          <div className="relative h-8 border-t border-indigo-950/10">
            {years.map((y) => (
              <span
                key={y}
                className="absolute top-2 -translate-x-1/2 text-[12px] font-medium tabular-nums text-faint"
                style={{ left: `${at(y)}%` }}
              >
                {y === FROM ? "before" : y}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* the selected stint */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={chosen.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-4 flex flex-col gap-4 rounded-2xl bg-white/80 p-5 ring-1 ring-line backdrop-blur sm:flex-row sm:items-center sm:p-6"
          aria-live="polite"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${style[chosen.lane].chip}`}
              >
                {laneLabels[chosen.lane]}
              </span>
              <span className="text-[13px] text-muted">{chosen.when}</span>
            </div>
            <p className="display mt-2 text-2xl">
              {chosen.title}{" "}
              <span className="font-sans text-lg font-normal text-muted">
                {chosen.role}
              </span>
            </p>
            <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-fg/80">
              {chosen.line}
            </p>
          </div>
          {chosen.href && (
            <SmartLink
              href={chosen.href}
              className="btn-primary shrink-0 self-start sm:self-center"
            >
              {chosen.link} <Arrow />
            </SmartLink>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
