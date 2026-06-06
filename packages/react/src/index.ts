import { LangLayer, type Translations } from "@langlayer-sdk/core";
import { CreateLangLayerConfig } from "./types";

async function attachDevtools<TDict extends Translations>(
  core: LangLayer<TDict>,
) {
  const initializeDevTools = (await import("@langlayer-sdk/core/devtools"))
    .initializeDevTools;

  await initializeDevTools(core);
}

export function createLangLayer<TDict extends Translations>(
  config: CreateLangLayerConfig,
) {
  const core = new LangLayer<TDict>(config);

  if (config.enableDevtools) {
    attachDevtools(core);
  }

  return {
    init: core.init.bind(core),

    setLanguage: core.setLanguage.bind(core),

    t: core.t.bind(core),

    getCurrentLanguage: core.getCurrentLanguage.bind(core),

    getSupportedLanguages: core.getSupportedLanguages.bind(core),

    getMessages: core.getMessages.bind(core),
  };
}
