"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useRef } from "react";
import { ventures, type Venture } from "@/content/site";
import { Arrow } from "./Arrow";
import { BrowserFrame } from "./frames";
import { Counter } from "./motion";
import { SmartLink } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

/** A picture that wipes up into view, then drifts a little slower than the page. */
export function Unveil({
  children,
  className = "",
  delay = 0,
  drift = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className={className}
    >
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Paper({ src, alt, r = 0 }: { src: string; alt: string; r?: number }) {
  return (
    <span
      className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white"
      style={{ rotate: `${r}deg` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 60vw, 360px"
        className="object-cover object-top"
      />
    </span>
  );
}

type Story = {
  id: string;
  year: string;
  noticed: string;
  visual: React.ReactNode;
};

const v = (id: string) => ventures.find((x) => x.id === id)!;

const stories: Story[] = [
  {
    id: "juno-ai",
    year: "2019, age 14",
    noticed: "Families in rural India, hours away from the nearest doctor.",
    visual: (
      <div className="relative pb-24 md:pb-32">
        <Unveil>
          <BrowserFrame
            url="preventive-healthcare-xi.vercel.app"
            className="deep-shadow"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/previews/juno-preventive-d.webp"
                alt="Juno-AI home page"
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover object-top"
              />
            </div>
          </BrowserFrame>
        </Unveil>
        <Unveil
          className="absolute -bottom-2 right-0 w-[38%] md:right-[-8%]"
          delay={0.25}
          drift={90}
        >
          <Paper
            src="/covers/Juno-AI-Research-Paper.webp"
            alt="First page of the Juno-AI paper in IJEDR"
            r={4}
          />
        </Unveil>
      </div>
    ),
  },
  {
    id: "finer-things-club",
    year: "2021",
    noticed:
      "Rural artisans with work to sell and no way to reach the people who would buy it.",
    visual: (
      <div className="mx-auto w-[64%] md:w-[58%]">
        <Unveil>
          <Paper
            src="/covers/Finer-Things-Marketplace-One-Pager.webp"
            alt="The Finer Things Club marketplace one-pager"
            r={-2}
          />
        </Unveil>
      </div>
    ),
  },
  {
    id: "project-nidaan",
    year: "2022",
    noticed: "A delivery rider carrying medicine he could not get for himself.",
    visual: (
      <div className="mx-auto w-[64%] md:w-[58%]">
        <Unveil>
          <Paper
            src="/covers/Project-Nidaan-Field-Research-Brief.webp"
            alt="First page of the Project Nidaan field research brief"
            r={2}
          />
        </Unveil>
      </div>
    ),
  },
  {
    id: "straypaw",
    year: "2026",
    noticed: "A dog outside a cafe that nobody was keeping track of.",
    visual: (
      <Unveil>
        <figure
          className="bg-white p-2.5 pb-12 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] md:p-3 md:pb-14"
          style={{ rotate: "-1.5deg" }}
        >
          <div className="relative aspect-[1200/992] overflow-hidden">
            <Image
              src="/straypaw/street-dog.webp"
              alt="A street dog standing outside a cafe"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
          <figcaption className="serif absolute bottom-3 left-0 right-0 text-center text-[20px] md:bottom-4 md:text-[22px]">
            Outside a cafe
          </figcaption>
        </figure>
      </Unveil>
    ),
  },
];

function Made({ venture }: { venture: Venture }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        So I started
      </p>
      <h3 className="mt-2 text-[clamp(40px,5.4vw,84px)] font-semibold leading-[0.9] tracking-[-0.055em]">
        {venture.name}
      </h3>
      <p className="mt-4 max-w-[36ch] text-[17px] leading-snug text-muted">
        {venture.summary}
      </p>
      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
        {venture.metrics.map((m) => (
          <div key={m.label}>
            <dd className="text-[clamp(34px,3.6vw,52px)] font-semibold leading-none tracking-[-0.05em]">
              <Counter value={m.value} />
            </dd>
            <dt className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {m.label}
            </dt>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Link href={`/work/${venture.id}`} className="btn-primary">
          The full story <Arrow direction="right" />
        </Link>
        {venture.site && (
          <SmartLink href={venture.site.href} className="btn-ghost">
            {venture.site.label} <Arrow />
          </SmartLink>
        )}
      </div>
    </div>
  );
}

/** Four things I noticed, and what I did about each. */
export function Noticed() {
  return (
    <section
      id="noticed"
      aria-label="Things I noticed"
      className="scroll-mt-10"
    >
      {stories.map((s, i) => {
        const venture = v(s.id);
        return (
          <article
            key={s.id}
            className="shell overflow-x-clip border-t border-fg pb-16 pt-5 md:pb-24"
          >
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>Noticed, no. {i + 1}</span>
              <span>{s.year}</span>
            </div>
            <motion.p
              className="serif mt-8 max-w-[22ch] text-[clamp(34px,4.6vw,72px)] leading-[0.98] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease }}
            >
              &ldquo;{s.noticed}&rdquo;
            </motion.p>
            <div className="mt-10 grid items-start gap-10 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div className="md:sticky md:top-28">
                <Made venture={venture} />
              </div>
              <div className={i % 2 ? "md:order-first" : ""}>{s.visual}</div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
