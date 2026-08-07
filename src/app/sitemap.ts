import type { MetadataRoute } from "next";

import { FEATURES, SITE } from "@/lib/site";
import { WORK, workPath } from "@/lib/work";
import { POSTS, postPath } from "@/lib/writing";

/** Deliberately excludes /hire — see robots.ts for the other half of that. */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, SITE.url).toString();

  const work = FEATURES.WORK
    ? WORK.map((entry) => ({
        url: absolute(workPath(entry.slug)),
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      }))
    : [];

  const writing = FEATURES.WRITING
    ? [
        {
          url: absolute("/writing"),
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        ...POSTS.map((post) => ({
          url: absolute(postPath(post.slug)),
          lastModified: new Date(post.date),
          changeFrequency: "yearly" as const,
          priority: 0.5,
        })),
      ]
    : [];

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...work,
    ...writing,
  ];
}
