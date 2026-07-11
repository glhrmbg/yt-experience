// Best-effort selectors for YouTube's Shorts UI. YouTube ships frequent,
// unannounced DOM/class changes, so these should be re-verified against the
// live site periodically rather than trusted as permanently correct.
export const HIDE_SHORTS_CSS = `
/* Sidebar (expanded + mini/collapsed guide) */
ytd-guide-entry-renderer:has(a[title="Shorts"]),
ytd-mini-guide-entry-renderer[aria-label="Shorts"] {
  display: none !important;
}

/* Homepage / feed Shorts shelves */
ytd-rich-shelf-renderer[is-shorts],
ytd-reel-shelf-renderer {
  display: none !important;
}

/* Channel page "Shorts" tab */
tp-yt-paper-tab:has(a[href*="/shorts"]),
yt-tab-shape[tab-title="Shorts"] {
  display: none !important;
}

/* Individual Shorts entries in search results / recommendations */
ytd-video-renderer:has(a[href^="/shorts"]),
ytd-grid-video-renderer:has(a[href^="/shorts"]) {
  display: none !important;
}
`;
