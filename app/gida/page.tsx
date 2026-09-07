import { sectors } from "@/lib/sectors";
import { SectorHome } from "@/components/sector/SectorPages";
import { getLocale } from "@/lib/i18n/server";
import { localizeSector } from "@/lib/i18n/content";

export default async function Page() {
  const locale = await getLocale();
  return <SectorHome sector={localizeSector(sectors.gida, locale)} locale={locale} />;
}
