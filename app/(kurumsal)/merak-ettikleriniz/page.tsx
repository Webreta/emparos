import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";

export const metadata: Metadata = { title: "Merak Ettikleriniz" };

// Sık sorulan sorular — içerik panelden yönetilir hale getirilecek
const faqs = [
  {
    q: "Emparos Global hangi alanlarda hizmet veriyor?",
    a: "Üç ana iş kolumuz var: Kraftora Pack markamızla ambalaj çözümleri, Emparos Gıda ile gıda-içecek ve temizlik ürünleri tedariki, Emparos Mühendislik ile yönetim ve mühendislik danışmanlığı.",
  },
  {
    q: "Ambalaj siparişleri için nereye başvurmalıyım?",
    a: "Ambalaj çözümleri Kraftora Pack bünyesinde yürütülür; kraftorapack.com üzerinden ürünleri inceleyebilir ve teklif talep edebilirsiniz.",
  },
  {
    q: "Gıda ve içecek ürünlerinde minimum sipariş miktarı var mı?",
    a: "Ürün grubuna ve markaya göre değişir. İhtiyacınızı iletişim formundan paylaşın, ekibimiz size özel teklif hazırlasın.",
  },
  {
    q: "Yurt dışına tedarik yapıyor musunuz?",
    a: "Evet. Global tedarik ağımızla ihracat ve ithalat süreçlerinde uçtan uca destek veriyoruz.",
  },
  {
    q: "Mühendislik danışmanlığı süreci nasıl işliyor?",
    a: "Önce ücretsiz ön görüşme ve ihtiyaç analizi yapılır; ardından kapsam, süre ve çıktıların netleştiği bir teklif sunulur. Proje boyunca düzenli raporlama yapılır.",
  },
];

export default function FaqPage() {
  return (
    <CoverPage eyebrow="Sık Sorulan Sorular" title="Merak Ettikleriniz">
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="group rounded-2xl border border-white/10 bg-white/5 open:bg-white/[0.08]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white">
              {f.q}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4 shrink-0 text-gold-400 transition group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/75">{f.a}</p>
          </details>
        ))}
      </div>
    </CoverPage>
  );
}
