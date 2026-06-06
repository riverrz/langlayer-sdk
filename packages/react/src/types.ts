import { type LangLayer } from "@langlayer-sdk/core";

export type CreateLangLayerConfig = ConstructorParameters<
  typeof LangLayer
>[0] & { enableDevtools?: boolean };
