"use client";

import { motion, useReducedMotion } from "framer-motion";

// App Router remounts template.tsx on every navigation, so this gives each
// route a subtle enter transition. Reduced-motion users get static content.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
