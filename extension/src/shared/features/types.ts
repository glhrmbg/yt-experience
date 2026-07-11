export type FeatureId =
  | "hide-shorts-sidebar"
  | "hide-shorts-feed"
  | "hide-shorts-channel"
  | "hide-shorts-chip"
  | "hide-watch-sidebar"
  | "center-watch-player";

export interface Feature {
  id: FeatureId;
  group: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  /** Other features this one forces enabled when it's turned on (UI + storage only, each feature's apply() stays self-sufficient). */
  requires?: FeatureId[];
  apply: () => void;
  undo: () => void;
}

export interface StoredFeatureState {
  features: Partial<Record<FeatureId, boolean>>;
}
