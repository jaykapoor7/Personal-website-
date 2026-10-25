"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useState } from "react";

const threads = [
  { id: "h", label: "Health and access" },
  { id: "r", label: "Records and data" },
  { id: "o", label: "Money and operations" },
] as const;
type T = (typeof threads)[number]["id"];

/** Everything I have done, in order, marked against the three threads that run through it. */
const rows: { when: string; name: string; href: string; on: T[] }[] = [
  { when: "2019", name: "Juno-AI", href: "/work/juno-ai", on: ["h", "r"] },
  {
    when: "2021",
    name: "The Finer Things Club",
    href: "/work/finer-things-club",
    on: ["o"],
  },
  {
    when: "2022",
    name: "Project Nidaan",
    href: "/work/project-nidaan",
    on: ["h", "r", "o"],
  },
  { when: "2023", name: "Max Hospital", href: "/work/max-hospital", on: ["h"] },
  {
    when: "2024",
    name: "Apodaca Lab",
    href: "/work/apodaca-lab",
    on: ["h", "r"],
  },
  { when: "2025", name: "HDFC Bank", href: "/work/hdfc-bank", on: ["o"] },
  { when: "2025", name: "Crowwd", href: "/work/crowwd", on: ["r", "o"] },
  { when: "2025", name: "TOT Schools", href: "/work/tot-schools", on: ["o"] },
  {
    when: "2025",
    name: "UPMC Emergency Medicine",
    href: "/work/upmc-emergency-medicine",
    on: ["h", "r"],
  },
  { when: "2026", name: "TARC India", href: "/work/tarc", on: ["o"] },
  {
    when: "2026",
    name: "Memos and forecasts",
    href: "/research",
    on: ["h", "r", "o"],
  },
  {
    when: "2026",
    name: "CURA, Road360, LLM Visibility Lab",
    href: "/projects",
    on: ["h", "r"],
  },
  {
    when: "2026",
    name: "Accessible SmartTech Lab",
    href: "/work/accessible-smarttech",
    on: ["h", "r"],
  },
  {
    when: "2026",
    name: "SCI 3Sixty",
    href: "/work/sci-3sixty",
    on: ["r", "o"],
  },
  {
    when: "2026",
    name: "StrayPaw",
    href: "/work/straypaw",
    on: ["h", "r", "o"],
  },
];

const loop = [
  {
    step: "Notice",
    text: "Someone falling through a gap: families hours from a doctor, a rider who could not get his own medicine, dogs nobody was counting.",
  },
  {
    step: "Learn the system",
    text: "Go inside the system that gap sits in. Hospitals and labs for medicine, a bank and a fintech for money, preschools and a developer for operations.",
  },
  {
    step: "Build",
    text: "Make the thing that closes the gap: Juno-AI, Nidaan, The Finer Things Club, StrayPaw, and the small tools.",
  },
  {
    step: "Keep score",
    text: "Write it down and measure it. Records instead of anecdotes, scores that explain themselves, and predictions with odds.",
  },
];

export function Thread() {
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState<T | null>(null);

  return (
    <div>
      <div className="space-y-5 text-[17.5px] leading-[1.75] text-fg/85">
        <p>
          From the outside it looks scattered: a health app at 14, an artisan
          marketplace, a bladder-cell lab, a bank, eight preschools, a housing
          site, a record of street dogs, and some comedy games.
        </p>
        <p>
          From the inside it is one loop, run in different places. Economics and
          Statistics is the same loop as a degree: how systems behave, and how
          to measure them.
        </p>
      </div>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2">
        {loop.map((l, i) => (
          <motion.li
            key={l.step}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
            className="relative rounded-2xl bg-card p-5"
          >
            <p className="flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.02em]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-fg text-[13px] text-white">
                {i + 1}
              </span>
              {l.step}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {l.text}
            </p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-14">
        <p className="text-[17.5px] leading-[1.75] text-fg/85">
          Three threads keep coming back. Pick one to see where it runs.
        </p>
        <div
          role="group"
          aria-label="Threads"
          className="mt-5 flex flex-wrap gap-2"
        >
          {threads.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={focus === t.id}
              onClick={() => setFocus(focus === t.id ? null : t.id)}
              className={`rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors ${
                focus === t.id
                  ? "bg-fg text-white"
                  : "ring-1 ring-line hover:ring-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <table className="mt-6 w-full border-collapse text-left">
          <caption className="sr-only">
            Each project and role, by year, marked against the three threads
          </caption>
          <thead>
            <tr className="border-b border-fg text-[12.5px] text-muted">
              <th scope="col" className="w-12 pb-2 font-medium">
                Year
              </th>
              <th scope="col" className="pb-2 font-medium">
                What
              </th>
              {threads.map((t) => (
                <th
                  key={t.id}
                  scope="col"
                  className={`w-14 pb-2 text-center font-medium transition-colors sm:w-24 ${focus === t.id ? "text-fg" : ""}`}
                >
                  <span className="hidden sm:inline">
                    {t.label.split(" ")[0]}
                  </span>
                  <span className="sm:hidden">{t.label[0]}</span>
                  <span className="sr-only">{t.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const dim = focus && !r.on.includes(focus);
              return (
                <tr
                  key={r.name}
                  className={`border-b border-line transition-opacity duration-300 ${dim ? "opacity-25" : ""}`}
                >
                  <td className="py-2.5 text-[13px] text-faint">{r.when}</td>
                  <td className="py-2.5 pr-2">
                    <Link
                      href={r.href}
                      className="text-[15px] font-medium hover:text-accent"
                    >
                      {r.name}
                    </Link>
                  </td>
                  {threads.map((t) => (
                    <td key={t.id} className="py-2.5 text-center">
                      {r.on.includes(t.id) ? (
                        <span
                          aria-label="yes"
                          role="img"
                          className={`inline-block h-3 w-3 rounded-full ${focus === t.id ? "bg-accent" : "bg-fg"}`}
                        />
                      ) : (
                        <span
                          aria-label="no"
                          role="img"
                          className="inline-block h-1 w-1 rounded-full bg-line"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-12 space-y-5 text-[17.5px] leading-[1.75] text-fg/85">
        <p>
          StrayPaw is where the three meet. It started with something I noticed
          outside a cafe. It is a public-health problem, since sterilisation and
          vaccination decide how cities live with street dogs. It is a records
          problem, since nobody kept one. And it only works through operations:
          19 NGO partners and a pilot with a municipality.
        </p>
      </div>
    </div>
  );
}
