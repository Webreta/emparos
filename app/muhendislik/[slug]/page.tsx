import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorItemPage } from "@/components/sector/SectorPages";

const sector = sectors.muhendislik;

export function generateStaticParams() {
  return sector.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = sector.items.find((i) => i.slug === slug);
  return { title: item?.title ?? sector.name };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SectorItemPage sector={sector} slug={slug} />;
}
