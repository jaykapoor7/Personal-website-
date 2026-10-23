"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type Tab = {
  id: string;
  label: string;
  count?: number;
  intro: string;
  content: React.ReactNode;
};

/**
 * One home for all the work, one section at a time. The URL hash picks the
 * section (/#research), so the nav and shared links open the right one.
 */
export function PortfolioTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) {
        setActive(id);
        if (scroll)
          top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    fromHash(true);
    const onHash = () => fromHash(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [tabs]);

  const choose = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div ref={top} className="scroll-mt-20">
      <div className="sticky top-[68px] z-30 -mx-5 px-5 py-3 sm:-mx-8 sm:px-8">
        <div
          role="tablist"
          aria-label="Sections"
          className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl bg-white/85 p-1.5 shadow-[0_8px_30px_-12px_rgba(30,27,75,0.25)] ring-1 ring-line backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={t.id === active}
              aria-controls={`panel-${t.id}`}
              onClick={() => choose(t.id)}
              className={`relative shrink-0 rounded-xl px-4 py-2 text-[14.5px] font-medium transition-colors ${
                t.id === active ? "text-white" : "text-muted hover:text-fg"
              }`}
            >
              {t.id === active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">
                {t.label}
                {t.count !== undefined && (
                  <span
                    className={`ml-1.5 text-[12.5px] ${t.id === active ? "text-white/70" : "text-faint"}`}
                  >
                    {t.count}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mx-auto mb-8 mt-4 max-w-2xl text-center text-[17px] leading-relaxed text-muted">
        {current.intro}
      </p>

      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
        >
          {/* Every panel stays in the page (for search and no-JS); only the active one shows. */}
          <motion.div
            data-reveal
            key={t.id === active ? "on" : "off"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.content}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
