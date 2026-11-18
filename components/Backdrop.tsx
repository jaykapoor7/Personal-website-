"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { SystemsField } from "./home/SystemsField";
import { useCalm, useMedia } from "./motion";

/**
 * The backgrounds behind the hero and the page: drifting blue washes over a
 * faint grid. Decoration only; hidden from assistive technology.
 */
export function HeroBackdrop({ active = true }: { active?: boolean }) {
  const calm = useCalm();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  // A soft light that follows the pointer across the blue.
  const mx = useMotionValue(-2000);
  const my = useMotionValue(-2000);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.8 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.8 });
  useEffect(() => {
    if (!fine || calm) return;
    const on = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [fine, calm, mx, my]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Cobalt, lighter towards the top right, like a sheet of blueprint. */}
      <div className="absolute inset-0 bg-[linear-gradient(155deg,#1b3896_0%,#2346a8_42%,#2c58cc_100%)]" />
      <div className="blueprint [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_40%,transparent_100%)]" />
      <span
        className="wash-lo wash-lo-a left-[78%] top-[18%]"
        style={{
          ["--wash" as string]: "130 170 255",
          ["--wash-a" as string]: 0.4,
        }}
      />
      <span
        className="wash-lo wash-lo-b left-[12%] top-[86%]"
        style={{
          ["--wash" as string]: "12 30 100",
          ["--wash-a" as string]: 0.45,
        }}
      />
      {fine && !calm && (
        <motion.span
          className="absolute left-0 top-0 -ml-[420px] -mt-[420px] h-[840px] w-[840px] rounded-full bg-[radial-gradient(closest-side,rgba(150,185,255,0.32),rgba(150,185,255,0)_100%)]"
          style={{ x, y }}
        />
      )}
      <SystemsField active={active} tone="dark" />
    </div>
  );
}

/**
 * Behind the white sheet: a dot grid and soft blue washes, painted once so
 * scrolling past them costs nothing. (A drifting version cost frames.)
 */
export function SheetBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(900px 700px at 100% 4%, rgb(35 70 168 / 0.13), transparent 70%)",
            "radial-gradient(1000px 800px at 0% 26%, rgb(96 140 255 / 0.15), transparent 70%)",
            "radial-gradient(900px 700px at 100% 50%, rgb(35 70 168 / 0.11), transparent 70%)",
            "radial-gradient(1000px 800px at 0% 74%, rgb(96 140 255 / 0.13), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="grid-dots [mask-image:linear-gradient(to_bottom,#000,rgba(0,0,0,0.35)_40%,#000_100%)]" />
    </div>
  );
}
