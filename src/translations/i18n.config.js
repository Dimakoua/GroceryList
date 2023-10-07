import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ua, en } from "../translations";

//empty for now
const resources = {
    en: {
        translation: en,
    },
    ua: {
        translation: ua,
    }
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    //language to use if translations in user language are not available
    fallbackLng: "ua",
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
});




export default i18n;