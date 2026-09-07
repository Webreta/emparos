import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorQuotePage } from "@/components/sector/SectorPages";
import { getLocale } from "@/lib/i18n/server";
import { localizeSector } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  return { title: ui[await getLocale()].quote.title };
}

export default async function Page() {
  const locale = await getLocale();
  return <SectorQuotePage sector={localizeSector(sectors.muhendislik, locale)} locale={locale} />;
}
