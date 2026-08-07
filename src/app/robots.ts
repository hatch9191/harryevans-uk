import type { MetadataRoute } from "next";

import { FEATURES, ROUTES, SITE } from "@/lib/site";

/**
 * /hire carries availability and rate. It stays reachable by anyone with the
 * link, but must not surface in a search for my name — investors look me up
 * during MiM's raise and the public site has to read the same to both
 * audiences.
 *
 * Held-back sections are disallowed too, so a crawler that saw them in an
 * earlier sitemap does not keep asking.
 */
export default function robots(): MetadataRoute.Robots {
  const heldBack = [
    ...(FEATURES.WORK ? [] : ["/work/"]),
    ...(FEATURES.WRITING ? [] : ["/writing/"]),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [ROUTES.HIRE, ROUTES.LINKEDIN_BANNER, ...heldBack],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
