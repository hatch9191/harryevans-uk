import type { CSSProperties } from "react";

import { SITE, STACK } from "@/lib/site";

const step = (n: number) => ({ "--step": n }) as CSSProperties;

const CURRENT = [
  { label: "Currently", value: "Technical Cofounder, MiM" },
  { label: "Previously", value: "Senior Full Stack Engineer, Togather" },
];

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
            single-handedly — a monorepo of five apps, a GraphQL API, Stripe
            Connect payments, Terraform-provisioned infrastructure on GCP and a
            deploy pipeline that goes from merge to production with no manual
            steps.
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
