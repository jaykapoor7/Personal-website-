"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [path]);
  // Tuck the bar away while scrolling down; bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-500 ease-out sm:pt-4 ${
        hidden && !open ? "-translate-y-24" : ""
      }`}
    >
      <div className="w-full max-w-[720px] rounded-[26px] border border-line/80 bg-bg/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150">
        <nav
          className="flex h-12 items-center justify-between pl-2 pr-2"
          aria-label="Main"
        >
          <Link
            href="/"
            aria-label="Jay Kapoor, home"
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[14px] font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-fg font-display text-[13px] font-bold leading-none text-bg"
            >
              JK
            </span>
            <span className="hidden font-display text-[15px] font-semibold sm:inline">
              Jay Kapoor
            </span>
          </Link>
          <div className="hidden items-center md:flex">
            {links.map((l) => {
              const active = path.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/contact"
              className="btn-primary hidden h-8 px-4 text-[13px] md:inline-flex"
            >
              Contact
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
        <div id="mobile-menu" hidden={!open} className="px-5 pb-5 md:hidden">
          {[...links, { href: "/contact", label: "Contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block border-t border-line py-3.5 text-2xl font-medium tracking-tight"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/jay-kapoor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="block border-t border-line py-3.5 text-2xl font-medium tracking-tight"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
