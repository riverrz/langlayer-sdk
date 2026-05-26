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
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")! as DeepKeys<TDict>;
      el.textContent = core.t(key);
    });
  }

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
