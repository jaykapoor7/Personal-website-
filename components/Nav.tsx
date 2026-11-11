"use client";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { person } from "@/content/site";
import { jumpTo } from "@/lib/jump";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience/", label: "Experience" },
  { href: "/research/", label: "Research" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
];

type Tone = "light" | "dark" | "accent";

/** Reads the tone of whatever section sits under the bar, so the bar can match it. */
function useTone(path: string | null) {
  const [tone, setTone] = useState<Tone>("light");
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const hit = document
        .elementsFromPoint(window.innerWidth - 80, 36)
        .find((el) => !el.closest("header"));
      // Mid page-transition nothing real can be hit; keep the tone until it ends.
      if (!hit || hit === document.documentElement || hit === document.body)
        return;
      const t = hit.closest<HTMLElement>("[data-tone]")?.dataset.tone;
      setTone(t === "dark" || t === "accent" ? t : "light");
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    const settle = setTimeout(read, 400);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      clearTimeout(settle);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [path]);
  return tone;
}

/** Two things only: my name, and one button that opens everything else. */
export function Nav() {
  const path = usePathname();
  const tone = useTone(path);
  // The button names the page you are on; on the landing page it just says Menu.
  const here = links.find(
    (l) => l.href !== "/" && path?.startsWith(l.href.replace(/\/$/, "")),
  );
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const dark = tone !== "light";

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const pill = `rounded-full backdrop-blur-md transition-colors duration-500 ${
    open
      ? "bg-white/15 text-white"
      : dark
        ? "bg-white/[0.16] text-white"
        : "bg-card/80 text-fg"
  }`;

  const circle = (r: string) => `circle(${r} at calc(100% - 64px) 34px)`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-nav" }}
    >
      <motion.span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] origin-left transition-colors duration-500 ${
          dark || open ? "bg-white" : "bg-accent"
        }`}
        style={{ scaleX: scrollYProgress }}
      />
      <nav
        className="shell relative z-[60] flex h-[68px] items-center justify-between gap-4"
        aria-label="Main"
      >
        <Link
          href="/"
          className={`${pill} px-4 py-2 text-[15px] font-semibold`}
          onClick={() => setOpen(false)}
        >
          Jay Kapoor
        </Link>
        <button
          type="button"
          className={`${pill} flex h-11 items-center gap-3 pl-4 pr-3.5 text-[15px] font-semibold`}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">
            {open ? "Close" : (here?.label ?? "Menu")}
          </span>
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="fixed inset-0 z-50 overflow-y-auto bg-accent text-white"
            initial={reduce ? { opacity: 0 } : { clipPath: circle("0%") }}
            animate={reduce ? { opacity: 1 } : { clipPath: circle("160%") }}
            exit={reduce ? { opacity: 0 } : { clipPath: circle("0%") }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex min-h-full flex-col justify-between gap-10 pb-9 pt-24 md:pt-28">
              <ul className="grid gap-x-16 md:grid-cols-2">
                {[...links, { href: "#contact", label: "Contact" }].map(
                  (l, i) => {
                    const cls =
                      "display group flex items-baseline gap-4 py-1.5 text-[clamp(48px,7.4vw,104px)]";
                    const inner = (
                      <>
                        <span className="text-[0.26em] font-medium tabular-nums text-white/85 [font-stretch:100%]">
                          0{i + 1}
                        </span>
                        <span className="transition-transform duration-500 ease-out group-hover:translate-x-3">
                          {l.label}
                        </span>
                      </>
                    );
                    return (
                      <motion.li
                        key={l.href}
                        initial={reduce ? false : { opacity: 0, y: 34 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.12 + i * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {l.href.startsWith("#") ? (
                          // Contact is the panel at the end of every page.
                          <a
                            href={l.href}
                            className={cls}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen(false);
                              jumpTo("contact");
                            }}
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className={cls}
                            aria-current={
                              (here ?? links[0]).href === l.href
                                ? "page"
                                : undefined
                            }
                            onClick={() => setOpen(false)}
                          >
                            {inner}
                          </Link>
                        )}
                      </motion.li>
                    );
                  },
                )}
              </ul>
              <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 text-[17px] font-medium">
                <a
                  href={`mailto:${person.email}`}
                  className="text-[clamp(20px,2.2vw,28px)] underline decoration-white/50 underline-offset-[6px] hover:decoration-white"
                >
                  {person.email}
                </a>
                <p className="flex flex-wrap gap-x-7 gap-y-2">
                  {[
                    { label: "Resume", href: person.resume },
                    ...person.links,
                  ].map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-white/50 underline-offset-[6px] hover:decoration-white"
                    >
                      {l.label}
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
