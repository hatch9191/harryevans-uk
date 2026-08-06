import Link from "next/link";

import { ROUTES } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:px-10 md:pt-36">
      <p className="eyebrow">404</p>

      <h1 className="mt-7 max-w-2xl font-display text-title text-ink">
        There is nothing at this address.
      </h1>

      <p className="mt-6 max-w-xl text-lede text-ink-muted">
        The link may be out of date — this site replaced an older one in 2026.
      </p>

      <Link
        href={ROUTES.HOME}
        className="mt-10 inline-block font-mono text-eyebrow uppercase tracking-[0.13em] text-ink underline decoration-rule-strong transition-colors hover:text-brand hover:decoration-brand"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
