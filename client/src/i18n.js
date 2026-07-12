import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import ka from "./translations/ka.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ka: {
      translation: ka,
    },
  },
  lng: "ka",
  fallbackLng: "ka",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
