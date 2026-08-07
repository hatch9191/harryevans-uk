import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Decision,
  Figure,
  Section,
  WideSection,
  WorkFooterNav,
  WorkHeader,
} from "@/components/case-study";
import { MimArchitecture } from "@/components/mim-architecture";
import { FEATURES, LINKS } from "@/lib/site";
import { getWork, workPath } from "@/lib/work";

const entry = getWork("mim")!;

/* Empty while held back, so the 404 does not describe the page it is hiding. */
export const metadata: Metadata = FEATURES.WORK
  ? {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: workPath(entry.slug) },
    }
  : {};

export default function MimCaseStudy() {
  if (!FEATURES.WORK) {
    notFound();
  }

  return (
    <article>
      <WorkHeader entry={entry} />

      <Section label="Context">
        <div className="prose">
          <p>
            <a href={LINKS.MIM} target="_blank" rel="noreferrer">
              MiM
            </a>{" "}
            is a two-sided marketplace where fashion stylists sell styling
            services and their clients book, pay for and receive them. A client
            buys a service, works through a sequence of stages the stylist
            defined — a brief to fill in, a video call to attend, a set of
            options to choose from — and receives what they paid for at the end.
            Money moves on completion. There is an internal operations portal
            behind it for reviewing applications, handling disputes and
            releasing payouts.
          </p>
          <p>
            <strong>I am the only engineer.</strong> Everything below — the data
            model, the API, the payments, the infrastructure, the deploy
            pipeline and both front ends — is mine, and so is every decision
            that turned out badly.
          </p>
        </div>
      </Section>

      <Section label="The problem">
        <div className="prose">
          <p>
            The hard part of this product is not the interface. It is that a
            single purchase kicks off a long-running, multi-party process that
            can be interrupted at any point, and money is held in the middle of
            it.
          </p>
          <p>
            A client pays. The payment confirms — possibly twice, possibly out
            of order, possibly through a webhook that arrives before the browser
            has finished redirecting. The first stage of the service has to open
            at that exact moment and not a second time. A video call gets booked
            through a third party, then rescheduled, then cancelled, and the
            request has to follow it. The stylist publishes their work. Only
            then, days later, does a scheduled job decide the money can be
            released.
          </p>
          <p>
            That is a state machine with real money attached, driven by events
            from systems I do not control. It also had to be built by one person
            quickly enough to matter, and structured so a React Native app could
            be added later without rewriting the business logic. Those two
            requirements pull hard against each other, and most of the
            interesting decisions came out of that tension.
          </p>
        </div>
      </Section>

      <WideSection label="Architecture">
        <Figure caption="Two Cloud Run services over one database. Everything either side of them is somebody else's problem.">
          <MimArchitecture />
        </Figure>

        <div className="prose mt-10">
          <p>
            Four deployed applications and nineteen packages in a Turborepo —
            seventeen of them shared code, two tooling config. The split that
            matters is not app versus package, it is{" "}
            <strong>synchronous versus everything else</strong>. The GraphQL API
            serves user-initiated requests and nothing else. Every inbound
            webhook, every cron job and every queued task lands on a separate
            Hono service, so a Stripe retry storm cannot take down page loads,
            and a slow page load cannot make me miss a webhook.
          </p>
        </div>
      </WideSection>

      <Section label="Decisions">
        <div className="space-y-10">
          <Decision title="GraphQL over REST">
            <p>
              The client screens are aggregation-heavy: a request page needs the
              service definition, the stage sequence and each stage&apos;s
              state, the deliverables and their publish state, the payment, the
              counterparty and the comment threads. In REST that is either six
              round trips or six bespoke endpoints that exist to serve one
              screen and rot the moment it changes.
            </p>
            <p>
              I used GraphQL Yoga with a schema split across sixteen domain
              modules, and{" "}
              <a
                href="https://the-guild.dev/graphql/shield"
                target="_blank"
                rel="noreferrer"
              >
                graphql-shield
              </a>{" "}
              for field-level authorisation, so &quot;can this user see this
              field&quot; is declared next to the schema rather than
              re-implemented in every resolver. Codegen produces typed React
              Query hooks for the web app from the same schema, which means a
              breaking schema change fails the build rather than production.
            </p>
            <p>
              <strong>What it cost:</strong> no free HTTP caching, a real
              N+1 risk I currently manage by hand rather than with DataLoader,
              and a heavier setup than a handful of REST routes would have
              needed. For a single-screen product it would have been the wrong
              call. For this one the round-trip savings paid for it inside a
              month.
            </p>
          </Decision>

          <Decision title="A platform-agnostic core, enforced by the linter">
            <p>
              Mobile is coming, and &quot;we&apos;ll extract the shared logic
              later&quot; is the promise every monorepo breaks. So the
              boundaries went in first: domain logic, design tokens, types, the
              API layer, view-model hooks and generic utilities all live in
              packages that are not allowed to know a browser exists.
            </p>
            <p>
              Discipline is not a mechanism, so I wrote one. A shared ESLint
              config applied to those seven packages forbids the imports that
              would quietly couple them to the web:
            </p>
            <pre>
              <code>{`// packages/eslint-config/shared.mjs
"no-restricted-imports": ["error", {
  patterns: [
    "next/*", "react-dom", "react-dom/*",
    "@chakra-ui/*", "@mui/*",
    "@workos-inc/authkit-nextjs", "@workos-inc/node",
  ],
}],
"no-restricted-globals": ["error", "window", "document"],`}</code>
            </pre>
            <p>
              Anything genuinely platform-specific — auth, storage, navigation,
              analytics — goes behind an adapter interface that each app
              implements. The shared code calls{" "}
              <code>usePlatform().auth.getToken()</code> and does not care
              whether that reads a cookie or the iOS keychain.
            </p>
            <p>
              <strong>What it cost:</strong> real friction, several times a
              week. Writing an adapter for a capability you need once is
              annoying, and there were days it felt like paying for a mobile app
              that does not exist yet. I would still do it: the rule catches the
              violation at the moment someone is tempted, which is the only
              moment the cost is low.
            </p>
          </Decision>

          <Decision title="One fulfilment path, called from two directions">
            <p>
              When a card payment succeeds, MiM learns about it twice: the
              browser confirms the payment intent and calls a GraphQL mutation,
              and Stripe independently sends{" "}
              <code>payment_intent.succeeded</code> to the webhook service.
              Either can arrive first. Both can arrive twice. Stripe redelivers
              on any non-2xx, and it does not promise ordering.
            </p>
            <p>
              The naive version of this reads the payment, checks the state, and
              writes the new one. That is a read-modify-write across a network
              boundary, which is a race with money in it. Instead there is a
              single shared function that both callers use, and the state check
              lives inside the write:
            </p>
            <pre>
              <code>{`const updated = await tx.payment.updateMany({
  where: { id: payment.id, state: PaymentState.PENDING },
  data:  { state: PaymentState.HELD, paidAt: new Date(), stripeProcessingFee },
});

if (updated.count === 0) {
  return ALREADY_PROCESSED;
}`}</code>
            </pre>
            <p>
              The <code>where</code> clause is the lock. Whichever caller gets
              there first flips <code>PENDING</code> to <code>HELD</code>;
              everyone else updates zero rows, returns{" "}
              <code>ALREADY_PROCESSED</code> and — critically — still answers
              200, so Stripe stops retrying. Inside the same transaction the
              request moves to <code>ACTIVE</code>, and immediately after it the
              first stage opens into the right state for its type: a video call
              stage becomes <code>BOOKING_AVAILABLE</code>, everything else
              becomes <code>IN_PROGRESS</code>.
            </p>
            <p>
              <strong>What it cost:</strong> the mutation path is now slightly
              redundant — the webhook alone would eventually do the job. I kept
              it because &quot;eventually&quot; is up to two seconds of a user
              staring at a spinner after paying, and that is the worst possible
              moment to look broken.
            </p>
          </Decision>

          <Decision title="Buying scheduling instead of building it">
            <p>
              Calendar availability is a genuinely hard problem — timezones,
              recurrence, buffers, two-way sync with calendars the user already
              lives in — and none of it is what makes MiM worth using. I
              integrated Cal.com Platform: each stylist gets a managed user
              provisioned through the API, and their bookings flow back as
              HMAC-signed webhooks that move the corresponding stage between{" "}
              <code>BOOKING_AVAILABLE</code>, <code>BOOKED</code> and back again
              on cancellation.
            </p>
            <p>
              <strong>What it cost:</strong> a vendor in the critical path of
              the product&apos;s second-most-important flow, and an OAuth token
              lifecycle to own — refresh tokens rotate on every use, so the
              stored token is only ever valid once. See below for where that
              still has a sharp edge.
            </p>
          </Decision>

          <Decision title="Terraform for everything, and CD owns the images">
            <p>
              All of GCP is in Terraform: three Cloud Run services, a Cloud SQL
              instance, a migration job, Secret Manager, two Cloud Tasks queues,
              five Cloud Scheduler jobs, the Artifact Registry repository and
              the IAM to bind them. GitHub Actions authenticates through
              Workload Identity Federation with a trust policy pinned to the
              repository <em>and</em> the branch, so there is no service account
              key anywhere.
            </p>
            <p>
              The one wrinkle worth stealing: Terraform and CD both want to own
              a Cloud Run service, and they will fight over the container image
              forever. The fix is one line —
            </p>
            <pre>
              <code>{`lifecycle {
  ignore_changes = [template[0].containers[0].image]
}`}</code>
            </pre>
            <p>
              Terraform owns the shape of the infrastructure, the pipeline owns
              what is running on it, and neither reverts the other. Deploys are
              ordered rather than parallel — API first, then migrations, then
              the background service, then the web app — because the reverse
              order ships a front end that calls a schema which does not exist
              yet.
            </p>
          </Decision>

          <Decision title="One log line per request, not fifty">
            <p>
              With one engineer, debugging time is the scarcest resource in the
              company. Scattered <code>logger.info</code> calls give you a
              haystack; a single wide event per request gives you something you
              can query. Each request builds one structured event through an{" "}
              <code>AsyncLocalStorage</code> context, so any code path can
              enrich it without the context being threaded through every
              function signature, and it is emitted once at the end with tail
              sampling — everything slow or failed is kept, the rest is sampled.
            </p>
            <p>
              <strong>What it cost:</strong> almost nothing, and it is the
              single highest-leverage thing on this list. &quot;Show me every
              request where the payment state changed and the response took over
              a second&quot; is one query rather than an afternoon.
            </p>
          </Decision>
        </div>
      </Section>

      <Section label="What shipped">
        <div className="prose">
          <ul>
            <li>
              A Next.js App Router web app serving stylists, clients and the
              internal operations portal, plus a separate marketing site
            </li>
            <li>
              A GraphQL API over forty-seven Prisma models covering services,
              staged journeys, deliverables, requests, reviews and payment state
            </li>
            <li>
              Stripe Connect payments end to end: onboarding, held funds,
              refunds, dispute handling and a nightly payout job
            </li>
            <li>
              Cal.com Platform scheduling with managed users, rotating OAuth
              tokens and signed booking webhooks
            </li>
            <li>
              A Hono background service handling signed webhook ingestion, five
              scheduled jobs and two Cloud Tasks queues for asynchronous email
            </li>
            <li>
              Terraform-provisioned GCP and a GitHub Actions pipeline that goes
              from merge to production with no manual steps
            </li>
          </ul>
        </div>
      </Section>

      <Section label="What I would change">
        <div className="prose">
          <p>
            None of this is hypothetical. These are the things I know are wrong
            and have chosen, for now, to live with.
          </p>

          <h3>Refresh token rotation has no concurrency control</h3>
          <p>
            Cal.com rotates the refresh token on every use, and the new one is
            written back with a plain update. Two requests refreshing at the
            same moment both spend the same token; the loser invalidates the
            winner and that stylist&apos;s calendar disconnects. It has not
            happened, because the traffic is not there. The fix is single-flight
            — take a row lock on the connection, or move the refresh behind one
            serialised path — and it is the first thing I would do before
            traffic grows.
          </p>

          <h3>Idempotency is per-transition, not per-event</h3>
          <p>
            The conditional update makes{" "}
            <code>PENDING → HELD</code> exactly-once, which is the transition
            that matters. It does not deduplicate by Stripe event ID, so a
            sufficiently late replay of an old event is protected only by the
            state it finds. A processed-events table keyed on the event ID is
            the standard answer and I would add it before the state machine
            grows another branch.
          </p>

          <h3>Notifications are sent after the commit, not from an outbox</h3>
          <p>
            Fulfilment commits, then notifications go out. A crash in between
            loses a notification silently — the failure is caught and logged so
            it cannot roll back a successful payment, which is the right
            priority, but it means delivery is best-effort. The correct shape is
            a transactional outbox: write the intent in the same transaction,
            drain it separately.
          </p>

          <h3>Where it breaks at 100×</h3>
          <p>
            Three places, in the order they would go:
          </p>
          <ol>
            <li>
              <strong>Webhook handlers do their work inline.</strong> They
              validate, write and notify before answering Stripe. At volume, a
              slow downstream call turns into a timeout, which turns into a
              retry, which turns into more load. Acknowledge first, enqueue,
              process off the queue.
            </li>
            <li>
              <strong>One database instance, no read replica.</strong> Browse
              traffic is read-heavy and completely uninteresting; payment writes
              are neither. They currently share an instance, and browse would be
              the first thing to make payments slow.
            </li>
            <li>
              <strong>N+1 queries, managed by hand.</strong> Field-level
              authorisation and nested resolvers are exactly the conditions
              N+1 thrives in. DataLoader is a known, bounded piece of work that
              I have deliberately not done yet, because at current volume it
              would be optimising a query nobody is waiting on.
            </li>
          </ol>
        </div>
      </Section>

      <WorkFooterNav current={entry.slug} />
    </article>
  );
}
