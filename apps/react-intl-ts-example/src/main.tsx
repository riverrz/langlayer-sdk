import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ll from "./library/langlayer.ts";
import "./index.css";
import App from "./App.tsx";
import {
  YOUR_DEFAULT_LANGUAGE,
  YOUR_LANGUAGE_CACHE_KEY,
} from "./library/constants.ts";

const initialLanguage =
  sessionStorage.getItem(YOUR_LANGUAGE_CACHE_KEY) || YOUR_DEFAULT_LANGUAGE;

// Bootstrap
try {
  await ll.init(initialLanguage);
} catch (error) {
  console.error(error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
