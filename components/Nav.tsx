"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#ventures", label: "Ventures" },
  { href: "/#experience", label: "Experience" },
  { href: "/#research", label: "Research" },
  { href: "/#writing", label: "Writing" },
  { href: "/#builds", label: "Builds" },
  { href: "/#about", label: "About" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open
          ? "border-b border-line bg-white/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="shell flex h-[68px] items-center justify-between"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em]"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-[12px] font-bold text-white"
          >
            JK
          </span>
          Jay Kapoor
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:bg-card hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="mailto:jak581@pitt.edu"
            className="btn-primary hidden h-9 px-4 text-[14px] sm:inline-flex"
          >
            Email me
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" hidden={!open} className="shell pb-5 lg:hidden">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="block border-t border-line py-3.5 text-xl font-semibold tracking-[-0.02em]"
          >
            {l.label}
          </a>
        ))}
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="block border-t border-line py-3.5 text-xl font-semibold tracking-[-0.02em]"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
