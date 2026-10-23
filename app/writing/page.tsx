import type { Metadata } from "next";
import { Shelf } from "@/components/Shelf";
import { PageHeader } from "@/components/ui";
import { WritingList } from "@/components/WritingList";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Papers, investment memos and sector theses by Jay Kapoor.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader title="Writing" />
      <Shelf items={writing} />
      <section className="shell pt-16">
        <WritingList items={writing} />
      </section>
    </>
  );
}
