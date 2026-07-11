export type FeatureId =
  | "hide-shorts-sidebar"
  | "hide-shorts-feed"
  | "hide-shorts-channel"
  | "hide-shorts-chip";

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
