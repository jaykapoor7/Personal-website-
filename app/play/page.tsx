import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LivePlay } from "@/components/LivePlay";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { games, projects } from "@/content/site";

const EverythingFalls = dynamic(
  () => import("@/components/EverythingFalls").then((m) => m.EverythingFalls),
  {
    loading: () => (
      <div className="h-[460px] rounded-2xl border border-line bg-paper" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Play",
  description: "Games and side projects by Jay Kapoor. All live.",
};

export default function Play() {
  const sites = projects.filter(
    (p) => p.category === "Prototype" && p.preview?.type === "site",
  );
  return (
    <>
      <PageHeader
        title="For fun"
        lede="Everything here is live. Press play and use it on this page."
      />
      <section className="shell grid gap-10 md:grid-cols-2">
        {games.map((g) => (
          <Reveal key={g.href}>
            <LivePlay
              title={g.title}
              href={g.href}
              url={g.url}
              image={g.image}
            />
          </Reveal>
        ))}
        {sites.map((p) =>
          p.preview?.type === "site" ? (
            <Reveal key={p.slug}>
              <LivePlay
                title={p.title}
                href={p.links[0].href}
                url={p.preview.url}
                image={
                  p.slug === "road360" ? p.preview.mobile! : p.preview.desktop
                }
                phone={p.slug === "road360"}
                cta="Try it here"
              />
            </Reveal>
          ) : null,
        )}
      </section>
      <section className="shell pt-28">
        <h2 className="display mb-8 text-[clamp(40px,5vw,72px)]">
          Everything Falls
        </h2>
        <EverythingFalls compact />
      </section>
    </>
  );
}
