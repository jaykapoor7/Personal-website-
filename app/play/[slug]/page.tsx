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
    description: "A small physics toy by Jay Kapoor.",
  };
}

export default function PlayDetail({ params }: { params: { slug: string } }) {
  if (params.slug !== "everything-falls") notFound();
  return (
    <section className="shell pt-32 md:pt-40">
      <Link
        href="/play"
        className="inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-fg"
      >
        <Arrow direction="left" /> Play
      </Link>
      <h1 className="display mt-8 text-[clamp(60px,10vw,150px)]">
        Everything Falls
      </h1>
      <p className="mt-4 text-lg text-muted">
        Drag and let go. You can turn gravity off.
      </p>
      <div className="mt-10">
        <EverythingFalls />
      </div>
    </section>
  );
}
