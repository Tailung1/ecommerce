import "./LanguageSelector.scss";
import usaFlag from "../../../assets/eng.png";
import geoFlag from "../../../assets/georgia.png";
import { useLanguageDispatch, useLanguageStateValue } from "../../../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Language = "en" | "ka";

const languages: Language[] = ["en", "ka"];

const languageFlags: Record<Language, string> = {
  en: usaFlag,
  ka: geoFlag,
};

const languageLabels: Record<Language, string> = {
  en: "EN",
  ka: "GE",
};

const getLanguageFromPath = (pathname: string): Language => {
  const [, language] = pathname.split("/");

  return language === "en" ? "en" : "ka";
};

const getLocalizedPath = (pathname: string, language: Language): string => {
  const pathWithoutLanguage = pathname.replace(/^\/en/, "");

  if (language === "ka") {
    return pathWithoutLanguage || "/";
  }

  return `/en${pathWithoutLanguage}`;
};

export default function LanguageSelector() {
  const { isLanguagesVisible, activeLanguage } = useLanguageStateValue();

  const { setActiveLanguage, setIsLanguagesVisible } = useLanguageDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage: Language = activeLanguage === "en" ? "en" : "ka";

  const activeLanguageFlag = languageFlags[currentLanguage];

  useEffect(() => {
    const languageFromPath = getLanguageFromPath(location.pathname);

    if (languageFromPath !== activeLanguage) {
      setActiveLanguage(languageFromPath);
    }
  }, [location.pathname, activeLanguage, setActiveLanguage]);

  const handleToggleLanguages = () => {
    setIsLanguagesVisible(!isLanguagesVisible);
  };

  const handleLanguageChange = (language: Language) => {
    setIsLanguagesVisible(false);

    if (language === currentLanguage) {
      return;
    }

    const localizedPath = getLocalizedPath(location.pathname, language);

    navigate(localizedPath);
  };

  return (
    <div className='languages-container relative'>
      <button
        type='button'
        onClick={handleToggleLanguages}
        aria-label={`Current language: ${languageLabels[currentLanguage]}`}
        aria-expanded={isLanguagesVisible}
        aria-haspopup='listbox'
        className='flex items-center'
      >
        <img src={activeLanguageFlag} alt='' aria-hidden='true' />
      </button>

      {isLanguagesVisible && (
        <div
          role='listbox'
          aria-label='Select language'
          className='bg-white overflow-hidden flex flex-col items-center text-center justify-center rounded-lg absolute left-0 top-[40px] w-full'
        >
          {languages.map((language) => (
            <button
              key={language}
              type='button'
              role='option'
              aria-selected={language === currentLanguage}
              className='hover:bg-slate-200 cursor-pointer w-full text-black px-2 text-[18px]'
              onClick={() => handleLanguageChange(language)}
            >
              {languageLabels[language]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
