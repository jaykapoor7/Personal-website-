"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "./Arrow";
import snapshot from "@/content/straypaw-snapshot.json";
const stages = ["Observation", "Record", "Network", "StrayPaw"];
const notes = [
  "Animal report.",
  "A shared record.",
  "Care teams.",
  "StrayPaw · Coimbatore.",
];
const centers = snapshot.areas.map((a) => {
  const xs = a.ring.filter((_, i) => i % 2 === 0),
    ys = a.ring.filter((_, i) => i % 2 === 1);
  return [
    xs.reduce((a, b) => a + b) / xs.length,
    ys.reduce((a, b) => a + b) / ys.length,
  ];
});
const bounds = [
  Math.min(...centers.map((p) => p[0])),
  Math.max(...centers.map((p) => p[0])),
  Math.min(...centers.map((p) => p[1])),
  Math.max(...centers.map((p) => p[1])),
];
const geo = ([x, y]: number[]) => [
  380 + ((x - bounds[0]) / (bounds[1] - bounds[0])) * 440,
  385 - ((y - bounds[2]) / (bounds[3] - bounds[2])) * 330,
];
const pos = (i: number, step: number) => {
  if (step === 3) return geo(centers[i]);
  if (step === 1) return [310 + (i % 5) * 145, 135 + Math.floor(i / 5) * 84];
  if (step === 0) {
    if (i === 0) return [600, 220];
    const a = i * 2.39996,
      r = 40 + Math.sqrt(i) * 20;
    return [600 + Math.cos(a) * r, 220 + Math.sin(a) * r * 0.55];
  }
  const a = i * 2.39996,
    r = 30 + Math.sqrt(i) * 32;
  return [600 + Math.cos(a) * r, 220 + Math.sin(a) * r * 0.46];
};
export function LivingSystem() {
  const [step, setStep] = useState(0),
    [linked, setLinked] = useState(true);
  const canvas = useRef<HTMLDivElement>(null),
    manual = useRef(false);
  const choose = (n: number) => {
    manual.current = true;
    setStep(n);
  };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame || manual.current) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const top = canvas.current?.getBoundingClientRect().top ?? 0;
        if (top < 200 && top > -380)
          setStep(Math.min(3, Math.floor((200 - top) / 125)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const count = step === 0 ? 1 : step === 1 ? 15 : step === 2 ? 95 : 254;
  return (
    <section className="system-hero" aria-labelledby="hero-title">
      <div className="hero-heading shell">
        <div className="hero-topline">
          <span className="eyebrow">ECONOMICS & STATISTICS / PITT</span>
          <span className="eyebrow">PITTSBURGH ↔ INDIA</span>
        </div>
        <h1 id="hero-title">
          Jay Kapoor.
          <span className="hero-subtitle">Student at Pitt.</span>
        </h1>
        <div className="hero-intro">
          <p>I’m interested in software, data, and public health.</p>
          <Link href="#selected" className="hero-work-link">
            Work <Arrow direction="down" />
          </Link>
          <span className="eyebrow hero-aside">
            CURRENTLY BUILDING STRAYPAW
          </span>
        </div>
      </div>
      <div
        className={`system-scene phase-${step} ${linked ? "is-linked" : ""}`}
        ref={canvas}
      >
        <div className="system-caption shell">
          <span className="eyebrow">
            <i className="live-dot" /> STRAYPAW / WORKFLOW
          </span>
          <span className="scene-index">0{step + 1} / 04</span>
        </div>
        <div className="engine-stage">
          <svg
            viewBox="0 0 1200 440"
            className="connection-art"
            role="img"
            aria-label={notes[step]}
          >
            <defs>
              <pattern
                id="engine-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path d="M14 16h4m-2-2v4" stroke="#4a4c53" strokeWidth=".6" />
              </pattern>
            </defs>
            <rect width="1200" height="440" fill="url(#engine-grid)" />
            <g className="system-orbits" opacity={step === 3 ? 0 : 0.65}>
              <ellipse cx="600" cy="220" rx="480" ry="175" />
              <ellipse cx="600" cy="220" rx="330" ry="120" />
              <ellipse cx="600" cy="220" rx="180" ry="65" />
              <path d="M55 220h1090M600 25v390" />
            </g>
            <g className="real-area-cells" opacity={step === 3 ? 1 : 0}>
              {step === 3 &&
                snapshot.areas.map((a, i) => (
                  <polygon
                    key={i}
                    points={Array.from({ length: a.ring.length / 2 }, (_, j) =>
                      geo([a.ring[j * 2], a.ring[j * 2 + 1]])
                        .map((n) => n.toFixed(1))
                        .join(","),
                    ).join(" ")}
                    fill={a.open > 0 ? "#8290ff" : "#3b3f4d"}
                    stroke="#14151a"
                    strokeWidth="1.4"
                  />
                ))}
            </g>
            <g className="system-edges" opacity={step === 2 && linked ? 1 : 0}>
              {Array.from({ length: 95 }, (_, i) => {
                const a = pos(i, 2),
                  b = pos(Math.floor(i / 3), 2);
                return (
                  <path
                    key={i}
                    d={`M${a}Q600 220 ${b}`}
                    stroke={i % 7 === 0 ? "#91a0ff" : "#444a61"}
                    strokeWidth={i % 7 === 0 ? 1.3 : 0.7}
                  />
                );
              })}
            </g>
            {Array.from({ length: step === 0 ? 95 : count }, (_, i) => {
              const [x, y] = pos(i, step);
              return (
                <g
                  className="system-node"
                  key={i}
                  style={{
                    transform: `translate(${x}px,${y}px)`,
                    opacity: i < count ? 1 : step === 0 ? 0.14 : 0,
                    transitionDelay: `${Math.min(i, 25) * 5}ms`,
                  }}
                >
                  <circle
                    r={
                      step === 0 && i === 0
                        ? 9
                        : step === 1
                          ? 3
                          : step === 3
                            ? 1.4
                            : i % 7 === 0
                              ? 4
                              : 2
                    }
                    fill={i % 7 === 0 ? "#a6afff" : "#9a9fb0"}
                  />
                  {step === 1 && i < 15 && (
                    <g>
                      <rect x="-53" y="-27" width="106" height="54" rx="3" />
                      <path d="M-35-9h14m-14 8h35m-35 8h28" />
                      <circle cx="31" cy="-9" r="5" />
                    </g>
                  )}
                </g>
              );
            })}
            <g className="main-observation" opacity={step === 0 ? 1 : 0}>
              <circle cx="600" cy="220" r="25" />
              <circle cx="600" cy="220" r="40" />
              <path d="M600 180v-45h125" />
              <text x="734" y="139">
                OBSERVATION
              </text>
            </g>
            {step === 3 && (
              <g className="city-label">
                <path d="M790 295h130v30" />
                <text x="850" y="350">
                  COIMBATORE, INDIA
                </text>
                <text x="850" y="370">
                  254 PUBLIC AREAS
                </text>
              </g>
            )}
          </svg>
          <div className="engine-side">
            <span>OBSERVE</span>
            <span>CONNECT</span>
            <span>BUILD</span>
          </div>
        </div>
        <div className="engine-bottom shell">
          <div className="scene-narration" aria-live="polite">
            <p>{notes[step]}</p>
            {step === 3 ? (
              <a
                href="https://straypaw.kapoorjay.com/map"
                target="_blank"
                rel="noreferrer"
                aria-label="Explore the real StrayPaw map"
              >
                Website <Arrow />
              </a>
            ) : (
              <button onClick={() => choose(step + 1)} aria-label="Next">
                Next <Arrow />
              </button>
            )}
          </div>
          <div
            className="scale-control"
            role="group"
            aria-label="StrayPaw workflow"
          >
            {stages.map((s, i) => (
              <button
                key={s}
                aria-pressed={step === i}
                onClick={() => choose(i)}
              >
                <span>0{i + 1}</span>
                {s}
                <i />
              </button>
            ))}
          </div>
        </div>
        {step === 2 && (
          <button
            className="network-toggle"
            role="switch"
            aria-checked={linked}
            onClick={() => setLinked(!linked)}
          >
            {linked ? "Disconnect" : "Reconnect"} records {linked ? "−" : "+"}
          </button>
        )}
        <div className="scene-provenance shell">
          {step === 3 ? (
            <a href={snapshot.source} target="_blank" rel="noreferrer">
              Public area data · 23 Oct 2026 <Arrow />
            </a>
          ) : (
            <span>Workflow diagram; final view uses archived data.</span>
          )}
          <span>CHOOSE A VIEW</span>
        </div>
      </div>
    </section>
  );
}
