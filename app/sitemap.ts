import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/ledger",
    "/market-map",
    "/artifacts",
    "/play/everything-falls",
  ].map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
  }));
}
