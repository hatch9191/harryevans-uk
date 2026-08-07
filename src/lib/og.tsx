import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

/**
 * Shared OG card. Every route renders the same three-band layout — eyebrow,
 * display line, rule and footer — so a link to any page on the site is
 * recognisably from the same site in a Slack unfurl.
 *
 * Hex rather than the oklch custom properties because Satori resolves neither.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLOURS = {
  paper: "#faf7f0",
  paperRaised: "#f3eee3",
  ink: "#211d18",
  inkFaint: "#8a7d6f",
  rule: "#ddd3c4",
  brand: "#7d2f27",
} as const;

const loadFont = (file: string) =>
  readFile(join(process.cwd(), "src/assets/fonts", file));

export const loadOgFonts = async () => {
  const [serif, serifItalic, mono] = await Promise.all([
    loadFont("InstrumentSerif-Regular.ttf"),
    loadFont("InstrumentSerif-Italic.ttf"),
    loadFont("IBMPlexMono-Regular.ttf"),
  ]);

  return [
    {
      name: "serif",
      data: serif,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "serif",
      data: serifItalic,
      style: "italic" as const,
      weight: 400 as const,
    },
    {
      name: "mono",
      data: mono,
      style: "normal" as const,
      weight: 400 as const,
    },
  ];
};

/**
 * A held-back route 404s, so its own title must not survive in the card or in
 * the `og:image:alt` Next derives from the colocated route. Both fall back to
 * the site identity until the section is published.
 */
export const OG_HELD_BACK_ALT = `${SITE.name} — ${SITE.role}`;

export function renderHeldBackOgCard() {
  return renderOgCard({
    eyebrow: SITE.role,
    title: SITE.name,
    footer: "harryevans.uk",
  });
}

type OgCardOptions = {
  eyebrow: string;
  title: string;
  footer: string;
  /** Drops the display size for longer titles so nothing overflows. */
  titleSize?: number;
};

export async function renderOgCard({
  eyebrow,
  title,
  footer,
  titleSize = 78,
}: OgCardOptions) {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: OG_COLOURS.paper,
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "mono",
          fontSize: 21,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: OG_COLOURS.inkFaint,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "serif",
          fontSize: titleSize,
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          color: OG_COLOURS.ink,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${OG_COLOURS.rule}`,
          paddingTop: 28,
          fontFamily: "mono",
          fontSize: 22,
          color: OG_COLOURS.ink,
        }}
      >
        <div style={{ display: "flex" }}>{footer}</div>
        <div style={{ display: "flex", color: OG_COLOURS.inkFaint }}>
          harryevans.uk
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
