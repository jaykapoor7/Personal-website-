"use client";
import { useMemo, useState } from "react";
import companies from "@/content/healthtech-map.json";
import { Arrow } from "./Arrow";

const sectors = Array.from(new Set(companies.map((c) => c.sector)));

export function HealthTechMap() {
  const [sector, setSector] = useState("All");
  const shown = useMemo(
    () => companies.filter((c) => sector === "All" || c.sector === sector),
    [sector],
  );
  return (
    <div className="rounded-[24px] border border-line">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5 sm:p-6">
        <div>
          <p className="font-medium tracking-tight">India healthtech dataset</p>
          <p className="text-sm text-muted">
            {companies.length} companies across {sectors.length} sectors
          </p>
        </div>
        <a
          href="/research/India-HealthTech-Companies.csv"
          download
          className="btn-ghost h-9 px-4"
        >
          Download CSV <Arrow />
        </a>
      </div>
      <div
        className="flex gap-2 overflow-x-auto border-b border-line p-4 sm:px-6"
        role="group"
        aria-label="Filter companies by sector"
      >
        {["All", ...sectors].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={sector === s}
            onClick={() => setSector(s)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              sector === s
                ? "border-fg bg-fg text-bg"
                : "border-line text-muted hover:text-fg"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <ul
        className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        {shown.map((c) => (
          <li key={c.name} className="bg-bg p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium tracking-tight">{c.name}</p>
              <span className="shrink-0 text-[13px] text-faint">{c.stage}</span>
            </div>
            <p className="mt-1.5 text-sm leading-snug text-muted">
              {c.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
