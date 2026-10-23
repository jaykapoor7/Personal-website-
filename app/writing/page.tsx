import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Shelf } from "@/components/Shelf";
import { PageHeader } from "@/components/ui";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Papers, investment memos and sector theses by Jay Kapoor.",
};

export default function WritingPage() {
  return (
    <div className="bg-mesh">
      <PageHeader
        title="Writing"
        lede="A research paper, investment memos and a couple of sector theses. Hover a page to pick it up."
      >
        <Link href="/ledger" className="btn-ghost mt-8">
          How my predictions did <Arrow />
        </Link>
      </PageHeader>
      <Shelf items={writing} />
    </div>
  );
}
