import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Projects" };

export default function Page() {
  return <Redirect to="/projects" label="Projects" />;
}
