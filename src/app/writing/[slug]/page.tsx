import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FEATURES, SITE } from "@/lib/site";
import { formatPostDate, getPost, POSTS, postPath } from "@/lib/writing";

export const dynamicParams = false;

/** Empty while the section is held back, so no post is built or reachable. */
export function generateStaticParams() {
  if (!FEATURES.WRITING) {
    return [];
  }

  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [SITE.name],
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { default: Body } = await import(`@/content/writing/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-5xl px-6 pt-16 pb-8 md:px-10 md:pt-24">
      <header className="max-w-3xl">
        <p className="eyebrow">
          {formatPostDate(post.date)} — {post.readingTime} read
        </p>

        <h1 className="mt-6 font-display text-title text-ink">{post.title}</h1>

        <p className="mt-5 text-lede text-ink-muted">{post.summary}</p>
      </header>

      <div className="prose mt-14 border-t border-rule pt-12">
        <Body />
      </div>

      <footer className="mt-20 border-t border-rule pt-8">
        <Link href="/writing" className="eyebrow transition-colors hover:text-brand">
          All writing
        </Link>
      </footer>
    </article>
  );
}
