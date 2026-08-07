/**
 * Index of the case studies. Everything that appears in more than one place —
 * home cards, page headers, metadata, OG images, sitemap, prev/next — reads
 * from here so the three surfaces cannot drift apart.
 */

export type WorkEntry = {
  slug: string;
  title: string;
  /** Sits under the title on the case study page and on the home card. */
  subtitle: string;
  role: string;
  period: string;
  /** One sentence. Used on the home card and as the meta description. */
  summary: string;
  /** Shown as a rule-separated strip under the case study header. */
  facts: ReadonlyArray<{ label: string; value: string }>;
  /** Named in the OG image and the card footer. Keep to five or fewer. */
  stack: ReadonlyArray<string>;
};

export const WORK: ReadonlyArray<WorkEntry> = [
  {
    slug: "mim",
    title: "MiM",
    subtitle: "A marketplace platform, built solo from nothing to production",
    role: "Technical Cofounder, sole engineer",
    period: "January 2026 — present",
    summary:
      "Architected and shipped an entire two-sided marketplace on my own: a monorepo of four deployed apps, a GraphQL API, Stripe Connect payments, and Terraform-provisioned GCP with a zero-touch deploy.",
    facts: [
      { label: "Team", value: "One engineer" },
      { label: "Monorepo", value: "4 apps · 19 packages" },
      { label: "Data model", value: "47 Prisma models" },
      { label: "Deploy", value: "Merge to production, no manual steps" },
    ],
    stack: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL", "Terraform"],
  },
  {
    slug: "togather-platform",
    title: "Togather — enterprise platform",
    subtitle: "A new application for corporate events, sewn into Salesforce",
    role: "Senior Full Stack Engineer, engineering lead on the build",
    period: "2025",
    summary:
      "Headed up the engineering for a new enterprise application, built from scratch and kept in sync with the core marketplace by consuming Salesforce platform events.",
    facts: [
      { label: "Scope", value: "New application, greenfield" },
      { label: "Integration", value: "Salesforce platform events" },
      { label: "Pattern", value: "Event-driven, eventually consistent" },
      { label: "Also shipped", value: "Internal libraries and templates" },
    ],
    stack: ["TypeScript", "React", "Node", "Salesforce", "Kafka"],
  },
  {
    slug: "togather-quoting",
    title: "Togather — quoting rework",
    subtitle: "Rebuilding the commercial core of a live marketplace",
    role: "Full Stack Engineer, small delivery team",
    period: "2023 — 2024",
    summary:
      "Part of the small team that delivered the largest rework of the platform's quoting system in the company's history, migrated without taking live quoting down.",
    facts: [
      { label: "Team", value: "Small delivery team" },
      { label: "Constraint", value: "No downtime on live quoting" },
      { label: "Surface", value: "Suppliers, customers and internal sales" },
      { label: "Approach", value: "Incremental migration behind flags" },
    ],
    stack: ["TypeScript", "React", "Node", "PostgreSQL", "Kafka"],
  },
];

export const getWork = (slug: string) =>
  WORK.find((entry) => entry.slug === slug);

export const workPath = (slug: string) => `/work/${slug}`;
