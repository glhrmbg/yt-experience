import { featureRegistry } from "../shared/features/registry";
import { getFeatureState, setFeatureEnabled } from "../shared/storage";

async function render() {
  const list = document.getElementById("feature-list");
  if (!list) return;

  const state = await getFeatureState();

  list.innerHTML = "";
  for (const feature of featureRegistry) {
    const enabled = state.features[feature.id] ?? feature.defaultEnabled;

    const item = document.createElement("li");
    item.className = "feature-item";

    const text = document.createElement("div");
    text.className = "feature-text";
    text.innerHTML = `<div class="name">${feature.name}</div><div class="description">${feature.description}</div>`;

    const switchLabel = document.createElement("label");
    switchLabel.className = "switch";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = enabled;
    checkbox.setAttribute("aria-label", feature.name);
    checkbox.addEventListener("change", () => {
      void setFeatureEnabled(feature.id, checkbox.checked);
    });

    const track = document.createElement("span");
    track.className = "switch-track";
    const thumb = document.createElement("span");
    thumb.className = "switch-thumb";
    track.append(thumb);

    switchLabel.append(checkbox, track);
    item.append(text, switchLabel);
    list.append(item);
  }
}

void render();
