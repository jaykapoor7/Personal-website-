"use client";
import { useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer id="contact" className="shell scroll-mt-24 pb-10 pt-28">
      <div className="bg-indigo-deep relative overflow-hidden rounded-[28px] px-6 py-12 text-white sm:px-12 md:py-16">
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent)]"
          aria-hidden="true"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-indigo-200">
              Get in touch
            </p>
            <a
              href={`mailto:${person.email}`}
              className="mt-3 block break-all text-[clamp(34px,5.5vw,72px)] font-semibold leading-[1] tracking-[-0.045em] hover:opacity-85"
            >
              {person.email}
            </a>
            <p className="mt-4 max-w-md text-[16px] text-indigo-100">
              Email is the fastest way to reach me. I am based in Pittsburgh.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:justify-end">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(person.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="btn h-10 bg-white px-4 text-[14px] text-indigo-700 hover:bg-indigo-50"
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
                  className="btn h-10 bg-white/10 px-4 text-[14px] text-white ring-1 ring-white/25 hover:bg-white/20"
                >
                  {l.label} <Arrow />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1 text-[13px] text-muted">
        <p>Jay Kapoor, {person.place}</p>
        <a href="/artifacts/" className="hover:text-fg">
          All documents and links
        </a>
      </div>
    </footer>
  );
}
