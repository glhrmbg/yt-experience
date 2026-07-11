import { featureRegistry } from "../shared/features/registry";
import { getFeatureState, setFeatureEnabled } from "../shared/storage";
import type { Feature } from "../shared/features/types";

function createSwitch(feature: Feature, enabled: boolean, onChange: (enabled: boolean) => void): HTMLElement {
  const label = document.createElement("label");
  label.className = "switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = enabled;
  checkbox.setAttribute("aria-label", feature.name);
  checkbox.addEventListener("change", () => onChange(checkbox.checked));

  const track = document.createElement("span");
  track.className = "switch-track";
  const thumb = document.createElement("span");
  thumb.className = "switch-thumb";
  track.append(thumb);

  label.append(checkbox, track);
  return label;
}

async function render() {
  const list = document.getElementById("feature-list");
  if (!list) return;

  const state = await getFeatureState();
  list.innerHTML = "";

  let lastGroup: string | null = null;
  for (const feature of featureRegistry) {
    if (feature.group !== lastGroup) {
      const header = document.createElement("li");
      header.className = "group-title";
      header.textContent = feature.group;
      list.append(header);
      lastGroup = feature.group;
    }

    const enabled = state.features[feature.id] ?? feature.defaultEnabled;

    const item = document.createElement("li");
    item.className = "feature-item";

    const text = document.createElement("div");
    text.className = "feature-text";
    text.innerHTML = `<div class="name">${feature.name}</div><div class="description">${feature.description}</div>`;

    const toggle = createSwitch(feature, enabled, async (checked) => {
      await setFeatureEnabled(feature.id, checked);
      if (checked && feature.requires?.length) {
        for (const depId of feature.requires) {
          await setFeatureEnabled(depId, true);
        }
        await render();
      }
    });

    item.append(text, toggle);
    list.append(item);
  }
}

void render();
