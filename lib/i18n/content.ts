import type { Locale } from "@/lib/i18n/config";
import { divisions, type Division } from "@/lib/divisions";
import type { Sector, SectorItem, ProductCategory } from "@/lib/sectors";
import { contentEn } from "@/lib/i18n/content.en";
import { contentFr } from "@/lib/i18n/content.fr";

// İçerik çevirileri: Türkçe kaynak veri (lib/divisions.ts, lib/sectors.ts, kurumsal sayfalar) üzerine
// dil bazlı "üst yazım" uygulanır. Türkçe için hiçbir şey değişmez; ürün adları her dilde aynı kalır.

export type SectorOverride = {
  name: string;
  tagline: string;
  intro: string;
  itemsLabel: string;
  items: Record<string, { title: string; text: string; paragraphs?: string[]; scope?: string[]; productsLabel?: string; alt?: string }>;
  categories?: Record<string, { name: string; desc: string }>;
  features?: { title: string; text: string }[]; // sıra Türkçe kaynakla aynı
  process?: { title: string; text: string }[];
};

export type ContentOverrides = {
  divisions: Record<Division["key"], { title: string; subtitle: string; text: string; cta: string }>;
  sectors: Record<Sector["key"], SectorOverride>;
  cover: {
    about: { lead: string; body: string; values: { title: string; text: string }[] };
    faq: { q: string; a: string }[];
    footerTagline: string;
  };
};

// Türkçe kaynak metinleri (kurumsal sayfalar için burada tutulur; sayfalar bunu dil bazlı okur)
export const coverTr: ContentOverrides["cover"] = {
  about: {
    lead:
      "Emparos Global; ambalaj üretiminden gıda-içecek ve temizlik ürünleri tedarikine, mühendislik danışmanlığından proje yönetimine uzanan üç iş kolunu tek çatı altında toplayan İzmir merkezli bir şirkettir.",
    body:
      "Her iş kolumuz kendi uzman kadrosu ve iş ortağı ağıyla çalışır; ortak paydamız ise pazarları birleştirmek ve güveni yönetmektir. Kraftora Pack markamızla ambalaj, Emparos Gıda ile ürün tedariki, Emparos Mühendislik ile danışmanlık hizmetleri sunuyoruz.",
    values: [
      { title: "Güven", text: "Her iş kolunda şeffaf, ölçülebilir ve sürdürülebilir iş ortaklıkları kurarız." },
      { title: "Uzmanlık", text: "Ambalaj, tedarik ve mühendislikte alanında deneyimli ekiplerle çalışırız." },
      { title: "Erişim", text: "İzmir merkezli yapımızla yerel ve küresel pazarları birbirine bağlarız." },
    ],
  },
  faq: [
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
  ],
  footerTagline:
    "Connecting Markets. Managing Trust. Ambalaj, gıda-içecek tedariki ve mühendislik danışmanlığında pazarları birleştiren güvenilir iş ortağınız.",
};

const overrides: Partial<Record<Locale, ContentOverrides>> = { en: contentEn, fr: contentFr };

export function coverContent(locale: Locale): ContentOverrides["cover"] {
  return overrides[locale]?.cover ?? coverTr;
}

// İş kolları (kapak sitesi) dil bazlı
export function localizeDivisions(locale: Locale): Division[] {
  const o = overrides[locale]?.divisions;
  if (!o) return divisions;
  return divisions.map((d) => ({ ...d, ...o[d.key] }));
}

function localizeCategory(c: ProductCategory, cats?: SectorOverride["categories"]): ProductCategory {
  const o = cats?.[c.slug];
  return o ? { ...c, name: o.name, desc: o.desc } : c;
}

function localizeItem(it: SectorItem, o: SectorOverride): SectorItem {
  const io = o.items[it.slug];
  const products = it.products?.map((c) => localizeCategory(c, o.categories));
  if (!io) return { ...it, products };
  return {
    ...it,
    title: io.title,
    text: io.text,
    paragraphs: io.paragraphs ?? it.paragraphs,
    scope: io.scope ?? it.scope,
    productsLabel: io.productsLabel ?? it.productsLabel,
    gallery: it.gallery?.map((g, i) => (i === 0 && io.alt ? { ...g, alt: io.alt } : g)),
    products,
  };
}

// Alt site verisi dil bazlı: ad, slogan, giriş, ürün grubu/hizmet metinleri, kategori adları, özellikler ve süreç
export function localizeSector(sector: Sector, locale: Locale): Sector {
  const o = overrides[locale]?.sectors[sector.key];
  if (!o) return sector;
  return {
    ...sector,
    name: o.name,
    tagline: o.tagline,
    intro: o.intro,
    itemsLabel: o.itemsLabel,
    items: sector.items.map((it) => localizeItem(it, o)),
    features: sector.features?.map((f, i) => (o.features?.[i] ? { ...f, ...o.features[i] } : f)),
    process: sector.process?.map((p, i) => (o.process?.[i] ? { ...p, ...o.process[i] } : p)),
  };
}
