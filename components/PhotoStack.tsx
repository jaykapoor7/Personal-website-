"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

export type StackPhoto = { src: string; alt: string; caption: string };

const tilt = [-4, 5, -8, 3, -2, 7];

/** A pile of real photos. Fling the top one away (or tap it) to see the next. */
export function PhotoStack({ photos }: { photos: StackPhoto[] }) {
  const [order, setOrder] = useState(photos.map((_, i) => i));
  const reduce = useReducedMotion();
  // A fling is not a tap.
  const dragged = useRef(false);
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const top = photos[order[0]];

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px]">
      <AnimatePresence initial={false}>
        {order
          .slice(0, 4)
          .reverse()
          .map((idx) => {
            const depth = order.indexOf(idx);
            const p = photos[idx];
            const isTop = depth === 0;
            return (
              <motion.figure
                key={idx}
                className={`absolute inset-0 bg-white p-3 pb-14 shadow-[0_25px_50px_-20px_rgba(30,27,75,0.5)] ${
                  isTop ? "cursor-grab active:cursor-grabbing" : ""
                }`}
                style={{ zIndex: 10 - depth }}
                initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1 - depth * 0.04,
                  y: depth * 14,
                  rotate: tilt[idx % tilt.length],
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                drag={isTop ? "x" : false}
                dragSnapToOrigin
                onPointerDown={() => (dragged.current = false)}
                onDragStart={() => (dragged.current = true)}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90) next();
                }}
                onTap={isTop ? () => !dragged.current && next() : undefined}
                aria-hidden={!isTop}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
                <figcaption className="hand absolute inset-x-0 bottom-2.5 text-center text-[26px] text-fg">
                  {p.caption}
                </figcaption>
              </motion.figure>
            );
          })}
      </AnimatePresence>
      <button
        type="button"
        onClick={next}
        className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-2 text-[13px] font-medium text-muted ring-1 ring-line backdrop-blur transition-colors hover:text-fg"
        aria-label={`Next photo. Showing ${top.caption}.`}
      >
        Next photo ({order[0] + 1}/{photos.length})
      </button>
    </div>
  );
}
