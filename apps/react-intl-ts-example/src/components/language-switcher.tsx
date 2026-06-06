import { useEffect, useState } from "react";
import ll from "../library/langlayer";
import type { SupportedLanguage } from "@langlayer-sdk/react";

type LanguageSwitcherProps = {
  onChange: (language: SupportedLanguage) => void;
  selectedLanguage: string;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onChange,
  selectedLanguage,
}) => {
  const [languages, setLanguages] = useState<SupportedLanguage[]>([]);

  useEffect(() => {
    ll.getSupportedLanguages()
      .then((supportedLanguages) => setLanguages(supportedLanguages))
      .catch(console.error);
  }, []);

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => {
        const newSelectedLanguageKey = e.target.value;

        const language = languages.find(
          ({ key }) => key === newSelectedLanguageKey,
        )!;

        onChange(language);
      }}
      id="language-switcher"
    >
      {languages.map(({ key, name }) => (
        <option value={key} key={key}>
          {name}
        </option>
      ))}
    </select>
  );
};
