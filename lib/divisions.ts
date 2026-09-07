// Üç iş kolu: ana sayfadaki bölünmüş giriş ve menüde kullanılır.
// İçerikler panelden yönetilir hale geldiğinde buradaki değerler varsayılan kalır.

export type Division = {
  key: "ambalaj" | "gida" | "muhendislik";
  title: string;
  subtitle: string;
  text: string;
  href: string;
  external: boolean;
  cta: string;
  // Tailwind sınıfları: panel zemini, vurgu rengi
  accent: string;
  accentText: string;
  bg: string;
  // Panel arka plan görseli (opsiyonel; yoksa yalnızca degrade)
  image?: string;
  items: string[];
};

export const divisions: Division[] = [
  {
    key: "ambalaj",
    title: "Ambalaj Çözümleri",
    subtitle: "Kraftora Pack",
    text: "Kraft ve karton ambalajda üretimden teslimata uçtan uca çözüm. Kraftora Pack markamızla hizmetinizdeyiz.",
    href: "https://kraftorapack.com",
    external: true,
    cta: "Kraftora Pack'e Git",
    accent: "bg-kraft-500",
    accentText: "text-kraft-500",
    // Diğer panellerle uyumlu lacivert örtü (kraft görselinin üstüne biner)
    bg: "from-[#0c1424] via-[#142038] to-[#2a3a5e]",
    image: "/kapak/ambalaj-kraft.jpg", // görseller/478.jpg (kraft çantalar)
    items: ["Kraft torba ve poşet", "Oluklu mukavva kutu", "Özel baskılı ambalaj"],
  },
  {
    key: "gida",
    title: "Gıda, İçecek & Temizlik",
    subtitle: "Ürün Tedariği",
    text: "Dünya markalarının gıda, içecek ve temizlik ürünlerinde güvenilir, hızlı ve sürdürülebilir tedarik.",
    href: "/gida",
    external: false,
    cta: "Ürünleri Keşfet",
    // Gıda alt sitesiyle uyumlu: lacivert zemin, altın vurgu (logo renkleri)
    accent: "bg-gold-500",
    accentText: "text-gold-500",
    bg: "from-[#0c1424] via-[#1b2a49] to-[#7d6124]",
    image: "/kapak/gida-panel.jpg",
    items: ["İçecek (Coca-Cola, Red Bull)", "Şekerleme (Haribo)", "Kağıt havlu & tuvalet kağıdı"],
  },
  {
    key: "muhendislik",
    title: "Mühendislik Çözümleri",
    subtitle: "Danışmanlık",
    text: "Yönetimden üretime, yalın dönüşümden veri analizine; işletmenizi büyüten mühendislik danışmanlığı.",
    href: "/muhendislik",
    external: false,
    cta: "Hizmetleri İncele",
    accent: "bg-steel-500",
    accentText: "text-steel-500",
    bg: "from-[#0c1424] via-[#142038] to-[#1f4f80]",
    image: "/kapak/muhendislik-panel.jpg",
    items: ["Yönetim & İK danışmanlığı", "Üretim & yalın dönüşüm", "Veri analizi & proje yönetimi"],
  },
];
