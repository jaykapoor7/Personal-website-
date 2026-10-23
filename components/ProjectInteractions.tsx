"use client";
import { useState } from "react";
const care = [
  {
    name: "Observe",
    title: "Someone notices.",
    text: "A resident records an animal, its condition, and its location.",
  },
  {
    name: "Record",
    title: "The observation stays.",
    text: "A shared profile keeps sightings and care history together.",
  },
  {
    name: "Coordinate",
    title: "The next person can act.",
    text: "Rescue teams can review requests, assign cases, and record follow-ups.",
  },
];
export function CarePath() {
  const [step, setStep] = useState(0);
  return (
    <div className="care-path">
      <div className="mini-label">STRAYPAW / FROM SIGHTING TO FOLLOW-UP</div>
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
    short: "The medicine costs money.",
    detail:
      "Medication competes with daily essentials. Affordability has to be part of the intervention.",
    symbol: "₹",
  },
  {
    name: "Time",
    short: "The visit costs a shift.",
    detail:
      "A clinic visit can mean unpaid hours. Care needs to fit the workday.",
    symbol: "◷",
  },
  {
    name: "Continuity",
    short: "The story starts over.",
    detail:
      "Fragmented care makes follow-up harder. A regular point of care changes the pathway.",
    symbol: "↻",
  },
];
export function FieldNotes() {
  const [active, setActive] = useState(0);
  return (
    <div className="field-notes">
      <div className="mini-label">NIDAAN / NOTES FROM BENGALURU</div>
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
        Qualitative themes from the field brief. One city; not a representative
        population sample.
      </small>
    </div>
  );
}
export function JunoPath() {
  const [stage, setStage] = useState(0);
  const items = [
    {
      label: "Question",
      text: "Start with a health concern, in everyday language.",
    },
    {
      label: "Sources",
      text: "Retrieve relevant material from a curated information base.",
    },
    {
      label: "Next step",
      text: "Explain the information and point toward appropriate human care.",
    },
  ];
  return (
    <div className="juno-path">
      <div className="mini-label">JUNO-AI / INFORMATION TO ORIENTATION</div>
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
      <small>
        Architecture described in the research paper. A prototype, not a
        clinically validated service.
      </small>
    </div>
  );
}
