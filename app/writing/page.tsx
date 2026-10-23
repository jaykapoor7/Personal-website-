import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { WritingList } from "@/components/WritingList";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Papers, investment memos, and sector theses by Jay Kapoor.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Papers, memos & theses."
        lede="Long-form work on healthcare access, healthtech, and Indian fintech."
      />
      <section className="shell">
        <WritingList items={writing} />
      </section>
    </>
  );
}
