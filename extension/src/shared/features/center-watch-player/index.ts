import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// Self-contained: hides #secondary itself (rather than relying on
// hide-watch-sidebar's own toggle state) so this works correctly regardless
// of whether that other feature is separately enabled, then centers #primary
// in the freed-up width. Best-effort layout tweak - not verified against
// every live viewport/theater-mode combination yet, may need real-world
// adjustment.
const CSS = `
ytd-watch-flexy #secondary {
  display: none !important;
}

ytd-watch-flexy #columns {
  justify-content: center !important;
}

ytd-watch-flexy #primary {
  max-width: 1280px !important;
  margin: 0 auto !important;
}
`;

const toggle = createCssToggle("ytx-center-watch-player", CSS);

export const centerWatchPlayer: Feature = {
  id: "center-watch-player",
  group: "Watch Page",
  name: "Center video player",
  description: "Centers the video on screen. Automatically hides the recommendations sidebar too.",
  defaultEnabled: false,
  requires: ["hide-watch-sidebar"],
  apply: toggle.apply,
  undo: toggle.undo,
};
