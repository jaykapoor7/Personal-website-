import { Arrow } from "@/components/Arrow";
import { PhotoTimeline } from "@/components/PhotoTimeline";
import Link from "next/link";
export const metadata = {
  title: "About",
  description:
    "Jay Kapoor, beyond the projects. Football, family photographs, and the story so far.",
};
export default function About() {
  return (
    <>
      <header className="shell editorial-hero about-title">
        <span className="eyebrow">ABOUT / THE PERSON BEHIND THE TABS</span>
        <h1>
          A few things
          <br />
          <em>that stayed.</em>
        </h1>
        <p>
          India → Pittsburgh.
          <br />A builder. A student. Still a football person.
        </p>
      </header>
      <div className="shell">
        <PhotoTimeline />
      </div>
      <section className="shell about-ending">
        <p>The rest is a work in progress.</p>
        <Link className="pill dark" href="/work">
          See what I’m building <Arrow />
        </Link>
      </section>
    </>
  );
}
