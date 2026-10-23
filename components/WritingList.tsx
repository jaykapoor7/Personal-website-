import Image from "next/image";
import type { Writing } from "@/content/site";
import { SmartLink } from "./ui";

export function WritingList({ items }: { items: Writing[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((w) => (
        <li key={w.title} className="flex gap-5 border-b border-line py-5">
          <span className="paper-shadow relative h-[84px] w-[60px] shrink-0 overflow-hidden rounded-[2px] bg-white">
            {w.cover && (
              <Image
                src={w.cover}
                alt=""
                fill
                sizes="60px"
                className="object-cover object-top"
              />
            )}
          </span>
          <div className="min-w-0 flex-1">
            {w.href ? (
              <SmartLink
                href={w.href}
                className="text-lg font-semibold leading-snug tracking-tight hover:text-accent"
              >
                {w.title}
              </SmartLink>
            ) : (
              <p className="text-lg font-semibold leading-snug tracking-tight">
                {w.title}
              </p>
            )}
            <p className="mt-1 text-[15px] text-muted">
              {w.description} {w.type}, {w.year}.
              {w.extra && (
                <>
                  {" "}
                  <SmartLink href={w.extra.href} className="link text-fg">
                    {w.extra.label}
                  </SmartLink>
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
