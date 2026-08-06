import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE, STACK } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const loadFont = (file: string) =>
  readFile(join(process.cwd(), "src/assets/fonts", file));

export default async function OpenGraphImage() {
  const [serif, serifItalic, mono] = await Promise.all([
    loadFont("InstrumentSerif-Regular.ttf"),
    loadFont("InstrumentSerif-Italic.ttf"),
    loadFont("IBMPlexMono-Regular.ttf"),
  ]);

  const paper = "#faf7f0";
  const ink = "#211d18";
  const inkFaint = "#96897b";
  const brand = "#7d2f27";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
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
            color: inkFaint,
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
            color: ink,
          }}
        >
          <span>I take products from&nbsp;</span>
          <span style={{ color: brand, fontStyle: "italic" }}>
            nothing to production
          </span>
          <span>.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid #ddd3c4`,
            paddingTop: 28,
            fontFamily: "mono",
            fontSize: 22,
            color: ink,
          }}
        >
          <div style={{ display: "flex" }}>{STACK.slice(0, 6).join("  ·  ")}</div>
          <div style={{ display: "flex", color: inkFaint }}>harryevans.uk</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "serif", data: serif, style: "normal", weight: 400 },
        { name: "serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
