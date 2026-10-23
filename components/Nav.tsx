"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/ledger", label: "Ledger" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
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
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-bg/0"
      }`}
    >
      <nav
        className="shell flex h-16 items-center justify-between"
        aria-label="Main"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full bg-fg font-serif text-[17px] italic leading-none text-bg"
          >
            j
          </span>
          Jay Kapoor
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active ? "bg-card text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="/jay-kapoor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            Résumé
          </a>
          <Link href="/contact" className="btn-primary ml-2 h-9 px-4">
            Get in touch
          </Link>
        </div>
        <button
          type="button"
          className="-mr-2 grid h-10 w-10 place-items-center rounded-full md:hidden"
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
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="shell border-t border-line pb-6 pt-2 md:hidden"
      >
        {[...links, { href: "/contact", label: "Contact" }].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight"
          >
            {l.label}
          </Link>
        ))}
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
