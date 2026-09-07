import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorCategoryPage } from "@/components/sector/SectorPages";
import { getLocale } from "@/lib/i18n/server";
import { localizeSector } from "@/lib/i18n/content";

const base = sectors.gida;

type Params = Promise<{ slug: string; kategori: string }>;

// Dil çerezine göre içerik değiştiği için istek anında üretilir (statik ön üretim yok)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, kategori } = await params;
  const sector = localizeSector(base, await getLocale());
  const item = sector.items.find((i) => i.slug === slug);
  const cat = item?.products?.find((p) => p.slug === kategori);
  return { title: cat ? `${cat.name} | ${item!.title}` : sector.name };
}

type SearchParams = Promise<{ k?: string }>;

// ?k=slug,slug → filtrede çoklu seçim (CategoryFilter bileşeni yazar)
export default async function Page({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { slug, kategori } = await params;
  const { k } = await searchParams;
  const locale = await getLocale();
  const selected = k ? k.split(",").filter(Boolean) : [];
  return (
    <SectorCategoryPage sector={localizeSector(base, locale)} slug={slug} category={kategori} selected={selected} locale={locale} />
  );
}
