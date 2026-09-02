// Kategori kartlarında kullanılan çizgisel ikonlar (Lucide tarzı, currentColor).
// `SectorItem.icon` anahtarıyla eşleşir; harici ikon kütüphanesi kullanılmaz.

import type { SVGProps } from "react";

export type SectorIconKey =
  | "icecek"
  | "sekerleme"
  | "temizlik"
  | "yonetim"
  | "insan"
  | "buyume"
  | "uretim"
  | "yalin"
  | "veri"
  | "proje"
  | "garanti"
  | "hiz"
  | "ihracat"
  | "hacim"
  | "adres"
  | "telefon"
  | "eposta"
  | "whatsapp"
  | "onay"
  | "gida";

type Props = SVGProps<SVGSVGElement>;

function Base({ children, ...rest }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

// İçecek: bardak + pipet
function CupSoda(p: Props) {
  return (
    <Base {...p}>
      <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
      <path d="M5 8h14" />
      <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
      <path d="m12 8 1-6h2" />
    </Base>
  );
}

// Şekerleme: çikolata / gofret tableti (kare kare kırılan, köşesi ısırılmış)
function ChocolateBar(p: Props) {
  return (
    <Base {...p}>
      <path d="M7 3h10a2 2 0 0 1 2 2v10.5a1 1 0 0 1-.3.7l-3.5 3.5a1 1 0 0 1-.7.3H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M12 3v17" />
      <path d="M5 9h14" />
      <path d="M5 15h14" />
      <path d="M15 20v-4a1 1 0 0 1 1-1h3" />
    </Base>
  );
}

// Temizlik: tuvalet kağıdı / kağıt havlu rulosu
function PaperRoll(p: Props) {
  return (
    <Base {...p}>
      <ellipse cx="6" cy="10" rx="3" ry="7" />
      <path d="M6 8.5v3" />
      <path d="M6 3h12" />
      <path d="M21 10c0-3.87-1.34-7-3-7" />
      <path d="M21 10v10l-3-1-3 1-3-1-3 1V17" />
    </Base>
  );
}

// Yönetim: pusula
function Compass(p: Props) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </Base>
  );
}

// İnsan kaynakları: kişiler
function Users(p: Props) {
  return (
    <Base {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Base>
  );
}

// İş geliştirme: yükselen grafik
function TrendingUp(p: Props) {
  return (
    <Base {...p}>
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </Base>
  );
}

// Üretim: fabrika
function Factory(p: Props) {
  return (
    <Base {...p}>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </Base>
  );
}

// Yalın dönüşüm: döngü
function Recycle(p: Props) {
  return (
    <Base {...p}>
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </Base>
  );
}

// Veri analizi: çubuk grafik
function BarChart(p: Props) {
  return (
    <Base {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </Base>
  );
}

// Proje yönetimi: kanban
function Kanban(p: Props) {
  return (
    <Base {...p}>
      <path d="M6 5v11" />
      <path d="M12 5v6" />
      <path d="M18 5v14" />
    </Base>
  );
}

// Orijinal ürün garantisi: onaylı kalkan
function ShieldCheck(p: Props) {
  return (
    <Base {...p}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

// Hızlı teklif & sevkiyat: kamyon
function Truck(p: Props) {
  return (
    <Base {...p}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </Base>
  );
}

// İhracat deneyimi: gemi
function Ship(p: Props) {
  return (
    <Base {...p}>
      <path d="M12 10.189V14" />
      <path d="M12 2v3" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </Base>
  );
}

// Esnek sipariş hacmi: koliler
function Boxes(p: Props) {
  return (
    <Base {...p}>
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
      <path d="m7 16.5-4.74-2.85" />
      <path d="m7 16.5 5-3" />
      <path d="M7 16.5v5.17" />
      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
      <path d="m17 16.5-5-3" />
      <path d="m17 16.5 4.74-2.85" />
      <path d="M17 16.5v5.17" />
      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
      <path d="M12 8 7.26 5.15" />
      <path d="m12 8 4.74-2.85" />
      <path d="M12 13.5V8" />
    </Base>
  );
}

// İletişim: konum
function MapPin(p: Props) {
  return (
    <Base {...p}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </Base>
  );
}

// İletişim: telefon
function Phone(p: Props) {
  return (
    <Base {...p}>
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Base>
  );
}

// İletişim: e-posta
function Mail(p: Props) {
  return (
    <Base {...p}>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </Base>
  );
}

// İletişim: mesaj balonu (WhatsApp)
function MessageCircle(p: Props) {
  return (
    <Base {...p}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Base>
  );
}

// Onay işareti (liste kartları)
function Check(p: Props) {
  return (
    <Base {...p}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  );
}

// Gıda ürünleri: alışveriş sepeti
function ShoppingBasket(p: Props) {
  return (
    <Base {...p}>
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </Base>
  );
}

export const sectorIcons: Record<SectorIconKey, (p: Props) => React.JSX.Element> = {
  gida: ShoppingBasket,
  adres: MapPin,
  telefon: Phone,
  eposta: Mail,
  whatsapp: MessageCircle,
  onay: Check,
  garanti: ShieldCheck,
  hiz: Truck,
  ihracat: Ship,
  hacim: Boxes,
  icecek: CupSoda,
  sekerleme: ChocolateBar,
  temizlik: PaperRoll,
  yonetim: Compass,
  insan: Users,
  buyume: TrendingUp,
  uretim: Factory,
  yalin: Recycle,
  veri: BarChart,
  proje: Kanban,
};

export function SectorIcon({ name, className }: { name: SectorIconKey; className?: string }) {
  const Icon = sectorIcons[name];
  return <Icon className={className} />;
}
