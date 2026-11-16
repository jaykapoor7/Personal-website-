import Link from "next/link";
import { Arrow } from "@/components/Arrow";

export default function NotFound() {
  return (
    <section className="col pb-10 pt-10 md:pt-16">
      <p className="label">404</p>
      <h1 className="display mt-3 text-[clamp(38px,6.4vw,58px)]">
        Nothing here.
      </h1>
      <p className="mt-4 max-w-[520px] text-[17px] leading-[1.55] text-muted">
        This page may have moved. Everything I&apos;ve worked on is listed in
        one place.
      </p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Link href="/work/" className="btn-primary">
          All work <Arrow direction="right" className="text-[0.9em]" />
        </Link>
        <Link href="/" className="btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}
