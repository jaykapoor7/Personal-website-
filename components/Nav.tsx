"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#noticed", label: "Noticed" },
  { href: "/#questions", label: "Questions" },
  { href: "/#predictions", label: "Predictions" },
  { href: "/#play", label: "Play" },
  { href: "/#photos", label: "Photos" },
];

/** Local time in Pittsburgh, so visitors know if it is 3am here. */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:inline">
      Pittsburgh {t}
    </span>
  );
}

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
        solid || open ? "bg-bg/85 backdrop-blur-xl" : ""
      }`}
    >
      <nav
        className="shell flex h-[60px] items-center justify-between gap-4"
        aria-label="Main"
      >
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.02em]"
          >
            Jay Kapoor
          </Link>
          <Clock />
        </div>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-muted transition-colors hover:bg-fg hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/jay-kapoor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-[14px] font-medium text-muted transition-colors hover:bg-fg hover:text-white"
          >
            Resume
          </a>
          <a
            href="mailto:jak581@pitt.edu"
            className="ml-2 rounded-full bg-fg px-4 py-1.5 text-[14px] font-medium text-white transition-colors hover:bg-accent"
          >
            Email me
          </a>
        </div>
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
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="shell h-[calc(100svh-60px)] pb-8 pt-4 md:hidden"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="block border-t border-line py-3 text-[40px] font-semibold leading-none tracking-[-0.05em]"
          >
            {l.label}
          </Link>
        ))}
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="block border-t border-line py-3 text-[40px] font-semibold leading-none tracking-[-0.05em]"
        >
          Resume
        </a>
        <a
          href="mailto:jak581@pitt.edu"
          className="serif mt-6 block text-[26px] text-accent"
        >
          jak581@pitt.edu
        </a>
      </div>
    </header>
  );
}
