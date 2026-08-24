import { CoverHeader } from "@/components/site/CoverHeader";
import { FloatButtons } from "@/components/site/FloatButtons";

// Kurumsal katman: ana sayfa cover'ı ve Emparos'a ait sayfalar.
// Footer yok — her sayfa tam ekran cover olarak durur.
export const dynamic = "force-dynamic";

export default function KurumsalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-navy-950">
      <CoverHeader />
      <main>{children}</main>
      <FloatButtons />
    </div>
  );
}
