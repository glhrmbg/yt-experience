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

/* Ambient mode (dark theme only) blows its glow canvases up with an inline
   transform: scale(1.5, 2), centred on the player, so the glow spreads
   sideways. Transforms don't affect layout but do count toward scrollable
   overflow. Measured with #secondary hidden: player 1326px at L=191/R=1517
   in a 1708px viewport, so the glow wants 331px of spread per side but only
   has 191px of room - the extra 140px on the right is what raises the
   horizontal scrollbar (the left 140px just falls off-screen harmlessly).
   The area looks unselectable because those canvases are pointer-events:
   none.

   Clipping at ytd-watch-flexy, which is exactly viewport-wide (L=0 R=1708),
   drops that off-screen remainder from the scroll area while leaving every
   visible pixel of glow intact: it still radiates from the player and fills
   all 191px on both sides, just stops at the window border. Scaling the
   glow down instead would shrink the effect itself, and clipping lower down
   (#cinematics-container is player-sized) would box it into the video.
   "clip" rather than "hidden" because it doesn't create a scroll container,
   so sticky descendants keep working, and it leaves overflow-y alone. */
ytd-watch-flexy {
  overflow-x: clip !important;
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
