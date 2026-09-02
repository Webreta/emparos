import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorContactPage } from "@/components/sector/SectorPages";

export const metadata: Metadata = { title: "İletişim" };

export default function Page() {
  return <SectorContactPage sector={sectors.gida} />;
}
