/**
 * Hand-drawn rather than generated, so it uses the site's own palette and
 * type rather than arriving as a screenshot of a Mermaid render.
 *
 * Scrolls horizontally on small screens instead of scaling down — a diagram
 * shrunk to 320px wide is decoration, not information.
 */

const BOX_FILL = "var(--paper)";
const RULE = "var(--rule-strong)";
const INK = "var(--ink)";
const FAINT = "var(--ink-faint)";
const BRAND = "var(--brand)";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accent?: boolean;
};

function Box({ x, y, w, h, title, lines = [], accent }: BoxProps) {
  const cx = x + w / 2;
  const top = lines.length > 0 ? y + h / 2 - 6 * lines.length : y + h / 2 + 5;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={BOX_FILL}
        stroke={accent ? BRAND : RULE}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={cx}
        y={top}
        textAnchor="middle"
        fill={INK}
        fontFamily="var(--font-sans)"
        fontSize={15}
        fontWeight={600}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={top + 20 + i * 15}
          textAnchor="middle"
          fill={FAINT}
          fontFamily="var(--font-mono)"
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Label sitting on a connector, with the ground knocked out behind it. */
function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect
        x={x - text.length * 3.1 - 5}
        y={y - 8}
        width={text.length * 6.2 + 10}
        height={16}
        fill="var(--paper-raised)"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={FAINT}
        fontFamily="var(--font-mono)"
        fontSize={10.5}
      >
        {text}
      </text>
    </g>
  );
}

export function MimArchitecture() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 840 470"
        role="img"
        aria-labelledby="arch-title arch-desc"
        className="h-auto w-full min-w-[760px]"
      >
        <title id="arch-title">MiM platform architecture</title>
        <desc id="arch-desc">
          The Next.js web app and marketing site call a GraphQL Yoga API on
          Cloud Run. A separate Hono service handles inbound webhooks from
          Stripe and Cal.com, cron jobs from Cloud Scheduler and queued email
          from Cloud Tasks. Both services read and write the same Cloud SQL
          PostgreSQL database through Prisma, and both talk to Stripe Connect,
          Cal.com Platform and Customer.io.
        </desc>

        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={RULE} />
          </marker>
        </defs>

        <g
          stroke={RULE}
          strokeWidth={1}
          fill="none"
          markerEnd="url(#arrow)"
          strokeLinejoin="round"
        >
          {/* web-app and marketing into the API */}
          <path d="M 200 82 H 300" />
          <path d="M 200 202 H 240 V 120 H 300" />

          {/* scheduler and queues into the background service */}
          <path d="M 200 352 H 240 V 270 H 300" />

          {/* both services persist through the same Prisma client */}
          <path d="M 300 140 H 282 V 398 H 300" />
          <path d="M 415 306 V 356" />

          {/* shared bus out to the third parties */}
          <path d="M 530 95 H 570" markerEnd="none" />
          <path d="M 530 251 H 570" markerEnd="none" />
          <path d="M 570 72 V 251" markerEnd="none" />
          <path d="M 570 72 H 630" markerStart="url(#arrow)" />
          <path d="M 570 156 H 630" markerStart="url(#arrow)" />
          <path d="M 570 240 H 630" />
        </g>

        <EdgeLabel x={250} y={82} text="GraphQL · JWT" />
        <EdgeLabel x={282} y={330} text="Prisma" />
        <EdgeLabel x={415} y={331} text="Prisma" />
        <EdgeLabel x={600} y={114} text="REST out" />
        <EdgeLabel x={600} y={198} text="signed webhooks in" />

        <Box
          x={0}
          y={40}
          w={200}
          h={84}
          title="web-app"
          lines={["Next.js App Router", "fan · creator · admin"]}
        />
        <Box x={0} y={160} w={200} h={84} title="marketing" lines={["Next.js"]} />
        <Box
          x={0}
          y={310}
          w={200}
          h={84}
          title="Cloud Scheduler · Tasks"
          lines={["5 cron jobs", "2 queues"]}
        />

        <Box
          x={300}
          y={40}
          w={230}
          h={110}
          title="graphql"
          lines={["GraphQL Yoga · Cloud Run", "16 modules · graphql-shield"]}
          accent
        />
        <Box
          x={300}
          y={196}
          w={230}
          h={110}
          title="webhooks"
          lines={["Hono · Cloud Run", "/webhooks · /cron · /internal"]}
          accent
        />
        <Box
          x={300}
          y={356}
          w={230}
          h={84}
          title="Cloud SQL"
          lines={["PostgreSQL · 47 models"]}
        />

        <Box x={630} y={40} w={200} h={64} title="Stripe Connect" />
        <Box x={630} y={124} w={200} h={64} title="Cal.com Platform" />
        <Box x={630} y={208} w={200} h={64} title="Customer.io" />
      </svg>
    </div>
  );
}
