"use client";
import { useEffect, useRef } from "react";
import { settleOnHash } from "@/lib/jump";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Life } from "./Life";
import { Projects } from "./Projects";
import { Research } from "./Research";
import { StrayPaw } from "./StrayPaw";
import { Ventures } from "./Ventures";

/** The whole site in one scroll: who, now, before, research, projects, life. */
export function Home() {
  const straypaw = useRef<HTMLElement>(null);
  // Pinned scenes take their final height after mount, so a link such as
  // /#about is placed again once the page has settled.
  useEffect(() => {
    if (!window.location.hash) return;
    const timers = [80, 500].map((ms) => setTimeout(settleOnHash, ms));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      {/* The hero stays pinned only while StrayPaw slides over it. */}
      <div className="relative">
        <Hero cover={straypaw} />
        <StrayPaw ref={straypaw} />
      </div>
      <Ventures />
      <Experience />
      <Research />
      <Projects />
      <Life />
    </>
  );
}
