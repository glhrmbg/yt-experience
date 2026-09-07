// #rcnt is a CSS grid whose tracks always sum to its own full width (no
// free space at the grid level). #center_col claims a fixed column span
// that leaves the rest of the row empty when there's no #rhs (knowledge
// panel) - so the "empty space" only exists to the right of #center_col.
//
// Resizing #center_col itself (grid-column/justify-self/width) to close
// that gap changes its own layout box, which cascades into every flex/grid
// component nested inside it (badly - confirmed by testing: internal cards
// collapsed into a broken vertical stack). Instead, leave #center_col's own
// box completely untouched and just shift it sideways with margin-left,
// computed from the real measured gap - margin never affects a box's own
// content layout, only where it sits, so nothing nested inside can break.
//
// Google recalculates the grid on window resize (animated, per the
// transition on grid-template-columns), so this re-measures on resize too.

const MARGIN_PROP = "margin-left";

function recenter(): void {
  const rcnt = document.querySelector<HTMLElement>("#rcnt");
  const centerCol = document.querySelector<HTMLElement>("#center_col");
  if (!rcnt || !centerCol) return;

  centerCol.style.removeProperty(MARGIN_PROP);

  if (document.querySelector("#rhs")) return;

  const rcntRect = rcnt.getBoundingClientRect();
  const colRect = centerCol.getBoundingClientRect();
  const leftGap = colRect.left - rcntRect.left;
  const rightGap = rcntRect.right - colRect.right;
  const shift = (rightGap - leftGap) / 2;

  if (shift > 1) {
    centerCol.style.setProperty(MARGIN_PROP, `${shift}px`, "important");
  }
}

let resizeHandle: ReturnType<typeof setTimeout> | null = null;
function scheduleRecenter(): void {
  if (resizeHandle) clearTimeout(resizeHandle);
  resizeHandle = setTimeout(recenter, 150);
}

let observer: MutationObserver | null = null;

export function startRecentering(): void {
  recenter();
  window.addEventListener("resize", scheduleRecenter);
  if (!observer) {
    observer = new MutationObserver(scheduleRecenter);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}

export function stopRecentering(): void {
  window.removeEventListener("resize", scheduleRecenter);
  if (resizeHandle) {
    clearTimeout(resizeHandle);
    resizeHandle = null;
  }
  observer?.disconnect();
  observer = null;

  const centerCol = document.querySelector<HTMLElement>("#center_col");
  centerCol?.style.removeProperty(MARGIN_PROP);
}
