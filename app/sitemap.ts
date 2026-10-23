import type { MetadataRoute } from "next";
import { allProjects } from "@/content/site";
import { playItems } from "@/content/play";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/play",
    "/experience",
    ...playItems.map((x) => `/play/${x.slug}`),
    "/work",
    "/writing",
    "/research",
    "/ledger",
    "/thesis",
    "/about",
    "/contact",
    ...allProjects.map((x) => `/work/${x.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() }));
}
