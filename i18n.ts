import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// @ts-ignore
const en = require("@/locales/en/translation.json");
// @ts-ignore
const es = require("@/locales/es/translation.json");

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Conecta con React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "es", // Idioma por defecto si no detecta
    interpolation: {
      escapeValue: false, // No hace falta con React
    },
  });

export default i18n;
