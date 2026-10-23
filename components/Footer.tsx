import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import { person } from "@/content/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-call">
        <span className="eyebrow">NEXT / SOMETHING WORTH BUILDING</span>
        <a href={`mailto:${person.email}`}>
          What are you
          <br />
          <em>working on?</em>
          <span>
            <Arrow />
          </span>
        </a>
        <p>
          I’m interested in public health, useful technology,
          <br />
          and the messy space between them.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/">
          Jay Kapoor <span>© {new Date().getFullYear()}</span>
        </Link>
        <span>Pittsburgh, PA ↔ India</span>
        <div>
          {person.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={
                l.href.startsWith("http") || l.href.endsWith("pdf")
                  ? "_blank"
                  : undefined
              }
              rel="noreferrer"
            >
              {l.label} <Arrow />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
