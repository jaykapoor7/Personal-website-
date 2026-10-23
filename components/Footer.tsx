import Link from "next/link";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <span className="eyebrow">CONTACT</span>
          <Link href="/artifacts">
            Files <Arrow />
          </Link>
        </div>
        <a href={`mailto:${person.email}`} className="footer-invitation">
          Email me.
          <Arrow />
        </a>
        <a className="footer-email" href={`mailto:${person.email}`}>
          {person.email}
          <Arrow />
        </a>
        <div className="footer-links">
          <span>JAY KAPOOR © {new Date().getFullYear()}</span>
          <div>
            {person.links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <a href={l.href} key={l.label} target="_blank" rel="noreferrer">
                  {l.label}
                  <Arrow />
                </a>
              ))}
          </div>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
