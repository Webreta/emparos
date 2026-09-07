import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorItemPage } from "@/components/sector/SectorPages";
import { getLocale } from "@/lib/i18n/server";
import { localizeSector } from "@/lib/i18n/content";

const base = sectors.muhendislik;

// Dil çerezine göre içerik değiştiği için istek anında üretilir (statik ön üretim yok)
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = localizeSector(base, await getLocale());
  const item = sector.items.find((i) => i.slug === slug);
  return { title: item?.title ?? sector.name };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  return <SectorItemPage sector={localizeSector(base, locale)} slug={slug} locale={locale} />;
}
