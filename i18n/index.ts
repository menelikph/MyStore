import en from "./translations/es.json";
import es from "./translations/en.json";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const messages = { en, es };

export function getLocaleDisplayName(locale: Locale) {
  return locale === "en" ? "English" : "Español";
}
