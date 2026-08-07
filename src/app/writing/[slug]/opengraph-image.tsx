import { OG_SIZE, renderOgCard } from "@/lib/og";
import { FEATURES } from "@/lib/site";
import { formatPostDate, getPost, POSTS } from "@/lib/writing";

export const alt = "Writing — Harry Evans";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Matches the page's params, so no card is built for a post that 404s. */
export function generateStaticParams() {
  if (!FEATURES.WRITING) {
    return [];
  }

  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgCard({
    eyebrow: post ? `Writing — ${formatPostDate(post.date)}` : "Writing",
    title: post?.title ?? "Writing",
    footer: post?.readingTime ? `${post.readingTime} read` : "harryevans.uk",
  });
}
