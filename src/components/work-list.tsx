import Link from "next/link";

import { WORK, workPath } from "@/lib/work";

/**
 * The home page index of case studies. Deliberately a list of rules rather
 * than a grid of cards — a card grid is the one layout every portfolio has,
 * and the titles are long enough that boxes would truncate them.
 */
export function WorkList() {
  return (
    <ul className="border-t border-rule">
      {WORK.map((entry, index) => (
        <li key={entry.slug} className="border-b border-rule">
          <Link
            href={workPath(entry.slug)}
            className="group grid gap-3 py-8 md:grid-cols-12 md:gap-12"
          >
            <div className="eyebrow flex items-baseline gap-3 md:col-span-3 md:block md:pt-3">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="md:mt-2 md:block">{entry.period}</span>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <h3 className="font-display text-title text-ink transition-colors group-hover:text-brand">
                {entry.title}
              </h3>

              <p className="mt-2 max-w-xl text-ink-muted">{entry.subtitle}</p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-eyebrow tracking-[0.13em] text-ink-faint uppercase">
                {entry.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
