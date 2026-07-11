import type { Feature } from "../types";
import { HIDE_SHORTS_CSS } from "./selectors";

const STYLE_ID = "ytx-hide-shorts";

function getOrCreateStyleTag(): HTMLStyleElement {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = HIDE_SHORTS_CSS;
    (document.head ?? document.documentElement).appendChild(style);
  }
  return style;
}

export const hideShorts: Feature = {
  id: "hide-shorts",
  name: "Hide Shorts",
  description: "Removes Shorts from the sidebar, homepage, search results, and channel pages.",
  defaultEnabled: true,
  apply() {
    getOrCreateStyleTag().disabled = false;
  },
  undo() {
    const style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (style) style.disabled = true;
  },
};
