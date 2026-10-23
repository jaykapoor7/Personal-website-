import { Redirect } from "@/components/Redirect";
import { legacy } from "@/content/site";

export function generateStaticParams() {
  return Object.keys(legacy).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const to = legacy[params.slug] ?? "/";
  return <Redirect to={to} label="Jay Kapoor" />;
}
