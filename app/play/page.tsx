import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Builds" };

export default function Page() {
  return <Redirect to="/#builds" label="Builds" />;
}
