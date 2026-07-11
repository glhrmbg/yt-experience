import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// Covers Shorts "lockup" cards (the current renderer for Shorts thumbnails)
// in search results and home feed grids/shelves - including topic-named
// shelves (e.g. a category row) that turn out to be entirely Shorts - plus
// older shelf renderers YouTube still A/B tests, and individual Shorts
// entries mixed into regular video result/recommendation lists.
const CSS = `
div.ytGridShelfViewModelGridShelfItem:has(ytm-shorts-lockup-view-model-v2),
ytm-shorts-lockup-view-model-v2,
ytm-shorts-lockup-view-model {
  display: none !important;
}

grid-shelf-view-model:has(ytm-shorts-lockup-view-model-v2) {
  display: none !important;
}

ytd-reel-shelf-renderer,
ytd-rich-shelf-renderer[is-shorts] {
  display: none !important;
}

ytd-video-renderer:has(a[href^="/shorts"]),
ytd-grid-video-renderer:has(a[href^="/shorts"]) {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-shorts-feed", CSS);

export const hideShortsFeed: Feature = {
  id: "hide-shorts-feed",
  name: "Search results & feed grids",
  description: "Hides Shorts shelves and cards in search results and topic rows.",
  defaultEnabled: true,
  apply: toggle.apply,
  undo: toggle.undo,
};
