import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ua, en, es, fr, de, pt, zh, ja, ko, it } from "../translations";
import { findBestLanguageTag, getLocales } from "react-native-localize";

//empty for now
const resources = {
    'en': {
        translation: en,
    },
    'uk': {
        translation: ua,
    },
    'es': {
        translation: es,
    },
    'fr': {
        translation: fr,
    },
    'de': {
        translation: de,
    },
    'pt': {
        translation: pt,
    },
    'zh': {
        translation: zh,
    },
    'ja': {
        translation: ja,
    },
    'ko': {
        translation: ko,
    },
    'it': {
        translation: it,
    }
};

const primaryLanguage = findBestLanguageTag(Object.keys(resources));

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: primaryLanguage.languageTag, // Default language
    //language to use if translations in user language are not available
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
});




export default i18n;