"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";

export function Section({ id, n, title, action, children }: {
  id: string; n: string; title: string;
  action?: { label: string; href: string }; children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const line = useTransform(scrollYProgress, [0, .4], [.08, 1]);
  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-h`} className={`chapter chapter-${id}`}>
      <div className="chapter-art" aria-hidden="true">
        <motion.span className="chapter-figure" style={reduce ? undefined : { x }}>{n}</motion.span>
        {id === "research" && <svg viewBox="0 0 900 200" fill="none"><path d="M0 170H900M0 120H900M0 70H900"/><motion.path className="research-trace" d="M0 160L100 145L200 155L300 90L400 110L500 60L600 80L700 25L800 45L900 10" initial={false} style={reduce ? undefined : { pathLength: line }} /></svg>}
      </div>
      <div className="shell relative">
        <div className="chapter-heading">
          <h2 id={`${id}-h`}><span className="chapter-number" aria-hidden="true">{n}</span>{title}</h2>
          {action && <Link href={action.href} className="chapter-action">{action.label}<Arrow direction="right" /></Link>}
          <motion.div className="chapter-rule" style={reduce ? undefined : { scaleX: line }} />
        </div>
        <motion.div initial={false} whileInView={reduce ? undefined : { y: [35, 0] }} viewport={{ once: true, amount: .08 }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>{children}</motion.div>
      </div>
    </section>
  );
}
