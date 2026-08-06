import Link from "next/link";

import { LINKS, ROUTES, SITE } from "@/lib/site";

const EXTERNAL = [
  { label: "GitHub", href: LINKS.GITHUB },
  { label: "LinkedIn", href: LINKS.LINKEDIN },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-6 px-6 py-5 md:px-10">
        <Link
          href={ROUTES.HOME}
          className="font-display text-2xl leading-none text-ink transition-colors hover:text-brand"
        >
          {SITE.name}
        </Link>

        <nav className="eyebrow flex items-baseline gap-5">
          {EXTERNAL.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-brand"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
