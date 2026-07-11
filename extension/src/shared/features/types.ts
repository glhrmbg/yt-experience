export type FeatureId =
  | "hide-shorts-sidebar"
  | "hide-shorts-feed"
  | "hide-shorts-channel"
  | "hide-shorts-chip"
  | "hide-watch-sidebar"
  | "hide-watch-live-chat";

export interface Feature {
  id: FeatureId;
  group: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  apply: () => void;
  undo: () => void;
}

export interface StoredFeatureState {
  features: Partial<Record<FeatureId, boolean>>;
}
