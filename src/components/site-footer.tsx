import { LINKS, SITE } from "@/lib/site";

const LINK_LIST = [
  { label: "Email", href: `mailto:${SITE.email}` },
  { label: "GitHub", href: LINKS.GITHUB },
  { label: "LinkedIn", href: LINKS.LINKEDIN },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="eyebrow mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          {SITE.name} — {SITE.location}
        </p>

        <ul className="flex flex-wrap gap-5">
          {LINK_LIST.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
