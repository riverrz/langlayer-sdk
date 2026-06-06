import { useState } from "react";
import "./App.css";
import type { SupportedLanguage } from "@langlayer-sdk/react";
import { useMessages } from "@langlayer-sdk/react/hooks";
import { LanguageSwitcher } from "./components/language-switcher";
import { Homepage } from "./components/homepage";
import { FormattedMessage, IntlProvider } from "react-intl";
import ll from "./library/langlayer";
import {
  YOUR_DEFAULT_LANGUAGE,
  YOUR_LANGUAGE_CACHE_KEY,
} from "./library/constants";
import { setDocumentLang } from "./library/utils";

function App() {
  // You can maintain messages in a local state
  // Doing so will prevent messages to update when they are updated via devtools

  // const [messages, setMessages] = useState(
  //   ll.getMessages(ll.getCurrentLanguage()),
  // );

  // You can also use the useMessages hook provided by @langlayer-sdk/react
  // This will allow devtools to update the messages
  const messages = useMessages(ll);

  const [currentLanguage, setCurrentLanguage] = useState(
    ll.getCurrentLanguage(),
  );

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    // Set language in ll to trigger fetching corresponding messages
    await ll.setLanguage(newLanguage.key);

    // Set messages in your local state if you are using it
    // setMessages(ll.getMessages(newLanguage.key));
    setCurrentLanguage(newLanguage.key);

    setDocumentLang(newLanguage);

    // Set the language in your persistence layer
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
            defaultMessage="Change language:"
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
