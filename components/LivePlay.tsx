"use client";
import Image from "next/image";
import { useState } from "react";
import { BrowserFrame, PhoneFrame } from "./frames";
import { Arrow } from "./Arrow";

/** A screenshot of a real site that turns into the real site when you press play. */
export function LivePlay({
  title,
  href,
  url,
  image,
  phone = false,
  cta = "Play here",
}: {
  title: string;
  href: string;
  url: string;
  image: string;
  phone?: boolean;
  cta?: string;
}) {
  const [live, setLive] = useState(false);
  const inner = (
    <div
      className={`relative ${phone ? "aspect-[390/844]" : "aspect-[16/10]"}`}
    >
      {live ? (
        <iframe
          src={href}
          title={title}
          className="absolute inset-0 h-full w-full bg-white"
          allow="fullscreen; autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="group absolute inset-0 block w-full"
          aria-label={`${cta}: ${title}`}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes={phone ? "300px" : "(max-width: 768px) 100vw, 600px"}
            className="object-cover object-top"
          />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[15px] font-medium text-bg opacity-100 shadow-lg transition-all duration-300 group-hover:scale-105 md:opacity-0 md:group-hover:opacity-100">
            ▶ {cta}
          </span>
        </button>
      )}
    </div>
  );
  return (
    <div>
      {phone ? (
        <PhoneFrame className="deep-shadow mx-auto max-w-[300px]">
          {inner}
        </PhoneFrame>
      ) : (
        <BrowserFrame url={url} className="deep-shadow">
          {inner}
        </BrowserFrame>
      )}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="text-lg font-semibold tracking-tight">{title}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-sm text-muted hover:text-fg"
        >
          Open <Arrow />
        </a>
      </div>
    </div>
  );
}
