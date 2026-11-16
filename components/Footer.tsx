"use client";
import { useEffect, useState } from "react";
import { person } from "@/content/site";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return <span className="tabular-nums">{time || "—"}</span>;
}

/** A simple closing note rather than a second, oversized landing page. */
export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer data-tone="light" aria-labelledby="contact-h" className="border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-[780px] px-5 pb-8 pt-10 sm:px-8 sm:pt-12">
        <h2 id="contact-h" className="text-[20px] font-semibold tracking-[-0.035em]">
          Have something in mind? Say hello.
        </h2>
        <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-muted">
          I’m always interested in hearing about thoughtful projects, research
          questions or people building something useful.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px] font-medium">
          <a href={`mailto:${person.email}`} className="underline decoration-line underline-offset-4 hover:text-accent">
            {person.email} ↗
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(person.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              } catch {
                setCopied(false);
              }
            }}
            className="underline decoration-line underline-offset-4 hover:text-accent"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
          {person.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:text-accent">
              {link.label} ↗
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-[12px] text-muted">
          <span>© {new Date().getFullYear()} Jay Kapoor</span>
          <span>Pittsburgh · <Clock /></span>
          <a href="/artifacts/" className="underline decoration-line underline-offset-4 hover:text-fg">
            All documents
          </a>
        </div>
      </div>
    </footer>
  );
}
