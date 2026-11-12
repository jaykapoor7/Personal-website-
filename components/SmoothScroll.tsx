"use client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    /** The smooth scroller, when one is running. */
    __lenis?: Lenis;
  }
}

/**
 * Eases mouse-wheel scrolling so the whole page moves as one. Touch screens
 * already scroll smoothly, and visitors who ask for reduced motion are left alone.
 */
export function SmoothScroll() {
  const path = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (calm || !mouse) return;
    const l = new Lenis({ lerp: 0.1, autoRaf: true });
    lenis.current = l;
    window.__lenis = l;
    return () => {
      l.destroy();
      lenis.current = null;
      delete window.__lenis;
    };
  }, []);

  // A new page should not inherit the last page's momentum.
  useEffect(() => {
    const l = lenis.current;
    if (!l || l.isStopped) return;
    l.stop();
    l.start();
  }, [path]);

  return null;
}
