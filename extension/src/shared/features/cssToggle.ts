export function createCssToggle(styleId: string, css: string) {
  function getOrCreateStyleTag(): HTMLStyleElement {
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = css;
      (document.head ?? document.documentElement).appendChild(style);
    }
    return style;
  }

  return {
    apply() {
      getOrCreateStyleTag().disabled = false;
    },
    undo() {
      const style = document.getElementById(styleId) as HTMLStyleElement | null;
      if (style) style.disabled = true;
    },
  };
}
