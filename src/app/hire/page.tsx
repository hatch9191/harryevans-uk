import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { CV_FILES, QUALIFYING_PITCH, SITE, STACK, TERMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contract availability",
  description:
    "Contract availability, rate, IR35 stance and CV for Harry Evans, senior full stack engineer.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: null,
  },
};

const DOWNLOADS = [
  { label: "CV (PDF)", href: CV_FILES.PDF },
  { label: "CV (Word)", href: CV_FILES.DOCX },
];

/**
 * Resolved at build time against public/. A dead download link on the page a
 * recruiter lands on is worse than no link, so the buttons only appear once
 * the files are actually there — drop them into public/ and they show up.
 */
const availableDownloads = DOWNLOADS.filter((file) =>
  existsSync(join(process.cwd(), "public", file.href)),
);

export default function HirePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-8 md:px-10 md:pt-28">
      <p className="eyebrow">For recruiters and hiring managers</p>

      <h1 className="mt-7 max-w-3xl font-display text-title text-ink">
        Contract availability
      </h1>

      <p className="mt-6 max-w-2xl text-lede text-ink-muted">
        Everything you need to qualify me in one place. If something is missing,
        email me and you will have it the same day.
      </p>

      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="eyebrow">Terms</h2>

        <dl className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {TERMS.map((term) => (
            <div key={term.label}>
              <dt className="eyebrow">{term.label}</dt>
              <dd className="mt-1.5 text-ink">{term.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-ink-muted">
          Insurance certificates available on request. Company number to follow
          on incorporation.
        </p>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="eyebrow">Stack</h2>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink">
          {STACK.map((item) => (
            <li
              key={item}
              className="border-b border-rule-strong pb-1 whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="eyebrow">Summary to copy</h2>

        <div className="mt-6 border border-rule-strong bg-paper-raised p-6 font-mono text-sm leading-relaxed text-ink">
          {QUALIFYING_PITCH.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="eyebrow">CV</h2>

        {availableDownloads.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-4">
            {availableDownloads.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  download
                  className="inline-block border border-ink bg-ink px-5 py-2.5 font-mono text-eyebrow uppercase tracking-[0.13em] text-paper transition-colors hover:border-brand hover:bg-brand"
                >
                  {file.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-ink-muted">
            Email me and I will send it straight over, in PDF or Word — whichever
            your system needs.
          </p>
        )}
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="eyebrow">Contact</h2>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="sr-only">Email</dt>
            <dd>
              <a
                href={`mailto:${SITE.email}`}
                className="text-ink underline decoration-rule-strong transition-colors hover:text-brand hover:decoration-brand"
              >
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Phone</dt>
            <dd>
              <a
                href={`tel:+44${SITE.phone.replace(/\D/g, "").slice(1)}`}
                className="text-ink underline decoration-rule-strong transition-colors hover:text-brand hover:decoration-brand"
              >
                {SITE.phone}
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          Before submitting me to a client, please confirm the client name and
          get my agreement on a per-client basis — duplicate submissions between
          agencies cause ownership disputes that tend to cost the candidate the
          role.
        </p>
      </section>
    </div>
  );
}
