import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/cases";
import { builds } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/ledger",
    "/market-map",
    "/artifacts",
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...builds.map((b) =>
      b.falls ? "/play/everything-falls" : `/play/${b.id}`,
    ),
  ].map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
  }));
}
