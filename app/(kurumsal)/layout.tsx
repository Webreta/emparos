import { CoverHeader } from "@/components/site/CoverHeader";
import { FloatButtons } from "@/components/site/FloatButtons";
import { getLocale } from "@/lib/i18n/server";

// Kurumsal katman: ana sayfa cover'ı ve Emparos'a ait sayfalar.
// Footer yok: her sayfa tam ekran cover olarak durur.
export const dynamic = "force-dynamic";

export default async function KurumsalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <div className="bg-navy-950">
      <CoverHeader locale={locale} />
      <main>{children}</main>
      <FloatButtons locale={locale} />
    </div>
  );
}
