import { Redirect } from "@/components/Redirect";

export const metadata = { title: "Play" };

export default function Page() {
  return <Redirect to="/#play" label="Play" />;
}
