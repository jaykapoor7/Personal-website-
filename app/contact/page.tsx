import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Contact" };

export default function Page() {
  return <Redirect to="/#contact" label="Contact" />;
}
