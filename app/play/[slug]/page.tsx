import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { EverythingFalls } from "@/components/EverythingFalls";
import { Status } from "@/components/WorkRow";
import { SmartLink } from "@/components/ui";
import { builds } from "@/content/site";

const slugOf = (id: string) => (id === "falls" ? "everything-falls" : id);

export function generateStaticParams() {
  return builds.map((b) => ({ slug: slugOf(b.id) }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const b = builds.find((x) => slugOf(x.id) === params.slug)!;
  return { title: b.name, description: b.summary };
}

export default function PlayPage({ params }: { params: { slug: string } }) {
  const i = builds.findIndex((x) => slugOf(x.id) === params.slug);
  const b = builds[i];
  const next = builds[(i + 1) % builds.length];

  const game = b.kind === "Game";
  const back = game
    ? { href: "/#play", label: "Play" }
    : { href: "/work/#projects", label: "All work" };

  return (
    <article>
      <header className="col pt-4 md:pt-8">
        <Link
          href={back.href}
          className="group inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg"
        >
          <Arrow
            direction="left"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {back.label}
        </Link>
        <p className="label mt-10 flex flex-wrap items-center gap-x-2">
          <span>{b.falls ? "Toy" : b.kind}</span>
          <span aria-hidden="true">·</span>
          <span>2026</span>
          <span aria-hidden="true">·</span>
          <Status status="Live" />
        </p>
        <h1 className="display mt-3 text-[clamp(38px,6.4vw,58px)]">{b.name}</h1>
        <p className="mt-4 max-w-[600px] text-[18px] leading-[1.5] text-fg/90 sm:text-[19px]">
          {b.summary}
        </p>
        {!b.falls && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            <SmartLink href={b.href!} className="btn-primary">
              Open {b.url} <Arrow className="text-[0.85em]" />
            </SmartLink>
            {b.code && (
              <SmartLink href={b.code} className="btn-ghost">
                Code on GitHub <Arrow className="text-[0.85em]" />
              </SmartLink>
            )}
          </div>
        )}
      </header>

      <div className="shell mt-10 md:mt-12">
        {b.falls ? (
          <EverythingFalls />
        ) : b.phone ? (
          <div className="bg-dots flex justify-center rounded-xl bg-paper py-10 ring-1 ring-line">
            <div className="h-[min(78vh,720px)] rounded-[40px] bg-[#111] p-2 shadow-xl">
              <iframe
                src={b.href}
                title={b.name}
                className="h-full rounded-[32px] bg-white"
                style={{ aspectRatio: "390 / 844" }}
                allow="microphone; accelerometer; gyroscope; geolocation"
              />
            </div>
          </div>
        ) : (
          <div className="deep-shadow overflow-hidden rounded-lg">
            <div className="relative h-[min(78vh,760px)] bg-white">
              <Image
                src={b.image!}
                alt=""
                fill
                sizes="(max-width: 1040px) 100vw, 976px"
                className="object-cover object-top"
              />
              <iframe
                src={b.href}
                title={b.name}
                className="absolute inset-0 h-full w-full bg-white"
                allow="fullscreen; autoplay; microphone"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        )}
        <p className="mt-2.5 text-[13px] text-muted">
          {b.falls
            ? "Running live on this page."
            : `Running live from ${b.url}. It works best in its own tab.`}
        </p>
      </div>

      <div className="col mt-14 space-y-10 text-[15.5px] leading-[1.65] sm:text-[16px]">
        <section className="grid gap-x-10 gap-y-3 border-t border-line pt-5 sm:grid-cols-[140px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,640px)] lg:gap-x-12">
          <h2 className="label pt-[5px]">What it does</h2>
          <ul className="space-y-2.5">
            {b.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[12px] h-px w-3 shrink-0 bg-faint"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid gap-x-10 gap-y-3 border-t border-line pt-5 sm:grid-cols-[140px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,640px)] lg:gap-x-12">
          <h2 className="label pt-[5px]">Built with</h2>
          <p>{b.stack.join(", ")}</p>
        </section>
      </div>

      <nav aria-label="Next project" className="col mt-16">
        <Link
          href={next.falls ? next.href! : `/play/${next.id}/`}
          className="group flex items-end justify-between gap-6 border-t border-line pt-5"
        >
          <span>
            <span className="label">Next</span>
            <span className="display mt-1.5 block text-[26px] transition-colors group-hover:text-accent">
              {next.name}
            </span>
            <span className="mt-1 block text-[14px] text-muted">
              {next.summary}
            </span>
          </span>
          <Arrow
            direction="right"
            className="mb-1 text-[20px] text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </nav>
    </article>
  );
}
