import { useState } from "react";
import "./App.css";
import { LanguageSwitcher } from "./components/language-switcher";
import { Homepage } from "./components/homepage";
import { FormattedMessage, IntlProvider } from "react-intl";
import ll from "./library/langlayer";
import {
  YOUR_DEFAULT_LANGUAGE,
  YOUR_LANGUAGE_CACHE_KEY,
} from "./library/constants";
import type { SupportedLanguage } from "@langlayer-sdk/react";
import { setDocumentLang } from "./library/utils";

function App() {
  const [messages, setMessages] = useState(
    ll.getMessages(ll.getCurrentLanguage()),
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    ll.getCurrentLanguage(),
  );

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    await ll.setLanguage(newLanguage.key);
    setMessages(ll.getMessages(newLanguage.key));
    setCurrentLanguage(newLanguage.key);

    setDocumentLang(newLanguage);

    sessionStorage.setItem(
      YOUR_LANGUAGE_CACHE_KEY,
      JSON.stringify(newLanguage),
    );
  };

  return (
    <IntlProvider
      messages={messages}
      locale={currentLanguage}
      defaultLocale={YOUR_DEFAULT_LANGUAGE.key}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          padding: "8px",
        }}
      >
        <label htmlFor="language-switcher" style={{ fontSize: "14px" }}>
          <FormattedMessage
            defaultMessage="Change language: "
            id="homepage.change-language"
          />
        </label>
        <LanguageSwitcher
          selectedLanguage={currentLanguage}
          onChange={handleLanguageChange}
        />
      </div>
      <Homepage />
    </IntlProvider>
  );
}

export default App;
