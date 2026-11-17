"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { HeroBackdrop } from "../Backdrop";
import { RiseWords, ease } from "../motion";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  return (
    <section ref={ref} id="top" data-tone="light" aria-label="Introduction" className="folio-hero relative overflow-hidden">
      <HeroBackdrop />
      <div className="shell relative">
        <div className="hero-edition"><span>Jay Kapoor / Personal portfolio</span><span>Economics · Statistics · Public health</span></div>
        <motion.div className="hero-composition" style={reduce ? undefined : { y }}>
          <div className="hero-copy">
            <p className="hero-eyebrow"><span /> Bangalore → Pittsburgh</p>
            <h1 className="hero-title" aria-label="Jay Kapoor. I find broken systems and try to find solutions.">
              <span className="hero-name"><RiseWords text="Jay" delay={0.05} /><br /><RiseWords text="Kapoor" delay={0.15} /></span>
              <span className="hero-statement"><RiseWords text="I find broken systems and try to find solutions." delay={0.3} stagger={0.035} /></span>
            </h1>
            <motion.div className="hero-links" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.6 }}>
              <a href={person.resume} target="_blank" rel="noreferrer" className="btn-primary">Resume <Arrow /></a>
              <a href={`mailto:${person.email}`} className="hero-text-link">Email <Arrow /></a>
              {person.links.slice(0, 2).map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hero-text-link">{l.label} <Arrow /></a>)}
            </motion.div>
          </div>
          <motion.figure className="hero-portrait" style={reduce ? undefined : { y: photoY, rotate }} initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease, delay: 0.2 }}>
            <div className="portrait-register" aria-hidden="true"><span>JK / 01</span><span>FIELD NOTES</span></div>
            <div className="portrait-window"><Image src="/photos/jay-hero.webp" alt={portrait.alt} fill priority sizes="(max-width: 767px) 60vw, 420px" className="object-cover" /></div>
            <figcaption><span>A person behind the projects.</span><span aria-hidden="true">↗</span></figcaption>
          </motion.figure>
        </motion.div>
        <div className="hero-bottom"><span>Ideas into things people can use.</span><a href="#work">Explore selected work <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
