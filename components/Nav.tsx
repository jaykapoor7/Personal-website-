"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 font-mono backdrop-blur">
      <nav className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          jay_kapoor
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-7 text-xs uppercase tracking-widest">
            {links.map((l, i) => {
              const active =
                pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`link-underline ${active ? "text-accent" : "text-muted"}`}
                  >
                    <span className="text-muted/50">
                      {String(i + 1).padStart(2, "0")}{" "}
                    </span>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
            className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-widest text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            aria-label="Open command palette"
          >
            <span aria-hidden>⌘</span>K
          </button>
        </div>

        <button
          type="button"
          className="text-xs uppercase tracking-widest text-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "[ close ]" : "[ menu ]"}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="shell flex flex-col gap-4 pb-6 font-mono md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-2xl lowercase tracking-tight"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
