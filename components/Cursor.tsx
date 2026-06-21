"use client";

import { useEffect, useRef } from "react";

/**
 * Additive custom cursor — a small ring that trails the pointer and expands
 * over interactive elements. Augments (does not hide) the native cursor.
 * Disabled on coarse pointers and when reduced motion is preferred.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.opacity = "1";
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        "a, button, [role=button], input, label, summary",
      );
      dot.dataset.active = interactive ? "true" : "false";
    };
    const leave = () => {
      dot.style.opacity = "0";
    };
    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      dot.style.transform = `translate3d(${cx - dot.offsetWidth / 2}px, ${
        cy - dot.offsetHeight / 2
      }px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
