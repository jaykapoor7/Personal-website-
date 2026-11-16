"use client";
import { useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "../Arrow";
import { Clock } from "../Footer";
import { Section } from "./Section";

/** How to reach me. Email first, because that is where I reply. */
export function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <Section id="contact" n="05" title="Contact">
      <p className="mt-6 max-w-[520px] text-[15.5px] leading-[1.65] text-fg/90 sm:text-[16px]">
        Email is the best way to reach me, about StrayPaw, research or anything
        on this page. It&apos;s <Clock /> in Pittsburgh right now.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={`mailto:${person.email}`}
          className="display text-[clamp(26px,4.4vw,36px)] underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
        >
          {person.email}
        </a>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(person.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="btn-ghost h-8 px-3 text-[13px]"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px]">
        {[{ label: "Resume", href: person.resume }, ...person.links].map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1"
          >
            {l.label} <Arrow className="text-[0.8em]" />
          </a>
        ))}
      </p>
    </Section>
  );
}
