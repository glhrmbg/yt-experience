import type { Feature } from "../types";
import { startRecentering, stopRecentering } from "./recenter";

export const centerGoogleSearch: Feature = {
  id: "center-google-search",
  group: "Google Search",
  name: "Center search results",
  description: "Centers the search results column instead of leaving it stuck to the left on wide screens.",
  defaultEnabled: false,
  apply: startRecentering,
  undo: stopRecentering,
};
