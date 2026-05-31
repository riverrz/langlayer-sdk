import {
  LangLayer,
  type DeepKeys,
  type Translations,
} from "@langlayer-sdk/core";
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

  function applyBindings() {
    document.querySelectorAll("[data-llKey]").forEach((el) => {
      const key = el.getAttribute("data-llKey")! as DeepKeys<TDict>;
      el.textContent = core.t(key);
    });
  }

  core.on("change", (key: DeepKeys<TDict>, value: string) => {
    const el = document.querySelector(`[data-llKey="${key}"]`);

    if (!el) {
      console.warn(
        `[LangLayer] - Element with llKey:${key} not found, ignoring update.`,
      );
      return;
    }

    el.textContent = value;
  });

  return {
    init: async (lang: string) => {
      await core.init(lang);
      applyBindings();
    },

    setLanguage: async (lang: string) => {
      await core.setLanguage(lang);
      applyBindings();
    },

    t: core.t.bind(core),

    getLanguage: core.getCurrentLanguage.bind(core),

    applyBindings,
  };
}
