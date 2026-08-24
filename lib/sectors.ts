// Alt siteler (sektörler): /gida ve /muhendislik kendi header, renk ve menü yapısına sahiptir.
// İçerikler panelden yönetilir hale geldiğinde buradaki değerler varsayılan kalır.

export type SectorItem = {
  slug: string;
  title: string;
  text: string;
  // Detay sayfası içeriği (opsiyonel; yoksa kısa metinle yetinilir)
  image?: string;
  paragraphs?: string[];
  products?: { name: string; desc: string }[];
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
  // Ana sayfa zengin içerik blokları (opsiyonel)
  heroImage?: string;
  brands?: { name: string; logo?: string }[];
  features?: { title: string; text: string }[];
  stats?: { value: string; label: string }[];
  process?: { title: string; text: string }[];
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
      {
        slug: "icecek",
        title: "İçecek",
        text: "Coca-Cola, Red Bull ve dünya markalarının gazlı, enerji ve meyveli içecekleri.",
        image: "/gida/icecek.jpg",
        paragraphs: [
          "İçecek kategorisinde dünyanın en çok tercih edilen markalarını, orijinal ve güncel üretim tarihli olarak tedarik ediyoruz. Gazlı içeceklerden enerji içeceklerine, meyve sularından su grubuna kadar geniş bir yelpazede; palet ve konteyner bazında toptan sevkiyat gerçekleştiriyoruz.",
          "Tüm ürünlerimiz uluslararası gıda güvenliği standartlarına uygun koşullarda depolanır ve taşınır. Talep ettiğiniz ürün, adet ve teslimat noktasına göre aynı gün içinde fiyat teklifi sunuyoruz.",
        ],
        productsLabel: "Öne Çıkan Ürünler",
        products: [
          { name: "Coca-Cola Ürün Ailesi", desc: "Coca-Cola, Fanta, Sprite — kutu, pet ve cam şişe seçenekleriyle." },
          { name: "Red Bull", desc: "Klasik ve şekersiz enerji içecekleri, farklı ambalaj boyutlarıyla." },
          { name: "Meyveli & Gazlı İçecekler", desc: "Uluslararası markaların meyve suyu ve gazoz grupları." },
          { name: "Su & Maden Suyu", desc: "Pet ve cam ambalajda içme suyu ve maden suyu çeşitleri." },
        ],
      },
      {
        slug: "sekerleme",
        title: "Şekerleme & Atıştırmalık",
        text: "Haribo başta olmak üzere şekerleme ve atıştırmalık ürün grupları.",
        image: "/gida/sekerleme.jpg",
        paragraphs: [
          "Şekerleme ve atıştırmalık kategorisinde Haribo başta olmak üzere dünya markalarının ürünlerini toptan olarak tedarik ediyoruz. Market zincirleri, toptancılar ve ihracat müşterileri için koli ve palet bazında esnek sipariş imkânı sunuyoruz.",
          "Raf ömrü uzun, güncel üretim tarihli ürünlerle çalışıyor; sezonluk ve promosyonlu ürün taleplerinizde de hızlı çözüm üretiyoruz.",
        ],
        productsLabel: "Öne Çıkan Ürünler",
        products: [
          { name: "Haribo", desc: "Yumuşak şeker ve jelibon çeşitleri, farklı gramaj seçenekleriyle." },
          { name: "Çikolata & Gofret", desc: "Uluslararası markaların çikolata, gofret ve bar grupları." },
          { name: "Bisküvi & Kraker", desc: "Tatlı ve tuzlu bisküvi çeşitleri, aile ve tekli paketler." },
          { name: "Sakız & Bonbon", desc: "Kutu ve stand teşhirli şekerleme ürünleri." },
        ],
      },
      {
        slug: "temizlik-kagit",
        title: "Temizlik & Kağıt Ürünleri",
        text: "Kağıt havlu, tuvalet kağıdı ve kurumsal temizlik sarf malzemeleri.",
        image: "/gida/temizlik-kagit.jpg",
        paragraphs: [
          "Ev dışı tüketim (HoReCa), ofis ve perakende kanalları için kağıt havlu, tuvalet kağıdı, peçete ve endüstriyel temizlik sarf malzemelerini toptan tedarik ediyoruz. Yüksek hacimli ve düzenli alımlarda sözleşmeli tedarik modeliyle fiyat istikrarı sağlıyoruz.",
          "Ürünlerimiz talep edilen kalite sınıfına göre (ekonomik, standart, premium) farklı seçeneklerle sunulur; özel etiket (private label) çalışmaları için de destek veriyoruz.",
        ],
        productsLabel: "Öne Çıkan Ürünler",
        products: [
          { name: "Tuvalet Kağıdı", desc: "Ev tipi ve endüstriyel (jumbo, içten çekmeli) çeşitler." },
          { name: "Kağıt Havlu", desc: "Rulo, Z katlama ve hareketli havlu seçenekleri." },
          { name: "Peçete & Mendil", desc: "Kare peçete, dispenser peçete ve ıslak mendil grupları." },
          { name: "Temizlik Sarf Malzemeleri", desc: "Yüzey temizleyiciler, çöp poşetleri ve hijyen ekipmanları." },
        ],
      },
    ],
    heroImage: "/gida/hero.jpg",
    brands: [
      { name: "Coca-Cola", logo: "/gida/logo-coca-cola.svg" },
      { name: "Red Bull", logo: "/gida/logo-red-bull.svg" },
      { name: "Haribo", logo: "/gida/logo-haribo.svg" },
      { name: "Fanta", logo: "/gida/logo-fanta.svg" },
      { name: "Sprite", logo: "/gida/logo-sprite.svg" },
      { name: "Ülker", logo: "/gida/logo-ulker.svg" },
    ],
    features: [
      { title: "Orijinal Ürün Garantisi", text: "Tüm ürünler yetkili kanallardan, orijinal ve güncel üretim tarihli olarak tedarik edilir." },
      { title: "Hızlı Teklif & Sevkiyat", text: "Talebinize aynı gün fiyat teklifi; stoklu ürünlerde 48 saat içinde sevkiyat planı." },
      { title: "İhracat Deneyimi", text: "Konteyner yükleme, gümrük ve lojistik süreçlerinde uçtan uca destek." },
      { title: "Esnek Sipariş Hacmi", text: "Koliden konteynere; işletmenizin ölçeğine uygun sipariş miktarları." },
    ],
    process: [
      { title: "Talep", text: "İhtiyacınızı iletişim formu veya WhatsApp üzerinden iletin." },
      { title: "Teklif", text: "Ürün, adet ve teslimat noktasına göre aynı gün fiyat teklifi alın." },
      { title: "Onay & Tedarik", text: "Onayınızla birlikte ürünler depomuzdan veya üreticiden hazırlanır." },
      { title: "Teslimat", text: "Yurt içi dağıtım veya ihracat yüklemesi planlanan tarihte tamamlanır." },
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
