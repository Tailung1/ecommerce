import "./LanguageSelector.scss";
import usaFlag from "../../../assets/eng.png";
import geoFlag from "../../../assets/georgia.png";
import { useLanguageDispatch, useLanguageStateValue } from "../../../contexts/LanguageContext";

export default function LanguageSelector() {
  const { isLanguagesVisible, activeLanguage } = useLanguageStateValue();
  const { setActiveLanguage, setIsLanguagesVisible } = useLanguageDispatch();
  let languageFlag = activeLanguage === "EN" ? usaFlag : geoFlag;
  const handleToggleLanguges = () => {
    setIsLanguagesVisible(isLanguagesVisible ? false : true);
  };
  const languages = ["EN", "GE"];
  return (
    <div onClick={handleToggleLanguges} className='languages-container'>
      <img src={languageFlag} alt='Language flag' />
      {isLanguagesVisible && (
        <div className='bg-white overflow-hidden flex flex-col items-center text-center justify-center rounded-lg  absolute left-0 top-[40px] w-full'>
          {languages.map((lang) => (
            <p
              className='hover:bg-slate-200 cursor-pointer w-full text-black px-2 text-[18px]'
              onClick={() => setActiveLanguage(lang as "EN" | "GE")}
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
