// import i18n from "i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// i18n.use(Backend)
// 	.use(LanguageDetector)
// 	.use(initReactI18next)
// 	.init({
// 		backend: {
// 			// translation file path
// 			loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
// 		},
// 		fallbackLng: "en",
// 		// disabled in production
// 		debug: false,
// 		// can have multiple namespaces, in case you want to divide a huge
// 		// translation into smaller pieces and load them on demand
// 		ns: [ "common","shop" ],

// 		interpolation: {
// 			espaceValue: false,
// 			formatSeparator: ",",
// 		},
// 		react: {
// 			wait: true,
// 		},
// 	});

// export default i18n;

// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import czTranslations from './locales/cz.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      cz: { translation: czTranslations },
      // Add more languages as needed
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
