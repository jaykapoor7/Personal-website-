"use client";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";
import { ease, useCalm } from "../motion";

/**
 * A numbered part of the home page. As it comes into view the title rises out
 * of a mask and the rule under it draws across the page.
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
  const calm = useCalm();
  const view = { once: true, margin: "0px 0px -12% 0px" } as const;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="shell mt-20 scroll-mt-20 md:mt-28"
    >
      <div className="relative mb-4 flex items-end justify-between gap-6 pb-4 md:mb-6">
        <h2 id={`${id}-h`} className="flex items-center gap-3">
          <motion.span
            className="num"
            aria-hidden="true"
            initial={calm ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={view}
            transition={{ duration: 0.5, ease }}
          >
            {n}
          </motion.span>
          <motion.span
            className="hatch h-[20px] w-[20px]"
            aria-hidden="true"
            initial={calm ? false : { opacity: 0, rotate: -90 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={view}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
          />
          {/* The mask is watched, not the title: the title starts clipped
              inside it, so it would never count as on screen. */}
          <motion.span
            className="-mb-[0.15em] ml-1 inline-block overflow-hidden pb-[0.15em]"
            initial={calm ? false : "hide"}
            whileInView="show"
            viewport={view}
          >
            <motion.span
              data-reveal
              className="hero-title inline-block text-[clamp(28px,3.6vw,52px)]"
              variants={{ hide: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 0.9, ease, delay: 0.08 }}
            >
              {title}
            </motion.span>
          </motion.span>
        </h2>
        {action && (
          <motion.span
            initial={calm ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
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
          </motion.span>
        )}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
          initial={calm ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-24 origin-left bg-accent"
          initial={calm ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
        />
      </div>
      {children}
    </section>
  );
}
