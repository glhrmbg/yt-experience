// Live streams keep their chat inside #secondary (#chat-container, a sibling
// of #related under #panels) - the same column hide-watch-sidebar's CSS
// hides wholesale. A hidden ancestor can't be worked around with CSS on the
// child, so instead we physically relocate #chat-container into
// #primary-inner (right after #below) before #secondary gets hidden.
// #secondary gets rebuilt by YouTube's own routing on every SPA navigation
// (new video/stream, new #chat-container), so a MutationObserver keeps
// re-applying the move as it shows up. Moving an <iframe> resets its
// contents, so chat will briefly reload/blink each time this runs - that's
// an unavoidable side effect of relocating it.

export function relocateChat(): void {
  const chat = document.querySelector("ytd-watch-flexy #secondary #chat-container");
  const primaryInner = document.querySelector("ytd-watch-flexy #primary-inner");
  if (chat && primaryInner) {
    primaryInner.appendChild(chat);
  }
}

export function restoreChat(): void {
  const chat = document.querySelector("ytd-watch-flexy #primary-inner #chat-container");
  const panels = document.querySelector("ytd-watch-flexy #secondary-inner #panels");
  if (chat && panels) {
    panels.appendChild(chat);
  }
}

let observer: MutationObserver | null = null;
let debounceHandle: ReturnType<typeof setTimeout> | null = null;

export function startChatObserver(): void {
  if (observer) return;
  observer = new MutationObserver(() => {
    if (debounceHandle) clearTimeout(debounceHandle);
    debounceHandle = setTimeout(relocateChat, 200);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

export function stopChatObserver(): void {
  observer?.disconnect();
  observer = null;
  if (debounceHandle) {
    clearTimeout(debounceHandle);
    debounceHandle = null;
  }
}
