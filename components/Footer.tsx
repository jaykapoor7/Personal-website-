"use client";
import { useEffect, useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";
import { Magnetic, RiseWords } from "./motion";

/** The time in Pittsburgh, so you know whether to expect a quick reply. */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || " "}</span>;
}

/** Contact. It waits underneath the page and is uncovered as the page ends. */
export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer
      data-tone="accent"
      aria-labelledby="contact-h"
      className="reveal-footer bg-accent text-white"
    >
      <div className="shell flex min-h-[inherit] flex-col justify-between gap-16 pb-8 pt-28 md:pt-36">
        <div>
          <h2
            id="contact-h"
            className="text-[clamp(22px,2.4vw,34px)] font-medium leading-tight"
          >
            <RiseWords
              onView
              text="Building something, hiring, or just curious? Write to me."
            />
          </h2>
          <a
            href={`mailto:${person.email}`}
            className="display group mt-6 block break-all text-[13.2vw] md:text-[clamp(96px,15.2vw,220px)] md:mt-8"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_0.06em] bg-[position:0_96%] bg-no-repeat transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_0.06em]">
              {person.email}
            </span>
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(person.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="btn-light"
              >
                {copied ? "Copied" : "Copy email"}
              </button>
            </Magnetic>
            {[{ label: "Resume", href: person.resume }, ...person.links].map(
              (l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                >
                  {l.label} <Arrow />
                </a>
              ),
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 text-[15px] font-medium">
          <p>
            Jay Kapoor, {person.place}. It is <Clock /> here.
          </p>
          <a
            href="/artifacts/"
            className="underline decoration-white/50 underline-offset-4 hover:decoration-white"
          >
            Every document and link in one place
          </a>
        </div>
      </div>
    </footer>
  );
}
