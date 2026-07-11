import type { Feature } from "./types";
import { hideShortsSidebar } from "./hide-shorts-sidebar";
import { hideShortsFeed } from "./hide-shorts-feed";
import { hideShortsChannel } from "./hide-shorts-channel";
import { hideShortsChip } from "./hide-shorts-chip";

// Add new features here as they're built (e.g. later watch-page layout tweaks).
export const featureRegistry: Feature[] = [hideShortsSidebar, hideShortsFeed, hideShortsChannel, hideShortsChip];
