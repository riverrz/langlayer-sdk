import { useState } from "react";
import "./App.css";
import { LanguageSwitcher } from "./components/language-switcher";
import { Homepage } from "./components/homepage";
import { IntlProvider } from "react-intl";
import { YOUR_DEFAULT_LANGUAGE } from "./utils/constants";
import enMessages from "./locales/en.json";

function App() {
  const [messages, setMessages] = useState(enMessages);
  const [currentLanguage, setCurrentLanguage] = useState(YOUR_DEFAULT_LANGUAGE);

  const handleLanguageChange = async (newLanguage: string) => {
    const newMessages = (await import(`./locales/${newLanguage}.json`)).default;

    setMessages(newMessages);
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
