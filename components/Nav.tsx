"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";
const links = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/play", label: "Experiments" },
  { href: "/about", label: "About" },
];
export function Nav() {
  const path = usePathname(),
    [open, setOpen] = useState(false),
    toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Jay Kapoor — home">
          <span className="brand-symbol" aria-hidden="true">
            j<span>k</span>
            <i />
          </span>
          <span>JAY KAPOOR</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path.startsWith(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a className="nav-hello" href="mailto:jak581@pitt.edu">
          Contact <Arrow />
        </a>
        <button
          ref={toggle}
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
          className="mobile-nav shell"
          aria-label="Mobile navigation"
        >
          {links.map((l, i) => (
            <Link key={l.href} href={l.href}>
              <small>0{i + 1}</small>
              {l.label}
              <Arrow />
            </Link>
          ))}
          <a href="mailto:jak581@pitt.edu">
            <small>05</small>Contact <Arrow />
          </a>
        </nav>
      )}
    </header>
  );
}
