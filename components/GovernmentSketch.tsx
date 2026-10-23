"use client";
import { useState } from "react";
const states = [
  {
    title: "A park would be nice.",
    action: "Approve one small park",
    note: "Population: 1. Committees: 0.",
  },
  {
    title: "First, form a committee.",
    action: "Form the committee",
    note: "Population: 1. Committees: 1.",
  },
  {
    title: "The committee needs a chair.",
    action: "Appoint yourself",
    note: "Population: 1. Committees: 1. Chairs: 0.",
  },
  {
    title: "You are in a meeting.",
    action: "Build the park anyway",
    note: "Estimated meeting duration: indefinitely.",
  },
  {
    title: "A very small victory.",
    action: "Govern again",
    note: "Population: 1. Parks: 1. Committees: dissolved.",
  },
];
export function GovernmentSketch() {
  const [step, setStep] = useState(0);
  return (
    <div className="government-desk">
      <span className="eyebrow">
        A VERY SMALL GOVERNMENT / PORTFOLIO SKETCH
      </span>
      <strong aria-live="polite">{states[step].title}</strong>
      <button onClick={() => setStep((step + 1) % states.length)}>
        {states[step].action}
      </button>
      <small>{states[step].note}</small>
    </div>
  );
}
