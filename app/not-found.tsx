import Link from "next/link";
import { Arrow } from "@/components/Arrow";

export default function NotFound() {
  return (
    <section className="shell pb-10 pt-40">
      <h1 className="display text-[clamp(64px,13vw,210px)]">Nothing here.</h1>
      <p className="mt-6 max-w-xl text-[clamp(19px,1.7vw,24px)] font-medium leading-[1.3] text-muted">
        That page may have moved. Everything now lives on one page.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Home <Arrow direction="right" />
      </Link>
    </section>
  );
}
