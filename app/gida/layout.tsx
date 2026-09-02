import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorHeader } from "@/components/sector/SectorHeader";
import { SectorFooter } from "@/components/sector/SectorFooter";
import { FloatButtons } from "@/components/site/FloatButtons";

const sector = sectors.gida;

export const metadata: Metadata = {
  title: { default: sector.name, template: `%s | ${sector.name}` },
};

// Gıda alt sitesi: kendi header, renk ve menü yapısı
export default function SectorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SectorHeader sector={sector} />
      <main>{children}</main>
      <SectorFooter sector={sector} />
      <FloatButtons />
    </>
  );
}
