"use client";
import { useEffect, useRef, useState } from "react";
import { labs, roles, ventures } from "@/content/site";
import { Link } from "next-view-transitions";
import { LogoTile } from "./bits";

export type Group = "startups" | "experience" | "research";

type Item = {
  id: string;
  group: Group;
  name: string;
  role: string;
  period: string;
  logo?: string;
  /** Years as decimals: 2025.5 is the start of July 2025. `end` is null while ongoing. */
  start: number;
  end: number | null;
  row: number;
};

const MONTHS = "JanFebMarAprMayJunJulAugSepOctNovDec";

/** "Jun 2025 to Apr 2026", "May to Aug 2025", "2023 to 2024", "Aug 2026 to present". */
function span(period: string): { start: number; end: number | null } | null {
  const [a, b] = period.split(" to ");
  if (!b) return null;
  const read = (s: string) => ({
    month: s.match(/[A-Z][a-z]{2}/)
      ? MONTHS.indexOf(s.match(/[A-Z][a-z]{2}/)![0]) / 3
      : null,
    year: s.match(/\d{4}/) ? Number(s.match(/\d{4}/)![0]) : null,
  });
  const from = read(a);
  const to = read(b);
  const year = from.year ?? to.year;
  if (year === null) return null;
  return {
    start: year + (from.month ?? 0) / 12,
    end: to.year === null ? null : to.year + ((to.month ?? 11) + 1) / 12,
  };
}

/** Short names, so they fit on a bar. */
const short: Record<string, string> = {
  tarc: "TARC",
  smarttech: "SmartTech Lab",
  "3sixty": "SCI 3Sixty",
  upmc: "UPMC",
  apodaca: "Apodaca Lab",
  max: "Max Hospital",
};

const raw = [
  ...ventures.map((v) => ({
    id: v.id,
    group: "startups" as const,
    name: v.name,
    role: v.role,
    period: v.period,
    logo: v.logo,
  })),
  ...roles.map((r) => ({
    id: r.id,
    group: "experience" as const,
    name: short[r.id] ?? r.org,
    role: r.role,
    period: r.period,
    logo: r.logo,
  })),
  ...labs.map((l) => ({
    id: l.id,
    group: "research" as const,
    name: short[l.id] ?? l.name,
    role: l.role,
    period: l.period,
    logo: l.logo,
  })),
];

/** Dated entries, earliest first, each on the first row that is free when it starts. */
const items: Item[] = (() => {
  const free: number[] = [];
  return raw
    .map((r) => ({ ...r, ...span(r.period) }))
    .filter((r): r is typeof r & { start: number; end: number | null } =>
      Number.isFinite(r.start),
    )
    .sort((a, b) => a.start - b.start)
    .map((r) => {
      let row = free.findIndex((until) => until < r.start - 0.01);
      if (row < 0) row = free.length;
      free[row] = r.end ?? Infinity;
      return { ...r, row };
    });
})();
const ROWS = Math.max(...items.map((i) => i.row)) + 1;
const FROM = Math.floor(Math.min(...items.map((i) => i.start)));
const LATEST = Math.max(...items.map((i) => i.start));

const look: Record<Group, { bar: string; key: string; label: string }> = {
  startups: {
    bar: "bg-accent text-white",
    key: "bg-accent",
    label: "Startups",
  },
  experience: {
    bar: "bg-card text-fg",
    key: "bg-card ring-1 ring-inset ring-line",
    label: "Experience",
  },
  research: {
    bar: "bg-white text-fg ring-[1.5px] ring-inset ring-accent",
    key: "bg-white ring-[1.5px] ring-inset ring-accent",
    label: "Research",
  },
};

/**
 * Everything with dates on one band, 2019 to now. Solid bars are startups,
 * tinted ones jobs, outlined ones research. A bar links to its page.
 */
export function Timeline() {
  const scroller = useRef<HTMLDivElement>(null);
  // Server and first paint agree on "now"; the real date takes over after mount.
  const [now, setNow] = useState(LATEST + 0.25);
  const [tip, setTip] = useState<Item | null>(null);
  useEffect(() => {
    const d = new Date();
    setNow(Math.max(LATEST + 0.1, d.getFullYear() + (d.getMonth() + 1) / 12));
    // On a phone the band is wider than the screen: start at the recent end.
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);
  const at = (t: number) => ((t - FROM) / (now - FROM)) * 100;
  const years = Array.from(
    { length: Math.floor(now) - FROM + 1 },
    (_, i) => FROM + i,
  );

  return (
    <div className="relative">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[13px] font-medium">
        <ul className="flex gap-5 text-muted">
          {(Object.keys(look) as Group[]).map((g) => (
            <li key={g} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-3 w-5 rounded-[4px] ${look[g].key}`}
              />
              {look[g].label}
            </li>
          ))}
        </ul>
        <p className="hidden text-muted sm:block" aria-hidden="true">
          {tip ? (
            <>
              <span className="font-semibold text-fg">{tip.name}</span>
              {"  "}
              {tip.role}, {tip.period}
            </>
          ) : (
            `${FROM} to now`
          )}
        </p>
      </div>

      <div
        ref={scroller}
        className="no-bar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0"
      >
        <div className="relative min-w-[760px] pr-[108px] sm:min-w-0">
          <ul
            className="relative"
            style={{ height: ROWS * 34 - 6 }}
            onMouseLeave={() => setTip(null)}
          >
            {[...years, now].map((y) => (
              <li
                key={y}
                aria-hidden="true"
                className={`absolute inset-y-0 w-px ${y === now ? "bg-accent" : "bg-line"}`}
                style={{ left: `${at(y)}%` }}
              />
            ))}
            {items.map((it) => {
              const left = at(it.start);
              const right = it.end === null ? 100 : Math.min(100, at(it.end));
              const live = it.end === null;
              return (
                <li
                  key={it.id}
                  className="tl-bar absolute"
                  style={{
                    left: `${left}%`,
                    width: `${right - left}%`,
                    top: it.row * 34,
                  }}
                >
                  <Link
                    href={
                      it.group === "startups"
                        ? `/work/${it.id}`
                        : `/${it.group}/`
                    }
                    aria-label={`${it.name}, ${it.role}, ${it.period}`}
                    onMouseEnter={() => setTip(it)}
                    onFocus={() => setTip(it)}
                    onBlur={() => setTip(null)}
                    className="group relative block text-[12.5px] font-semibold"
                  >
                    <span
                      className={`flex h-7 items-center gap-1.5 overflow-hidden rounded-lg pl-1 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 ${
                        live ? "rounded-r-none" : ""
                      } ${look[it.group].bar}`}
                    >
                      <LogoTile
                        src={it.logo}
                        name={it.name}
                        className="h-5 w-5 rounded-[5px] text-[10px] !ring-0"
                      />
                      {!live && (
                        <span className="tl-name truncate pr-2">{it.name}</span>
                      )}
                    </span>
                    {live && (
                      <span className="absolute left-full top-0 flex h-7 items-center whitespace-nowrap pl-2 text-fg">
                        {it.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ol
            className="relative mt-2 h-4 text-[12px] font-medium text-muted"
            aria-hidden="true"
          >
            {years.map((y) => (
              <li
                key={y}
                className="absolute pl-1.5"
                style={{ left: `${at(y)}%` }}
              >
                {y}
              </li>
            ))}
            <li className="absolute left-full pl-2 font-semibold text-accent">
              Now
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
