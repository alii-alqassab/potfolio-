import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      ...(siteUrl ? { allow: "/" } : { disallow: "/" }),
    },
    ...(siteUrl ? { sitemap: new URL("sitemap.xml", siteUrl).toString() } : {}),
  };
}
