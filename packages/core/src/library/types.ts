export type LangLayerConfig = {
  organizationSlug: string;
  projectSlug: string;
  contentBranch?: string; // default: main
  fallbackLanguage?: string;
};

export type Manifest = {
  lastUpdatedAt: number;
  languages: Record<string, string>; // en → file.json
};

export type TranslationTree = {
  [key: string]: TranslationTree | string;
};

export type Translations = {
  [key: string]: string;
};

export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type LangLayerEventListeners<TDict> = {
  change?: (key: DeepKeys<TDict>, value: string) => void;
};

export type LangLayerEvent<TDict> = keyof LangLayerEventListeners<TDict>;

export type ApiResponse<TData> =
  | { success: false; error: string }
  | { success: true; data: TData };

export type ContentPreviewMetadata = {
  organizationSlug: string;
  projectSlug: string;
};

export type IFrameMessage<TDict> = {
  type: "translations:updateText";
  payload: {
    lang: string;
    key: DeepKeys<TDict>;
    value: string;
  };
};
