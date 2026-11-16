"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMedia } from "./motion";

/** What the preview should show: a picture and its shape. */
export type Pic = { src: string; shape: "wide" | "tall" };

// One preview for the whole page. Rows tell it what to show; nothing else
// re-renders when the picture changes.
let current: Pic | null = null;
const subscribers = new Set<(p: Pic | null) => void>();
export function showPreview(p: Pic | null) {
  if (p?.src === current?.src) return;
  current = p;
  subscribers.forEach((f) => f(p));
}

const size = { wide: { w: 320, h: 200 }, tall: { w: 200, h: 270 } };

/**
 * A picture that follows the cursor over a list, leaning with its speed.
 * Mouse only, and off for anyone who asks for reduced motion: the lists
 * always show their own small pictures, so this is a flourish, not a need.
 */
export function Preview() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  const [pic, setPic] = useState<Pic | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-2000, 0, 2000], [-8, 0, 8], {
    clamp: true,
  });
  const box = size[pic?.shape ?? "wide"];
  const boxRef = useRef(box);
  boxRef.current = box;

  useEffect(() => {
    if (!fine || calm) return;
    subscribers.add(setPic);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const { w, h } = boxRef.current;
      const right = e.clientX + 32 + w < window.innerWidth - 16;
      x.set(right ? e.clientX + 32 : e.clientX - 32 - w);
      y.set(Math.min(Math.max(e.clientY - h / 2, 16), window.innerHeight - h - 96));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      subscribers.delete(setPic);
      window.removeEventListener("pointermove", move);
    };
  }, [fine, calm, x, y]);

  if (!fine || calm) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x: sx, y: sy, rotate }}
    >
      <motion.div
        className="deep-shadow relative overflow-hidden rounded-lg bg-card"
        initial={false}
        animate={{
          width: box.w,
          height: box.h,
          opacity: pic ? 1 : 0,
          scale: pic ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <AnimatePresence initial={false}>
          {pic && (
            <motion.div
              key={pic.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={pic.src}
                alt=""
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
