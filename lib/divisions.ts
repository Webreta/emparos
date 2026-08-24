// Üç iş kolu — ana sayfadaki bölünmüş giriş ve menüde kullanılır.
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
    bg: "from-[#2b1a0e] via-[#4a2f1a] to-[#7a4a26]",
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
    accent: "bg-fresh-500",
    accentText: "text-fresh-500",
    bg: "from-[#0d2a1a] via-[#16472c] to-[#1f6b42]",
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
    items: ["Yönetim & İK danışmanlığı", "Üretim & yalın dönüşüm", "Veri analizi & proje yönetimi"],
  },
];
