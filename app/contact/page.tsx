import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Say hi",
  description: "Get in touch with Jay Kapoor.",
};

export default function Contact() {
  return (
    <PageHeader
      title="Say hi"
      lede="Email is the fastest way to reach me. Everything you need is just below."
    />
  );
}
