import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card, the related-videos list, and -
// on live streams - the chat panel (#chat-container), all as siblings under
// #secondary-inner. Chat has no independent existence outside that column,
// so hiding #secondary wholesale (the old approach) took it down too.
//
// :has() lets the two cases stay pure CSS instead of needing JS to move
// chat around (which was fragile - relocating an <iframe> forces it to
// reload): no chat in the column -> hide the whole thing like before; chat
// present -> keep the column, but hide everything in it except the chat.
const CSS = `
ytd-watch-flexy #secondary:not(:has(#chat-container)) {
  display: none !important;
}

ytd-watch-flexy #secondary:has(#chat-container) #secondary-inner > *:not(#chat-container) {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-sidebar", CSS);

export const hideWatchSidebar: Feature = {
  id: "hide-watch-sidebar",
  group: "Watch Page",
  name: "Hide recommendations sidebar",
  description:
    "Hides the up-next carousel and related videos list next to the player. Live chat, if present, stays visible.",
  defaultEnabled: true,
  apply: toggle.apply,
  undo: toggle.undo,
};
