"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const IMAGES: Record<string, string> = {
  sunset: "/backdrop-sunset.webp",
  hills: "/backdrop-hills.webp",
  cobalt: "/sky-backdrop.webp",
};

// Which backdrop each route gets by default (so all three are used across the
// site). The `bg` command sets a saved override that wins over the route.
function routeBackdrop(path: string): keyof typeof IMAGES {
  if (path.startsWith("/work")) return "hills";
  if (
    path.startsWith("/writing") ||
    path.startsWith("/ledger") ||
    path.startsWith("/thesis")
  ) {
    return "cobalt";
  }
  if (path.startsWith("/about")) return "hills";
  return "sunset"; // home + contact + fallback
}

export function RouteBackdrop() {
  const path = usePathname();
  useEffect(() => {
    let key: string | null = null;
    try {
      key = localStorage.getItem("backdrop");
    } catch {}
    if (!key || !IMAGES[key]) key = routeBackdrop(path);
    document.documentElement.style.setProperty(
      "--bg-image",
      `url(${IMAGES[key]})`,
    );
  }, [path]);
  return null;
}
