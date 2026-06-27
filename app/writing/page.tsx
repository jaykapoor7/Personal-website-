import type { Metadata } from "next";
import { orderedWriting } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { Scramble } from "@/components/Scramble";

export const metadata: Metadata = {
  title: "Writing & Research",
  description:
    "Investment memos, market maps, and published research on Indian health tech and fintech.",
};

function proofTarget(url: string, type: string) {
  const external = /^https?:\/\//.test(url);
  const isDoc = type === "pdf" || type === "file";
  return external || isDoc ? "_blank" : undefined;
}

export default function WritingPage() {
  const items = orderedWriting();

  return (
    <>
      <section className="shell pt-20 pb-10 sm:pt-28">
        <Reveal>
          <p className="kicker mb-6">
            <span className="text-accent">&gt;</span> writing &amp; research
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-4xl text-4xl leading-tight sm:text-6xl">
            <Scramble text="Research, memos, and building in public." />
          </h1>
        </Reveal>
      </section>

      <section className="pb-10">
        {items.map((item, i) => {
          const live = item.proof.filter((p) => p.status === "available" && p.url);
          return (
            <Reveal key={item.slug}>
              <div className="border-t border-line">
                <div className="shell flex flex-col gap-3 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                      <span className="text-accent">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <span>{item.kind}</span>
                      <span aria-hidden>·</span>
                      <span>{item.year}</span>
                    </div>
                    <h2 className="display mt-2 text-2xl lowercase tracking-tighter2 sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-muted">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-1 font-mono text-xs md:justify-end">
                    {live.map((p) => (
                      <a
                        key={p.title}
                        href={p.url}
                        target={proofTarget(p.url!, p.type)}
                        rel="noreferrer"
                        className="link-underline text-muted transition-colors hover:text-accent"
                      >
                        {p.title} {p.type === "file" ? "↓" : "↗"}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
        <div className="border-t border-line" />
      </section>
    </>
  );
}
