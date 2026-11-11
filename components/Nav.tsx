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
  { id: "straypaw", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
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
        .elementsFromPoint(window.innerWidth / 2, 36)
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

/** Which home section is on screen, for the highlighted link. */
function useSection(path: string | null) {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(null);
    if (path !== "/") return;
    const on = new Set<string>();
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting) on.add(e.target.id);
          else on.delete(e.target.id);
        setId(on.size ? [...on][on.size - 1] : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", "startups", ...links.map((l) => l.id)].forEach((s) => {
      const el = document.getElementById(s);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return id === "startups" ? "straypaw" : id;
}

export function Nav() {
  const path = usePathname();
  const home = path === "/";
  const tone = useTone(path);
  const here = useSection(path);
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
    dark ? "bg-white/[0.16] text-white" : "bg-card/80 text-fg"
  }`;
  const item = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300 ${
      active
        ? dark
          ? "bg-white/25"
          : "bg-white"
        : dark
          ? "hover:bg-white/15"
          : "hover:bg-white/70"
    }`;

  /** On the home page these jump within the page; elsewhere they go home first. */
  const Jump = ({
    id,
    className,
    children,
    onClick,
  }: {
    id: string;
    className: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) =>
    home ? (
      <a
        href={id === "top" ? "/" : `#${id}`}
        className={className}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          onClick?.();
          jumpTo(id);
        }}
        aria-current={here === id ? "true" : undefined}
      >
        {children}
      </a>
    ) : (
      <Link
        href={id === "top" ? "/" : `/#${id}`}
        className={className}
        onClick={onClick}
      >
        {children}
      </Link>
    );

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-nav" }}
    >
      <motion.span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] origin-left transition-colors duration-500 ${
          dark ? "bg-white" : "bg-accent"
        }`}
        style={{ scaleX: scrollYProgress }}
      />
      <nav
        className="shell flex h-[68px] items-center justify-between gap-4"
        aria-label="Main"
      >
        <Jump
          id="top"
          className={`${pill} relative z-[60] px-4 py-2 text-[15px] font-semibold ${
            open ? "!bg-transparent !text-white" : ""
          }`}
        >
          Jay Kapoor
        </Jump>

        <div className={`${pill} hidden items-center gap-0.5 p-1 md:flex`}>
          {links.map((l) => (
            <Jump key={l.id} id={l.id} className={item(here === l.id)}>
              {l.label}
            </Jump>
          ))}
          <a
            href={person.resume}
            target="_blank"
            rel="noreferrer"
            className={item(false)}
          >
            Resume
          </a>
          <Jump
            id="contact"
            className={`ml-1 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
              dark
                ? "bg-white text-[rgb(var(--fg))] hover:bg-accent2"
                : "bg-fg text-white hover:bg-accent"
            }`}
          >
            Contact
          </Jump>
        </div>

        <button
          type="button"
          className={`${pill} relative z-[60] grid h-11 w-11 place-items-center md:hidden ${
            open ? "!bg-white/15 !text-white" : ""
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
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
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[rgb(var(--fg))] px-5 pb-8 pt-24 text-white md:hidden"
            initial={
              reduce
                ? { opacity: 0 }
                : { clipPath: "circle(0% at calc(100% - 42px) 34px)" }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { clipPath: "circle(150% at calc(100% - 42px) 34px)" }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { clipPath: "circle(0% at calc(100% - 42px) 34px)" }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.12 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Jump
                    id={l.id}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-[52px]"
                  >
                    {l.label}
                  </Jump>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-3 text-[17px] font-medium">
              <a href={`mailto:${person.email}`} className="block text-[22px]">
                {person.email}
              </a>
              <p className="flex flex-wrap gap-x-6 gap-y-2 text-white/85">
                <a href={person.resume} target="_blank" rel="noreferrer">
                  Resume
                </a>
                {person.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
