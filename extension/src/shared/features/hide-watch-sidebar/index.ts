import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";
import { relocateChat, restoreChat, startChatObserver, stopChatObserver } from "./chat";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card and the related-videos list
// (ytd-watch-next-secondary-results-renderer > #related). Hiding the column
// wrapper removes both in one shot instead of targeting each separately.
const CSS = `
ytd-watch-flexy #secondary {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-sidebar", CSS);

export const hideWatchSidebar: Feature = {
  id: "hide-watch-sidebar",
  group: "Watch Page",
  name: "Hide recommendations sidebar",
  description:
    "Hides the up-next carousel and related videos list next to the player. On live streams, chat is moved below the player instead of being hidden with the rest.",
  defaultEnabled: true,
  apply() {
    toggle.apply();
    relocateChat();
    startChatObserver();
  },
  undo() {
    toggle.undo();
    stopChatObserver();
    restoreChat();
  },
};
