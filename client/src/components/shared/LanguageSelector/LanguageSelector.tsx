import "./LanguageSelector.scss";
import usaFlag from "../../../assets/eng.png";
import geoFlag from "../../../assets/georgia.png";
import { useLanguageDispatch, useLanguageStateValue } from "../../../contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

type Language = "en" | "ka";

const languages: Language[] = ["en", "ka"];

const languageFlags: Record<Language, string> = {
  en: usaFlag,
  ka: geoFlag,
};

const languageLabels: Record<Language, string> = {
  en: "English",
  ka: "ქართული",
};

export default function LanguageSelector() {
  const { isLanguagesVisible, activeLanguage } = useLanguageStateValue();
  const { setActiveLanguage, setIsLanguagesVisible } = useLanguageDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const languageFlag = languageFlags[activeLanguage as Language];

  useEffect(() => {
    const language: Language = location.pathname.startsWith("/en") ? "en" : "ka";

    if (language !== activeLanguage) {
      setActiveLanguage(language);
    }
  }, [location.pathname, activeLanguage, setActiveLanguage]);

  const handleToggleLanguages = () => {
    setIsLanguagesVisible(!isLanguagesVisible);
  };

  const handleLanguageChange = (language: Language) => {
    if (language === activeLanguage) {
      setIsLanguagesVisible(false);
      return;
    }

    const newPath = location.pathname.replace(/^\/(en|ka)/, "");

    setActiveLanguage(language);
    setIsLanguagesVisible(false);

    if (language === "ka") {
      navigate(newPath);
      return;
    }

    navigate(`/${language}${newPath}`);
  };

  return (
    <div onClick={handleToggleLanguages} className='languages-container'>
      <img src={languageFlag} alt={`${languageLabels[activeLanguage as Language]} flag`} />

      {isLanguagesVisible && (
        <div className='bg-white overflow-hidden flex flex-col items-center text-center justify-center rounded-lg absolute left-0 top-[40px] w-full'>
          {languages.map((language) => (
            <button
              key={language}
              type='button'
              className='hover:bg-slate-200 cursor-pointer w-full text-black px-2 text-[18px]'
              onClick={(event) => {
                event.stopPropagation();
                handleLanguageChange(language);
              }}
            >
              {languageLabels[language]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
