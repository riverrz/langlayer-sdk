import { YOUR_LANGUAGE_CACHE_KEY } from "./library/constants";
import ll from "./library/langlayer";

export const setupLanguageSwitcher = async (element: HTMLSelectElement) => {
  const supportedLanguages = await ll.getSupportedLanguages();

  supportedLanguages?.forEach(({ key, name }) => {
    const optionElm = document.createElement("option");
    optionElm.value = key;
    optionElm.textContent = name;

    optionElm.selected = key === ll.getCurrentLanguage();

    element.appendChild(optionElm);
  });

  element.addEventListener("change", () => {
    const newSelectedLanguage = element.value;

    // Update LangLayer language and refresh data-llKey translations.
    // Does not refresh translations rendered via t().

    // await ll.setLanguage(newSelectedLanguage);

    sessionStorage.setItem(YOUR_LANGUAGE_CACHE_KEY, newSelectedLanguage);

    // Force full translation reload (data-llKey + t())
    window.location.reload();
  });
};
