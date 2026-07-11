import type { Feature } from "./types";
import { hideShortsSidebar } from "./hide-shorts-sidebar";
import { hideShortsFeed } from "./hide-shorts-feed";
import { hideShortsChannel } from "./hide-shorts-channel";
import { hideShortsChip } from "./hide-shorts-chip";
import { hideWatchSidebar } from "./hide-watch-sidebar";
import { hideWatchLiveChat } from "./hide-watch-live-chat";

// Add new features here as they're built. Order matters: it drives the
// popup's grouping (features sharing a `group` should stay adjacent).
export const featureRegistry: Feature[] = [
  hideShortsSidebar,
  hideShortsFeed,
  hideShortsChannel,
  hideShortsChip,
  hideWatchSidebar,
  hideWatchLiveChat,
];
