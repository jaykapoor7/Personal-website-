"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { person, portrait } from "@/content/site";
import { RiseWords, ease, useCalm } from "../motion";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/**
 * My name with my face set into the line, the one sentence, and a short
 * biography that ends with where to find me.
 */
export function Intro({ aside }: { aside?: React.ReactNode }) {
  const calm = useCalm();
  const fade = (delay: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease, delay },
        };

  return (
    <section aria-labelledby="intro-h" className="col pt-14 md:pt-20 lg:pt-24">
      {/* One statement, like a sentence: my name, my face, what I do. */}
      <h1
        id="intro-h"
        className="display max-w-[1000px] text-[clamp(36px,6.2vw,82px)] leading-[1.03] tracking-[-0.025em] [text-wrap:balance]"
      >
        <span className="whitespace-nowrap">
          <RiseWords text="Jay Kapoor" />
          <motion.span
            className="relative inline-block h-[0.8em] overflow-hidden rounded-full align-[-0.08em] shadow-[0_0_0_1px_rgb(var(--fg)/0.08),0_6px_14px_-8px_rgb(var(--fg)/0.45)]"
            initial={
              calm
                ? { width: "1.6em" }
                : { width: "1.6em", scale: 0, rotate: -20 }
            }
            animate={{ scale: 1, rotate: -4 }}
            whileHover={{ width: "2.8em", rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
              delay: 0.3,
            }}
          >
            <Image
              src={portrait.src.replace("-1280", "-400")}
              alt=""
              fill
              priority
              sizes="160px"
              className="object-cover object-[50%_60%]"
            />
          </motion.span>
          .
        </span>{" "}
        <RiseWords
          text={"I\u00a0find broken systems and try to find solutions."}
          delay={0.15}
        />
      </h1>

      <div className="mt-9 grid gap-x-16 gap-y-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
        <div className="max-w-[560px] space-y-3.5 text-[15.5px] leading-[1.7] text-fg/85 lg:text-[16px]">
          <motion.p {...fade(0.45)}>
            I study economics and statistics in the Dietrich School of Arts and
            Sciences at the University of Pittsburgh. I grew up in Bangalore and
            started my first company,{" "}
            <Link href="/work/juno-ai/" className="link text-fg">
              Juno-AI
            </Link>
            , at 14, to get health information to families in rural India.
          </motion.p>
          <motion.p {...fade(0.55)}>
            I usually start where a system fails people: talk to them, count
            what&apos;s really there, then build what&apos;s missing. Most of
            that has been in public health.
          </motion.p>
          <motion.p {...fade(0.65)}>
            Right now I&apos;m building{" "}
            <Link href="/work/straypaw/" className="link text-fg">
              StrayPaw
            </Link>
            , a shared record of India&apos;s street animals. It holds 30,288
            records across 28 cities, kept with 19 NGO partners.
          </motion.p>
          <motion.p {...fade(0.75)}>
            Find me at{" "}
            <a href={`mailto:${person.email}`} className="link text-fg">
              {person.email}
            </a>
            ,{" "}
            <a href={person.links[0].href} {...ext} className="link text-fg">
              LinkedIn
            </a>{" "}
            and{" "}
            <a href={person.links[1].href} {...ext} className="link text-fg">
              GitHub
            </a>
            , or read my{" "}
            <a href={person.resume} {...ext} className="link text-fg">
              resume
            </a>
            .
          </motion.p>
        </div>
        {aside}
      </div>
    </section>
  );
}
