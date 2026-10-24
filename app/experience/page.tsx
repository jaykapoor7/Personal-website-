import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Experience" };

export default function Page() {
  return <Redirect to="/#questions" label="Experience" />;
}
