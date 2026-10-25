import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Writing" };

export default function Page() {
  return <Redirect to="/writing" label="Writing" />;
}
