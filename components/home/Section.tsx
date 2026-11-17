"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";

/**
 * A numbered part of the home page: a small number box and hatch, after
 * cali.so, then the title at full size, with the content across the page.
 */
export function Section({
  id,
  n,
  title,
  action,
  children,
}: {
  id: string;
  n: string;
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-h`}
      initial={false}
      whileInView={reduce ? undefined : { y: [24, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="folio-section shell mt-20 scroll-mt-20 md:mt-28"
    >
      <div className="mb-4 flex items-end justify-between gap-6 border-b border-line pb-4 md:mb-6">
        <h2 id={`${id}-h`} className="flex items-center gap-3">
          <span className="num" aria-hidden="true">
            {n}
          </span>
          <span className="hatch h-[20px] w-[20px]" aria-hidden="true" />
          <span className="hero-title ml-1 text-[clamp(25px,3.4vw,46px)]">
            {title}
          </span>
        </h2>
        {action && (
          <Link
            href={action.href}
            className="group mb-1 inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-muted transition-colors hover:text-fg"
          >
            {action.label}
            <Arrow
              direction="right"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
      {children}
    </motion.section>
  );
}
