export type FeatureId =
  | "hide-shorts-sidebar"
  | "hide-shorts-feed"
  | "hide-shorts-channel"
  | "hide-shorts-chip"
  | "hide-watch-sidebar"
  | "watch-position-left"
  | "watch-position-center"
  | "watch-position-right";

export interface Feature {
  id: FeatureId;
  group: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  /** Other features this one forces enabled when it's turned on (UI + storage only, each feature's apply() stays self-sufficient). Turning a feature off cascades to disable anything that requires it. */
  requires?: FeatureId[];
  /** Features sharing the same radioGroup are mutually exclusive - enabling one disables the others and the popup renders them as a segmented control instead of individual switches. */
  radioGroup?: string;
  apply: () => void;
  undo: () => void;
}

export interface StoredFeatureState {
  features: Partial<Record<FeatureId, boolean>>;
}
