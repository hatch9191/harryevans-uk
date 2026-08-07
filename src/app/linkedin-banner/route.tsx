import { ImageResponse } from "next/og";

import { loadOgFonts, OG_COLOURS } from "@/lib/og";

/**
 * The LinkedIn banner, generated rather than designed in Canva so it stays in
 * lockstep with the site. Visit /linkedin-banner and save the PNG.
 *
 * Inverted palette — ink ground, paper type — because a paper-coloured banner
 * disappears into LinkedIn's white page chrome.
 *
 * Layout constraints LinkedIn imposes:
 *   - 1584 × 396, and it renders small
 *   - the profile photo covers roughly the bottom-left 250px on desktop
 *   - mobile crops the sides, so anything load-bearing sits in the centre third
 *
 * Deliberately carries no availability. The banner is public and permanent,
 * and investors look me up during MiM's raise.
 */
const SIZE = { width: 1584, height: 396 };

export async function GET() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: OG_COLOURS.ink,
          /* Lifted off centre to clear the profile photo bottom-left. */
          paddingBottom: 34,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 76,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: OG_COLOURS.paper,
          }}
        >
          <span>I take products from&nbsp;</span>
          <span style={{ color: "#c96a5c", fontStyle: "italic" }}>
            nothing to production
          </span>
          <span>.</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "mono",
            fontSize: 25,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a3968a",
          }}
        >
          TypeScript · Next.js · Node · GraphQL · PostgreSQL · Terraform · GCP
        </div>
      </div>
    ),
    { ...SIZE, fonts },
  );
}
