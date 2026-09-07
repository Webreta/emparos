// Site dilleri: Türkçe varsayılan, İngilizce ve Fransızca seçilebilir.
// Tercih `lang` çerezinde tutulur (URL değişmez); sunucu bileşenleri getLocale() ile okur.

export const locales = ["tr", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";
export const LOCALE_COOKIE = "lang";

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (locales as readonly string[]).includes(v);
}

// Seçicide gösterilen adlar (erişilebilirlik etiketi için)
export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
};
