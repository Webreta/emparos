import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

// Geçerli dil: çerezden okunur, yoksa Türkçe. Yalnızca sunucu tarafında kullanılır.
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get(LOCALE_COOKIE)?.value;
  return isLocale(v) ? v : defaultLocale;
}
