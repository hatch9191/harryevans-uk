import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { WorkList } from "@/components/work-list";
import { FEATURES, ROUTES, SITE, STACK } from "@/lib/site";
import { formatPostDate, POSTS, postPath } from "@/lib/writing";

/**
 * Canonical is set per page rather than on the root layout — pages inherit
 * layout metadata, so a canonical there would point every future case study
 * at the homepage.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const step = (n: number) => ({ "--step": n }) as CSSProperties;

const CURRENT = [
  { label: "Currently", value: "Technical Cofounder, MiM" },
  { label: "Previously", value: "Senior Full Stack Engineer, Togather" },
];

const HOW_I_WORK = [
  {
    title: "Zero to production, not zero to prototype",
    body: "The interesting problems are past the demo — payment state that survives a duplicate webhook, a migration that runs on live traffic, a deploy that a tired person can do on a Friday. I have built the whole path more than once, alone and in a team.",
  },
  {
    title: "I own the infrastructure as readily as the product code",
    body: "Terraform, Cloud Run, CI/CD, secrets and the deploy pipeline. Most application engineers stop at the application, and the gap between the two is usually where a project quietly stalls for a fortnight.",
  },
  {
    title: "I decide, and I say what the decision cost",
    body: "Every choice on this site comes with the trade-off it carried. Architecture is not picking the best option, it is picking one and being honest about what you gave up — which is also the only way anybody can disagree with you usefully.",
  },
  {
    title: "Small teams, or on my own",
    body: "London hybrid or fully remote. I am most useful where the constraint is delivery rather than headcount, and I do not need a long ramp-up to be productive in an existing TypeScript codebase.",
  },
];

const recentPosts = [...POSTS]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
        <p className="eyebrow rise" style={step(0)}>
          {SITE.role} — London
        </p>

        <h1
          className="rise mt-7 max-w-4xl font-display text-display text-ink"
          style={step(1)}
        >
          I take products from{" "}
          <em className="italic text-brand">nothing to production</em>
          .
        </h1>

        <div className="mt-14 grid gap-10 border-t border-rule pt-10 md:grid-cols-12 md:gap-12">
          <p
            className="rise text-lede text-ink-muted md:col-span-7"
            style={step(2)}
          >
            I build in TypeScript across the whole stack. Most recently I have
            architected and shipped an entire marketplace platform
            single-handedly — a monorepo of four deployed apps, a GraphQL API,
            Stripe Connect payments, Terraform-provisioned infrastructure on GCP
            and a deploy pipeline that goes from merge to production with no
            manual steps.
          </p>

          <dl
            className="rise space-y-6 md:col-span-4 md:col-start-9"
            style={step(3)}
          >
            {CURRENT.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <h2 className="eyebrow md:col-span-3 md:pt-2">What I do</h2>

          <div className="space-y-6 text-ink-muted md:col-span-8 md:col-start-5">
            <p>
              Five years building production software in London, four of them at
              a venture-backed marketplace delivering at pace in a scaled Agile
              team. At Togather I headed up the engineering for a new enterprise
              application, built from scratch to give the corporate clients and
              public events side of the business a platform of its own, and
              integrated deeply with Salesforce.
            </p>
            <p>
              I am most useful to teams taking something from zero to
              production, or who need someone to move quickly in an existing
              TypeScript codebase without a long ramp-up. I own the
              infrastructure and the deploy pipeline as readily as the product
              code — most application engineers stop at the application, and the
              gap between the two is usually where projects stall.
            </p>
          </div>
        </div>
      </section>

      {FEATURES.WORK ? (
        <section
          id="work"
          className="mx-auto max-w-5xl scroll-mt-8 px-6 py-16 md:px-10 md:py-20"
        >
          <h2 className="eyebrow mb-8">Selected work</h2>
          <WorkList />
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <h2 className="eyebrow md:col-span-3 md:pt-2">How I work</h2>

          <dl className="space-y-10 md:col-span-8 md:col-start-5">
            {HOW_I_WORK.map((item) => (
              <div key={item.title}>
                <dt className="font-display text-2xl text-ink">{item.title}</dt>
                <dd className="mt-2 text-ink-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <h2 className="eyebrow md:col-span-3 md:pt-2">Stack</h2>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink md:col-span-8 md:col-start-5">
            {STACK.map((item) => (
              <li
                key={item}
                className="border-b border-rule-strong pb-1 whitespace-nowrap"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {FEATURES.WRITING ? (
        <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <h2 className="eyebrow md:col-span-3 md:pt-2">Writing</h2>

            <div className="md:col-span-8 md:col-start-5">
              <ul className="border-t border-rule">
                {recentPosts.map((post) => (
                  <li key={post.slug} className="border-b border-rule">
                    <Link
                      href={postPath(post.slug)}
                      className="group block py-5"
                    >
                      <span className="font-display text-2xl text-ink transition-colors group-hover:text-brand">
                        {post.title}
                      </span>
                      <span className="eyebrow mt-2 block">
                        {formatPostDate(post.date)} — {post.readingTime} read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={ROUTES.WRITING}
                className="eyebrow mt-6 inline-block transition-colors hover:text-brand"
              >
                All writing →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 border-t border-rule pt-12 md:grid-cols-12 md:gap-12">
          <h2 className="eyebrow md:col-span-3 md:pt-3">Get in touch</h2>

          <div className="md:col-span-9 md:col-start-5">
            <a
              href={`mailto:${SITE.email}`}
              className="font-display text-title break-all text-ink underline decoration-rule-strong transition-colors hover:text-brand hover:decoration-brand"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
