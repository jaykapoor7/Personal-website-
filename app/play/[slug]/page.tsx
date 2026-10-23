import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { EverythingFalls } from "@/components/EverythingFalls";

export function generateStaticParams() {
  return [{ slug: "everything-falls" }];
}

export function generateMetadata() {
  return {
    title: "Everything Falls",
    description: "A browser physics toy by Jay Kapoor.",
  };
}

export default function PlayDetail({ params }: { params: { slug: string } }) {
  if (params.slug !== "everything-falls") notFound();
  return (
    <section className="shell pt-12 md:pt-16">
      <Link
        href="/play"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <Arrow direction="left" /> Play
      </Link>
      <h1 className="mt-8 text-5xl font-medium tracking-[-0.045em] md:text-7xl">
        Everything <span className="font-serif font-normal italic">falls.</span>
      </h1>
      <p className="mt-4 text-lg text-muted">
        Drag and release. Gravity can be turned off.
      </p>
      <div className="mt-10">
        <EverythingFalls />
      </div>
    </section>
  );
}
