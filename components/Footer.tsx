"use client";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

/** The time in Pittsburgh, so you know whether to expect a quick reply. */
export function Clock() {
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

const index = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "All work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#play", label: "Play" },
  { href: "/artifacts/", label: "Documents" },
];

/** A plain footer, the same on every page. */
export function Footer() {
  return (
    <footer className="col pb-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 text-[13.5px] sm:grid-cols-[1.2fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-medium">© 2026 {person.name}</p>
          <p className="mt-1 text-muted">
            {person.place} · <Clock />
          </p>
        </div>
        <div>
          <h2 className="label">Contact</h2>
          <ul className="mt-3 space-y-1.5 text-muted">
            <li>
              <a href={`mailto:${person.email}`} className="hover:text-fg">
                Email
              </a>
            </li>
            {person.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-fg"
                >
                  {l.label} <Arrow className="text-[0.85em]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="label">Index</h2>
          <ul className="mt-3 space-y-1.5 text-muted">
            {index.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
