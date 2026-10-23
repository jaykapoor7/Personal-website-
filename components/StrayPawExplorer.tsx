"use client";
import { useState } from "react";
import snapshot from "@/content/straypaw-snapshot.json";
import { Arrow } from "./Arrow";
const areas = snapshot.areas;
const project = (x: number, y: number) => [
  (x - 76.87) * 2400,
  560 - (y - 10.89) * 2100,
];
const focusNames = ["Ganapathy", "Vadavalli", "Selvapuram"];
export function StrayPawExplorer() {
  const [active, setActive] = useState("Ganapathy");
  const chosen = areas.find((a) => a.name === active)!;
  return (
    <div className="stray-explorer">
      <div className="atlas-top">
        <span className="eyebrow">
          <i className="live-dot" /> STRAYPAW / PUBLIC AREA ARCHIVE
        </span>
        <span>11.0168° N · 76.9558° E</span>
      </div>
      <div className="atlas-main">
        <svg
          viewBox="0 0 650 590"
          role="img"
          aria-label={`Coimbatore: 254 archived geographic areas. Selected ${active}, ${chosen.open} open requests in the archive.`}
        >
          <defs>
            <pattern
              id="atlas-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 0H0V24"
                fill="none"
                stroke="#43534a"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect width="650" height="590" fill="url(#atlas-grid)" />
          {areas.map((a, i) => (
            <polygon
              key={i}
              points={Array.from({ length: a.ring.length / 2 }, (_, j) =>
                project(a.ring[j * 2], a.ring[j * 2 + 1])
                  .map((n) => n.toFixed(1))
                  .join(","),
              ).join(" ")}
              fill={
                a.name === active
                  ? "#ed8b63"
                  : a.open > 0
                    ? "#668470"
                    : "#334c40"
              }
              stroke="#172b21"
              strokeWidth="1.3"
              opacity={a.name === active ? 1 : 0.85}
            />
          ))}
          <text
            x="18"
            y="550"
            fill="#b8c7b7"
            fontSize="11"
            fontFamily="monospace"
          >
            COIMBATORE
          </text>
          <path d="M18 562h85m-85-4v8m85-8v8" stroke="#92a78f" />
          <text
            x="18"
            y="582"
            fill="#b8c7b7"
            fontSize="8"
            fontFamily="monospace"
          >
            PUBLIC AREA GEOMETRY
          </text>
        </svg>
        <div className="atlas-record">
          <span className="eyebrow">ONE CITY. A SHARED PICTURE.</span>
          <strong>254</strong>
          <p>recorded areas</p>
          <div
            className="area-picker"
            role="group"
            aria-label="Explore archived StrayPaw areas"
          >
            {focusNames.map((n) => (
              <button
                key={n}
                aria-pressed={n === active}
                onClick={() => setActive(n)}
              >
                {n}
                <span>
                  <Arrow />
                </span>
              </button>
            ))}
          </div>
          <div className="area-detail" aria-live="polite">
            <span>{active}</span>
            <b>{chosen.open} open requests</b>
            <small>in the public archive</small>
          </div>
          <a
            className="text-link"
            href="https://straypaw.kapoorjay.com/map"
            target="_blank"
            rel="noreferrer"
          >
            Explore the actual map <Arrow />
          </a>
        </div>
      </div>
      <div className="atlas-source">
        <span>
          Archive retrieved · 23 Oct 2026 · Area aggregates, not live outcomes.
        </span>
        <a href={snapshot.source} target="_blank" rel="noreferrer">
          Source <Arrow />
        </a>
      </div>
    </div>
  );
}
