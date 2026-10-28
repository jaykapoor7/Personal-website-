import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/Arrow";
import { Reveal } from "@/components/motion";
import { PageHeader, SmartLink } from "@/components/ui";
import { proofGroups } from "@/content/proof";

export const metadata: Metadata = {
  title: "Files",
  description:
    "Every paper, dataset, case study, live site and repo on Jay Kapoor's site.",
};

const sites: Record<string, string> = {
  "straypaw.org/map": "/previews/straypaw-map-d.webp",
  "straypaw.org": "/previews/straypaw-d.webp",
  "strike.kapoorjay.com": "/previews/strike-d.webp",
  "emergency.kapoorjay.com": "/previews/emergency-d.webp",
  "preventive-healthcare": "/previews/juno-preventive-d.webp",
  "explain-my-whoop": "/previews/health-os-d.webp",
  "road360.vercel": "/previews/road360-d.webp",
  "llm-ai-search-checker.vercel": "/previews/search-visibility-d.webp",
  "crowwd.io": "/previews/crowwd-d.webp",
};

/** A real picture of each file: the first page of a PDF, a screenshot of a site, or the photo itself. */
function thumb(href: string) {
  if (href.endsWith(".pdf"))
    return {
      src: `/covers/${href.split("/").pop()!.replace(".pdf", ".webp")}`,
      doc: true,
    };
  if (/\.(jpg|webp)$/.test(href)) return { src: href, doc: false };
  if (href.includes("github.com")) return null;
  const key = Object.keys(sites).find((k) => href.includes(k));
  return key ? { src: sites[key], doc: false } : null;
}

const kind = (href: string) =>
  href.includes("github.com")
    ? "Code"
    : href.endsWith(".pdf")
      ? "PDF"
      : href.endsWith(".csv")
        ? "CSV"
        : href.endsWith(".xlsx")
          ? "Spreadsheet"
          : href.startsWith("/") && !href.includes(".")
            ? "Page"
            : /\.(jpg|webp)$/.test(href)
              ? "Photo"
              : "Live site";

export default function Artifacts() {
  return (
    <>
      <PageHeader
        title="Files"
        lede="Every paper, dataset, live site and repository behind this site."
      />
      <div className="shell space-y-14">
        {proofGroups.map((g) => (
          <section key={g.title} aria-label={g.title}>
            <h2 className="display mb-5 text-[clamp(28px,3vw,40px)]">
              {g.title}
            </h2>
            <ul className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
              {g.items.map((a, i) => {
                const t = thumb(a.href);
                return (
                  <li
                    key={a.href}
                    className="w-[42vw] shrink-0 snap-start sm:w-auto"
                  >
                    <Reveal delay={(i % 5) * 0.04}>
                      <SmartLink href={a.href} className="group block">
                        <span
                          className={`relative block overflow-hidden rounded-xl bg-card transition-all duration-300 group-hover:-translate-y-1 ${
                            t?.doc ? "aspect-[900/1273]" : "aspect-[4/3]"
                          }`}
                        >
                          {t ? (
                            <Image
                              src={t.src}
                              alt=""
                              fill
                              sizes="240px"
                              className="object-cover object-top"
                            />
                          ) : (
                            <span className="absolute inset-0 grid place-items-center bg-card text-[14px] text-muted">
                              {kind(a.href)}
                            </span>
                          )}
                        </span>
                        <span className="mt-2.5 flex items-start justify-between gap-2">
                          <span>
                            <span className="block text-[14px] font-semibold leading-snug">
                              {a.title}
                            </span>
                            <span className="block text-[13px] text-muted">
                              {kind(a.href)}
                            </span>
                          </span>
                          <Arrow className="mt-0.5 shrink-0 text-muted group-hover:text-accent" />
                        </span>
                      </SmartLink>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
