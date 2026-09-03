// Gıda alt sitesi: markalar listesi.
// Katalog verisinde ayrı bir marka alanı yok; marka, ürün adının ilk kelimesinden türetilir.
// Yazım farkları ve çok kelimeli markalar aşağıdaki haritalarla birleştirilir/adlandırılır.
// Logolar public/gida/markalar/ altında (ana sayfa kaydırağındakiler public/gida/logo-*.svg).

import katalog from "@/lib/gida-katalog.json";
import temizlikKatalog from "@/lib/temizlik-katalog.json";
import { cocaColaUrunleri, hariboUrunleri, kagitUrunleri } from "@/lib/gida-urunler";
import { markaLogolari } from "@/lib/gida-marka-logolari";

export type Marka = { slug: string; name: string; count: number; logo?: string };

// Türkçe karakterleri sadeleştirip anahtar üretir ("ÜLKER" → "ulker", "Dr.Oetker" → "dr.oetker")
function anahtar(kelime: string): string {
  return kelime
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/[.,]+$/, "");
}

// İlk kelime → marka slug'ı (aynı markanın farklı yazımları ve çok kelimeli markalar)
const birlestir: Record<string, string> = {
  big: "big-babol",
  mc: "mcvities",
  chupa: "chupa-chups",
  kuru: "kuru-kahveci-mehmet-efendi",
  dr: "dr-oetker",
  "dr.oetker": "dr-oetker",
  "dr.potent": "dr-potent",
  coffee: "coffee-mate",
  red: "red-bull",
  redbull: "red-bull",
  love: "love-is",
  max: "max-fly",
  baby: "baby-turco",
  candy: "candy-point",
  firs: "first",
  hero: "hero-baby",
  center: "center-fresh",
  lark: "lark-77",
  capri: "capri-sun",
  kervan: "bebeto",
  beyoglu: "beyoglu-gida",
  knor: "knorr",
  coca: "coca-cola",
  sleepyekonomik: "sleepy",
  "nutella&go": "nutella",
  rafaello: "raffaello",
  "m&m": "m-m-s",
  kavanozda: "yumiyum",
  baharatli: "lays",
  peypazari: "beypazari",
  kosla: "vanish",
  fuse: "fuse-tea",
};

// Slug → görünen ad (haritada olmayanlar için katalogdaki en sık yazım kullanılır)
const adlar: Record<string, string> = {
  "big-babol": "Big Babol",
  mcvities: "McVitie's",
  "chupa-chups": "Chupa Chups",
  "kuru-kahveci-mehmet-efendi": "Kurukahveci Mehmet Efendi",
  "dr-oetker": "Dr. Oetker",
  "dr-potent": "Dr. Potent",
  "coffee-mate": "Coffee-mate",
  "red-bull": "Red Bull",
  "love-is": "Love Is",
  "max-fly": "Max Fly",
  "baby-turco": "Baby Turco",
  "candy-point": "Candy Point",
  ari: "Arı",
  "hero-baby": "Hero Baby",
  "center-fresh": "Center Fresh",
  "lark-77": "Lark 77",
  "capri-sun": "Capri-Sun",
  bebeto: "Kervan Gıda (Bebeto)",
  "beyoglu-gida": "Beyoğlu Gıda",
  "coca-cola": "Coca-Cola",
  eti: "Eti",
  nutella: "Nutella",
  raffaello: "Raffaello",
  "m-m-s": "M&M's",
  vanish: "Vanish",
  "fuse-tea": "Fuse Tea",
  tayas: "Tayaş",
  porcoz: "Porçöz",
  topitop: "TopiTop",
  sanpa: "Sanpa Gıda",
  vanelli: "Vanelli",
  fresa: "Freşa",
  ulker: "Ülker",
  solen: "Şölen",
  nestle: "Nestlé",
  nescafe: "Nescafé",
  lays: "Lay's",
  calve: "Calvé",
};

// Marka sayılmayan ilk kelimeler (ürün adı markayla başlamıyor)
const atla = new Set<string>([]);

let cache: Marka[] | null = null;

// Tüm markalar, ürün sayısına göre azalan sırada (logosu olanlar önce)
export function markalar(): Marka[] {
  if (cache) return cache;
  const sayac = new Map<string, { count: number; yazimlar: Map<string, number> }>();
  const adlar_ = [
    ...(katalog as { name: string }[]),
    ...(temizlikKatalog as { name: string }[]),
    ...cocaColaUrunleri,
    ...hariboUrunleri,
    ...kagitUrunleri,
  ];
  for (const p of adlar_) {
    const ilk = p.name.trim().split(/\s+/)[0];
    if (!ilk) continue;
    const k = anahtar(ilk);
    if (atla.has(k)) continue;
    const slug = birlestir[k] ?? k.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const e = sayac.get(slug) ?? { count: 0, yazimlar: new Map() };
    e.count++;
    e.yazimlar.set(ilk, (e.yazimlar.get(ilk) ?? 0) + 1);
    sayac.set(slug, e);
  }
  const liste: Marka[] = [...sayac.entries()].map(([slug, e]) => {
    let name = adlar[slug];
    if (!name) {
      // En sık yazım; tamamı büyük harfse baş harf büyük yap
      const yazim = [...e.yazimlar.entries()].sort((a, b) => b[1] - a[1])[0][0];
      name = yazim === yazim.toLocaleUpperCase("tr") && yazim.length > 3
        ? yazim.charAt(0) + yazim.slice(1).toLocaleLowerCase("tr")
        : yazim;
    }
    return { slug, name, count: e.count, logo: markaLogolari[slug] };
  });
  liste.sort((a, b) => Number(!!b.logo) - Number(!!a.logo) || b.count - a.count || a.name.localeCompare(b.name, "tr"));
  cache = liste;
  return liste;
}
