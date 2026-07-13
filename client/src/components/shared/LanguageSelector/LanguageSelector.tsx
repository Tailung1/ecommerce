import "./LanguageSelector.scss";
import usaFlag from "../../../assets/eng.png";
import geoFlag from "../../../assets/georgia.png";
import { useLanguageDispatch, useLanguageStateValue } from "../../../contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageSelector() {
  const { isLanguagesVisible, activeLanguage } = useLanguageStateValue();
  const { setActiveLanguage, setIsLanguagesVisible } = useLanguageDispatch();
  let languageFlag = activeLanguage === "en" ? usaFlag : geoFlag;
  const handleToggleLanguges = () => {
    setIsLanguagesVisible(isLanguagesVisible ? false : true);
  };
  const languages = ["en", "ka"];
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div onClick={handleToggleLanguges} className='languages-container'>
      <img src={languageFlag} alt='Language flag' />
      {isLanguagesVisible && (
        <div className='bg-white overflow-hidden flex flex-col items-center text-center justify-center rounded-lg  absolute left-0 top-[40px] w-full'>
          {languages.map((lang) => (
            <p
              className='hover:bg-slate-200 cursor-pointer w-full text-black px-2 text-[18px]'
              onClick={() => {
                setActiveLanguage(lang as "en" | "ka");
                if (lang === activeLanguage) return;
                if (lang === "ka") {
                  const path = location.pathname;
                  const newPath = path.replace(/^\/(en|ka)/, "");
                  navigate(`${newPath}`);
                  return;
                }
                navigate(`/${lang}${location.pathname}`);
                // window.location.reload();
              }}
              key={lang}
            >
              {lang}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
