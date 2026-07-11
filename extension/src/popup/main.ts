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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `feature-${feature.id}`;
    checkbox.checked = enabled;
    checkbox.addEventListener("change", () => {
      void setFeatureEnabled(feature.id, checkbox.checked);
    });

    const text = document.createElement("div");
    text.className = "feature-text";
    text.innerHTML = `<label class="name" for="feature-${feature.id}">${feature.name}</label><div class="description">${feature.description}</div>`;

    item.append(checkbox, text);
    list.append(item);
  }
}

void render();
