"use client";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { person } from "@/content/site";
import { useCalm } from "../motion";

/** One word of the introduction. It comes into full ink as the page reaches it. */
function Word({
  children,
  at,
  n,
  progress,
}: {
  children: string;
  at: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [(at - 2) / n, (at + 1) / n],
    [0.22, 1],
  );
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** Three plain sentences about me. They fill in, word by word, as you scroll. */
export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });
  const text = person.about.join(" ");
  const words = text.split(" ");
  return (
    <section aria-label="About me" className="shell pt-16 md:pt-24">
      <p
        ref={ref}
        className="max-w-[26ch] text-[clamp(27px,4vw,60px)] font-semibold leading-[1.12] [font-stretch:90%] md:max-w-[1180px]"
      >
        {reduce ? (
          text
        ) : (
          <>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <Word
                  key={i}
                  at={i}
                  n={words.length}
                  progress={scrollYProgress}
                >
                  {w}
                </Word>
              ))}
            </span>
          </>
        )}
      </p>
    </section>
  );
}
