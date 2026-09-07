import { SplitHero } from "@/components/site/SplitHero";
import { getLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  return <SplitHero locale={locale} />;
}
