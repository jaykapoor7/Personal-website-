"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useRef } from "react";
import { ventures, type Venture } from "@/content/site";
import { Arrow } from "../Arrow";
import { Counter, Reveal, RiseWords, Wipe } from "../motion";
import { SmartLink } from "../ui";

/** The three ways a card can be blue and white. */
type Tone = "solid" | "tint" | "line";
const tones: Record<
  Tone,
  { card: string; quiet: string; pop: string; main: string; ghost: string }
> = {
  solid: {
    card: "bg-accent text-white",
    quiet: "text-white/85",
    pop: "text-white",
    main: "btn bg-white text-[rgb(var(--fg))] hover:bg-accent2",
    ghost:
      "btn bg-white/15 text-white hover:bg-white hover:text-[rgb(var(--fg))]",
  },
  tint: {
    card: "bg-card text-fg",
    quiet: "text-muted",
    pop: "text-accent",
    main: "btn bg-fg text-white hover:bg-accent",
    ghost: "btn bg-white text-fg hover:bg-fg hover:text-white",
  },
  line: {
    card: "bg-white text-fg ring-2 ring-inset ring-accent",
    quiet: "text-muted",
    pop: "text-accent",
    main: "btn bg-fg text-white hover:bg-accent",
    ghost: "btn bg-card text-fg hover:bg-fg hover:text-white",
  },
};

type Card = {
  id: string;
  when: string;
  noticed: string;
  /** "So I built", in the words that fit my part in it. */
  then: string;
  tone: Tone;
  visual: React.ReactNode;
};

function Paper({
  src,
  alt,
  className = "",
  ratio = "aspect-[900/1273]",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <span
      className={`paper-shadow relative block overflow-hidden bg-white ${ratio} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 320px"
        className="object-cover object-top"
      />
    </span>
  );
}

const cards: Card[] = [
  {
    id: "juno-ai",
    when: "2019. I was 14.",
    noticed: "Families in rural India, hours away from the nearest doctor.",
    then: "So I built",
    tone: "solid",
    visual: (
      <div className="relative pb-[16%] pr-[6%]">
        <Wipe className="deep-shadow rounded-xl">
          <div className="relative aspect-[16/10]">
            <Image
              src="/previews/juno-preventive-d.webp"
              alt="Juno home page: healthcare shouldn't start at the hospital"
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover object-top"
            />
          </div>
        </Wipe>
        <motion.div
          className="absolute bottom-0 right-0 w-[34%]"
          initial={{ opacity: 0, y: 60, rotate: 14 }}
          whileInView={{ opacity: 1, y: 0, rotate: 5 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 14,
            delay: 0.3,
          }}
        >
          <Paper
            src="/covers/Juno-AI-Research-Paper.webp"
            alt="First page of the Juno-AI paper published in IJEDR"
            ratio="aspect-[900/1165]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-[2%] left-[6%] w-[17%]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 14,
            delay: 0.45,
          }}
        >
          <span className="deep-shadow relative block aspect-[390/800] overflow-hidden rounded-[14px] ring-4 ring-white md:rounded-[20px]">
            <Image
              src="/previews/juno-preventive-m.webp"
              alt="Juno on a phone"
              fill
              sizes="140px"
              className="object-cover object-top"
            />
          </span>
        </motion.div>
      </div>
    ),
  },
  {
    id: "finer-things-club",
    when: "2021",
    noticed:
      "Rural artisans with work to sell and no way to reach the people who would buy it.",
    then: "So I started",
    tone: "tint",
    visual: (
      <div className="relative mx-auto w-[62%] md:w-[54%]">
        <motion.div
          initial={{ opacity: 0, y: 70, rotate: -12 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          <Paper
            src="/covers/Finer-Things-Marketplace-One-Pager.webp"
            alt="The Finer Things Club marketplace one-pager"
          />
        </motion.div>
      </div>
    ),
  },
  {
    id: "project-nidaan",
    when: "2022",
    noticed: "A delivery rider carrying medicine he could not get for himself.",
    then: "So I co-founded",
    tone: "line",
    visual: (
      <div className="relative mx-auto w-[62%] md:w-[54%]">
        <motion.div
          initial={{ opacity: 0, y: 70, rotate: 12 }}
          whileInView={{ opacity: 1, y: 0, rotate: 4 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          <Paper
            src="/covers/Project-Nidaan-Field-Research-Brief.webp"
            alt="First page of the Project Nidaan field research brief"
          />
        </motion.div>
      </div>
    ),
  },
];

function Body({ card, v }: { card: Card; v: Venture }) {
  const t = tones[card.tone];
  return (
    <div className="flex h-full flex-col justify-between gap-7">
      <div>
        <p className={`text-[15px] font-medium ${t.quiet}`}>
          {card.when} I noticed:
        </p>
        <p className="mt-2.5 max-w-[26ch] text-[clamp(22px,min(2.3vw,4vh),33px)] font-medium leading-[1.14]">
          {card.noticed}
        </p>
      </div>
      <div>
        <p className={`text-[15px] font-medium ${t.quiet}`}>{card.then}</p>
        <h3 className="display mt-1.5 text-[clamp(44px,min(5.6vw,9.6vh),88px)]">
          {v.name}
        </h3>
        <p className={`mt-3 max-w-[40ch] text-[16px] leading-snug ${t.quiet}`}>
          {v.summary}
        </p>
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
          {v.metrics.map((m) => (
            <div key={m.label}>
              <dd
                className={`display text-[clamp(38px,min(4.2vw,7vh),60px)] ${t.pop}`}
              >
                <Counter value={m.value} />
              </dd>
              <dt className={`mt-1 text-[14px] font-medium ${t.quiet}`}>
                {m.label}
              </dt>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href={`/work/${v.id}`} className={t.main}>
            Case study <Arrow direction="right" />
          </Link>
          {v.site && (
            <SmartLink href={v.site.href} className={t.ghost}>
              {v.site.label} <Arrow />
            </SmartLink>
          )}
          {v.proof.slice(0, 1).map((p) => (
            <SmartLink key={p.href} href={p.href} className={t.ghost}>
              {p.label.split(",")[0]} <Arrow />
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function StackCard({
  card,
  i,
  n,
  progress,
}: {
  card: Card;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const v = ventures.find((x) => x.id === card.id)!;
  // Each card settles back as the next one slides over it.
  const scale = useTransform(
    progress,
    [i / n, (i + 1) / n],
    [1, i === n - 1 ? 1 : 0.93],
  );
  return (
    <li
      className="stack-card"
      style={{ ["--stack-top" as string]: `${88 + i * 18}px` }}
    >
      <motion.article
        className={`stack-body grid origin-top gap-10 overflow-hidden rounded-[28px] p-6 sm:p-9 md:rounded-[40px] lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14 lg:px-14 lg:py-12 ${tones[card.tone].card}`}
        style={{ scale: reduce ? 1 : scale }}
      >
        <Body card={card} v={v} />
        <div>{card.visual}</div>
      </motion.article>
    </li>
  );
}

/** Three ventures before StrayPaw: what I noticed, then what I built. */
export function Ventures() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section
      id="startups"
      data-tone="light"
      aria-labelledby="startups-h"
      className="relative z-10 -mt-7 rounded-t-[28px] bg-bg pt-24 md:-mt-11 md:rounded-t-[44px] md:pt-36"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2
            id="startups-h"
            className="display text-[clamp(60px,10.5vw,170px)]"
          >
            <RiseWords onView text="Started at 14." />
          </h2>
          <Reveal>
            <p className="max-w-[30ch] pb-2 text-[clamp(18px,1.6vw,23px)] font-medium leading-[1.3] text-muted">
              Three things I founded before StrayPaw. Each one began with
              something I noticed.
            </p>
          </Reveal>
        </div>
        <ol ref={ref} className="mt-12 space-y-6 md:mt-20 lg:space-y-10">
          {cards.map((c, i) => (
            <StackCard
              key={c.id}
              card={c}
              i={i}
              n={cards.length}
              progress={scrollYProgress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
