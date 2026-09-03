// Alt siteler (sektörler): /gida ve /muhendislik kendi header, renk ve menü yapısına sahiptir.
// İçerikler panelden yönetilir hale geldiğinde buradaki değerler varsayılan kalır.

import type { SectorIconKey } from "@/components/sector/icons";
import { cocaColaUrunleri, hariboUrunleri, katalogKategorileri, temizlikKategorileri, type Product } from "@/lib/gida-urunler";

// Ürün grubu altındaki kategori (örn. İçecek > Coca-Cola Ürün Ailesi).
// `products` doluysa kategorinin kendi listeleme sayfası olur: /<sektör>/<grup>/<kategori>
export type ProductCategory = {
  slug: string;
  name: string;
  desc: string;
  products?: Product[];
};

export type SectorItem = {
  slug: string;
  title: string;
  text: string;
  // Ana sayfa kartında gösterilen çizgisel ikon (components/sector/icons.tsx)
  icon?: SectorIconKey;
  // Ana sayfa kartındaki 3:1 banner görseli (henüz yok; gelince buraya yol yazılır)
  banner?: string;
  // Detay sayfası içeriği (opsiyonel; yoksa kısa metinle yetinilir)
  image?: string;
  paragraphs?: string[];
  products?: ProductCategory[];
  productsLabel?: string;
};

export type Sector = {
  key: "gida" | "muhendislik";
  base: string;
  name: string;
  tagline: string;
  intro: string;
  itemsLabel: string;
  items: SectorItem[];
  // Alt sitede ayrı bir "Hakkımızda" sayfası var mı (menüde gösterilir)
  hasAboutPage?: boolean;
  // Alt sitede "Markalar" sayfası var mı (menüde gösterilir; ana sayfada logo kaydırağı çıkar)
  hasBrandsPage?: boolean;
  // Ana sayfa zengin içerik blokları (opsiyonel)
  heroImage?: string;
  features?: { title: string; text: string; icon?: SectorIconKey }[];
  stats?: { value: string; label: string }[];
  process?: { title: string; text: string }[];
  // Tema sınıfları
  theme: {
    bg: string; // koyu zemin (header/footer/hero)
    accent: string; // vurgu zemin
    accentHover: string;
    accentText: string;
    iconHover: string; // kart ikonunun hover zemini (group-hover)
    heroFrom: string; // hero görsel üstü degrade başlangıcı (from-… sektör rengi)
    soft: string; // açık zemin
    ring: string;
  };
};

export const sectors: Record<Sector["key"], Sector> = {
  gida: {
    key: "gida",
    base: "/gida",
    name: "Emparos Gıda",
    tagline: "Gıda, İçecek & Temizlik Ürünleri Tedariki",
    intro:
      "Dünya markalarının gıda, içecek ve temizlik ürünlerini güvenilir biçimde tedarik ediyoruz. Toptan alımdan ihracata tek noktadan çözüm.",
    itemsLabel: "Ürün Grupları",
    items: [
      {
        slug: "icecek",
        title: "İçecek",
        text: "Coca-Cola, Red Bull ve dünya markalarının içecekleri.",
        icon: "icecek",
        image: "/gida/icecek.jpg",
        paragraphs: [
          "İçecek kategorisinde dünyanın en çok tercih edilen markalarını, orijinal ve güncel üretim tarihli olarak tedarik ediyoruz. Gazlı içeceklerden enerji içeceklerine, meyve sularından su grubuna kadar geniş bir yelpazede; palet ve konteyner bazında toptan sevkiyat gerçekleştiriyoruz.",
          "Tüm ürünlerimiz uluslararası gıda güvenliği standartlarına uygun koşullarda depolanır ve taşınır. Talep ettiğiniz ürün, adet ve teslimat noktasına göre aynı gün içinde fiyat teklifi sunuyoruz.",
        ],
        productsLabel: "Ürün Kategorileri",
        products: [
          {
            slug: "coca-cola",
            name: "Coca-Cola Ürün Ailesi",
            desc: "Coca-Cola, Fanta, Cappy ve Fuse Tea.",
            products: cocaColaUrunleri,
          },
          ...katalogKategorileri("icecek"),
        ],
      },
      {
        slug: "sekerleme",
        title: "Şekerleme & Atıştırmalık",
        text: "Haribo başta olmak üzere şekerleme ve atıştırmalıklar.",
        icon: "sekerleme",
        image: "/gida/sekerleme.jpg",
        paragraphs: [
          "Şekerleme ve atıştırmalık kategorisinde Haribo başta olmak üzere dünya markalarının ürünlerini toptan olarak tedarik ediyoruz. Market zincirleri, toptancılar ve ihracat müşterileri için koli ve palet bazında esnek sipariş imkânı sunuyoruz.",
          "Raf ömrü uzun, güncel üretim tarihli ürünlerle çalışıyor; sezonluk ve promosyonlu ürün taleplerinizde de hızlı çözüm üretiyoruz.",
        ],
        productsLabel: "Ürün Kategorileri",
        products: [
          {
            slug: "haribo",
            name: "Haribo",
            desc: "Yumuşak şeker ve jelibon çeşitleri.",
            products: hariboUrunleri,
          },
          ...katalogKategorileri("sekerleme"),
        ],
      },
      {
        slug: "gida-urunleri",
        title: "Gıda Ürünleri",
        text: "Kahvaltılıktan süt ürünlerine geniş gıda tedariği.",
        icon: "gida",
        image: "/gida/hakkimizda.jpg",
        paragraphs: [
          "Gıda kategorisinde kahvaltılık ürünlerden süt ürünlerine, konserve ve hazır yemeklerden sos, baharat ve hazır tatlılara kadar geniş bir yelpazede toptan tedarik sağlıyoruz. Market zincirleri, toptancılar ve ihracat müşterileri için koli ve palet bazında esnek sipariş imkânı sunuyoruz.",
          "Tüm ürünler orijinal, güncel üretim tarihli ve uluslararası gıda güvenliği standartlarına uygun koşullarda depolanıp sevk edilir. Talep ettiğiniz ürün, adet ve teslimat noktasına göre aynı gün fiyat teklifi sunuyoruz.",
        ],
        productsLabel: "Ürün Kategorileri",
        products: katalogKategorileri("gida"),
      },
      {
        slug: "temizlik-kagit",
        title: "Temizlik & Kağıt Ürünleri",
        text: "Deterjan, kağıt ürünleri, ıslak mendil ve bebek bezi.",
        icon: "temizlik",
        image: "/gida/temizlik-kagit.jpg",
        paragraphs: [
          "Ev dışı tüketim (HoReCa), ofis ve perakende kanalları için kağıt havlu, tuvalet kağıdı, peçete ve endüstriyel temizlik sarf malzemelerini toptan tedarik ediyoruz. Yüksek hacimli ve düzenli alımlarda sözleşmeli tedarik modeliyle fiyat istikrarı sağlıyoruz.",
          "Ürünlerimiz talep edilen kalite sınıfına göre (ekonomik, standart, premium) farklı seçeneklerle sunulur; özel etiket (private label) çalışmaları için de destek veriyoruz.",
        ],
        productsLabel: "Ürün Kategorileri",
        // Yalnızca Türk markaları (Bingo, Peros, ABC, Molfix, Sleepy, Selpak, Papia, Solo, Familia vb.)
        products: temizlikKategorileri(),
      },
    ],
    heroImage: "/gida/hero-depo.jpg",
    hasBrandsPage: true,
    features: [
      { title: "Orijinal Ürün Garantisi", text: "Tüm ürünler yetkili kanallardan, orijinal ve güncel üretim tarihli olarak tedarik edilir.", icon: "garanti" },
      { title: "Hızlı Teklif & Sevkiyat", text: "Talebinize aynı gün fiyat teklifi; stoklu ürünlerde 48 saat içinde sevkiyat planı.", icon: "hiz" },
      { title: "İhracat Deneyimi", text: "Konteyner yükleme, gümrük ve lojistik süreçlerinde uçtan uca destek.", icon: "ihracat" },
      { title: "Esnek Sipariş Hacmi", text: "Koliden konteynere; işletmenizin ölçeğine uygun sipariş miktarları.", icon: "hacim" },
    ],
    process: [
      { title: "Talep", text: "İhtiyacınızı iletişim formu veya WhatsApp üzerinden iletin." },
      { title: "Teklif", text: "Ürün, adet ve teslimat noktasına göre aynı gün fiyat teklifi alın." },
      { title: "Onay & Tedarik", text: "Onayınızla birlikte ürünler depomuzdan veya üreticiden hazırlanır." },
      { title: "Teslimat", text: "Yurt içi dağıtım veya ihracat yüklemesi planlanan tarihte tamamlanır." },
    ],
    // Logo renkleri: lacivert (navy-800 #1b2a49) zemin + altın (gold-500 #b8923a) vurgu
    theme: {
      bg: "bg-navy-800",
      accent: "bg-gold-500",
      accentHover: "hover:bg-gold-600",
      accentText: "text-gold-500",
      iconHover: "group-hover:bg-gold-500",
      heroFrom: "from-navy-800/95",
      soft: "bg-gold-50",
      ring: "focus:ring-gold-500/30",
    },
  },
  muhendislik: {
    key: "muhendislik",
    base: "/muhendislik",
    name: "Emparos Mühendislik",
    tagline: "Mühendislik & Yönetim Danışmanlığı",
    intro:
      "Yönetimden üretime, yalın dönüşümden veri analizine; işletmenizin verimliliğini ve rekabet gücünü artıran mühendislik danışmanlığı hizmetleri.",
    itemsLabel: "Danışmanlık Hizmetleri",
    hasAboutPage: true,
    items: [
      { slug: "yonetim-danismanligi", title: "Yönetim Danışmanlığı", text: "Strateji, organizasyon ve kurumsal yönetim süreçlerinin yapılandırılması.", icon: "yonetim" },
      { slug: "insan-kaynaklari", title: "İnsan Kaynakları Danışmanlığı", text: "İK süreçleri, performans sistemleri ve yetkinlik yönetimi.", icon: "insan" },
      { slug: "is-gelistirme", title: "İş Geliştirme Danışmanlığı", text: "Yeni pazar, ürün ve iş modeli geliştirme çalışmaları.", icon: "buyume" },
      { slug: "uretim", title: "Üretim Danışmanlığı", text: "Üretim planlama, kapasite ve verimlilik iyileştirme.", icon: "uretim" },
      { slug: "yalin-donusum", title: "Yalın Dönüşüm Danışmanlığı", text: "Yalın üretim araçlarıyla israfı azaltan dönüşüm programları.", icon: "yalin" },
      { slug: "veri-analizi", title: "Veri Analizi & Raporlama Sistemleri", text: "Karar destek için veri altyapısı, analiz ve raporlama sistemleri.", icon: "veri" },
      { slug: "proje-yonetimi", title: "Proje Yönetimi Danışmanlığı", text: "Proje planlama, izleme ve teslimat metodolojileri.", icon: "proje" },
    ],
    theme: {
      bg: "bg-[#0c1b30]",
      accent: "bg-steel-500",
      accentHover: "hover:bg-steel-700",
      accentText: "text-steel-500",
      iconHover: "group-hover:bg-steel-500",
      heroFrom: "from-[#0c1b30]/95",
      soft: "bg-[#f0f5fb]",
      ring: "focus:ring-steel-500/30",
    },
  },
};
