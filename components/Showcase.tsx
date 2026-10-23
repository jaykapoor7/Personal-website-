"use client";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame, PhoneFrame } from "./frames";

export type Step = { title: string; text: string };

/**
 * A real site scrolls inside a browser window as the page scrolls past,
 * while the story beside it moves through its steps.
 */
export function Showcase({
  url,
  scroll,
  scrollRatio,
  phone,
  steps,
  footer,
}: {
  url: string;
  /** Full-page screenshot of the site. */
  scroll: string;
  /** height / width of the full-page screenshot. */
  scrollRatio: number;
  phone?: { src: string; alt: string };
  steps: Step[];
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => setPinned(!reduce), [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const frameRatio = 10 / 16;
  const travel = (1 - frameRatio / scrollRatio) * 100;
  const y = useTransform(scrollYProgress, [0.04, 0.96], ["0%", `-${travel}%`]);
  const phoneY = useTransform(scrollYProgress, [0.3, 0.5], [140, 0]);
  const phoneO = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStep(Math.min(steps.length - 1, Math.floor(v * steps.length))),
  );

  const frame = (
    <div className="relative">
      <BrowserFrame url={url} className="deep-shadow">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16 / 10" }}
        >
          <motion.div
            style={pinned ? { y } : undefined}
            className="absolute inset-x-0 top-0"
          >
            <Image
              src={scroll}
              alt={`${url}, scrolling through the live site`}
              width={1200}
              height={Math.round(1200 * scrollRatio)}
              sizes="(max-width: 768px) 100vw, 760px"
              className="w-full"
            />
          </motion.div>
        </div>
      </BrowserFrame>
      {phone && (
        <motion.div
          className="absolute -bottom-10 -right-3 w-[30%] max-w-[190px] sm:-right-8"
          style={pinned ? { y: phoneY, opacity: phoneO } : undefined}
        >
          <PhoneFrame className="deep-shadow">
            <div className="relative aspect-[390/844]">
              <Image
                src={phone.src}
                alt={phone.alt}
                fill
                sizes="190px"
                className="object-cover object-top"
              />
            </div>
          </PhoneFrame>
        </motion.div>
      )}
    </div>
  );

  if (!pinned)
    return (
      <div className="shell grid items-center gap-14 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <ol className="space-y-8">
            {steps.map((s) => (
              <li key={s.title}>
                <h3 className="display text-4xl">{s.title}</h3>
                <p className="mt-2 text-lg text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="hidden lg:block">{footer}</div>
        </div>
        {frame}
      </div>
    );

  return (
    <div
      ref={ref}
      style={{ height: `${steps.length * 85 + 60}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full items-center gap-10 pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pt-0">
          <div className="relative">
            <div className="mb-6 flex gap-1.5" aria-hidden="true">
              {steps.map((_, i) => (
                <i
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === step ? "w-10 bg-fg" : "w-4 bg-fg/15"
                  }`}
                />
              ))}
            </div>
            <div className="relative h-[150px] sm:h-[190px] lg:h-[230px]">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: i === step ? 1 : 0,
                    y: i === step ? 0 : i < step ? -30 : 30,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden={i !== step}
                >
                  <h3 className="display text-[clamp(34px,4.6vw,64px)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[17px] text-muted lg:text-lg">
                    {s.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="hidden lg:block">{footer}</div>
          </div>
          {frame}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <motion.div className="h-px bg-fg" style={{ width: bar }} />
      </div>
    </div>
  );
}
