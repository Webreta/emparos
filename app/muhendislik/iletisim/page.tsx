import type { Metadata } from "next";
import { sectors } from "@/lib/sectors";
import { SectorSimplePage } from "@/components/sector/SectorPages";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "İletişim" };

export default function Page() {
  return (
    <SectorSimplePage sector={sectors.muhendislik} title="İletişim" text="Teklif ve bilgi için bize ulaşın.">
      <ul className="space-y-2">
        <li>{site.address}</li>
        <li><a href={site.phoneHref} className="font-semibold text-ink">{site.phone}</a></li>
        <li><a href={`mailto:${site.email}`} className="font-semibold text-ink">{site.email}</a></li>
      </ul>
      <p className="mt-6">İletişim formu bir sonraki adımda bağlanacak.</p>
    </SectorSimplePage>
  );
}
