import { featureRegistry } from "../shared/features/registry";
import { seedDefaults } from "../shared/storage";

chrome.runtime.onInstalled.addListener(() => {
  const defaults = Object.fromEntries(featureRegistry.map((f) => [f.id, f.defaultEnabled]));
  void seedDefaults(defaults);
});
