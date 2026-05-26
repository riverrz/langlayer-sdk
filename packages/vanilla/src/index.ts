import {
  LangLayer,
  type TranslationTree,
  type DeepKeys,
} from "@langlayer/core";

export function createLangLayer<TDict extends TranslationTree>(
  config: ConstructorParameters<typeof LangLayer>[0],
) {
  const core = new LangLayer<TDict>(config);

  function applyBindings() {
    document.querySelectorAll("[data-llKey]").forEach((el) => {
      const key = el.getAttribute("data-llKey")! as DeepKeys<TDict>;
      el.textContent = core.t(key);
    });
  }

  core.on("change", (key: DeepKeys<TDict>, value: string) => {
    const el = document.querySelector(`[data-llKey]="${key}"`);

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
