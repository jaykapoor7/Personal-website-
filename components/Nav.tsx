"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

const links = [
  { href: "/work/", label: "Work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
];

/** A quiet bar: my name, three places to go, and the resume. */
export function Nav() {
  const path = usePathname();
  return (
    <header className="col flex h-16 items-center justify-between gap-4 md:h-20">
      <Link
        href="/"
        className="text-[14.5px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent"
      >
        {person.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-4 text-[13.5px] text-muted sm:gap-6 sm:text-[14px]">
          {links.map((l) => {
            const here = l.href === "/work/" && path?.startsWith("/work");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={here ? "page" : undefined}
                  className={`transition-colors hover:text-fg ${here ? "text-fg" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={person.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-fg"
            >
              Resume
              <Arrow className="text-[0.85em]" />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
