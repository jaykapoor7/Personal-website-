import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="Nothing here"
      lede="That page may have moved."
    >
      <Link href="/" className="btn-primary mt-8">
        Home <Arrow direction="right" />
      </Link>
    </PageHeader>
  );
}
