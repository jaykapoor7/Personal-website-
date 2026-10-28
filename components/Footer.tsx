"use client";
import { useState } from "react";
import { person } from "@/content/site";

export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer id="contact" className="shell mt-32 scroll-mt-16 pb-10 md:mt-44">
      <a
        href={`mailto:${person.email}`}
        className="block break-all text-[clamp(40px,9vw,140px)] font-semibold leading-[0.9] transition-colors hover:text-accent"
      >
        {person.email}
      </a>
      <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[16px] font-medium">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(person.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="text-accent hover:underline"
        >
          {copied ? "Copied" : "Copy email"}
        </button>
        {[{ label: "Resume", href: person.resume }, ...person.links].map(
          (l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {l.label}
            </a>
          ),
        )}
        <a href="/artifacts/" className="text-accent hover:underline">
          All documents
        </a>
      </p>
      <p className="mt-16 text-[14px] text-muted">Jay Kapoor, {person.place}</p>
    </footer>
  );
}
