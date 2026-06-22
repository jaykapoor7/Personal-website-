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
  "  resume            download résumé",
  "  contact           get in touch",
  "  socials           where to find me",
  "  clear             clear the screen",
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

  function run(raw: string) {
    const cmd = raw.trim();
    setLines((l) => [...l, { kind: "in", text: cmd }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);

    const [name, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (name) {
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
        const target = work.find(
          (w) => w.slug === arg || w.title.toLowerCase() === arg,
        );
        if (!target) return print(`no such project: ${arg || "(none)"}`);
        print(`opening /work/${target.slug} …`, "sys");
        setTimeout(() => router.push(`/work/${target.slug}`), 250);
        return;
      }
      case "ledger":
        print("opening /ledger …", "sys");
        return void setTimeout(() => router.push("/ledger"), 250);
      case "thesis":
        print("opening /thesis …", "sys");
        return void setTimeout(() => router.push("/thesis"), 250);
      case "writing":
        print("opening /writing …", "sys");
        return void setTimeout(() => router.push("/writing"), 250);
      case "contact":
        print("opening /contact …", "sys");
        return void setTimeout(() => router.push("/contact"), 250);
      case "resume":
        print("downloading résumé …", "sys");
        return void window.open(profile.resumeUrl, "_blank");
      case "socials":
        return print(socials.map((s) => `  ${s.label.padEnd(10)} ${s.handle}`));
      case "clear":
        return setLines([]);
      default:
        return print(`command not found: ${name} — type 'help'`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
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
                  : "whitespace-pre text-muted"
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
