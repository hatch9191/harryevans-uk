import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/** Deliberately excludes /hire. Add case study and writing routes as they land. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
