import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { WORK, type WorkEntry, workPath } from "@/lib/work";

/**
 * The case study pages share one editorial grid: a mono label in the left
 * three columns, content in the right eight. Everything below is that grid
 * plus the few things that hang off it.
 */

export function WorkHeader({ entry }: { entry: WorkEntry }) {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
      <p className="eyebrow">
        {entry.role} — {entry.period}
      </p>

      <h1 className="mt-6 max-w-3xl font-display text-title text-ink">
        {entry.title}
      </h1>

      <p className="mt-5 max-w-2xl text-lede text-ink-muted">
        {entry.subtitle}
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 md:grid-cols-4">
        {entry.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow">{fact.label}</dt>
            <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export function Section({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <h2 className="eyebrow md:col-span-3 md:pt-2">{label}</h2>
        <div className="md:col-span-8 md:col-start-5">{children}</div>
      </div>
    </section>
  );
}

/** Full-bleed within the content column — for diagrams and wide tables. */
export function WideSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <h2 className="eyebrow">{label}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/**
 * A decision and the trade-off it cost. The shape is the point: stating what
 * you gave up is what separates a decision from a preference.
 */
export function Decision({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-rule pt-6 first:border-t-0 first:pt-0">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <div className="prose mt-3">{children}</div>
    </div>
  );
}

export function Figure({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure>
      <div className="border border-rule bg-paper-raised p-4 md:p-8">
        {children}
      </div>
      <figcaption className="eyebrow mt-3">{caption}</figcaption>
    </figure>
  );
}

/** Next case study, so the page has somewhere to go other than back. */
export function WorkFooterNav({ current }: { current: string }) {
  const index = WORK.findIndex((entry) => entry.slug === current);
  const next = WORK[(index + 1) % WORK.length];

  return (
    <nav className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <div className="border-t border-rule pt-8">
        <p className="eyebrow">Next</p>
        <Link
          href={workPath(next.slug)}
          className="group mt-3 block max-w-2xl"
        >
          <span className="font-display text-title text-ink transition-colors group-hover:text-brand">
            {next.title}
          </span>
          <span className="mt-2 block text-ink-muted">{next.subtitle}</span>
        </Link>
      </div>
    </nav>
  );
}
