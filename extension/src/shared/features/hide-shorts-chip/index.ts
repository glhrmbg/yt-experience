import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";
import { hideShortsChips, startChipObserver, stopChipObserver, unhideShortsChips } from "./chip";

const CSS = `
yt-chip-cloud-chip-renderer[data-ytx-hidden] {
  display: none !important;
}
`;

const cssToggle = createCssToggle("ytx-hide-shorts-chip", CSS);

export const hideShortsChip: Feature = {
  id: "hide-shorts-chip",
  name: "Filter chip",
  description: 'Hides the "Shorts" filter chip shown above search/feed results.',
  defaultEnabled: true,
  apply() {
    cssToggle.apply();
    hideShortsChips();
    startChipObserver();
  },
  undo() {
    cssToggle.undo();
    stopChipObserver();
    unhideShortsChips();
  },
};
