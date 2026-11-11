"use client";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";
import { jumpTo } from "@/lib/jump";
import { Magnetic, RiseWords, ease, useMedia, useProgress } from "../motion";

const prints = [
  {
    id: "team",
    src: "/photos/01_trojans_team-640.webp",
    alt: "Jay with the Trojans football team",
    caption: "The Trojans",
    box: "right-[-5%] top-[0%] w-[41%]",
    ratio: "aspect-[10/11]",
    fit: "object-cover object-top",
    rotate: 6,
    drift: -70,
    from: { x: 160, y: -120, rotate: 30 },
  },
  {
    id: "me",
    src: portrait.src,
    alt: portrait.alt,
    caption: "Cathedral of Learning, Pitt",
    box: "left-[17%] top-[7%] w-[58%]",
    ratio: "aspect-[3/4]",
    fit: "object-cover",
    rotate: -3,
    drift: -30,
    from: { x: 0, y: 220, rotate: -18 },
  },
  {
    id: "dog",
    src: "/straypaw/street-dog.webp",
    alt: "The street dog outside a cafe that started StrayPaw",
    caption: "The dog that started StrayPaw",
    box: "left-[-10%] bottom-[-7%] w-[44%]",
    ratio: "aspect-[6/5]",
    fit: "object-cover object-[50%_18%]",
    rotate: -8,
    drift: -110,
    from: { x: -180, y: 120, rotate: -34 },
  },
];

const places = [
  { name: "University of Pittsburgh", logo: "/logos/pitt.png" },
  { name: "UPMC", logo: "/logos/upmc.png" },
  { name: "HDFC Bank", logo: "/logos/hdfc.png" },
  { name: "Crowwd", logo: "/logos/crowwd.png" },
  { name: "TARC", logo: "/logos/tarc.png" },
  { name: "TOT Schools", logo: "/logos/tot.png" },
  { name: "AmeriCorps JumpStart", logo: "/logos/jumpstart.png" },
  { name: "TISB", logo: "/logos/tisb.png" },
];

/** Three photo prints you can pick up and move. */
function Prints({ area }: { area: React.RefObject<HTMLElement> }) {
  const reduce = useReducedMotion();
  const fine = useMedia("(pointer: fine)");
  const [top, setTop] = useState("");
  const p = useProgress(area, ["start start", "end start"]);
  const drifts = [
    useTransform(p, [0, 1], [0, prints[0].drift]),
    useTransform(p, [0, 1], [0, prints[1].drift]),
    useTransform(p, [0, 1], [0, prints[2].drift]),
  ];
  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[420px] lg:max-w-[540px]">
      {prints.map((ph, i) => (
        <motion.div
          key={ph.id}
          className={`absolute ${ph.box}`}
          style={{
            y: reduce ? 0 : drifts[i],
            zIndex: top === ph.id ? 30 : ph.id === "me" ? 10 : 20,
          }}
        >
          <motion.figure
            className={`print ${fine ? "cursor-grab active:cursor-grabbing" : ""}`}
            initial={
              reduce ? { rotate: ph.rotate } : { opacity: 0, ...ph.from }
            }
            animate={{ opacity: 1, x: 0, y: 0, rotate: ph.rotate }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.35 + i * 0.12,
            }}
            drag={fine && !reduce}
            dragConstraints={area}
            dragElastic={0.25}
            dragTransition={{ power: 0.12, timeConstant: 180 }}
            whileDrag={{ scale: 1.06, rotate: 0 }}
            whileHover={fine ? { scale: 1.03 } : undefined}
            onPointerDown={() => setTop(ph.id)}
          >
            <div className={`relative overflow-hidden ${ph.ratio}`}>
              <Image
                src={ph.src}
                alt={ph.alt}
                fill
                priority
                draggable={false}
                sizes="(max-width: 1024px) 60vw, 340px"
                className={`pointer-events-none select-none ${ph.fit}`}
              />
            </div>
            <figcaption>{ph.caption}</figcaption>
          </motion.figure>
        </motion.div>
      ))}
      {fine && (
        <motion.p
          className="absolute -bottom-9 right-0 text-[13px] font-medium text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Go on, move them.
        </motion.p>
      )}
    </div>
  );
}

/** Who I am, in one screen. */
export function Hero({ cover }: { cover?: React.RefObject<HTMLElement> }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Only where the hero is pinned (see .curtain) does it sink back as it is covered.
  const pinned = useMedia("(min-width: 1024px) and (min-height: 700px)");
  const glide = (e: React.MouseEvent) => {
    e.preventDefault();
    jumpTo("straypaw", { glide: true });
  };
  // As the next section slides over, the hero sinks back a little.
  const p = useProgress(cover ?? ref, ["start end", "start start"]);
  const scale = useTransform(p, [0, 1], [1, 0.94]);
  const fade = useTransform(p, [0, 0.9], [1, 0.35]);

  return (
    <section
      ref={ref}
      id="top"
      data-tone="light"
      aria-label="Introduction"
      className="curtain overflow-x-clip lg:h-[100svh] lg:min-h-[700px]"
    >
      <motion.div
        className="flex h-full flex-col"
        style={
          reduce || !cover || !pinned ? undefined : { scale, opacity: fade }
        }
      >
        <div className="shell grid flex-1 items-center gap-9 pb-14 pt-24 sm:pt-28 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10 lg:pb-6 lg:pt-24">
          <div>
            <h1 className="display text-[clamp(52px,8.4vw,124px)] !leading-[0.94]">
              <RiseWords text="I'm Jay. I notice" delay={0.05} />{" "}
              <motion.span
                className="my-[0.05em] inline-block origin-left rounded-[0.12em] bg-accent px-[0.12em] pb-[0.1em] pt-[0.03em] leading-[0.86] text-white"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1, rotate: -1.5 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
              >
                <RiseWords text="what's missing," delay={0.4} />
              </motion.span>{" "}
              <RiseWords text="then I build it." delay={0.55} />
            </h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.75 }}
            >
              <p className="mt-7 max-w-[35ch] text-[clamp(19px,1.65vw,24px)] font-medium leading-[1.3] md:mt-9">
                Right now that is{" "}
                <a
                  href="#straypaw"
                  onClick={glide}
                  className="underline decoration-accent decoration-2 underline-offset-[5px] hover:text-accent"
                >
                  StrayPaw
                </a>
                : one shared record for every street animal in India.
              </p>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
                30,288 animals, 28 cities and 19 NGO partners in four months.
                Economics and Statistics at Pitt. Building since I was 14.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a href="#straypaw" onClick={glide} className="btn-primary">
                    See the work
                    <Arrow direction="right" className="rotate-90" />
                  </a>
                </Magnetic>
                <a
                  href={person.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Resume <Arrow />
                </a>
              </div>
            </motion.div>
          </div>
          <Prints area={ref} />
        </div>

        <motion.div
          className="pb-7"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <ul
              className="marquee items-center"
              style={{ ["--speed" as string]: "46s" }}
            >
              {[0, 1].map((copy) =>
                places.map((pl) => (
                  <li
                    key={pl.name + copy}
                    aria-hidden={copy === 1 ? "true" : undefined}
                    className="flex shrink-0 items-center gap-3 pr-12 text-[15px] font-medium text-muted"
                  >
                    <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-line">
                      <Image
                        src={pl.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                    {pl.name}
                  </li>
                )),
              )}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
