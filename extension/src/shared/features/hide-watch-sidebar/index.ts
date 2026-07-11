import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card and the related-videos list
// (ytd-watch-next-secondary-results-renderer > #related). Hiding the column
// wrapper removes both in one shot instead of targeting each separately.
const CSS = `
ytd-watch-flexy #secondary {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-sidebar", CSS);

export const hideWatchSidebar: Feature = {
  id: "hide-watch-sidebar",
  group: "Watch Page",
  name: "Hide recommendations sidebar",
  description: "Hides the up-next carousel and related videos list next to the player.",
  defaultEnabled: false,
  apply: toggle.apply,
  undo: toggle.undo,
};
