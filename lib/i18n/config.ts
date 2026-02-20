import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import de from "./locales/de.json";
import sv from "./locales/sv.json";
import no from "./locales/no.json";
import da from "./locales/da.json";
import deAT from "./locales/de-AT.json";

export const SUPPORTED_LOCALES = ["en", "de", "sv", "no", "da", "de-AT"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Short code shown in the navbar trigger button
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  sv: "SV",
  no: "NO",
  da: "DA",
  "de-AT": "AT",
};

// Flag + name shown in the dropdown
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch",
  sv: "🇸🇪 Svenska",
  no: "🇳🇴 Norsk",
  da: "🇩🇰 Dansk",
  "de-AT": "🇦🇹 Österreichisch",
};

export const DEFAULT_LOCALE: Locale = "en";

i18next.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  resources: {
    en: { translation: en },
    de: { translation: de },
    sv: { translation: sv },
    no: { translation: no },
    da: { translation: da },
    "de-AT": { translation: deAT },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
