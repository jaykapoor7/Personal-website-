"use client";
import { Arrow } from "@/components/Arrow";

import { useState } from "react";
import Link from "next/link";

const project = (u: number, v: number, h = 0) => [
  400 + (u - v) * 32,
  100 + (u + v) * 16 - h,
];
const pts = (coords: number[][]) =>
  coords.map(([u, v, h]) => project(u, v, h).join(",")).join(" ");
const buildings = Array.from({ length: 81 }, (_, i) => ({
  u: (i % 9) + 1,
  v: Math.floor(i / 9) + 1,
  h: 14 + ((i * 17) % 34),
})).filter((b) => b.u % 3 !== 0 && b.v % 3 !== 0);
const stops = [
  {
    u: 6,
    v: 5,
    title: "An observation",
    label: "A street animal needs care.",
    tag: "01 / On the street",
  },
  {
    u: 3,
    v: 5,
    title: "A shared record",
    label: "A place, a history, a next step.",
    tag: "02 / In the record",
  },
  {
    u: 3,
    v: 8,
    title: "Coordinated care",
    label: "A team can pick up where another left off.",
    tag: "03 / Across the system",
  },
];
const scenes = [
  {
    title: (
      <>
        One small problem.
        <br />
        <em>A whole system.</em>
      </>
    ),
    body: "A street animal needs care. A report is a start. What connects it to the people who can help?",
    action: "Follow the observation",
    note: "Start with what’s missing.",
  },
  {
    title: (
      <>
        The report exists.
        <br />
        <em>Now connect it.</em>
      </>
    ),
    body: "A photo. A place. A history. Shared records make an observation useful to the next person.",
    action: "See the wider system",
    note: "Make the handoff possible.",
  },
  {
    title: (
      <>
        Better connections.
        <br />
        <em>Better care.</em>
      </>
    ),
    body: "Residents, rescue teams, and cities working from the same record. This is the problem I’m building StrayPaw around.",
    action: "Explore StrayPaw",
    note: "Build for the people doing the work.",
  },
];
export function LivingSystem() {
  const [step, setStep] = useState(0);
  const [linked, setLinked] = useState(true);
  const scene =
    step === 2 && !linked
      ? {
          ...scenes[2],
          title: (
            <>
              Same effort.
              <br />
              <em>Lost connections.</em>
            </>
          ),
          body: "The observations still exist. Without a shared record, teams lose the history and the handoff. Reconnect them to see what changes.",
          note: "Information has to travel with the work.",
        }
      : scenes[step];
  return (
    <section className="living-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> JAY KAPOOR · BUILDER & RESEARCHER
        </div>
        <div className="hero-narrative" aria-live="polite">
          <h1 id="hero-title" key={step}>
            {scene.title}
          </h1>
          <p>{scene.body}</p>
        </div>
        <div className="hero-actions">
          {step < 2 ? (
            <button className="pill dark" onClick={() => setStep((s) => s + 1)}>
              {scene.action}
              <span>
                <Arrow />
              </span>
            </button>
          ) : (
            <Link className="pill dark" href="/work/straypaw">
              {scene.action}
              <span>
                <Arrow />
              </span>
            </Link>
          )}
          <Link className="text-link" href="/work">
            See the work <span>↓</span>
          </Link>
        </div>
        <p className="hero-bio">
          I build software and study access to care.
          <br />
          Economics & Statistics at the University of Pittsburgh.
        </p>
      </div>
      <div className={`world step-${step}`}>
        <div className="world-top">
          <span className="eyebrow">THE LIVING SYSTEM</span>
          <span className="world-coordinate">
            {["01. OBSERVE", "02. CONNECT", "03. COORDINATE"][step]}
          </span>
        </div>
        <svg
          viewBox="0 0 800 620"
          className="world-map"
          role="group"
          aria-label={`Illustrated neighborhood: ${stops[step].label}`}
        >
          <defs>
            <pattern
              id="map-dots"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r=".7" fill="#c3c8bf" />
            </pattern>
          </defs>
          <rect width="800" height="620" fill="url(#map-dots)" opacity=".5" />
          <g
            className="world-camera"
            style={{
              transform: `translate(${step === 0 ? -165 : step === 1 ? -65 : 0}px, ${step === 0 ? -100 : step === 1 ? -40 : 0}px) scale(${step === 0 ? 1.5 : step === 1 ? 1.18 : 1})`,
            }}
          >
            <polygon
              points={pts([
                [0, 0],
                [12, 0],
                [12, 12],
                [0, 12],
              ])}
              fill="#e7e9df"
              stroke="#a8b6a8"
              strokeWidth="1"
            />
            <polygon
              points={pts([
                [12, 12],
                [0, 12],
                [0, 12, -12],
                [12, 12, -12],
              ])}
              fill="#d8ded0"
              stroke="#a8b6a8"
            />
            <polygon
              points={pts([
                [12, 0],
                [12, 12],
                [12, 12, -12],
                [12, 0, -12],
              ])}
              fill="#ced8ca"
              stroke="#a8b6a8"
            />
            {[1, 4, 7, 10].map((n) => (
              <g key={n} fill="none">
                <polyline
                  points={pts([
                    [n, 0],
                    [n, 12],
                  ])}
                  stroke="#f9f8f2"
                  strokeWidth="20"
                />
                <polyline
                  points={pts([
                    [0, n],
                    [12, n],
                  ])}
                  stroke="#f9f8f2"
                  strokeWidth="20"
                />
                <polyline
                  points={pts([
                    [n, 0],
                    [n, 12],
                  ])}
                  stroke="#cbd1c5"
                  strokeDasharray="2 10"
                />
                <polyline
                  points={pts([
                    [0, n],
                    [12, n],
                  ])}
                  stroke="#cbd1c5"
                  strokeDasharray="2 10"
                />
              </g>
            ))}
            {buildings.map(({ u, v, h }, i) => (
              <g key={i} className="map-building">
                <polygon
                  points={pts([
                    [u, v],
                    [u + 0.7, v],
                    [u + 0.7, v + 0.7],
                    [u, v + 0.7],
                  ])}
                  fill="#cdd6c7"
                />
                <polygon
                  points={pts([
                    [u, v, h],
                    [u + 0.7, v, h],
                    [u + 0.7, v + 0.7, h],
                    [u, v + 0.7, h],
                  ])}
                  fill={i % 5 === 0 ? "#d9e7c3" : "#f7f5ec"}
                  stroke="#a6b2a1"
                />
                <polygon
                  points={pts([
                    [u + 0.7, v, h],
                    [u + 0.7, v + 0.7, h],
                    [u + 0.7, v + 0.7],
                    [u + 0.7, v],
                  ])}
                  fill="#c8d1bf"
                  stroke="#a6b2a1"
                />
                <polygon
                  points={pts([
                    [u, v + 0.7, h],
                    [u + 0.7, v + 0.7, h],
                    [u + 0.7, v + 0.7],
                    [u, v + 0.7],
                  ])}
                  fill="#e2e6d9"
                  stroke="#a6b2a1"
                />
                <path
                  d={`M${project(u + 0.25, v + 0.71, h - 8)}v7 M${project(u + 0.5, v + 0.71, h - 8)}v7`}
                  stroke="#b3bfaa"
                  strokeWidth="2"
                />
              </g>
            ))}
            {[
              [2, 10],
              [5, 11],
              [9, 10],
              [10, 3],
              [11, 7],
              [2, 2],
              [8, 2],
            ].map(([u, v], i) => (
              <g key={i} transform={`translate(${project(u, v)})`}>
                <path d="M0 0v-17" stroke="#7e9773" />
                <ellipse
                  cy="-20"
                  rx="10"
                  ry="15"
                  fill="#b3cda0"
                  stroke="#8eaa7e"
                />
                <path
                  d="M0-6v-21m0 14l-5-5m5 0l5-5"
                  stroke="#8eaa7e"
                  fill="none"
                />
              </g>
            ))}
            <polyline
              className="care-route"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={step > 0 && linked ? 0 : 1}
              opacity={step > 0 && linked ? 1 : 0}
              points={pts([
                [6, 5],
                [4, 5],
                [3, 5],
                [3, 7],
                [3, 8],
              ])}
              fill="none"
              stroke="#ed633d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {step === 2 &&
              linked &&
              [
                [9, 5],
                [6, 8],
                [9, 8],
                [6, 2],
              ].map(([u, v], i) => (
                <g
                  key={i}
                  className="network-branch"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <polyline
                    points={pts([
                      [3, 5],
                      [u, 5],
                      [u, v],
                    ])}
                    fill="none"
                    stroke="#457464"
                    strokeWidth="1.5"
                    strokeDasharray="4 5"
                  />
                  <circle
                    cx={project(u, v)[0]}
                    cy={project(u, v)[1]}
                    r="5"
                    fill="#457464"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </g>
              ))}
            {stops.map((s, i) => {
              const [x, y] = project(s.u, s.v);
              return (
                <g
                  key={i}
                  opacity={i <= step ? 1 : 0.22}
                  role="button"
                  tabIndex={0}
                  aria-label={`${["Observation", "Shared record", "Care team"][i]} — explore ${s.title.toLowerCase()}`}
                  onClick={() => setStep(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setStep(i);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="15"
                    fill="#f7f6ef"
                    stroke={i <= step ? "#ed633d" : "#a4b29e"}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill={i <= step ? "#ed633d" : "#a4b29e"}
                  />
                  {i === step && (
                    <circle
                      className="map-pulse"
                      cx={x}
                      cy={y}
                      r="23"
                      fill="none"
                      stroke="#ed633d"
                    />
                  )}
                  <path d={`M${x},${y - 15}v-40`} stroke="#ed633d" />
                  <g transform={`translate(${x - 58},${y - 81})`}>
                    <rect
                      width="116"
                      height="27"
                      rx="13.5"
                      fill={i === step ? "#293f35" : "#f7f6ef"}
                      stroke="#aab7a3"
                    />
                    <text
                      x="58"
                      y="17"
                      textAnchor="middle"
                      fill={i === step ? "#f7f6ef" : "#52654f"}
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {["OBSERVATION", "SHARED RECORD", "CARE TEAM"][i]}
                    </text>
                  </g>
                </g>
              );
            })}
            <g
              transform={`translate(${project(6.5, 5.2)})`}
              stroke="#624b3d"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M-8-8h13l4-5 6 2-2 7H6v8M-6-8v12M-8-8l-5-5" />
            </g>
          </g>
        </svg>
        {step === 2 && (
          <div className="connection-switch">
            <span>ONE VARIABLE. A DIFFERENT SYSTEM.</span>
            <button
              role="switch"
              aria-checked={linked}
              onClick={() => setLinked((v) => !v)}
            >
              <i />
              {linked ? "Shared record on" : "Shared record off"}
            </button>
          </div>
        )}
        <div className="world-caption">
          <span>
            <i /> {scene.note}
          </span>
          <small>Illustrated system · not live data</small>
        </div>
        <div
          className="scale-control"
          role="group"
          aria-label="Explore the system at different scales"
        >
          {["Observation", "Record", "System"].map((s, i) => (
            <button
              key={s}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
            >
              <span>0{i + 1}</span>
              {s}
              <i />
            </button>
          ))}
        </div>
      </div>
      <div className="hero-bottom">
        <span>INDIVIDUAL STORIES. SHARED INFRASTRUCTURE.</span>
        <a href="#selected">
          EXPLORE THE CONNECTIONS <span>↓</span>
        </a>
      </div>
    </section>
  );
}
