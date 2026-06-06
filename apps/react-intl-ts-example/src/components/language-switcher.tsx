type LanguageSwitcherProps = {
  onChange: (lang: string) => void;
  selectedLanguage: string;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onChange,
  selectedLanguage,
}) => {
  return (
    <select value={selectedLanguage} onChange={(e) => onChange(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="ar">Arabic</option>
      <option value="ur">Urdu</option>
      <option value="zh">Chinese</option>
    </select>
  );
};
