import { Arrow } from "@/components/Arrow";
import { PhotoTimeline } from "@/components/PhotoTimeline";
import Link from "next/link";
export const metadata = {
  title: "About",
  description:
    "Jay Kapoor — student at Pitt. Software, public health, and football.",
};
export default function About() {
  return (
    <>
      <header className="shell editorial-hero about-title">
        <span className="eyebrow">PITTSBURGH / INDIA</span>
        <h1>About.</h1>
        <p>
          I study Economics and Statistics at Pitt. I like software, public
          health, and football.
        </p>
      </header>
      <div className="shell">
        <PhotoTimeline />
      </div>
      <section className="shell about-ending">
        <Link className="pill dark" href="/work">
          Work <Arrow />
        </Link>
      </section>
    </>
  );
}
