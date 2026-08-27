import "./LanguageSelector.scss";

import usaFlag from "../../../assets/eng.png";
import geoFlag from "../../../assets/georgia.png";

import { useLanguageDispatch, useLanguageStateValue } from "../../../contexts/LanguageContext";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const languages = ["en", "ka"] as const;

type Language = (typeof languages)[number];

const languageFlags: Record<Language, string> = {
  en: usaFlag,
  ka: geoFlag,
};

export default function LanguageSelector() {
  const { isLanguagesVisible, activeLanguage } = useLanguageStateValue();

  const { setActiveLanguage, setIsLanguagesVisible } = useLanguageDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const languageFlag = languageFlags[activeLanguage];

  const handleToggleLanguages = () => {
    setIsLanguagesVisible(!isLanguagesVisible);
  };

  useEffect(() => {
    const languageFromPath = location.pathname.match(/^\/(en|ka)/)?.[1] as Language | undefined;

    if (languageFromPath) {
      setActiveLanguage(languageFromPath);
    }
  }, [location.pathname, setActiveLanguage]);

  return (
    <div onClick={handleToggleLanguages} className='languages-container'>
      <img src={languageFlag} alt={`${activeLanguage} language flag`} />

      {isLanguagesVisible && (
        <div className='language-dropdown'>
          {languages.map((lang) => (
            <p key={lang}>{lang}</p>
          ))}
        </div>
      )}
    </div>
  );
}
