import type { MetadataRoute } from "next";
import { work } from "@/content/work";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/writing", "/about", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const workRoutes = work.map((w) => ({
    url: `${siteUrl}/work/${w.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes];
}
