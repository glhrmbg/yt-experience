import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #rcnt is a CSS grid whose tracks always sum to its own full width (no
// free space at the grid level, confirmed via devtools). #center_col's
// span there depends on Google's own breakpoints (verified via their
// stylesheet): span 7 at 876-987.98px, span 9 at 988-1231.98px, span 12
// at 1232px+. Below, with no #rhs (knowledge panel), the columns past
// #center_col's span just sit empty - results look stuck to the left.
//
// Rather than resize #center_col itself (tried that - shrinking it to
// min-content broke every flex/grid component nested inside it), keep its
// column count and per-column width exactly as Google set them and only
// add matching 1fr gutters on both sides of the *content* columns, scoped
// to the 1232px+ breakpoint where the "span 12" numbers below apply -
// #center_col's own box ends up the identical size Google gives it, just
// symmetrically flanked instead of pinned to the left.
const CSS = `
@media (min-width: 1232px) {
  #rcnt:not(:has(#rhs)) {
    grid-template-columns: 1fr 260px repeat(12, 36px) 1fr !important;
  }

  #rcnt:not(:has(#rhs)) #center_col {
    grid-column: 3 / span 12 !important;
  }
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
