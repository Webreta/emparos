import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorBrandsPage } from "@/components/sector/SectorPages";

export const metadata: Metadata = { title: "Markalar" };

export default function Page() {
  return <SectorBrandsPage sector={sectors.gida} />;
}
