// Alt siteler (sektörler): /gida ve /muhendislik kendi header, renk ve menü yapısına sahiptir.
// İçerikler panelden yönetilir hale geldiğinde buradaki değerler varsayılan kalır.

export type SectorItem = { slug: string; title: string; text: string };

export type Sector = {
  key: "gida" | "muhendislik";
  base: string;
  name: string;
  tagline: string;
  intro: string;
  itemsLabel: string;
  items: SectorItem[];
  // Tema sınıfları
  theme: {
    bg: string; // koyu zemin (header/footer/hero)
    accent: string; // vurgu zemin
    accentHover: string;
    accentText: string;
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
      "Dünya markalarının gıda, içecek ve temizlik ürünlerini güvenilir, hızlı ve sürdürülebilir biçimde tedarik ediyoruz. Toptan alımdan ihracata, tek noktadan çözüm.",
    itemsLabel: "Ürün Grupları",
    items: [
      { slug: "icecek", title: "İçecek", text: "Coca-Cola, Red Bull ve dünya markalarının gazlı, enerji ve meyveli içecekleri." },
      { slug: "sekerleme", title: "Şekerleme & Atıştırmalık", text: "Haribo başta olmak üzere şekerleme ve atıştırmalık ürün grupları." },
      { slug: "temizlik-kagit", title: "Temizlik & Kağıt Ürünleri", text: "Kağıt havlu, tuvalet kağıdı ve kurumsal temizlik sarf malzemeleri." },
    ],
    theme: {
      bg: "bg-[#0f2e1d]",
      accent: "bg-fresh-500",
      accentHover: "hover:bg-fresh-700",
      accentText: "text-fresh-500",
      soft: "bg-[#f1f8f3]",
      ring: "focus:ring-fresh-500/30",
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
    items: [
      { slug: "yonetim-danismanligi", title: "Yönetim Danışmanlığı", text: "Strateji, organizasyon ve kurumsal yönetim süreçlerinin yapılandırılması." },
      { slug: "insan-kaynaklari", title: "İnsan Kaynakları Danışmanlığı", text: "İK süreçleri, performans sistemleri ve yetkinlik yönetimi." },
      { slug: "is-gelistirme", title: "İş Geliştirme Danışmanlığı", text: "Yeni pazar, ürün ve iş modeli geliştirme çalışmaları." },
      { slug: "uretim", title: "Üretim Danışmanlığı", text: "Üretim planlama, kapasite ve verimlilik iyileştirme." },
      { slug: "yalin-donusum", title: "Yalın Dönüşüm Danışmanlığı", text: "Yalın üretim araçlarıyla israfı azaltan dönüşüm programları." },
      { slug: "veri-analizi", title: "Veri Analizi & Raporlama Sistemleri", text: "Karar destek için veri altyapısı, analiz ve raporlama sistemleri." },
      { slug: "proje-yonetimi", title: "Proje Yönetimi Danışmanlığı", text: "Proje planlama, izleme ve teslimat metodolojileri." },
    ],
    theme: {
      bg: "bg-[#0c1b30]",
      accent: "bg-steel-500",
      accentHover: "hover:bg-steel-700",
      accentText: "text-steel-500",
      soft: "bg-[#f0f5fb]",
      ring: "focus:ring-steel-500/30",
    },
  },
};
