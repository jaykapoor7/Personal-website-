"use client";
import { roles } from "@/content/site";
import { Reveal } from "../motion";
import { SectionHead } from "./bits";
import { ListPreview, type Row } from "./ListPreview";

const rows: Row[] = roles.map((r) => ({
  slug: r.id,
  title: r.org,
  role: r.role,
  period: r.period,
  logo: r.logo,
  facts: r.points,
  docs: r.proof,
  photos: r.photos?.map((p) => ({ src: p.src, alt: p.alt })),
}));

export function Experience() {
  return (
    <section
      id="experience"
      data-tone="light"
      aria-labelledby="experience-h"
      className="shell scroll-mt-20"
    >
      <SectionHead id="experience-h" title="Experience" note="2025 to 2026" />
      <Reveal className="mt-7 md:mt-9">
        <ListPreview id="experience" rows={rows} />
      </Reveal>
    </section>
  );
}
