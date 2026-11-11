"use client";
import { useEffect } from "react";
import { settleOnHash } from "@/lib/jump";
import { About } from "./About";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Research } from "./Research";
import { Startups } from "./Startups";

/** The whole site on one short page: who I am, then the work, section by section. */
export function Home() {
  // The panels settle their sizes after mount, so a link such as /#about is
  // placed again once they have.
  useEffect(() => {
    if (!window.location.hash) return;
    const timers = [80, 500].map((ms) => setTimeout(settleOnHash, ms));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      <Hero />
      <div className="space-y-24 md:space-y-32">
        <Startups />
        <Experience />
        <Research />
        <Projects />
        <About />
      </div>
    </>
  );
}
