import {
  OG_HELD_BACK_ALT,
  OG_SIZE,
  renderHeldBackOgCard,
  renderOgCard,
} from "@/lib/og";
import { FEATURES } from "@/lib/site";

export const alt = FEATURES.WRITING
  ? "Writing — Harry Evans"
  : OG_HELD_BACK_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  if (!FEATURES.WRITING) {
    return renderHeldBackOgCard();
  }

  return renderOgCard({
    eyebrow: "Writing",
    title: "Things I worked out the hard way",
    footer: "Payments  ·  Monorepos  ·  OAuth",
  });
}
