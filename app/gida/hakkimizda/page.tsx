import type { Metadata } from "next";
import Image from "next/image";
import { sectors } from "@/lib/sectors";
import { SectorSimplePage } from "@/components/sector/SectorPages";

export const metadata: Metadata = { title: "Hakkımızda" };

export default function Page() {
  const sector = sectors.gida;
  return (
    <SectorSimplePage sector={sector} title="Hakkımızda" text={sector.tagline}>
      <div className="space-y-4">
        <div className="relative mb-8 h-72 overflow-hidden rounded-3xl">
          <Image
            src="/gida/hakkimizda.jpg"
            alt="Emparos Gıda depo ve sevkiyat operasyonu"
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
        <p>
          Emparos Gıda, Emparos Global çatısı altında faaliyet gösteren gıda, içecek ve temizlik
          ürünleri tedarik markasıdır. İzmir merkezli operasyonumuzla; market zincirleri, toptancılar,
          ev dışı tüketim noktaları ve ihracat müşterileri için dünya markalarının ürünlerini güvenilir
          ve sürdürülebilir biçimde tedarik ediyoruz.
        </p>
        <p>
          Coca-Cola, Red Bull ve Haribo başta olmak üzere uluslararası markaların içecek, şekerleme ve
          atıştırmalık gruplarında; kağıt havlu, tuvalet kağıdı ve temizlik sarf malzemelerinde koliden
          konteynere uzanan esnek sipariş hacimleriyle çalışıyoruz.
        </p>
        <p>
          Önceliğimiz; orijinal ürün, doğru fiyat ve zamanında teslimat. Tedarik zincirinin her
          adımını — depolama, lojistik, gümrük ve ihracat dahil — tek noktadan yöneterek iş
          ortaklarımızın operasyon yükünü azaltıyoruz.
        </p>
      </div>
    </SectorSimplePage>
  );
}
