import {
  OG_HELD_BACK_ALT,
  OG_SIZE,
  renderHeldBackOgCard,
  renderOgCard,
} from "@/lib/og";
import { FEATURES } from "@/lib/site";
import { getWork } from "@/lib/work";

const entry = getWork("togather-platform")!;

export const alt = FEATURES.WORK
  ? `${entry.title} — ${entry.subtitle}`
  : OG_HELD_BACK_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  if (!FEATURES.WORK) {
    return renderHeldBackOgCard();
  }

  return renderOgCard({
    eyebrow: `Case study — ${entry.period}`,
    title: entry.subtitle,
    footer: entry.stack.join("  ·  "),
    titleSize: 66,
  });
}
