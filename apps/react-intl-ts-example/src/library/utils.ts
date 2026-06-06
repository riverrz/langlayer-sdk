import type { SupportedLanguage } from "@langlayer-sdk/react";
import { YOUR_DEFAULT_LANGUAGE, YOUR_LANGUAGE_CACHE_KEY } from "./constants";

export const setDocumentLang = (language: SupportedLanguage) => {
  document.documentElement.lang = language.key;
  document.documentElement.dir = language.direction;
};

export const getInitialLanguage = () => {
  const storedLanguage = sessionStorage.getItem(YOUR_LANGUAGE_CACHE_KEY);

  if (storedLanguage) {
    return JSON.parse(storedLanguage) as SupportedLanguage;
  }

  return YOUR_DEFAULT_LANGUAGE;
};
