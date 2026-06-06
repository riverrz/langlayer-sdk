import { createLangLayer } from "@langlayer-sdk/react";

const ll = createLangLayer({
  organizationSlug: "langlayer-sdk-examples-OVXRVE",
  projectSlug: "react-intl-ts-bsPf3v",
  fallbackLanguage: "en",
  enableDevtools: new URLSearchParams(window.location.search).has(
    "previewToken",
  ),
});

export default ll;
