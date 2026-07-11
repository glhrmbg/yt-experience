import { featureRegistry } from "../shared/features/registry";
import { getFeatureState, onFeatureStateChanged } from "../shared/storage";
import type { StoredFeatureState } from "../shared/features/types";

function isEnabled(state: StoredFeatureState, id: (typeof featureRegistry)[number]["id"], defaultEnabled: boolean) {
  return state.features[id] ?? defaultEnabled;
}

function applyAll(state: StoredFeatureState) {
  for (const feature of featureRegistry) {
    if (isEnabled(state, feature.id, feature.defaultEnabled)) {
      feature.apply();
    } else {
      feature.undo();
    }
  }
}

async function main() {
  applyAll(await getFeatureState());

  onFeatureStateChanged((state) => {
    applyAll(state);
  });
}

void main();
