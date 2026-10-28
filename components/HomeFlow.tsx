"use client";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import data from "@/content/straypaw-map.json";
import { builds, labs, roles, ventures } from "@/content/site";
import { COS, K, outline, px, py } from "./DogMap";

const ease = [0.16, 1, 0.3, 1] as const;

function useTick(ms: number, n: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [ms, n, reduce]);
  return i;
}

/** One full-width row: words on one side, something alive on the other, drifting as you scroll. */
function Row({
  href,
  title,
  line,
  flip,
  children,
}: {
  href: string;
  title: string;
  line: string;
  flip?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <li ref={ref} className="">
      <Link
        href={href}
        className="group grid items-center gap-8 py-14 md:grid-cols-2 md:gap-16 md:py-20"
      >
        <motion.div
          className={flip ? "md:order-last" : ""}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="flex items-center gap-4 text-[clamp(48px,7vw,104px)] font-semibold leading-[0.9]">
            {title}
            <span
              aria-hidden="true"
              className="text-[0.42em] text-muted transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </h2>
          <p className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-muted">
            {line}
          </p>
        </motion.div>
        <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
      </Link>
    </li>
  );
}

function Map() {
  const cities = data.cities as [string, number, number, number][];
  return (
    <div className="relative mx-auto max-w-[420px]">
      <svg
        viewBox={`0 0 ${(29.5 * K * COS).toFixed(0)} 310`}
        className="w-full"
        aria-hidden="true"
      >
        <path
          d={outline}
          fill="none"
          stroke="rgb(var(--line))"
          strokeWidth="0.7"
        />
        {cities.map(([name, lng, lat, n], i) => (
          <g key={name} transform={`translate(${px(lng)} ${py(lat)})`}>
            <circle
              r="1.7"
              fill="rgb(var(--accent))"
              className="ping"
              style={{ animationDelay: `${(i * 0.37) % 4}s` }}
            />
          </g>
        ))}
      </svg>
      <p className="-mt-6 text-[clamp(36px,4vw,56px)] font-semibold leading-none">
        30,288
        <span className="mt-1 block text-[13px] font-medium tracking-normal text-muted">
          animals on StrayPaw, 28 cities
        </span>
      </p>
    </div>
  );
}

function Places() {
  return (
    <ul className="">
      {roles.map((r) => (
        <li key={r.id} className="flex items-center gap-4 py-3.5">
          {r.logo && (
            <Image
              src={r.logo}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-lg object-contain"
            />
          )}
          <span className="min-w-0 flex-1">
            <span className="block text-[18px] font-semibold leading-tight">
              {r.org}
            </span>
            <span className="block truncate text-[14px] text-muted">
              {r.role}
            </span>
          </span>
          <span className="hidden shrink-0 text-[13px] text-muted sm:block">
            {r.period}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Questions() {
  const qs = labs.map((x) => x.question);
  const i = useTick(2800, qs.length);
  return (
    <div className="flex min-h-[200px] flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease }}
          className="text-[clamp(28px,3vw,42px)] font-medium leading-[1.08]"
        >
          {qs[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Deck() {
  const shots = builds.filter((b) => b.image && !b.phone);
  const i = useTick(2400, shots.length);
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[520px]">
      {shots.map((b, n) => {
        const k = (n - i + shots.length) % shots.length;
        return (
          <motion.span
            key={b.id}
            className="absolute inset-x-0 bottom-0 block overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
            animate={{
              y: -k * 16,
              scale: 1 - k * 0.05,
              opacity: k > 2 ? 0 : 1,
              zIndex: 10 - k,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          >
            <span className="relative block aspect-[16/10]">
              <Image
                src={b.image!}
                alt=""
                fill
                sizes="520px"
                className="object-cover object-top"
              />
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}

function Now() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <p className="text-[clamp(64px,8vw,120px)] font-semibold leading-none">
        {t || " "}
      </p>
      <p className="mt-2 text-[15px] text-muted">in Pittsburgh right now.</p>
    </div>
  );
}

/** The rest of the site as one continuous scroll, a row per section. */
export function HomeFlow() {
  return (
    <ol className="">
      <Row
        href="/startups"
        title="Startups"
        line={`${ventures
          .map((v) => v.name)
          .join(", ")
          .replace(/, ([^,]*)$/, " and $1")}.`}
      >
        <Map />
      </Row>
      <Row
        href="/experience"
        title="Experience"
        line="TARC, TOT Schools, Crowwd and HDFC Bank: real estate, early education, fintech and banking."
        flip
      >
        <Places />
      </Row>
      <Row
        href="/research"
        title="Research"
        line="Labs at Pitt and UPMC, plus my own memos on healthcare and fintech, and forecasts scored when they land."
      >
        <Questions />
      </Row>
      <Row
        href="/projects"
        title="Projects"
        line={`${builds.length} tools and games, each playable in the browser.`}
        flip
      >
        <Deck />
      </Row>
      <Row
        href="/about"
        title="About"
        line="School in Bangalore, Pitt now, and why I keep doing so many different things."
      >
        <Now />
      </Row>
    </ol>
  );
}
