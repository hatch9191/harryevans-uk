/**
 * Checks WCAG contrast for the palette tokens in src/app/globals.css.
 *
 * The eyebrow labels are 11px, which puts them under the 4.5:1 AA floor for
 * normal text — easy to break by nudging a token, so it is worth being able
 * to re-run this.
 *
 *   node scripts/check-contrast.mjs
 */

const oklchToSrgb = (L, C, H) => {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];

  return lin.map((c) => {
    const encoded = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(encoded * 255)));
  });
};

const hexToSrgb = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
};

/** Palette tokens are authored in oklch; the OG and banner images in hex. */
const toSrgb = (colour) =>
  typeof colour === "string" ? hexToSrgb(colour) : oklchToSrgb(...colour);

const luminance = ([r, g, b]) => {
  const toLinear = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  );
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const PAPER = [0.978, 0.008, 85];
const PAPER_RAISED = [0.955, 0.011, 83];

const CHECKS = [
  { name: "ink on paper", fg: [0.185, 0.011, 55], bg: PAPER, px: 17, min: 4.5 },
  {
    name: "ink-muted on paper",
    fg: [0.455, 0.014, 60],
    bg: PAPER,
    px: 17,
    min: 4.5,
  },
  {
    name: "ink-faint on paper (eyebrow, 11px)",
    fg: [0.525, 0.014, 68],
    bg: PAPER,
    px: 11,
    min: 4.5,
  },
  {
    name: "ink-faint on paper-raised",
    fg: [0.525, 0.014, 68],
    bg: PAPER_RAISED,
    px: 11,
    min: 4.5,
  },
  { name: "brand on paper", fg: [0.425, 0.125, 28], bg: PAPER, px: 17, min: 4.5 },
  {
    name: "paper on ink (CV button)",
    fg: PAPER,
    bg: [0.185, 0.011, 55],
    px: 11,
    min: 4.5,
  },
  {
    name: "paper on brand (CV button hover)",
    fg: PAPER,
    bg: [0.425, 0.125, 28],
    px: 11,
    min: 4.5,
  },
  /*
    The LinkedIn banner inverts the palette onto the ink ground, so the oxblood
    and the muted mono line both need lightening to stay legible.
  */
  { name: "banner paper on ink", fg: "#faf7f0", bg: "#211d18", px: 76, min: 4.5 },
  {
    name: "banner accent on ink",
    fg: "#c96a5c",
    bg: "#211d18",
    px: 76,
    min: 4.5,
  },
  {
    name: "banner mono on ink",
    fg: "#a3968a",
    bg: "#211d18",
    px: 25,
    min: 4.5,
  },
];

let failed = false;

for (const check of CHECKS) {
  const fg = toSrgb(check.fg);
  const bg = toSrgb(check.bg);
  const ratio = contrast(fg, bg);
  const pass = ratio >= check.min;
  if (!pass) {
    failed = true;
  }
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${ratio.toFixed(2)}:1  (min ${check.min})  ${check.name}  rgb(${fg}) on rgb(${bg})`,
  );
}

process.exit(failed ? 1 : 0);
