import { type LangLayer } from "@langlayer/core";

export type CreateLangLayerConfig = ConstructorParameters<
  typeof LangLayer
>[0] & { enableDevtools?: boolean };
