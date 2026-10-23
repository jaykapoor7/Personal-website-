import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { PageHeader, SectionHeader, SmartLink } from "@/components/ui";
import { builds } from "@/content/site";

const EverythingFalls = dynamic(
  () => import("@/components/EverythingFalls").then((m) => m.EverythingFalls),
  {
    loading: () => (
      <div className="h-[460px] rounded-2xl border border-line bg-card" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Play",
  description: "Browser games, prototypes, and experiments by Jay Kapoor.",
};

const games = [
  {
    title: "Everybody’s on Strike",
    detail:
      "A browser comedy where the interface itself has walked off the job.",
    href: "https://strike.kapoorjay.com",
    art: (
      <span className="-rotate-6 rounded-md border-4 border-current px-5 py-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
        ON STRIKE.
      </span>
    ),
    tint: "bg-[#fde047] text-black",
  },
  {
    title: "The World’s Worst Emergency Service",
    detail:
      "An illustrated game about running a dispatch centre very, very badly.",
    href: "https://emergency.kapoorjay.com",
    art: <span className="text-7xl sm:text-8xl">🦕</span>,
    tint: "bg-[#ef4444] text-white",
  },
];

export default function Play() {
  const prototypes = builds.filter((b) => b.kind === "Prototype");
  return (
    <>
      <PageHeader
        eyebrow="Play"
        title={
          <>
            Side projects,{" "}
            <span className="font-serif font-normal italic">for fun.</span>
          </>
        }
        lede="Small games and prototypes I build to learn new tools — and because some ideas are too funny not to ship."
      />
      <section className="shell grid gap-8 md:grid-cols-2">
        {games.map((g) => (
          <a
            key={g.href}
            href={g.href}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div
              className={`grid aspect-[4/3] place-items-center overflow-hidden rounded-[24px] ${g.tint}`}
            >
              <div className="transition-transform duration-500 ease-out group-hover:scale-105">
                {g.art}
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <span className="chip">Game</span>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
                  {g.title}
                </h2>
                <p className="mt-1.5 text-[15px] text-muted">{g.detail}</p>
              </div>
              <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                <Arrow />
              </span>
            </div>
          </a>
        ))}
      </section>

      <section className="shell pt-24">
        <SectionHeader
          index="Experiment"
          title="Everything Falls"
          action={{ label: "Full screen", href: "/play/everything-falls" }}
        />
        <EverythingFalls compact />
      </section>

      <section className="shell pt-24">
        <SectionHeader index="Prototypes" title="Tools I’ve hacked together" />
        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {prototypes.map((b) => (
            <li
              key={b.title}
              className="bg-bg sm:last:col-span-2 lg:last:col-span-2"
            >
              <SmartLink
                href={b.href}
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-card"
              >
                <Arrow className="self-end text-faint group-hover:text-fg" />
                <div>
                  <p className="font-medium tracking-tight">{b.title}</p>
                  <p className="mt-1 text-sm text-muted">{b.detail}</p>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Prototypes are experiments, not validated products.{" "}
          <Link href="/work" className="link">
            See the real work
          </Link>
          .
        </p>
      </section>
    </>
  );
}
