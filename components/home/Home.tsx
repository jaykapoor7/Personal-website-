"use client";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { Arrow } from "../Arrow";
import { Featured } from "./Featured";
import { Hero } from "./Hero";
import { Scene } from "./Scene";

const more = ["Experience", "Research", "Projects", "About"];

/** The landing page: one scroll through who I am and what I started, then the way to the rest. */
export function Home() {
  // Visitors who ask for reduced motion get the same content laid out still.
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setCalm(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return (
    <>
      {calm ? (
        <>
          <Hero />
          <Featured />
        </>
      ) : (
        <Scene />
      )}
      <nav aria-label="More" className="shell mt-16 md:mt-24">
        <ul className="border-t-2 border-fg">
          {more.map((m, i) => (
            <li key={m} className="border-b-2 border-fg">
              <Link
                href={`/${m.toLowerCase()}/`}
                className="group flex items-baseline gap-5 py-4 transition-[padding] duration-300 ease-out hover:pl-4 md:py-5"
              >
                <span className="text-[15px] font-medium tabular-nums text-muted">
                  0{i + 1}
                </span>
                <span className="display flex-1 text-[clamp(40px,6.6vw,104px)] group-hover:text-accent">
                  {m}
                </span>
                <Arrow
                  direction="right"
                  className="self-center text-[clamp(26px,3vw,44px)] transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
