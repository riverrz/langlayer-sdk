import { createLangLayer } from "@langlayer/vanilla";

const ll = createLangLayer({
  organizationSlug: "langlayer-sdk-examples-OVXRVE",
  projectSlug: "vanilla-ts-l1BqJs",
  fallbackLanguage: "en",
  enableDevtools: new URLSearchParams(window.location.search).has(
    "previewToken",
  ),
});

export default ll;
