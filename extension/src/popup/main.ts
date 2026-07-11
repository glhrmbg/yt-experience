import { featureRegistry } from "../shared/features/registry";
import { getFeatureState, setFeatureEnabled } from "../shared/storage";
import type { Feature, FeatureId, StoredFeatureState } from "../shared/features/types";

function isEnabled(state: StoredFeatureState, feature: Feature): boolean {
  return state.features[feature.id] ?? feature.defaultEnabled;
}

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

function createSegmentedControl(options: Feature[], activeId: FeatureId, onSelect: (id: FeatureId) => void) {
  const wrap = document.createElement("div");
  wrap.className = "segmented";
  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "segmented-option" + (option.id === activeId ? " active" : "");
    button.textContent = option.name;
    button.addEventListener("click", () => onSelect(option.id));
    wrap.append(button);
  }
  return wrap;
}

// Enables `id` and, generically, cascades both directions: force-enables
// anything it `requires`, and (when disabling) force-disables anything that
// requires it. Radio-group siblings are turned off when one is turned on.
async function setEnabled(id: FeatureId, enabled: boolean): Promise<void> {
  await setFeatureEnabled(id, enabled);
  const feature = featureRegistry.find((f) => f.id === id);
  if (!feature) return;

  if (enabled) {
    for (const requiredId of feature.requires ?? []) {
      await setEnabled(requiredId, true);
    }
    if (feature.radioGroup) {
      for (const sibling of featureRegistry) {
        if (sibling.radioGroup === feature.radioGroup && sibling.id !== id) {
          await setFeatureEnabled(sibling.id, false);
        }
      }
    }
  } else {
    for (const dependent of featureRegistry) {
      if (dependent.requires?.includes(id)) {
        await setEnabled(dependent.id, false);
      }
    }
  }
}

async function render() {
  const list = document.getElementById("feature-list");
  if (!list) return;

  const state = await getFeatureState();
  list.innerHTML = "";

  const rendered = new Set<FeatureId>();
  let lastGroup: string | null = null;

  for (const feature of featureRegistry) {
    if (rendered.has(feature.id)) continue;

    if (feature.group !== lastGroup) {
      const header = document.createElement("li");
      header.className = "group-title";
      header.textContent = feature.group;
      list.append(header);
      lastGroup = feature.group;
    }

    const item = document.createElement("li");
    item.className = "feature-item";
    const text = document.createElement("div");
    text.className = "feature-text";

    if (feature.radioGroup) {
      const options = featureRegistry.filter((f) => f.radioGroup === feature.radioGroup);
      for (const option of options) rendered.add(option.id);

      const activeId = options.find((option) => isEnabled(state, option))?.id ?? options[0].id;

      text.innerHTML = `<div class="name">Video position</div><div class="description">Where the player sits once the recommendations sidebar is hidden.</div>`;
      const control = createSegmentedControl(options, activeId, async (selectedId) => {
        await setEnabled(selectedId, true);
        await render();
      });
      item.append(text, control);
    } else {
      rendered.add(feature.id);
      text.innerHTML = `<div class="name">${feature.name}</div><div class="description">${feature.description}</div>`;
      const toggle = createSwitch(feature, isEnabled(state, feature), async (checked) => {
        await setEnabled(feature.id, checked);
        if (checked && feature.id === "hide-watch-sidebar") {
          const positionAlreadyChosen = featureRegistry.some((f) => f.radioGroup && isEnabled(state, f));
          if (!positionAlreadyChosen) {
            await setEnabled("watch-position-center", true);
          }
        }
        await render();
      });
      item.append(text, toggle);
    }

    list.append(item);
  }
}

void render();
