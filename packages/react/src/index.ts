import {
  LangLayer,
  type Translations,
  type SupportedLanguage,
  type LangLayerEvent,
} from "@langlayer-sdk/core";
import { CreateLangLayerConfig } from "./types";
import { assertNever } from "./library/utils";

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

  const listenToEvent =
    (event: LangLayerEvent<TDict>) => (subscribe: () => void) => {
      core.on(event, subscribe);

      return () => core.off(event, subscribe);
    };

  const getSnapshotOfEvent = (event: LangLayerEvent<TDict>) => () => {
    switch (event) {
      case "translationChange":
        return core.getMessages(core.getCurrentLanguage());
      default:
        return assertNever(event);
    }
  };

  return {
    init: core.init.bind(core),

    setLanguage: core.setLanguage.bind(core),

    t: core.t.bind(core),

    getCurrentLanguage: core.getCurrentLanguage.bind(core),

    getSupportedLanguages: core.getSupportedLanguages.bind(core),

    getMessages: core.getMessages.bind(core),

    listenToEvent,

    getSnapshotOfEvent,
  };
}

type CreateLangLayerReturnType = ReturnType<typeof createLangLayer>;

export type { SupportedLanguage, CreateLangLayerReturnType };
