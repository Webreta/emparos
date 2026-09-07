import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorHeader } from "@/components/sector/SectorHeader";
import { SectorFooter } from "@/components/sector/SectorFooter";
import { FloatButtons } from "@/components/site/FloatButtons";
import { getLocale } from "@/lib/i18n/server";
import { localizeSector } from "@/lib/i18n/content";

export async function generateMetadata(): Promise<Metadata> {
  const sector = localizeSector(sectors.gida, await getLocale());
  return { title: { default: sector.name, template: `%s | ${sector.name}` } };
}

// Gıda alt sitesi: kendi header, renk ve menü yapısı. Dil çerezden okunur, veri yerelleştirilir.
export default async function SectorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const sector = localizeSector(sectors.gida, locale);
  return (
    <>
      <SectorHeader sector={sector} locale={locale} />
      <main>{children}</main>
      <SectorFooter sector={sector} locale={locale} />
      <FloatButtons locale={locale} />
    </>
  );
}
