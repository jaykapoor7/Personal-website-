import type { MetadataRoute } from "next";
import { cases } from "@/content/archive";
import { builds } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/started",
    "/questions",
    "/predictions",
    "/play",
    "/about",
    "/ledger",
    "/market-map",
    "/artifacts",
    ...cases.map((c) => `/work/${c.slug}`),
    ...builds.map((b) =>
      b.falls ? "/play/everything-falls" : `/play/${b.id}`,
    ),
  ].map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
  }));
}
