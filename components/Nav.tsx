"use client";
import { Arrow } from "@/components/Arrow";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const links = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/play", label: "Experiments" },
  { href: "/about", label: "About" },
];
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            j<span>k</span>
            <i />
          </span>
          <strong>Jay Kapoor</strong>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              href={l.href}
              key={l.href}
              aria-current={path.startsWith(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a className="nav-hello" href="mailto:jak581@pitt.edu">
          Let’s talk{" "}
          <span>
            <Arrow />
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </nav>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((l, i) => (
            <Link key={l.href} href={l.href}>
              <small>0{i + 1}</small>
              {l.label}
              <span>
                <Arrow />
              </span>
            </Link>
          ))}
          <a href="mailto:jak581@pitt.edu">
            Let’s talk <Arrow />
          </a>
        </nav>
      )}
    </header>
  );
}
