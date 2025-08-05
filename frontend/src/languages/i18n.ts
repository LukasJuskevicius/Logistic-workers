import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './en.json';
import nlTranslations from './nl.json';
import plTranslations from './pl.json';
import roTranslations from './ro.json';
import ukTranslations from './uk.json';
import ltTranslations from './lt.json';

const resources = {
  en: { translation: enTranslations },
  nl: { translation: nlTranslations },
  pl: { translation: plTranslations },
  ro: { translation: roTranslations },
  uk: { translation: ukTranslations },
  lt: { translation: ltTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;