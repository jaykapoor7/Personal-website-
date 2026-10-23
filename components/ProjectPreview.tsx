import Image from "next/image";
import type { Project } from "@/content/site";
import { BrowserFrame, Paper, PhoneFrame } from "./frames";

/** The real thing for a project: its live site in a browser and phone, or its document. */
export function ProjectPreview({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const p = project.preview;
  if (!p) return null;
  if (p.type === "doc")
    return (
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="group mx-auto block w-full max-w-[460px]"
      >
        <Paper
          src={p.cover}
          alt={`First page of the ${project.title} document`}
          sizes="460px"
          className="transition-transform duration-500 ease-out [transform:rotate(-2deg)] group-hover:[transform:rotate(0deg)_translateY(-8px)]"
        />
      </a>
    );
  return (
    <div className="relative pb-10 pr-6 sm:pr-14">
      <BrowserFrame url={p.url} className="deep-shadow">
        <div className="relative aspect-[16/10]">
          <Image
            src={p.desktop}
            alt={`${project.title} home page`}
            fill
            priority={priority}
            sizes="(max-width: 1120px) 100vw, 1000px"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>
      {p.mobile && (
        <PhoneFrame className="deep-shadow absolute bottom-0 right-0 w-[26%] max-w-[210px]">
          <div className="relative aspect-[390/844]">
            <Image
              src={p.mobile}
              alt={`${project.title} on a phone`}
              fill
              sizes="210px"
              className="object-cover object-top"
            />
          </div>
        </PhoneFrame>
      )}
    </div>
  );
}
