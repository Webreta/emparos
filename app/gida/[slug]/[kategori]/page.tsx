import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorCategoryPage } from "@/components/sector/SectorPages";

const sector = sectors.gida;

type Params = Promise<{ slug: string; kategori: string }>;

// Yalnızca ürün listesi olan kategoriler için sayfa üretilir
export function generateStaticParams() {
  return sector.items.flatMap((i) =>
    (i.products ?? [])
      .filter((p) => p.products?.length)
      .map((p) => ({ slug: i.slug, kategori: p.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, kategori } = await params;
  const item = sector.items.find((i) => i.slug === slug);
  const cat = item?.products?.find((p) => p.slug === kategori);
  return { title: cat ? `${cat.name} | ${item!.title}` : sector.name };
}

export default async function Page({ params }: { params: Params }) {
  const { slug, kategori } = await params;
  return <SectorCategoryPage sector={sector} slug={slug} category={kategori} />;
}
