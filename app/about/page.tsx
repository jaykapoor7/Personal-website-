import { Redirect } from "@/components/Redirect";

export const metadata = { title: "About" };

export default function Page() {
  return <Redirect to="/#about" label="About" />;
}
