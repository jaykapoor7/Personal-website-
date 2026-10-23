import { Arrow } from "@/components/Arrow";
import type { Metadata } from "next";
import { person } from "@/content/site";
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jay Kapoor.",
};
export default function Contact() {
  return (
    <div className="new-pro">
      <section className="shell contact-editorial">
        <span className="kicker">Contact / Pittsburgh, PA</span>
        <h1>Contact.</h1>
        <a className="email-line" href={`mailto:${person.email}`}>
          {person.email}
          <span>
            <Arrow />
          </span>
        </a>
        <div className="contact-index">
          <span className="kicker">Links</span>
          {person.links
            .filter((x) => x.label !== "Email")
            .map((x) => (
              <a
                href={x.href}
                key={x.href}
                target={x.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {x.label}
                <span>
                  <Arrow />
                </span>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
