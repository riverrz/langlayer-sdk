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

export type Translations = Record<string, string>;

export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type TranslationChangeEventListener<TDict> = (
  key: DeepKeys<TDict>,
  value: string,
) => void;

export type LangLayerEventListeners<TDict> = {
  translationChange?: TranslationChangeEventListener<TDict>[];
};

export type EventCallback<TDict, T extends LangLayerEvent<TDict>> = NonNullable<
  LangLayerEventListeners<TDict>[T]
>[number];

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

export type SupportedLanguage = { name: string; key: string };
