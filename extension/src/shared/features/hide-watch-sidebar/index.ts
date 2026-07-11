import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card and the related-videos list
// (ytd-watch-next-secondary-results-renderer > #related). Hiding the column
// wrapper removes both in one shot instead of targeting each separately.
//
// #primary ships with an asymmetric gutter (margin: 0 0 0 16px, padding:
// 12px 16px 0 0) that exists to leave room for #secondary on its right.
// With #secondary gone that lopsided margin/padding is what pushes the
// centered layout a few pixels off - mirroring both to 16px on each side
// (measured via devtools) straightens it back out.
const CSS = `
ytd-watch-flexy #secondary {
  display: none !important;
}

ytd-watch-flexy #primary {
  margin: 0 16px !important;
  padding: 12px 16px 0 16px !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-sidebar", CSS);

export const hideWatchSidebar: Feature = {
  id: "hide-watch-sidebar",
  group: "Watch Page",
  name: "Hide recommendations sidebar",
  description: "Hides the up-next carousel and related videos list, and centers the player in the freed-up space.",
  defaultEnabled: false,
  apply: toggle.apply,
  undo: toggle.undo,
};
