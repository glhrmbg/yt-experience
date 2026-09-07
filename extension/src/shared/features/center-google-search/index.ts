import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #rcnt is a 22-column CSS grid that always fills the full page width (its
// track widths + gaps sum exactly to its own width - confirmed via
// devtools). #center_col only ever claims a fixed 12-column span starting
// after a ~260px left gutter, regardless of whether the remaining columns
// (reserved for #rhs, the knowledge-panel/ads column) are actually used.
// With no #rhs, that reserved space just sits empty on the right, so the
// results look stuck to the left instead of centered.
//
// Rather than hardcode Google's own animated grid-template-columns pixel
// values (fragile - they're JS-managed and change with viewport size), let
// #center_col span the whole grid and center itself within it. Only when
// there's no #rhs - if a knowledge panel is present, the original layout
// already uses the space and isn't touched.
const CSS = `
#rcnt:not(:has(#rhs)) #center_col {
  grid-column: 1 / -1 !important;
  justify-self: center !important;
}
`;

const toggle = createCssToggle("ytx-center-google-search", CSS);

export const centerGoogleSearch: Feature = {
  id: "center-google-search",
  group: "Google Search",
  name: "Center search results",
  description: "Centers the search results column instead of leaving it stuck to the left on wide screens.",
  defaultEnabled: false,
  apply: toggle.apply,
  undo: toggle.undo,
};
