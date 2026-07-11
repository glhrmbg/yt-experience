export type FeatureId = "hide-shorts";

export interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  defaultEnabled: boolean;
  apply: () => void;
  undo: () => void;
}

export interface StoredFeatureState {
  features: Partial<Record<FeatureId, boolean>>;
}
