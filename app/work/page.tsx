import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Ventures" };

export default function Page() {
  return <Redirect to="/#noticed" label="Ventures" />;
}
