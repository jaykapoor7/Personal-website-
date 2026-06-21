"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const MotionLink = motion(Link);

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** External / download links render as <a target=_blank>. */
  external?: boolean;
}

/**
 * A link with a subtle "magnetic" pull toward the cursor. Honors
 * prefers-reduced-motion (renders a plain link) and degrades fine on touch
 * (no pointer move events fire).
 */
export function MagneticButton({ href, children, className, external }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: reduce ? undefined : { x: sx, y: sy },
    className,
  };

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noreferrer" {...shared}>
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} {...shared}>
      {children}
    </MotionLink>
  );
}
