import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Research" };

export default function Page() {
  return <Redirect to="/#research" label="Research" />;
}
