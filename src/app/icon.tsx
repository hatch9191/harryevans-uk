import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = await readFile(
    join(process.cwd(), "src/assets/fonts", "InstrumentSerif-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#211d18",
          color: "#faf7f0",
          fontFamily: "serif",
          fontSize: 46,
          paddingBottom: 4,
        }}
      >
        H
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "serif", data: serif, style: "normal", weight: 400 }],
    },
  );
}
