import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Decision,
  Section,
  WorkFooterNav,
  WorkHeader,
} from "@/components/case-study";
import { FEATURES } from "@/lib/site";
import { getWork, workPath } from "@/lib/work";

const entry = getWork("togather-quoting")!;

/* Empty while held back, so the 404 does not describe the page it is hiding. */
export const metadata: Metadata = FEATURES.WORK
  ? {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: workPath(entry.slug) },
    }
  : {};

export default function TogatherQuotingCaseStudy() {
  if (!FEATURES.WORK) {
    notFound();
  }

  return (
    <article>
      <WorkHeader entry={entry} />

      <Section label="Context">
        <div className="prose">
          <p>
            On an events marketplace, the quote is the product. A customer
            describes what they want, suppliers price it, and the document that
            comes back is what gets negotiated, accepted and paid against.
            Everything else on the platform exists to produce one or to act on
            one.
          </p>
          <p>
            It was also the oldest part of the system, built for a business that
            sold one thing and had since grown into one that sold several.{" "}
            <strong>
              I was part of the small team that delivered the largest rework of
              it in the company&apos;s history.
            </strong>
          </p>
        </div>
      </Section>

      <Section label="The problem">
        <div className="prose">
          <p>
            The original model encoded assumptions that had stopped being true.
            Each new way of selling — different pricing shapes, different
            structures, different rules about what could be changed and by whom
            — had been accommodated as a special case, because remodelling the
            centre of the platform is the kind of work that is always easy to
            defer for one more quarter.
          </p>
          <p>
            The cost showed up as a widening gap between how long a change
            looked and how long it took. A feature that should have been a
            fortnight became a month, because most of the work was establishing
            which of the existing special cases it would break.
          </p>
          <p>
            The constraint made it considerably harder:{" "}
            <strong>quoting could not stop</strong>. It is how the company earns
            money, so there was no window in which to take it down, migrate and
            bring it back. Worse, quotes are long-lived and commercially
            binding. A quote sent last week has to keep meaning exactly what it
            meant when it was sent, whatever we did to the schema underneath it
            this week.
          </p>
        </div>
      </Section>

      <Section label="Decisions">
        <div className="space-y-10">
          <Decision title="Remodel the domain rather than extend it again">
            <p>
              The team&apos;s starting position was that another special case
              was not a fix. The new model had to express, as first-class
              concepts, the things the business had learned it actually sold —
              so that the next commercial variation was configuration rather
              than a schema migration and three weeks of regression testing.
            </p>
            <p>
              <strong>What it cost:</strong> considerably more up-front design
              than patching, and the political work of getting agreement that
              the centre of the platform was worth stopping to fix. That
              conversation is most of the reason this kind of work does not get
              done.
            </p>
          </Decision>

          <Decision title="A sent quote is immutable">
            <p>
              The single most useful rule we settled on. A quote that has been
              sent to a customer is a record of what was offered, and nothing
              downstream may edit it — revisions create a new version rather
              than mutating the old one.
            </p>
            <p>
              That is the property that makes the migration survivable. If old
              quotes cannot change, they cannot be broken by a change to how new
              quotes are built, and they can go on being read by the old code
              path for as long as they need to.
            </p>
            <p>
              <strong>What it cost:</strong> more rows, more versions, and a
              user interface that has to be clear about which version anyone is
              looking at. Worth it several times over the first time a customer
              disputed what they had been sent.
            </p>
          </Decision>

          <Decision title="Migrate incrementally behind flags, never in a big bang">
            <p>
              The new path was built alongside the old one and routed to
              deliberately, starting with the narrowest, least commercially
              sensitive slice and widening as it held. Both paths ran together
              for as long as it took, which meant every step had a rollback that
              was a configuration change rather than a deploy and a prayer.
            </p>
            <p>
              <strong>What it cost:</strong> a long stretch of maintaining two
              implementations of the most important thing in the system, which
              is genuinely unpleasant and requires the discipline to actually
              delete the old one at the end rather than declaring victory and
              moving on. It is still enormously cheaper than a cutover weekend
              that goes wrong on the business&apos;s only revenue path.
            </p>
          </Decision>
        </div>
      </Section>

      <Section label="What shipped">
        <div className="prose">
          <ul>
            <li>
              A remodelled quoting domain that expressed the commercial reality
              of the business rather than the version of it that existed when
              the original was written
            </li>
            <li>
              Versioned, immutable quotes, so a document that had been sent
              could never be retroactively changed
            </li>
            <li>
              A migration executed without downtime on live quoting, routed
              incrementally and reversible at every step
            </li>
            <li>
              A meaningfully faster path for commercial change afterwards — the
              point of the exercise
            </li>
          </ul>
        </div>
      </Section>

      <Section label="What I would change">
        <div className="prose">
          <p>
            We were better at building the new path than at deleting the old
            one. Once the new implementation is carrying the traffic, the
            remaining work is unglamorous and competes with whatever is next on
            the roadmap, and a dual-running system that stays dual-running has
            quietly cost you the thing you did it for. I would put the removal
            in the plan as a dated piece of work from the start, rather than
            trusting it to be picked up once the interesting part is over.
          </p>
          <p>
            I would also invest earlier in comparing the two paths
            automatically. Running both and diffing the output on real traffic
            turns &quot;we think it is equivalent&quot; into evidence, and it
            finds the edge cases that nobody would think to write a test for —
            which, on a system that has been accumulating special cases for
            years, is most of them.
          </p>
        </div>
      </Section>

      <WorkFooterNav current={entry.slug} />
    </article>
  );
}
