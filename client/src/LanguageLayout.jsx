import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import i18n from "./i18n";

export default function LanguageLayout() {
  const location = useLocation();

  useEffect(() => {
    const isEnglish = location.pathname.startsWith("/en");

    if (isEnglish) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ka");
    }
  }, [location.pathname]);

  return <Outlet />;
}
