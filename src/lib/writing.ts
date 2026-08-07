/**
 * Post index. The body of each post lives in src/content/writing/<slug>.mdx —
 * this is the metadata the listing page, the sitemap and the OG images read,
 * so a post is only published once it appears here.
 */

export type Post = {
  slug: string;
  title: string;
  /** One or two sentences. Doubles as the meta description. */
  summary: string;
  /** ISO date. Used for ordering and the dateline. */
  date: string;
  readingTime: string;
};

export const POSTS: ReadonlyArray<Post> = [
  {
    slug: "idempotent-stripe-fulfilment",
    title: "Two callers, one payment",
    summary:
      "Stripe will tell you a payment succeeded more than once, and your own front end will tell you at the same time. Making that safe is four lines, in the right place.",
    date: "2026-07-14",
    readingTime: "6 min",
  },
  {
    slug: "package-boundaries",
    title: "Package boundaries that survive a second platform",
    summary:
      "Every monorepo intends to share its business logic with the mobile app it will build later. The intention is not the mechanism — the linter is.",
    date: "2026-06-23",
    readingTime: "7 min",
  },
  {
    slug: "rotating-refresh-tokens",
    title: "Rotating refresh tokens are a concurrency problem",
    summary:
      "A refresh token you can only use once turns an ordinary cache into a race with a user-visible failure at the end of it.",
    date: "2026-05-30",
    readingTime: "5 min",
  },
];

export const getPost = (slug: string) =>
  POSTS.find((post) => post.slug === slug);

export const postPath = (slug: string) => `/writing/${slug}`;

export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
