"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { RiseWords } from "../motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const shutter = useTransform(scrollYProgress, [0, .75], [0, 100]);
  return (
    <section ref={ref} id="top" data-tone="light" aria-label="Introduction" className="studio-hero">
      <div className="shell">
        <div className="studio-meta"><span>Personal portfolio</span><span>Bangalore ↗ Pittsburgh</span></div>
        <h1 className="studio-heading" aria-label="Jay Kapoor. I find broken systems and try to find solutions.">
          <motion.span className="studio-name" style={reduce ? undefined : { x: nameX }}><RiseWords text="Jay Kapoor" stagger={.12} /></motion.span>
          <span className="sr-only">I find broken systems and try to find solutions.</span>
        </h1>
        <div className="studio-grid">
          <div className="studio-intro">
            <svg className="studio-cross" aria-hidden="true" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="3"><path d="M30 0V60M0 30H60M9 9L51 51M9 51L51 9" /></svg>
            <p className="studio-statement">I find broken systems and try to find solutions.</p>
            <div className="studio-links">
              <a href={person.resume} target="_blank" rel="noreferrer" className="studio-resume">Resume <Arrow /></a>
              {person.links.slice(0, 2).map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <Arrow /></a>)}
            </div>
            <a href="#work" className="studio-explore">Selected work <span aria-hidden="true">↓</span></a>
          </div>
          <div className="studio-image-block">
            <div className="studio-image-frame">
              <motion.div className="studio-image" style={reduce ? undefined : { y: imageY }}>
                <Image src="/photos/jay-hero.webp" alt={portrait.alt} fill priority sizes="(max-width: 767px) 90vw, 650px" className="object-cover" />
              </motion.div>
              <motion.div className="studio-shutter" style={reduce ? undefined : { x: shutter }} aria-hidden="true" />
            </div>
            <div className="studio-photo-caption"><span>01 / Jay Kapoor</span><a href={`mailto:${person.email}`}>Get in touch ↗</a></div>
          </div>
        </div>
        <div className="studio-index" aria-label="Page sections">{["Work", "Experience", "Research", "Writing", "Photos", "Play"].map((s,i) => <a key={s} href={`#${s.toLowerCase()}`}><span>0{i+1}</span>{s}</a>)}</div>
      </div>
    </section>
  );
}
