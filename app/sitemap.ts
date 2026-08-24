import type { MetadataRoute } from "next";
import { getTechnicalSettings } from "@/lib/data/technical";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const technical = await getTechnicalSettings();
  const now = new Date();
  // Panelden yönetilen sabit sayfalar; dinamik içerik sayfaları eklendikçe buraya gelir
  return technical.sitemap.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: now,
  }));
}
