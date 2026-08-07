import { ImageResponse } from "next/og";

import { loadOgFonts, OG_COLOURS, OG_SIZE } from "@/lib/og";
import { SITE, STACK } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * Bespoke rather than renderOgCard — the home card is the one that carries the
 * two-tone positioning line, which is the whole point of it.
 */
export default async function OpenGraphImage() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
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
          {SITE.name} — London
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "serif",
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: OG_COLOURS.ink,
          }}
        >
          <span>I take products from&nbsp;</span>
          <span style={{ color: OG_COLOURS.brand, fontStyle: "italic" }}>
            nothing to production
          </span>
          <span>.</span>
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
          <div style={{ display: "flex" }}>{STACK.slice(0, 6).join("  ·  ")}</div>
          <div style={{ display: "flex", color: OG_COLOURS.inkFaint }}>
            harryevans.uk
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
