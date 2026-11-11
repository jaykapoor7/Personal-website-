import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Arrow } from "@/components/Arrow";
import { EverythingFalls } from "@/components/EverythingFalls";
import { Reveal, RiseWords } from "@/components/motion";
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
    <article className="shell pt-28 md:pt-32">
      <header>
        <Link
          href="/#projects"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-card px-4 text-[14px] font-semibold transition-colors hover:bg-fg hover:text-white"
        >
          <Arrow
            direction="left"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Projects
        </Link>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1 className="display text-[clamp(52px,10vw,160px)]">
            <RiseWords text={b.name} />
          </h1>
          <div>
            <p className="text-[clamp(21px,2.2vw,30px)] font-medium leading-[1.15]">
              {b.summary}
            </p>
            {!b.falls && (
              <div className="mt-5 flex flex-wrap gap-2.5">
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
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        {b.falls ? (
          <EverythingFalls />
        ) : b.phone ? (
          <div className="bg-dots flex justify-center rounded-3xl bg-card py-10">
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
          <div className="deep-shadow overflow-hidden rounded-2xl md:rounded-3xl">
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
        className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_260px]"
      >
        <ol className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
          {b.points.map((p, n) => (
            <li key={p}>
              <Reveal delay={(n % 2) * 0.08} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="display pt-0.5 text-[20px] text-accent"
                >
                  {String(n + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[40ch] text-[18px] leading-[1.4]">{p}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div>
          <p className="label">Built with</p>
          <p className="mt-2 text-[17px] font-medium leading-relaxed">
            {b.stack.join(", ")}
          </p>
        </div>
      </section>

      <Link
        href={next.falls ? next.href! : `/play/${next.id}`}
        className="group mt-24 block rounded-[28px] bg-card p-7 transition-colors duration-500 hover:bg-fg hover:text-white sm:p-10 md:mt-32 md:rounded-[40px]"
      >
        <span className="text-[15px] font-medium text-muted transition-colors duration-500 group-hover:text-white">
          Next
        </span>
        <span className="mt-3 flex items-center justify-between gap-6">
          <span className="display text-[clamp(40px,8vw,128px)] transition-transform duration-500 group-hover:translate-x-3">
            {next.name}
          </span>
          <Arrow
            direction="right"
            className="text-[clamp(32px,5vw,72px)] transition-transform duration-500 group-hover:translate-x-2"
          />
        </span>
      </Link>
    </article>
  );
}
