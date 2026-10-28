"use client";
import Image from "next/image";
import { writing } from "@/content/site";
import { Arrow } from "./Arrow";
import { Stagger, StaggerItem } from "./motion";
import { SmartLink } from "./ui";

const tilt = [-3, 2, -1.5, 3, -2.5, 1.5];

/** My own research, on a shelf. The Juno-AI paper sits with Juno-AI under Startups. */
export function Shelf() {
  return (
    <Stagger
      as="ul"
      className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6"
    >
      {writing
        .filter((w) => !w.href.includes("juno-ai"))
        .map((w, i) => (
          <StaggerItem as="li" key={w.href}>
            <SmartLink href={w.href} className="group block">
              <span
                className="paper-shadow relative block aspect-[900/1273] overflow-hidden bg-white transition-transform duration-500 ease-out group-hover:-translate-y-2.5 group-hover:!rotate-0 group-hover:scale-[1.04]"
                style={{ rotate: `${tilt[i % tilt.length]}deg` }}
              >
                <Image
                  src={w.cover}
                  alt={`First page of ${w.title}`}
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </span>
              <span className="mt-4 block text-[15px] font-semibold leading-snug group-hover:text-accent">
                {w.title.split(":")[0]}
              </span>
              <span className="block text-[13px] font-medium text-muted">
                {w.kind}, {w.year}
              </span>
            </SmartLink>
            {w.extra && (
              <SmartLink
                href={w.extra.href}
                className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline"
              >
                {w.extra.label} <Arrow direction="right" />
              </SmartLink>
            )}
          </StaggerItem>
        ))}
    </Stagger>
  );
}
