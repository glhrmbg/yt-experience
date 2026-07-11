// The home/search filter chip row (<yt-chip-cloud-chip-renderer>: "Tudo",
// "Shorts", "Ao vivo", ...) has no language-independent attribute to match on -
// it's plain localized text. "Shorts" is YouTube's product name and is kept
// untranslated in most locales, but not necessarily all; extend this list if a
// translated label is found.
const SHORTS_CHIP_LABELS = ["shorts"];

const HIDDEN_ATTR = "data-ytx-hidden";

function isShortsChip(el: Element): boolean {
  const text = el.textContent?.trim().toLowerCase() ?? "";
  return SHORTS_CHIP_LABELS.includes(text);
}

export function hideShortsChips(): void {
  document.querySelectorAll("yt-chip-cloud-chip-renderer").forEach((chip) => {
    if (isShortsChip(chip)) {
      chip.setAttribute(HIDDEN_ATTR, "");
    }
  });
}

export function unhideShortsChips(): void {
  document.querySelectorAll(`[${HIDDEN_ATTR}]`).forEach((el) => el.removeAttribute(HIDDEN_ATTR));
}

let observer: MutationObserver | null = null;
let debounceHandle: ReturnType<typeof setTimeout> | null = null;

export function startChipObserver(): void {
  if (observer) return;
  observer = new MutationObserver(() => {
    if (debounceHandle) clearTimeout(debounceHandle);
    debounceHandle = setTimeout(hideShortsChips, 200);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

export function stopChipObserver(): void {
  observer?.disconnect();
  observer = null;
  if (debounceHandle) {
    clearTimeout(debounceHandle);
    debounceHandle = null;
  }
}
