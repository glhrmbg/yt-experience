import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// Only meaningful once the secondary column is hidden (see hide-watch-sidebar),
// hence `requires: ["hide-watch-sidebar"]` on every option - selecting any of
// them force-enables that toggle too. "Left" is a deliberate no-op: leaving
// #primary in its natural post-hide position looked better than anything we
// tried forcing onto it, so it's the CSS-free baseline the other two compare
// against.
const leftToggle = createCssToggle("ytx-watch-position-left", "");

const centerToggle = createCssToggle(
  "ytx-watch-position-center",
  `
ytd-watch-flexy #columns {
  justify-content: center !important;
}
`,
);

const rightToggle = createCssToggle(
  "ytx-watch-position-right",
  `
ytd-watch-flexy #columns {
  justify-content: flex-end !important;
}
`,
);

export const watchPositionLeft: Feature = {
  id: "watch-position-left",
  group: "Watch Page",
  name: "Left",
  description: "Leaves the video where it naturally sits once the sidebar is hidden.",
  defaultEnabled: false,
  radioGroup: "watch-position",
  requires: ["hide-watch-sidebar"],
  apply: leftToggle.apply,
  undo: leftToggle.undo,
};

export const watchPositionCenter: Feature = {
  id: "watch-position-center",
  group: "Watch Page",
  name: "Center",
  description: "Centers the video in the freed-up space.",
  defaultEnabled: false,
  radioGroup: "watch-position",
  requires: ["hide-watch-sidebar"],
  apply: centerToggle.apply,
  undo: centerToggle.undo,
};

export const watchPositionRight: Feature = {
  id: "watch-position-right",
  group: "Watch Page",
  name: "Right",
  description: "Pushes the video to the right of the freed-up space.",
  defaultEnabled: false,
  radioGroup: "watch-position",
  requires: ["hide-watch-sidebar"],
  apply: rightToggle.apply,
  undo: rightToggle.undo,
};
