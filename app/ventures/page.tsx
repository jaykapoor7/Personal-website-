import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Startups" };

export default function Page() {
  return <Redirect to="/startups" label="Startups" />;
}
