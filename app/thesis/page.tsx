import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { WritingList } from "@/components/WritingList";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Theses",
  description: "Sector theses and investment memos by Jay Kapoor.",
};

export default function Thesis() {
  return (
    <>
      <PageHeader eyebrow="Research archive" title="Sector theses & memos." />
      <section className="shell">
        <WritingList
          items={writing.filter((w) =>
            ["Thesis", "Memo", "Memos"].includes(w.type),
          )}
        />
      </section>
    </>
  );
}
