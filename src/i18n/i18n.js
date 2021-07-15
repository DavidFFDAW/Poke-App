import i18n from "i18next";
import es_ES from './language/es_ES';
import en_EN from './language/en_EN';
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    lng: "es",
    fallbackLng: "en",
    returnObjects: true,
    interpolation: { escapeValues: false },
    resources: {
        es: es_ES,
        en: en_EN,
    }
});

export default i18n;