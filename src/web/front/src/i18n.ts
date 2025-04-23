import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "pt"],
    fallbackLng: "pt",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    ns: ["translation"],
    defaultNS: "translation",
    resources: {},
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });


export default i18n;

