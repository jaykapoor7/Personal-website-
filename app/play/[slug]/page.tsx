import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EverythingFalls } from "@/components/EverythingFalls";
export function generateStaticParams() {
  return [{ slug: "everything-falls" }];
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title:
      params.slug === "everything-falls" ? "Everything Falls" : "Playground",
    description: "A browser physics experiment by Jay Kapoor.",
  };
}
export default function PlayDetail({ params }: { params: { slug: string } }) {
  if (params.slug !== "everything-falls") notFound();
  return (
    <div className="new-play">
      <section className="shell standalone-play">
        <Link href="/play" className="plain-link">
          ← Playground
        </Link>
        <div className="standalone-head">
          <span className="kicker">PHYSICS EXPERIMENT</span>
          <h1>
            Everything
            <br />
            <em>Falls.</em>
          </h1>
          <p>Drag and release. Gravity can be turned off.</p>
        </div>
        <EverythingFalls />
        <div className="play-credits">
          <span>Made by Jay Kapoor</span>
          <Link href="/work">
            Work <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
