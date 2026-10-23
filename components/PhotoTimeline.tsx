"use client";
import { Arrow } from "@/components/Arrow";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Photo({
  name,
  alt,
  priority = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={`/photos/${name}-640.webp`} />
      <Image
        src={`/photos/${name}-1280.webp`}
        alt={alt}
        fill
        sizes="(max-width:760px) 100vw, 65vw"
        priority={priority}
        className="archive-photo"
      />
    </picture>
  );
}
export function PhotoTimeline() {
  const root = useRef<HTMLDivElement>(null),
    [active, setActive] = useState(0),
    [split, setSplit] = useState(50);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>("[data-memory]");
    if (!nodes) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.memory));
        }),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`photo-journey memory-${active}`} ref={root}>
      <aside className="memory-rail">
        <span className="eyebrow">PHOTOS</span>
        <nav aria-label="Personal memories">
          {["Running", "Football", "School", "Pitt"].map((t, i) => (
            <a
              key={t}
              href={`#memory-${i}`}
              aria-current={active === i ? "location" : undefined}
            >
              <span>0{i + 1}</span>
              {t}
            </a>
          ))}
        </nav>
        <span className="memory-line" aria-hidden="true">
          <i style={{ height: `${(active + 1) * 25}%` }} />
        </span>
      </aside>
      <div className="memory-sequence">
        <section className="memory-scene" id="memory-0" data-memory="0">
          <div className="memory-heading">
            <span className="eyebrow">01</span>
            <h2>Running.</h2>
          </div>
          <figure className="running-frame">
            <Photo
              name="02_childhood_running"
              alt="Jay running on a marked grass track during a childhood sports day"
              priority
            />
            <svg
              className="track-overlay"
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect x="-150" y="90" width="900" height="600" rx="260" />
              <rect x="-115" y="125" width="830" height="530" rx="225" />
              <rect x="-80" y="160" width="760" height="460" rx="190" />
            </svg>
          </figure>
        </section>
        <div className="track-to-pitch" aria-hidden="true">
          <svg viewBox="0 0 800 190">
            <path
              className="morphing-track"
              d="M160 35 C160 15 640 15 640 35 L640 155 C640 175 160 175 160 155 Z"
            />
            <path d="M400 20v150M160 65h65v60h-65M640 65h-65v60h65" />
            <circle cx="400" cy="95" r="35" />
          </svg>
        </div>
        <section
          className="memory-scene team-memory"
          id="memory-1"
          data-memory="1"
        >
          <div className="memory-heading">
            <span className="eyebrow">02</span>
            <h2>Football.</h2>
          </div>
          <div
            className="then-now"
            style={{ "--split": `${split}%` } as React.CSSProperties}
          >
            <div className="team-photo now-photo">
              <Photo
                name="01_trojans_team"
                alt="Jay and his Trojans football teammates in navy uniforms"
              />
            </div>
            <div className="team-photo then-photo">
              <Photo
                name="04_childhood_football_team"
                alt="Jay’s childhood football team and coach together on the pitch"
              />
            </div>
            <div className="split-divider" aria-hidden="true">
              <span>↔</span>
            </div>
            <div className="photo-era">
              <span>THEN / CHILDHOOD</span>
              <span>LATER / TROJANS</span>
            </div>
          </div>
          <label className="photo-scrub">
            <span>Compare photos</span>
            <input
              aria-label="Compare childhood and Trojans football teams"
              type="range"
              min="0"
              max="100"
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
            />
            <span>
              {split === 100
                ? "Childhood"
                : split === 0
                  ? "Trojans"
                  : "Then / Now"}
            </span>
          </label>
        </section>
        <section
          className="memory-scene award-memory"
          id="memory-2"
          data-memory="2"
        >
          <div className="memory-heading">
            <span className="eyebrow">03</span>
            <h2>School.</h2>
          </div>
          <figure className="award-photo">
            <Photo
              name="07_school_ceremony"
              alt="Jay in cap and gown receiving an award at a school ceremony, with two presenters"
            />
            <figcaption>School ceremony.</figcaption>
          </figure>
        </section>
        <section
          className="memory-scene portrait-memory"
          id="memory-3"
          data-memory="3"
        >
          <div className="memory-heading">
            <span className="eyebrow">04</span>
            <h2>Pittsburgh.</h2>
          </div>
          <figure className="portrait-frame">
            <Photo
              name="pitt_portrait"
              alt="Jay standing on the lawn outside Pitt’s Cathedral of Learning"
            />
          </figure>
          <div className="portrait-note">
            <div>
              <p>University of Pittsburgh.</p>
              <a
                className="portrait-source"
                href="/jay-kapoor.jpg"
                target="_blank"
                rel="noreferrer"
              >
                Original photograph <Arrow />
              </a>
            </div>
            <Link className="text-link" href="/experience">
              Experience <Arrow />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
