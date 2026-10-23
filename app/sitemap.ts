import type { MetadataRoute } from "next";
import { allProjects } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/research",
    "/ledger",
    "/about",
    "/experience",
    "/writing",
    "/thesis",
    "/play",
    "/play/everything-falls",
    "/contact",
    "/artifacts",
    ...allProjects.map((x) => `/work/${x.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}/`, lastModified: new Date() }));
}
