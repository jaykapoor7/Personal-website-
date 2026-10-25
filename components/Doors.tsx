"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "next-view-transitions";
import { ledgerStats } from "@/content/ledger";
import { builds, labs, roles } from "@/content/site";
import { Arrow } from "./Arrow";

const doors = [
  {
    href: "/started",
    title: "Started",
    line: "Four things I started, and the moment each one began.",
    stat: "30,288 animals on StrayPaw",
  },
  {
    href: "/questions",
    title: "Questions",
    line: "Jobs and labs, each written as the question it was about.",
    stat: `${roles.length} jobs, ${labs.length} labs`,
  },
  {
    href: "/predictions",
    title: "Predictions",
    line: "Calls with odds, scored when they land. Bet against me.",
    stat: `${ledgerStats.calls} calls, Brier ${ledgerStats.brier}`,
  },
  {
    href: "/play",
    title: "Play",
    line: "Tools and games that run right in the browser.",
    stat: `${builds.length} builds`,
  },
  {
    href: "/about",
    title: "About",
    line: "School, football, and Bangalore to Pittsburgh.",
    stat: "Off the clock",
  },
];

/** The five rooms of the site. Each one is its own page. */
export function Doors() {
  const reduce = useReducedMotion();
  return (
    <nav aria-label="Sections" className="border-t border-fg">
      <ol>
        {doors.map((d, i) => (
          <motion.li
            key={d.href}
            className="border-b border-line"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.9 + i * 0.07,
            }}
          >
            <Link
              href={d.href}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-1 py-4 transition-colors md:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.2fr)_200px_40px] md:py-5 lg:hover:bg-fg lg:hover:text-white"
            >
              <span className="hidden pl-2 font-mono text-[11px] text-faint md:block lg:group-hover:text-white/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(30px,3.6vw,54px)] font-semibold leading-none tracking-[-0.05em] transition-transform duration-300 ease-out lg:group-hover:translate-x-2">
                {d.title}
              </span>
              <span className="col-span-2 row-start-2 text-[15px] leading-snug text-muted md:col-span-1 md:row-start-auto lg:group-hover:text-white/70">
                {d.line}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:block lg:group-hover:text-white/70">
                {d.stat}
              </span>
              <span className="col-start-2 row-start-1 grid h-9 w-9 place-items-center rounded-full ring-1 ring-current transition-transform duration-300 group-hover:-rotate-45 md:col-start-auto md:row-start-auto">
                <Arrow direction="right" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
