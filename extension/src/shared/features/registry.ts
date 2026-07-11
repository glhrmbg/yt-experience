import type { Feature } from "./types";
import { hideShorts } from "./hide-shorts";

// Add new features here as they're built (e.g. later watch-page layout tweaks).
export const featureRegistry: Feature[] = [hideShorts];
