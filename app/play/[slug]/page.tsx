import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { EverythingFalls } from "@/components/EverythingFalls";
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

  return (
    <article className="shell pt-28 md:pt-36">
      <header className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h1 className="text-[clamp(48px,9vw,140px)] font-semibold leading-[0.86]">
          {b.name}
        </h1>
        <div>
          <p className="serif text-[clamp(22px,2.4vw,32px)] leading-[1.05]">
            {b.summary}
          </p>
          {!b.falls && (
            <div className="mt-5 flex flex-wrap gap-2">
              <SmartLink href={b.href!} className="btn-primary">
                Open {b.url} <Arrow />
              </SmartLink>
              {b.code && (
                <SmartLink href={b.code} className="btn-ghost">
                  Code
                </SmartLink>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="mt-12">
        {b.falls ? (
          <EverythingFalls />
        ) : b.phone ? (
          <div className="bg-dots flex justify-center rounded-2xl bg-card py-10">
            <div className="h-[min(78vh,720px)] rounded-[40px] bg-[#111] p-2 shadow-2xl">
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
          <div className="overflow-hidden rounded-xl">
            <div className="relative h-[min(78vh,760px)] bg-white">
              <Image
                src={b.image!}
                alt=""
                fill
                sizes="100vw"
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
      </div>

      <section
        aria-label="About this project"
        className="mt-14 grid gap-8 md:grid-cols-[1fr_260px]"
      >
        <ul className="max-w-[62ch] space-y-3 text-[17px] leading-relaxed">
          {b.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {p}
            </li>
          ))}
        </ul>
        <div>
          <p className="label">Built with</p>
          <p className="mt-1 text-[15px]">{b.stack.join(", ")}</p>
        </div>
      </section>

      <Link
        href={next.falls ? next.href! : `/play/${next.id}`}
        className="group mt-24 block pt-4"
      >
        <span className="text-[13px] font-medium text-muted">Next</span>
        <span className="mt-2 flex items-center justify-between gap-6">
          <span className="text-[clamp(40px,8vw,120px)] font-semibold leading-[0.9] transition-transform duration-500 group-hover:translate-x-3">
            {next.name}
          </span>
          <Arrow direction="right" className="text-[clamp(32px,5vw,72px)]" />
        </span>
      </Link>
    </article>
  );
}
