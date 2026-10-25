"use client";
import { useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer
      id="contact"
      className="mt-24 scroll-mt-16 bg-fg text-white md:mt-32"
    >
      <div className="shell pb-8 pt-16 md:pt-24">
        <p className="text-[13px] font-medium text-white/60">Email</p>
        <a
          href={`mailto:${person.email}`}
          className="group mt-4 block text-[clamp(44px,11vw,170px)] font-semibold leading-[0.85] tracking-[-0.06em]"
        >
          <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1">
            jak581
          </span>
          <span className="serif inline-block font-normal tracking-[-0.02em] text-white/50 transition-colors duration-500 group-hover:text-accent">
            @pitt.edu
          </span>
        </a>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(person.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-fg transition-colors hover:bg-accent hover:text-white"
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
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium ring-1 ring-white/25 transition-colors hover:bg-white hover:text-fg"
              >
                {l.label} <Arrow />
              </a>
            ),
          )}
        </div>
        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-5 text-[13px] font-medium text-white/60">
          <p>Jay Kapoor, {person.place}</p>
          <a href="/artifacts/" className="hover:text-white">
            All documents and links
          </a>
        </div>
      </div>
    </footer>
  );
}
