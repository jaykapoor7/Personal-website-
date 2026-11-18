"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCalm } from "../motion";

/**
 * A coloured band of the landing page. Its rounded top slides over the band
 * before it, and as it scrolls in the card widens from inset to full bleed.
 * Only the background layer scales; the text inside stays put and sharp.
 */
export function Band({
  tone,
  children,
}: {
  tone: "white" | "blue" | "pale";
  children: React.ReactNode;
}) {
  const calm = useCalm();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  return (
    <div
      ref={ref}
      data-tone={tone === "blue" ? "accent" : "light"}
      className={`tone-${tone} relative -mt-10 pb-24 pt-4 md:-mt-14 md:pb-32`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-top overflow-hidden rounded-t-[30px] bg-bg shadow-[0_-26px_50px_-34px_rgb(35_70_168/0.4)] will-change-transform md:rounded-t-[48px]"
        style={calm ? undefined : { scale }}
      >
        {tone === "blue" && (
          <>
            <div className="blueprint" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_90%_0%,rgba(120,160,255,0.35),transparent_70%),radial-gradient(900px_600px_at_0%_100%,rgba(15,35,110,0.45),transparent_70%)]" />
          </>
        )}
        {tone === "pale" && (
          <div className="grid-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
        )}
      </motion.div>
      <div className="relative">{children}</div>
    </div>
  );
}
