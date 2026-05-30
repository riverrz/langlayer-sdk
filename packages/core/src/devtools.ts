import { LangLayer } from "./LangLayer";
import {
  DEVTOOLS_ALLOWED_ORIGINS,
  LANGLAYER_API_URL,
} from "./library/constants";
import {
  ApiResponse,
  ContentPreviewMetadata,
  IFrameMessage,
  TranslationTree,
} from "./library/types";

export const initializeDevTools = async <TDict extends TranslationTree>(
  core: LangLayer<TDict>,
) => {
  try {
    const searchParams = new URLSearchParams(window.location.search);

    const previewToken = searchParams.get("previewToken");

    if (!previewToken) {
      throw new Error(
        "[LangLayer] - Failed to initialize devtools. Cause: Missing previewToken from url search params",
      );
    }

    const metadata = await getContentPreviewMetadata(previewToken);

    const isValidated = core.validateConfig(metadata);

    if (!isValidated) {
      throw new Error(
        `[LangLayer] - Failed to initialize devtools. Cause: Configuration mismatch.`,
      );
    }

    attachIframeListener(core);

    console.log("[LangLayer] - Successfully initialized devtools");
  } catch (error) {
    console.error(error);
  }
};

async function getContentPreviewMetadata(previewToken: string) {
  const res = await fetch(
    `${LANGLAYER_API_URL}/content/preview/metadata?previewToken=${previewToken}`,
  );

  const response = (await res.json()) as ApiResponse<ContentPreviewMetadata>;

  if (!response.success) {
    throw new Error(
      `[LangLayer] - Failed to fetch preview metadata. Cause: ${response.error}`,
    );
  }

  return response.data;
}

async function attachIframeListener<TDict extends TranslationTree>(
  core: LangLayer<TDict>,
) {
  window.addEventListener("message", (event) => {
    if (!DEVTOOLS_ALLOWED_ORIGINS.includes(event.origin)) {
      return;
    }

    const data = event.data as IFrameMessage<TDict>;

    switch (data.type) {
      case "translations:updateText": {
        core.updateText(
          data.payload.lang,
          data.payload.key,
          data.payload.value,
        );
        break;
      }
    }
  });
}
