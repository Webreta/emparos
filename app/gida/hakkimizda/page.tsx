import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorSimplePage } from "@/components/sector/SectorPages";

export const metadata: Metadata = { title: "Hakkımızda" };

export default function Page() {
  const sector = sectors.gida;
  return (
    <SectorSimplePage sector={sector} title="Hakkımızda" text={sector.tagline}>
      <p>{sector.intro}</p>
    </SectorSimplePage>
  );
}
