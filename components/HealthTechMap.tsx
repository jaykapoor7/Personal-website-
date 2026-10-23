"use client";
import { Arrow } from "@/components/Arrow";

import { useState } from "react";
import companies from "@/content/healthtech-map.json";
const sectors = Array.from(new Set(companies.map((c) => c.sector)));
export function HealthTechMap() {
  const [sector, setSector] = useState("All"),
    [selected, setSelected] = useState(companies[0]);
  return (
    <div className="health-landscape">
      <div className="landscape-head">
        <div>
          <span className="eyebrow">INDIA HEALTHTECH</span>
          <h3>Company dataset</h3>
        </div>
        <a href="/research/India-HealthTech-Companies.csv" download>
          Download CSV <Arrow />
        </a>
      </div>
      <div
        className="sector-filters"
        role="group"
        aria-label="Filter companies by sector"
      >
        {["All", ...sectors].map((s) => (
          <button
            key={s}
            aria-pressed={sector === s}
            onClick={() => {
              setSector(s);
              setSelected(
                companies.find((c) => s === "All" || c.sector === s)!,
              );
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="landscape-body">
        <div className="company-field">
          {companies.map((c, i) => (
            <button
              key={c.name}
              hidden={sector !== "All" && sector !== c.sector}
              aria-pressed={selected.name === c.name}
              onClick={() => setSelected(c)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <i />
              {c.name}
            </button>
          ))}
        </div>
        <div className="company-detail" aria-live="polite">
          <span className="eyebrow">{selected.sector}</span>
          <h4>{selected.name}</h4>
          <p>{selected.description}</p>
          <small>{selected.stage} · at time of compilation</small>
          <a
            href="/research/India-HealthTech-Market-Map.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Market map <Arrow />
          </a>
        </div>
      </div>
      <p className="landscape-note">
        36 companies. Historical data from the linked CSV.
      </p>
    </div>
  );
}
