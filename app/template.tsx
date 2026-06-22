"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

// App Router remounts template.tsx on every navigation. We use that to play a
// terminal "wipe": an ink panel with an amber leading edge sweeps off to the
// right (carrying a `> cd /route` label) while the new page reveals beneath.
// Reduced-motion renders content statically.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  if (reduce) return <>{children}</>;

  const label = pathname === "/" ? "~" : pathname;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center border-l-2 border-accent bg-ink"
        initial={{ x: "0%" }}
        animate={{ x: "101%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-sm text-accent sm:text-base">
          &gt; cd {label}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
