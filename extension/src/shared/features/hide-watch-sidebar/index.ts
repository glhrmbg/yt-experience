import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";
import { startChatCollapseNudge, stopChatCollapseNudge } from "./chatCollapseNudge";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card, the related-videos list, and -
// on live streams - the chat panel (#chat-container), all as siblings under
// #secondary-inner. Chat has no independent existence outside that column,
// so hiding #secondary wholesale (the old approach) took it down too.
//
// #chat-container turns out to exist in the DOM even on regular videos
// (empty), so branching on ":has(#chat-container)" left an empty column
// there instead of hiding it. Branch on ".ytp-live" instead - the class
// YouTube's own player adds only for actual live broadcasts - so: no live
// player -> hide the whole column like before; live -> keep the column,
// but hide everything in it except the chat.
//
// YouTube's own "close chat" button adds a `hide-chat-frame` attribute to
// <ytd-live-chat-frame id="chat">. When that happens there's nothing left
// worth keeping the column around for, so collapse it same as a non-live
// video - and since it's plain :has()/attribute matching, it reacts live to
// the attribute being added or removed with no JS needed.
const CSS = `
ytd-watch-flexy:not(:has(.ytp-live)) #secondary {
  display: none !important;
}

ytd-watch-flexy:has(.ytp-live) #secondary:has(ytd-live-chat-frame[hide-chat-frame]) {
  display: none !important;
}

ytd-watch-flexy:has(.ytp-live) #secondary-inner > *:not(#chat-container) {
  display: none !important;
}

/* Below a certain window width, YouTube reparents #related out of
   #secondary and into #below (under #primary, alongside the comments)
   instead of just reflowing it there with CSS - so the #secondary rules
   above don't reach this copy. #related's id stays unique either way. */
ytd-watch-flexy #below #related {
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
  apply() {
    toggle.apply();
    startChatCollapseNudge();
  },
  undo() {
    toggle.undo();
    stopChatCollapseNudge();
  },
};
