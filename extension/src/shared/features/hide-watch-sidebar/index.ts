import type { Feature } from "../types";
import { createCssToggle } from "../cssToggle";

// #secondary (inside ytd-watch-flexy) holds the whole right-hand column of
// the watch page: the autoplay/up-next card and the related-videos list
// (ytd-watch-next-secondary-results-renderer > #related). Hiding the column
// wrapper removes both in one shot instead of targeting each separately.
// YouTube's own layout re-centers #primary on its own once #secondary is
// gone, so nothing else needs to be touched.
const CSS = `
ytd-watch-flexy #secondary {
  display: none !important;
}
`;

const toggle = createCssToggle("ytx-hide-watch-sidebar", CSS);

// YouTube's player sizes itself once during init from the container's
// on-screen box and only recomputes on a real window "resize" event, not on
// a CSS-driven reflow. Hiding #secondary right as the player is starting up
// (e.g. a cold load with this feature already on) can leave it stuck with a
// stale size - controls/progress bar misplaced, dead space, etc. Firing a
// few synthetic resize events nudges it to recalculate.
function nudgePlayerResize() {
  const fire = () => window.dispatchEvent(new Event("resize"));
  requestAnimationFrame(fire);
  setTimeout(fire, 300);
  setTimeout(fire, 1000);
}

export const hideWatchSidebar: Feature = {
  id: "hide-watch-sidebar",
  group: "Watch Page",
  name: "Hide recommendations sidebar",
  description: "Hides the up-next carousel and related videos list, and centers the player in the freed-up space.",
  defaultEnabled: false,
  apply: () => {
    toggle.apply();
    nudgePlayerResize();
  },
  undo: () => {
    toggle.undo();
    nudgePlayerResize();
  },
};
