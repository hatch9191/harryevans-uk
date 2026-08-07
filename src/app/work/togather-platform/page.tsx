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

const entry = getWork("togather-platform")!;

/* Empty while held back, so the 404 does not describe the page it is hiding. */
export const metadata: Metadata = FEATURES.WORK
  ? {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: workPath(entry.slug) },
    }
  : {};

export default function TogatherPlatformCaseStudy() {
  if (!FEATURES.WORK) {
    notFound();
  }

  return (
    <article>
      <WorkHeader entry={entry} />

      <Section label="Context">
        <div className="prose">
          <p>
            Togather is a venture-backed events and catering marketplace.
            Suppliers list what they do, customers book them, and the platform
            handles everything in between. That model works well for someone
            organising a wedding or a birthday.
          </p>
          <p>
            It works considerably less well for a company booking catering for
            forty offices, or an organiser running a public food festival with
            thirty traders. Those customers buy differently — procurement,
            multiple stakeholders, negotiated terms, repeat business — and the
            relationship is managed by a sales team who live in Salesforce, not
            in the marketplace.
          </p>
          <p>
            <strong>
              I headed up the engineering solution for a new application built
              specifically for that side of the business
            </strong>{" "}
            — greenfield, and integrated deeply enough with Salesforce that the
            sales team never had to leave it.
          </p>
        </div>
      </Section>

      <Section label="The problem">
        <div className="prose">
          <p>
            Two systems each held half the truth. Salesforce owned the
            commercial relationship: the account, the opportunity, the
            negotiated terms, the history. The marketplace owned supplier
            reality: who exists, what they offer, where they operate, whether
            they are still active and still any good.
          </p>
          <p>
            A corporate deal needs both at once, and until then the join was
            being done by people. Someone would check the marketplace, then
            update Salesforce, and the gap between those two actions was where
            the errors lived — quoting a supplier who had gone inactive, or
            missing one who had just joined.
          </p>
          <p>
            The obvious answer, letting the new application query Salesforce
            whenever it needed something, fails on the two constraints that
            actually applied: Salesforce API limits are a hard ceiling you share
            with everyone else in the business, and a sales tool being slow is
            annoying while a customer-facing page being slow costs money.
          </p>
        </div>
      </Section>

      <Section label="Decisions">
        <div className="space-y-10">
          <Decision title="A separate application, not a mode inside the marketplace">
            <p>
              The cheap option was a flag on the existing marketplace —
              corporate customers see different screens. It is cheap for about
              two quarters, and then every query in the system has an{" "}
              <code>if corporate</code> in it, every page has two layouts, and
              nobody can change anything without reasoning about both audiences
              at once.
            </p>
            <p>
              A separate application meant the corporate side could model its
              own domain honestly, and the consumer marketplace stayed simple.
            </p>
            <p>
              <strong>What it cost:</strong> two front ends, two deploys, and a
              real integration problem instead of a fake one. That integration
              problem is the rest of this page.
            </p>
          </Decision>

          <Decision title="Consume platform events rather than poll">
            <p>
              Salesforce platform events let you subscribe to changes rather
              than ask for them. Supplier activity on the core marketplace
              raised events; the new application consumed them and kept its own
              projection of the state it needed, locally and fast.
            </p>
            <p>
              This inverts the dependency in the useful direction. The
              application reads its own database to render a page and never
              blocks on someone else&apos;s API. Salesforce stays the system of
              record for the commercial relationship; the marketplace stays the
              system of record for supplier activity; neither has to know the
              new application exists.
            </p>
            <p>
              <strong>What it cost:</strong> the projection can be stale, and
              consumers have to be idempotent because delivery is at-least-once
              and ordering is not free. Both are solvable. What is not solvable
              is a synchronous dependency on a system whose rate limits you do
              not control.
            </p>
          </Decision>

          <Decision title="Making eventual consistency visible rather than hiding it">
            <p>
              The failure mode of a projection is that it is quietly wrong and
              somebody makes a commitment on the strength of it. So the staleness
              was surfaced rather than papered over — the application knew when
              it had last heard from the source and said so, and the handful of
              actions where being wrong was expensive read through to the source
              of truth at the point of commitment rather than trusting the
              cached view.
            </p>
            <p>
              <strong>What it cost:</strong> a little more product surface and a
              conversation about it with every stakeholder. Cheap, against the
              alternative of a sales team quietly losing trust in the tool.
            </p>
          </Decision>
        </div>
      </Section>

      <Section label="What shipped">
        <div className="prose">
          <ul>
            <li>
              A new customer-facing application for the corporate and public
              events side of the business, built from scratch
            </li>
            <li>
              A Salesforce integration consuming platform events, keeping the
              application in sync with supplier activity on the core marketplace
            </li>
            <li>
              An event-driven service layer in Node and TypeScript over
              PostgreSQL, alongside the existing Kafka and SQS estate
            </li>
            <li>
              Internal npm libraries and template repositories that standardised
              how squads across the department scaffolded, tested and deployed
              services
            </li>
          </ul>
          <p>
            The libraries and templates were a side effect that outlasted the
            project. Once one team has solved logging, configuration, health
            checks and a deploy pipeline properly, the expensive thing is every
            other team solving it again slightly differently. Packaging it meant
            a new service started from a working baseline rather than from a
            blank repository and a good intention.
          </p>
        </div>
      </Section>

      <Section label="What I would change">
        <div className="prose">
          <p>
            The event consumers were the right shape and the thinnest part of
            the build. Replay in particular deserved more up-front investment
            than it got: when a projection drifts — and it does, usually because
            of a deploy that dropped events for four minutes — you want
            rebuilding it from scratch to be a routine, boring operation rather
            than something you design under pressure on the day. Building the
            rebuild path first also makes the consumers easier to test, because
            you get a deterministic way to put the system in a known state.
          </p>
          <p>
            I would also have pushed harder, earlier, on which system owned
            which field. Most of the genuinely painful integration bugs were not
            technical; they were two systems both believing they were
            authoritative about the same piece of data. That is a decision to
            make on a whiteboard in week one, not to discover in a bug ticket in
            month four.
          </p>
        </div>
      </Section>

      <WorkFooterNav current={entry.slug} />
    </article>
  );
}
