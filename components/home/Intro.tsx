import Image from "next/image";
import { Link } from "next-view-transitions";
import { person, portrait } from "@/content/site";
import { Arrow } from "../Arrow";

/**
 * Who I am, in the order someone needs it: what I am working on now, the one
 * sentence I would want remembered, a short biography, and where to go next.
 */
export function Intro() {
  return (
    <section aria-labelledby="intro-h" className="col pt-4 md:pt-8">
      <div className="grid grid-cols-[minmax(0,1fr)_88px] items-start gap-x-6 sm:grid-cols-[minmax(0,1fr)_168px] sm:gap-x-10">
        <div>
          <Link
            href="/work/straypaw/"
            className="label group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <span className="live text-accent" aria-hidden="true" />
            Now building StrayPaw
            <Arrow
              direction="right"
              className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          <h1 id="intro-h" className="mt-4">
            <span className="block text-[15px] font-semibold tracking-[-0.01em]">
              {person.name}
            </span>
            <span className="display mt-2 block text-[clamp(30px,5vw,44px)] [text-wrap:balance]">
              I find broken systems and try to find solutions.
            </span>
          </h1>
        </div>
        <Image
          src={portrait.src.replace("-1280", "-400")}
          alt={portrait.alt}
          width={336}
          height={420}
          priority
          sizes="(max-width: 640px) 88px, 168px"
          className="mt-1 aspect-[4/5] w-full rounded-md object-cover object-[50%_62%] ring-1 ring-fg/[0.08]"
        />
      </div>

      <div className="mt-6 max-w-[560px] space-y-3.5 text-[15.5px] leading-[1.65] text-fg/90 sm:text-[16px]">
        <p>
          I study economics and statistics at the University of Pittsburgh. I
          grew up in Bengaluru and started my first company,{" "}
          <Link href="/work/juno-ai/" className="link">
            Juno-AI
          </Link>
          , at 14, to get health information to families in rural India.
        </p>
        <p>
          Since then I&apos;ve started three more, done research at Pitt and
          UPMC, and worked in banking, fintech, early education and real
          estate.
        </p>
        <p>
          Right now I&apos;m building{" "}
          <Link href="/work/straypaw/" className="link">
            StrayPaw
          </Link>
          , a shared record of India&apos;s street animals. It holds 30,288
          records across 28 cities, kept with 19 NGO partners.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14.5px]">
        <a href={person.resume} target="_blank" rel="noreferrer" className="btn-primary">
          Resume <Arrow className="text-[0.85em]" />
          <span className="sr-only">(PDF, opens in a new tab)</span>
        </a>
        <a href={`mailto:${person.email}`} className="link">
          {person.email}
        </a>
        {person.links.slice(0, 2).map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1"
          >
            {l.label} <Arrow className="text-[0.8em]" />
          </a>
        ))}
      </div>
    </section>
  );
}
