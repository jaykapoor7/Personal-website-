"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { work } from "@/content/work";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

type Line = { kind: "in" | "out" | "sys"; text: string };

const WELCOME: Line[] = [
  { kind: "sys", text: "kapoorjay.com — interactive shell. type 'help' to explore." },
];

const HELP = [
  "available commands:",
  "  help              this list",
  "  whoami            who is jay",
  "  work              list projects",
  "  open <name>       open a project   (e.g. open crowwd)",
  "  ledger            the calibration ledger",
  "  thesis            investing thesis",
  "  writing           research & memos",
  "  goto <page>       jump to a page",
  "  resume            download résumé",
  "  socials           where to find me",
  "  theme <color>     amber | green | white",
  "  ascii             ascii signature",
  "  date              current date",
  "  clear             clear the screen",
  "  (tab to complete · ↑/↓ for history)",
];

const ASCII = [
  "   __  ___   __",
  "  / / / / | / /     jay kapoor",
  " / /_/ /| |/ /      builder & researcher",
  " \\____/ |___/       fintech · healthtech · investing",
];

const ACCENTS: Record<string, string> = {
  amber: "233 162 59",
  green: "126 231 135",
  white: "244 242 237",
};

const PAGES: Record<string, string> = {
  home: "/",
  work: "/work",
  writing: "/writing",
  ledger: "/ledger",
  thesis: "/thesis",
  about: "/about",
  contact: "/contact",
};

const COMMANDS = [
  "help", "whoami", "work", "open", "ledger", "thesis", "writing",
  "goto", "resume", "socials", "theme", "ascii", "date", "clear", "sudo",
];

export function CommandLine() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function print(text: string | string[], kind: Line["kind"] = "out") {
    const arr = Array.isArray(text) ? text : [text];
    setLines((l) => [...l, ...arr.map((t) => ({ kind, text: t }))]);
  }

  function go(path: string) {
    setTimeout(() => router.push(path), 250);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    setLines((l) => [...l, { kind: "in", text: cmd }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        return print(HELP);
      case "whoami":
        return print([
          `${profile.name} — builder & researcher.`,
          "Founded Juno-AI (10k+ rural users) · founder's office @ Crowwd (20k users).",
          profile.seeking,
        ]);
      case "work":
      case "ls":
        print(work.map((w) => `  [${w.slug}]  ${w.title} — ${w.role}`));
        return print("→ type 'open <name>' to view a project", "sys");
      case "open":
      case "cd": {
        const t = work.find(
          (w) => w.slug === arg || w.title.toLowerCase() === arg,
        );
        if (!t) return print(`no such project: ${arg || "(none)"}`);
        print(`opening /work/${t.slug} …`, "sys");
        return go(`/work/${t.slug}`);
      }
      case "ledger":
        print("opening /ledger …", "sys");
        return go("/ledger");
      case "thesis":
        print("opening /thesis …", "sys");
        return go("/thesis");
      case "writing":
        print("opening /writing …", "sys");
        return go("/writing");
      case "contact":
        print("opening /contact …", "sys");
        return go("/contact");
      case "goto": {
        const p = PAGES[arg];
        if (!p) return print(`unknown page: ${arg} — try ${Object.keys(PAGES).join(", ")}`);
        print(`opening ${p} …`, "sys");
        return go(p);
      }
      case "resume":
        print("downloading résumé …", "sys");
        return void window.open(profile.resumeUrl, "_blank");
      case "socials":
        return print(socials.map((s) => `  ${s.label.padEnd(10)} ${s.handle}`));
      case "theme": {
        const rgb = ACCENTS[arg];
        if (!rgb) return print(`usage: theme <${Object.keys(ACCENTS).join(" | ")}>`);
        document.documentElement.style.setProperty("--accent", rgb);
        try { localStorage.setItem("accent", arg); } catch {}
        return print(`accent → ${arg}`, "sys");
      }
      case "ascii":
        return print(ASCII);
      case "date":
        return print(new Date().toString());
      case "history":
        return print([...history].reverse().map((h, i) => `  ${i + 1}  ${h}`));
      case "echo":
        return print(rest.join(" "));
      case "sudo":
        if (arg === "hire-jay") {
          return print(
            [
              "[sudo] access granted ✓",
              "initiating onboarding … let's talk: " + profile.email,
            ],
            "sys",
          );
        }
        return print("usage: sudo hire-jay");
      case "clear":
        return setLines([]);
      default:
        return print(`command not found: ${name} — type 'help'`);
    }
  }

  function complete() {
    const parts = value.split(/\s+/);
    if (parts.length <= 1) {
      const m = COMMANDS.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (m.length === 1) setValue(m[0] + " ");
      else if (m.length > 1) print(m.join("   "));
    } else {
      const first = parts[0].toLowerCase();
      const frag = parts[parts.length - 1].toLowerCase();
      const pool =
        first === "open" || first === "cd"
          ? work.map((w) => w.slug)
          : first === "goto"
            ? Object.keys(PAGES)
            : first === "theme"
              ? Object.keys(ACCENTS)
              : [];
      const m = pool.filter((p) => p.startsWith(frag));
      if (m.length === 1) setValue(`${first} ${m[0]}`);
      else if (m.length > 1) print(m.join("   "));
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHIndex((i) => {
        const ni = Math.min(i + 1, history.length - 1);
        if (history[ni] !== undefined) setValue(history[ni]);
        return ni;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHIndex((i) => {
        const ni = Math.max(i - 1, -1);
        setValue(ni === -1 ? "" : history[ni] ?? "");
        return ni;
      });
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full cursor-text rounded-sm border border-line bg-ink/60 text-left font-mono"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-line" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full border border-line" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
        <span className="ml-2 text-xs text-muted">jay@kapoorjay: ~</span>
      </div>
      <div
        ref={scrollRef}
        className="h-56 space-y-1 overflow-y-auto px-4 py-3 text-xs leading-relaxed sm:text-sm"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.kind === "in"
                ? "text-paper"
                : l.kind === "sys"
                  ? "text-accent"
                  : "whitespace-pre-wrap text-muted"
            }
          >
            {l.kind === "in" && <span className="text-accent">$ </span>}
            {l.text}
          </p>
        ))}
        <div className="flex items-center">
          <span className="text-accent">$&nbsp;</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="w-full bg-transparent text-paper caret-accent focus:outline-none"
            placeholder="type 'help'"
          />
        </div>
      </div>
    </div>
  );
}
