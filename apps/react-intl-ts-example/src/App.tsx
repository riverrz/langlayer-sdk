import { useEffect, useState } from "react";
import "./App.css";
import { LanguageSwitcher } from "./components/language-switcher";
import { Homepage } from "./components/homepage";
import { IntlProvider } from "react-intl";
import ll from "./library/langlayer";
import {
  YOUR_DEFAULT_LANGUAGE,
  YOUR_LANGUAGE_CACHE_KEY,
} from "./library/constants";

function App() {
  const [messages, setMessages] = useState(
    ll.getMessages(ll.getCurrentLanguage()),
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    ll.getCurrentLanguage(),
  );

  useEffect(() => {
    sessionStorage.setItem(YOUR_LANGUAGE_CACHE_KEY, currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = async (newLanguage: string) => {
    await ll.setLanguage(newLanguage);
    setMessages(ll.getMessages(newLanguage));
    setCurrentLanguage(newLanguage);
  };

  return (
    <IntlProvider
      messages={messages}
      locale={currentLanguage}
      defaultLocale={YOUR_DEFAULT_LANGUAGE}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          padding: "8px",
        }}
      >
        <span style={{ fontSize: "14px" }}>Change language: </span>
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
