import { useMyContext } from "../../MyContext";
import useFlag from "../../assets/eng.png";
import geoFlag from "../../assets/georgia.png";

export default function LanguageSelector() {
  const {
    showLanguages,
    setShowLanguages,
    currentLanguage,
    setCurrentLanguage,
  } = useMyContext();

  let languageFlag = currentLanguage === "EN" ? useFlag : geoFlag;

  const handleToggleLanguges = () => {
    setShowLanguages((prev) => !prev);
  };
  const handleSelectLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const languages = ["EN", "GE"];

  return (
    <div
      onClick={handleToggleLanguges}
      className='languages-container'
    >
      <img src={languageFlag} alt='Language flag' />
      {showLanguages && (
        <div className='bg-white overflow-hidden flex flex-col items-center text-center justify-center rounded-lg  absolute left-0 top-[40px] w-full'>
          {languages.map((lang) => (
            <p
              className='hover:bg-slate-200 cursor-pointer w-full text-black px-2 text-[18px]'
              onClick={() => handleSelectLanguage(lang)}
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
