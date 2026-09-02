import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorQuotePage } from "@/components/sector/SectorPages";

export const metadata: Metadata = { title: "Teklif Alın" };

export default function Page() {
  return <SectorQuotePage sector={sectors.gida} />;
}
