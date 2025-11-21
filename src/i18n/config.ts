import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import id from './locales/id.json';

// Detect language from Telegram WebApp
const getTelegramLanguage = (): string => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tgLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
    if (tgLang === 'hi' || tgLang === 'id') return tgLang;
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      id: { translation: id },
    },
    lng: getTelegramLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
