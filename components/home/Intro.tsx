"use client";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { person } from "@/content/site";
import { ease, useCalm } from "../motion";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/**
 * The first thing on the sheet that slides over the hero: who I am in four
 * short paragraphs, with the ways into the site beside them.
 */
export function Intro({ aside }: { aside?: React.ReactNode }) {
  const calm = useCalm();
  const rise = (i: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -8% 0px" },
          transition: { duration: 0.8, ease, delay: i * 0.08 },
        };

  return (
    <section
      aria-label="About me"
      className="shell grid gap-x-20 gap-y-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start"
    >
      <div className="max-w-[640px] space-y-5 text-[clamp(18px,1.5vw,21px)] font-medium leading-[1.5] text-fg/90">
        <motion.p {...rise(0)}>
          I study economics and statistics in the Dietrich School of Arts and
          Sciences at the University of Pittsburgh. I grew up in Bangalore and
          started my first company,{" "}
          <Link href="/work/juno-ai/" className="link text-fg">
            Juno-AI
          </Link>
          , at 14, to get health information to families in rural India.
        </motion.p>
        <motion.p {...rise(1)}>
          I usually start where a system fails people: talk to them, count
          what&apos;s really there, then build what&apos;s missing. Most of
          that has been in public health.
        </motion.p>
        <motion.p {...rise(2)}>
          Right now I&apos;m building{" "}
          <Link href="/work/straypaw/" className="link text-fg">
            StrayPaw
          </Link>
          , a shared record of India&apos;s street animals. It holds 30,288
          records across 28 cities, kept with 19 NGO partners.
        </motion.p>
        <motion.p {...rise(3)} className="text-muted">
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
    </section>
  );
}
