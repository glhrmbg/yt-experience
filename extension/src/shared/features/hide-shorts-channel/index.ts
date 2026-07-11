import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// Channel page "Shorts" tab. Verified against live DOM: yt-tab-shape has no
// href at all, only tab-title (localized text, no language-independent
// attribute available here). tp-yt-paper-tab kept as a fallback for older
// DOM variants.
const CSS = `
tp-yt-paper-tab:has(a[href*="/shorts"]),
yt-tab-shape[tab-title="Shorts"] {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-shorts-channel", CSS);

export const hideShortsChannel: Feature = {
  id: "hide-shorts-channel",
  group: "Hide Shorts",
  name: "Channel tabs",
  description: "Hides the Shorts tab on channel pages.",
  defaultEnabled: true,
  apply: toggle.apply,
  undo: toggle.undo,
};
