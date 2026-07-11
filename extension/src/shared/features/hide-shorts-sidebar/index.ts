import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// Expanded guide entry's <a id="endpoint"> has no href at all (verified
// against live DOM) - only title="Shorts" - so title is the only reliable
// match there. The mini/collapsed guide entry does carry href="/shorts/" on
// its own <a id="endpoint">, which is language-independent.
const CSS = `
ytd-guide-entry-renderer:has(a[href="/shorts/"], a[title="Shorts"]) {
  display: none !important;
}

ytd-mini-guide-entry-renderer:has(a#endpoint[href="/shorts/"]) {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-shorts-sidebar", CSS);

export const hideShortsSidebar: Feature = {
  id: "hide-shorts-sidebar",
  name: "Sidebar navigation",
  description: "Hides the Shorts entry in the sidebar, expanded or collapsed.",
  defaultEnabled: true,
  apply: toggle.apply,
  undo: toggle.undo,
};
