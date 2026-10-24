"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const orbit = [
  { src: "/logos/straypaw.png", name: "StrayPaw" },
  { src: "/logos/pitt.png", name: "University of Pittsburgh" },
  { src: "/logos/crowwd.png", name: "Crowwd" },
  { src: "/logos/upmc.png", name: "UPMC" },
  { src: "/logos/hdfc.png", name: "HDFC Bank" },
  { src: "/logos/tot.png", name: "TOT Schools" },
  { src: "/logos/tarc.png", name: "TARC" },
  { src: "/logos/jumpstart.png", name: "JumpStart" },
];

/** The portrait, with the organisations I have worked with slowly circling it. */
export function PortraitOrbit({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[480px]"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="absolute inset-[9%] rounded-full border border-dashed border-indigo-300/70"
        aria-hidden="true"
      />
      <div className="absolute inset-[22%] overflow-hidden rounded-full shadow-[0_30px_70px_-30px_rgba(49,46,129,0.7)] ring-[6px] ring-white">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="300px"
          className="object-cover object-[50%_58%]"
        />
      </div>
      <ul
        className="orbit absolute inset-[9%]"
        aria-label="Organisations I have worked with"
      >
        {orbit.map((o, i) => (
          <li
            key={o.name}
            className="absolute left-1/2 top-1/2 -ml-7 -mt-7 h-14 w-14"
            style={{
              transform: `rotate(${(360 / orbit.length) * i}deg) translateY(calc(-1 * var(--r))) rotate(${(-360 / orbit.length) * i}deg)`,
            }}
          >
            <span
              className="orbit-counter grid h-full w-full place-items-center rounded-2xl bg-white shadow-[0_10px_24px_-10px_rgba(30,27,75,0.45)] ring-1 ring-line"
              title={o.name}
            >
              <Image
                src={o.src}
                alt={o.name}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const roles = [
  "Founder, StrayPaw",
  "Research Assistant, Accessible SmartTech Lab",
  "3Sixty Fellow, Pitt SCI",
  "Economics & Statistics, Pitt, Class of 2028",
];

/** What I am doing right now, one line at a time. */
export function NowTicker() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <p className="flex items-center gap-3 text-[15px]">
      <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white">
        Now
      </span>
      <span className="relative inline-flex h-6 min-w-0 flex-1 overflow-hidden">
        <span className="sr-only">{roles.join(". ")}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 truncate font-medium text-fg"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

/** A small dock for recruiters: resume, email and LinkedIn, always one click away. */
export function Dock({
  email,
  resume,
  linkedin,
}: {
  email: string;
  resume: string;
  linkedin: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick contact"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 rounded-2xl bg-fg/90 p-1.5 text-[13.5px] font-medium sm:bottom-5 sm:text-[14px] text-white shadow-[0_20px_40px_-12px_rgba(11,13,42,0.6)] backdrop-blur-xl"
        >
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-3.5 py-2 text-fg sm:px-4 transition-colors hover:bg-indigo-50"
          >
            Resume
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-xl px-3.5 py-2 transition-colors hover:bg-white/10 sm:px-4"
          >
            Email
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-3.5 py-2 transition-colors hover:bg-white/10 sm:px-4"
          >
            LinkedIn
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
