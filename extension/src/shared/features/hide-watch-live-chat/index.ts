import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// hide-watch-sidebar keeps #chat-container visible during live streams on
// purpose. This is the opt-in override for people who don't want that -
// hides it too, independent of whatever else is happening in #secondary.
const CSS = `
ytd-watch-flexy #chat-container {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-live-chat", CSS);

export const hideWatchLiveChat: Feature = {
  id: "hide-watch-live-chat",
  group: "Watch Page",
  name: "Hide live chat too",
  description: 'Also hides the live chat panel that "Hide recommendations sidebar" normally keeps visible.',
  defaultEnabled: false,
  apply: toggle.apply,
  undo: toggle.undo,
};
