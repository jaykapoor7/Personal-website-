"use client";
import { useState } from "react";
const care = [
  {
    name: "Observe",
    title: "Animal report.",
    text: "Photo, condition, and location.",
  },
  {
    name: "Record",
    title: "Shared record.",
    text: "Sightings and care history.",
  },
  {
    name: "Coordinate",
    title: "Case follow-up.",
    text: "Teams review, assign, and update cases.",
  },
];
export function CarePath() {
  const [step, setStep] = useState(0);
  return (
    <div className="care-path">
      <div className="mini-label">STRAYPAW / WORKFLOW</div>
      <div
        className="care-stations"
        role="group"
        aria-label="Explore StrayPaw’s workflow"
      >
        {care.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setStep(i)}
            aria-pressed={i === step}
          >
            <span>{i === 0 ? "◎" : i === 1 ? "▤" : "✳"}</span>
            <small>
              0{i + 1} / {s.name}
            </small>
          </button>
        ))}
      </div>
      <div className="care-description" aria-live="polite">
        <strong>{care[step].title}</strong>
        <p>{care[step].text}</p>
      </div>
    </div>
  );
}
const barriers = [
  {
    name: "Cost",
    short: "Medication costs.",
    detail: "Cost was a recurring barrier.",
    symbol: "₹",
  },
  {
    name: "Time",
    short: "Time off work.",
    detail: "Clinic visits can mean lost income.",
    symbol: "◷",
  },
  {
    name: "Continuity",
    short: "Follow-up care.",
    detail: "Riders described fragmented care.",
    symbol: "↻",
  },
];
export function FieldNotes() {
  const [active, setActive] = useState(0);
  return (
    <div className="field-notes">
      <div className="mini-label">NIDAAN / BENGALURU</div>
      <div className="field-count">
        55
        <span>
          field interviews
          <br />
          with delivery riders
        </span>
      </div>
      <div
        className="field-tabs"
        role="group"
        aria-label="Explore barriers identified in fieldwork"
      >
        {barriers.map((b, i) => (
          <button
            key={b.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {b.symbol} {b.name}
          </button>
        ))}
      </div>
      <div className="field-finding" aria-live="polite">
        <h3>{barriers[active].short}</h3>
        <p>{barriers[active].detail}</p>
      </div>
      <small className="source-note">
        Qualitative fieldwork; not a representative sample.
      </small>
    </div>
  );
}
export function JunoPath() {
  const [stage, setStage] = useState(0);
  const items = [
    {
      label: "Question",
      text: "Health query.",
    },
    {
      label: "Sources",
      text: "Curated information.",
    },
    {
      label: "Next step",
      text: "Care navigation.",
    },
  ];
  return (
    <div className="juno-path">
      <div className="mini-label">JUNO-AI / PROTOTYPE</div>
      <div className="juno-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>+</span>
      </div>
      <div
        className="juno-steps"
        role="group"
        aria-label="Explore Juno’s proposed information pathway"
      >
        {items.map((x, i) => (
          <button
            key={x.label}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            {x.label}
            {i < 2 && <span>→</span>}
          </button>
        ))}
      </div>
      <p aria-live="polite">{items[stage].text}</p>
      <small>Research prototype; not clinically validated.</small>
    </div>
  );
}
