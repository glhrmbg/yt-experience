import type { StoredFeatureState } from "./features/types";

const STORAGE_KEY = "ytx:features";

export async function getFeatureState(): Promise<StoredFeatureState> {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as StoredFeatureState | undefined) ?? { features: {} };
}

export async function setFeatureEnabled(id: keyof StoredFeatureState["features"], enabled: boolean): Promise<void> {
  const state = await getFeatureState();
  state.features[id] = enabled;
  await chrome.storage.sync.set({ [STORAGE_KEY]: state });
}

export async function seedDefaults(defaults: StoredFeatureState["features"]): Promise<void> {
  const state = await getFeatureState();
  let changed = false;
  for (const [id, defaultEnabled] of Object.entries(defaults) as [keyof StoredFeatureState["features"], boolean][]) {
    if (!(id in state.features)) {
      state.features[id] = defaultEnabled;
      changed = true;
    }
  }
  if (changed) {
    await chrome.storage.sync.set({ [STORAGE_KEY]: state });
  }
}

export function onFeatureStateChanged(callback: (state: StoredFeatureState) => void): () => void {
  const listener = (
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: chrome.storage.AreaName,
  ) => {
    if (areaName !== "sync" || !(STORAGE_KEY in changes)) return;
    callback((changes[STORAGE_KEY].newValue as StoredFeatureState | undefined) ?? { features: {} });
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
