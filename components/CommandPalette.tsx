"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { work } from "@/content/work";
import { writing } from "@/content/writing";
import { profile } from "@/content/profile";

interface Command {
  label: string;
  hint: string;
  href: string;
  external?: boolean;
}

const COMMANDS: Command[] = [
  { label: "Home", hint: "page", href: "/" },
  { label: "Work", hint: "page", href: "/work" },
  { label: "Writing", hint: "page", href: "/writing" },
  { label: "Calibration ledger", hint: "page", href: "/ledger" },
  { label: "Investing thesis", hint: "page", href: "/thesis" },
  { label: "About", hint: "page", href: "/about" },
  { label: "Contact", hint: "page", href: "/contact" },
  ...work.map((w) => ({
    label: `Work · ${w.title}`,
    hint: w.category,
    href: `/work/${w.slug}`,
  })),
  ...writing.map((p) => ({
    label: `Writing · ${p.title}`,
    hint: p.kind,
    href: p.slug === "investment-memo-series" ? "/ledger" : "/writing",
  })),
  { label: "Download résumé", hint: "PDF", href: profile.resumeUrl, external: true },
  { label: "Email Jay", hint: profile.email, href: `mailto:${profile.email}`, external: true },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) =>
      `${c.label} ${c.hint}`.toLowerCase().includes(q),
    );
  }, [query]);

  // Open with Cmd/Ctrl-K (or a custom event from the nav); always allow Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function run(cmd: Command | undefined) {
    if (!cmd) return;
    setOpen(false);
    if (cmd.external) {
      window.open(cmd.href, cmd.href.startsWith("mailto:") ? "_self" : "_blank");
    } else {
      router.push(cmd.href);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-start justify-center bg-ink/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-sm border border-line bg-ink font-mono shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="text-accent">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                run(results[active]);
              }
            }}
            placeholder="jump to…"
            className="w-full bg-transparent text-sm text-paper placeholder:text-muted focus:outline-none"
            aria-label="Search pages and projects"
          />
          <kbd className="text-[10px] uppercase tracking-widest text-muted">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">no matches</li>
          )}
          {results.map((c, i) => (
            <li key={c.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                  i === active ? "bg-line/50 text-accent" : "text-paper"
                }`}
              >
                <span>{c.label}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  {c.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
