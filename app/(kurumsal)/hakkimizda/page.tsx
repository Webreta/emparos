import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { divisions } from "@/lib/divisions";

export const metadata: Metadata = { title: "Hakkımızda" };

const values = [
  { title: "Güven", text: "Her iş kolunda şeffaf, ölçülebilir ve sürdürülebilir iş ortaklıkları kurarız." },
  { title: "Uzmanlık", text: "Ambalaj, tedarik ve mühendislikte alanında deneyimli ekiplerle çalışırız." },
  { title: "Erişim", text: "İzmir merkezli yapımızla yerel ve küresel pazarları birbirine bağlarız." },
];

export default function AboutPage() {
  return (
    <CoverPage eyebrow="Connecting Markets. Managing Trust." title="Hakkımızda">
      <div className="space-y-6 text-white/80">
        <p className="text-lg leading-relaxed text-white">
          Emparos Global; ambalaj üretiminden gıda-içecek ve temizlik ürünleri
          tedarikine, mühendislik danışmanlığından proje yönetimine uzanan üç iş
          kolunu tek çatı altında toplayan İzmir merkezli bir şirkettir.
        </p>
        <p className="leading-relaxed">
          Her iş kolumuz kendi uzman kadrosu ve iş ortağı ağıyla çalışır; ortak
          paydamız ise pazarları birleştirmek ve güveni yönetmektir. Kraftora Pack
          markamızla ambalaj, Emparos Gıda ile ürün tedariki, Emparos Mühendislik
          ile danışmanlık hizmetleri sunuyoruz.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="block h-1 w-8 rounded-full bg-gold-500" />
              <h2 className="mt-3 font-bold text-white">{v.title}</h2>
              <p className="mt-1 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold-400">İş Kollarımız</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {divisions.map((d) => (
              <li key={d.key}>
                <a
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span className={`size-2 rounded-full ${d.accent}`} />
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CoverPage>
  );
}
