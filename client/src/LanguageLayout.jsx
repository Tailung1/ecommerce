import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import i18n from "./i18n";
import { i } from "vite/dist/node/chunks/moduleRunnerTransport";

export default function LanguageLayout() {
  const lang = useParams();
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("ka");
    }
  }, [lang]);
  return <Outlet />;
}
