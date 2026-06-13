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
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <nav className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="display text-lg tracking-tightest"
          onClick={() => setOpen(false)}
        >
          Jay Kapoor
          <span className="text-muted">.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`link-underline ${active ? "text-paper" : "text-muted"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="text-sm text-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="shell flex flex-col gap-4 pb-6 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="display text-2xl"
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
