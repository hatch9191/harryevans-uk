import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FEATURES } from "@/lib/site";
import { formatPostDate, POSTS, postPath } from "@/lib/writing";

const DESCRIPTION =
  "Notes on payments, monorepo boundaries and OAuth token lifecycles — written from problems I hit building production systems.";

/* Empty while held back, so the 404 does not describe the page it is hiding. */
export const metadata: Metadata = FEATURES.WRITING
  ? {
      title: "Writing",
      description: DESCRIPTION,
      alternates: { canonical: "/writing" },
    }
  : {};

const byNewest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export default function WritingIndex() {
  if (!FEATURES.WRITING) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-8 md:px-10 md:pt-24">
      <p className="eyebrow">Writing</p>

      <h1 className="mt-6 max-w-3xl font-display text-title text-ink">
        Things I worked out the hard way
      </h1>

      <p className="mt-5 max-w-2xl text-lede text-ink-muted">
        Short pieces on problems that took me longer than they should have.
        Mostly payments, package boundaries and the parts of OAuth nobody
        documents.
      </p>

      <ul className="mt-16 border-t border-rule">
        {byNewest.map((post) => (
          <li key={post.slug} className="border-b border-rule">
            <Link
              href={postPath(post.slug)}
              className="group grid gap-3 py-8 md:grid-cols-12 md:gap-12"
            >
              <p className="eyebrow md:col-span-3 md:pt-2">
                {formatPostDate(post.date)}
              </p>

              <div className="md:col-span-8 md:col-start-5">
                <h2 className="font-display text-2xl text-ink transition-colors group-hover:text-brand md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-ink-muted">{post.summary}</p>
                <p className="eyebrow mt-4">{post.readingTime} read</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
