// Closing/opening chat via YouTube's own button flips the `hide-chat-frame`
// attribute on <ytd-live-chat-frame id="chat">, which our CSS uses to
// collapse/restore #secondary. That's a CSS-driven reflow, but the player
// sizes itself once and only recomputes on a real window "resize" event -
// so #primary changing width right under it leaves a visible glitch until
// something nudges it. Watching just that one attribute (not childList/
// subtree like the chip observer) keeps this cheap even with a live chat's
// constant message churn.

function nudgePlayerResize(): void {
  const fire = () => window.dispatchEvent(new Event("resize"));
  requestAnimationFrame(fire);
  setTimeout(fire, 300);
}

let observer: MutationObserver | null = null;

export function startChatCollapseNudge(): void {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    if (mutations.some((m) => m.attributeName === "hide-chat-frame")) {
      nudgePlayerResize();
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["hide-chat-frame"],
    subtree: true,
  });
}

export function stopChatCollapseNudge(): void {
  observer?.disconnect();
  observer = null;
}
