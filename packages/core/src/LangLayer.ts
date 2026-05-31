import { Cache } from "./library/cache";
import type {
  DeepKeys,
  LangLayerEvent,
  LangLayerConfig,
  Manifest,
  Translations,
  LangLayerEventListeners,
} from "./library/types";
import {
  getUploadedContentPath,
  getUploadedManifestPath,
  interpolate,
} from "./library/utils";
import {
  DEFAULT_CONTENT_BRANCH_NAME,
  DEFAULT_LANGUAGE,
  LANGLAYER_CDN_URL,
} from "./library/constants";

export class LangLayer<TDict extends Translations> {
  private manifest?: Manifest;
  private translationsPerLanguage: Record<string, Translations> = {};
  private readonly cache = new Cache();

  private currentLang = DEFAULT_LANGUAGE;

  private eventListeners: LangLayerEventListeners<TDict> = {};

  constructor(private readonly config: LangLayerConfig) {}

  private branch() {
    return this.config.contentBranch ?? DEFAULT_CONTENT_BRANCH_NAME;
  }

  // -----------------------
  // Fetch helpers with cache
  // -----------------------

  private async fetchJSON<T>(url: string, cacheKey: string): Promise<T> {
    const cached = this.cache.get<T>(cacheKey);
    if (cached) return cached;

    const res = await fetch(`${LANGLAYER_CDN_URL}/${url}`);

    const data = await res.json();

    this.cache.set(cacheKey, data);
    return data;
  }

  // -----------------------
  // Init
  // -----------------------

  async init(language: string) {
    await this.loadManifest();
    await this.setLanguage(language);
  }

  // -----------------------
  // Manifest
  // -----------------------

  private async loadManifest() {
    const url = getUploadedManifestPath({
      ...this.config,
      contentBranchName: this.branch(),
    });

    this.manifest = await this.fetchJSON<Manifest>(
      url,
      `manifest:${this.config.organizationSlug}:${this.config.projectSlug}:${this.branch()}`,
    );
  }

  private async loadTranslations(lang: string, translationFileName: string) {
    const url = getUploadedContentPath({
      ...this.config,
      contentBranchName: this.branch(),
      langFileName: translationFileName,
    });

    this.translationsPerLanguage[lang] = await this.fetchJSON<Translations>(
      url,
      `lang:${lang}:${translationFileName}:${this.manifest!.lastUpdatedAt}`,
    );
  }

  // -----------------------
  // Language loading
  // -----------------------

  async setLanguage(lang: string): Promise<void> {
    try {
      if (!this.manifest) await this.loadManifest();

      const translationFileName = this.manifest!.languages[lang];

      if (!translationFileName) {
        if (
          this.config.fallbackLanguage &&
          this.config.fallbackLanguage !== lang
        ) {
          console.error(
            `[LangLayer] - Messages not found for language:${lang}, falling back to ${this.config.fallbackLanguage}`,
          );
          return this.setLanguage(this.config.fallbackLanguage);
        }
        throw new Error(`[LangLayer] - Language "${lang}" not found`);
      }

      await this.loadTranslations(lang, translationFileName);

      this.currentLang = lang;
    } catch (error) {
      console.error(error);
    }
  }

  // -----------------------
  // Getters
  // -----------------------

  getCurrentLanguage() {
    return this.currentLang;
  }

  getMessages(lang: string) {
    return this.translationsPerLanguage[lang];
  }

  // -----------------------
  // Typed-safe translator
  // -----------------------

  t<K extends DeepKeys<TDict>>(
    key: K,
    params?: Record<string, string | number>,
  ): string {
    const value =
      this.translationsPerLanguage[this.getCurrentLanguage()]?.[key];

    if (!value || typeof value !== "string") {
      console.error(
        `[LangLayer] - Missing value for key:${key} in language:${this.getCurrentLanguage()}`,
      );
      return "";
    }

    return interpolate(value, params);
  }

  // -----------------------
  // Updaters
  // -----------------------

  updateText<T extends DeepKeys<TDict>>(
    lang: string,
    key: T,
    value: string,
    params?: Record<string, string | number>,
  ) {
    this.translationsPerLanguage[lang] = Object.assign(
      {},
      this.translationsPerLanguage[lang],
      { [key]: value },
    );

    if (this.getCurrentLanguage() === lang) {
      this.eventListeners.change?.(key, interpolate(value, params));
    }
  }

  // -----------------------
  // Listeners
  // -----------------------

  on<T extends LangLayerEvent<TDict>>(
    event: T,
    cb: LangLayerEventListeners<TDict>[T],
  ) {
    this.eventListeners[event] = cb;
  }

  // -----------------------
  // Validators
  // -----------------------

  validateConfig(
    config: Pick<LangLayerConfig, "organizationSlug" | "projectSlug">,
  ) {
    return (
      this.config.organizationSlug === config.organizationSlug &&
      this.config.projectSlug === config.projectSlug
    );
  }
}
