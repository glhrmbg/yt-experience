// Selectors verified against live YouTube DOM (see elemento-youtube.md, not committed).
// Preference order: match on `href`/custom-element tags (language-independent) over
// `title`/`aria-label`/text content (localized) wherever YouTube's markup allows it.
export const HIDE_SHORTS_CSS = `
/* Expanded sidebar guide entry. Unlike the mini/collapsed guide, this entry's
   <a id="endpoint"> has no href at all (verified against live DOM) - only
   title="Shorts", so we fall back to that. Also matching href defensively in
   case YouTube starts populating it. */
ytd-guide-entry-renderer:has(a[href="/shorts/"], a[title="Shorts"]) {
  display: none !important;
}

/* Collapsed/mini guide entry (incl. the hamburger drawer at narrow viewports).
   Note: aria-label/title/href live on the inner <a id="endpoint">, not on the
   ytd-mini-guide-entry-renderer host itself - matching the host's attributes
   directly (as an earlier version of this file did) silently never matches. */
ytd-mini-guide-entry-renderer:has(a#endpoint[href="/shorts/"]) {
  display: none !important;
}

/* Shorts video "lockup" cards - the current renderer used for Shorts thumbnails
   in search results, home feed grids/shelves, and recommendations. Hiding the
   grid cell wrapper (when present) avoids leaving an empty gap; hiding the
   lockup itself is a fallback for contexts where it isn't grid-wrapped. */
div.ytGridShelfViewModelGridShelfItem:has(ytm-shorts-lockup-view-model-v2),
ytm-shorts-lockup-view-model-v2,
ytm-shorts-lockup-view-model {
  display: none !important;
}

/* Whole shelf when every item in it is a Shorts lockup - covers shelves titled
   "Shorts" as well as topic-named shelves (e.g. a category row) that turn out
   to be entirely Shorts content. */
grid-shelf-view-model:has(ytm-shorts-lockup-view-model-v2) {
  display: none !important;
}

/* Older shelf/grid renderers - kept for YouTube's A/B-tested legacy DOM variants. */
ytd-reel-shelf-renderer,
ytd-rich-shelf-renderer[is-shorts] {
  display: none !important;
}

/* Channel page "Shorts" tab. Verified against live DOM: yt-tab-shape has no
   href at all, only tab-title (localized text, same caveat as the expanded
   guide entry above - no language-independent attribute available here). */
tp-yt-paper-tab:has(a[href*="/shorts"]),
yt-tab-shape[tab-title="Shorts"] {
  display: none !important;
}

/* Individual Shorts entries mixed into regular video result/recommendation lists. */
ytd-video-renderer:has(a[href^="/shorts"]),
ytd-grid-video-renderer:has(a[href^="/shorts"]) {
  display: none !important;
}

/* The "Shorts" filter chip is hidden via JS (chip.ts) since its label is plain
   localized text with no language-independent attribute to match on - this
   class is toggled by that logic. */
yt-chip-cloud-chip-renderer[data-ytx-hidden] {
  display: none !important;
}
`;
