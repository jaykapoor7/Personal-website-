"use client";
import { useEffect } from "react";

const EVENT = "jk:show";

let quietUntil = 0;

/** Ask whichever section holds this item to open it (the timeline does this). */
export function showItem(id: string) {
  quietUntil = Date.now() + 1500;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

/**
 * False for a moment after a jump: the page has just moved under a resting
 * mouse, and whatever landed beneath it should not steal the selection.
 */
export const hoverCounts = () => Date.now() > quietUntil;

/** Open an item when something elsewhere on the page asks for it. */
export function useShown(open: (id: string) => void) {
  useEffect(() => {
    const on = (e: Event) => open((e as CustomEvent<string>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, [open]);
}
