import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ll from "./library/langlayer.ts";
import "./index.css";
import App from "./App.tsx";
import { getInitialLanguage, setDocumentLang } from "./library/utils.ts";

const initialLanguage = getInitialLanguage();

// Bootstrap
try {
  await ll.init(initialLanguage.key);

  setDocumentLang(initialLanguage);
} catch (error) {
  console.error(error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
