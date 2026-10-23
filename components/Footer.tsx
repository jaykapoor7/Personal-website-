"use client";
import { useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer className="shell mt-28 pb-10">
      <div className="bg-indigo-deep relative overflow-hidden rounded-[32px] px-6 py-14 text-white sm:px-12 md:py-20">
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent)]"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="hand text-3xl text-indigo-200">come say hi</p>
          <a
            href={`mailto:${person.email}`}
            className="display mt-2 block break-all text-[clamp(40px,8vw,120px)] transition-opacity hover:opacity-80"
          >
            {person.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(person.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="btn bg-white text-indigo-700 hover:bg-indigo-50"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
            {person.links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20"
                >
                  {l.label} <Arrow />
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-2 text-[13px] text-muted">
        <p>Made by Jay in {person.place}.</p>
        <a href="/artifacts/" className="hover:text-fg">
          Every file on this site
        </a>
      </div>
    </footer>
  );
}
