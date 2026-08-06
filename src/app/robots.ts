import type { MetadataRoute } from "next";

import { ROUTES, SITE } from "@/lib/site";

/**
 * /hire carries availability and rate. It stays reachable by anyone with the
 * link, but must not surface in a search for my name — investors look me up
 * during MiM's raise and the public site has to read the same to both
 * audiences.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ROUTES.HIRE,
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
