"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { person } from "@/content/site";

/** Quiet navigation that stays out of the way of the work. */
const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
];

export function Nav() {
  const path = usePathname();
  const onHome = path === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[66px] w-full max-w-[780px] items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="shrink-0 text-[15px] font-semibold tracking-[-0.025em] transition-colors hover:text-accent"
        >
          Jay Kapoor<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-x-4 text-[13px] font-medium text-muted sm:gap-x-5">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={onHome ? `#${id}` : `/#${id}`}
              className={`transition-colors hover:text-fg ${id === "work" || id === "about" ? "" : "hidden sm:inline"}`}
            >
              {label}
            </a>
          ))}
          <a
            href={person.resume}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-md border border-line px-2.5 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
