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
  // Metin arasına serpiştirilen görseller (1-2 adet) ve "Hizmet kapsamı" maddeleri
  gallery?: { src: string; alt: string }[];
  scope?: string[];
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
  process?: { title: string; text: string; icon?: SectorIconKey }[];
  // Tema sınıfları
  theme: {
    bg: string; // koyu zemin (header/footer/hero)
    line: string; // koyu zemin rengiyle çerçeve (border-…)
    lineSoft: string; // aynı rengin soluk çerçevesi (border-…/15)
    lineHover: string; // hover'da tam renk çerçeve (hover:border-…)
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
      { title: "Talep", text: "İhtiyacınızı iletişim formu veya WhatsApp üzerinden iletin.", icon: "whatsapp" },
      { title: "Teklif", text: "Ürün, adet ve teslimat noktasına göre aynı gün fiyat teklifi alın.", icon: "dosya" },
      { title: "Onay & Tedarik", text: "Onayınızla birlikte ürünler depomuzdan veya üreticiden hazırlanır.", icon: "hacim" },
      { title: "Teslimat", text: "Yurt içi dağıtım veya ihracat yüklemesi planlanan tarihte tamamlanır.", icon: "hiz" },
    ],
    // Logo renkleri: lacivert (navy-800 #1b2a49) zemin + altın (gold-500 #b8923a) vurgu
    theme: {
      bg: "bg-navy-800",
      line: "border-navy-800",
      lineSoft: "border-navy-800/15",
      lineHover: "hover:border-navy-800",
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
    heroImage: "/muhendislik/hero.jpg",
    // Teklif sayfasındaki süreç özeti
    process: [
      { title: "Görüşme", text: "İhtiyacınızı form veya telefonla iletin; ön görüşmede hedefleri netleştirelim.", icon: "telefon" },
      { title: "Analiz", text: "Saha ziyareti ve verilerle mevcut durumu ölçüp iyileştirme alanlarını belirleyelim.", icon: "veri" },
      { title: "Yol Haritası", text: "Kapsam, takvim ve bütçeyi içeren teklif ve uygulama planını sunalım.", icon: "dosya" },
      { title: "Uygulama", text: "Ekibinizle birlikte sahada uygulayalım, sonuçları göstergelerle izleyelim.", icon: "onay" },
    ],
    // Hizmet sayfaları: hero görseli = gallery[0]; aynı görsel metnin başında; "Hizmet kapsamı" maddeleri
    items: [
      {
        slug: "yonetim-danismanligi",
        title: "Yönetim Danışmanlığı",
        text: "Strateji, organizasyon ve kurumsal yönetim süreçlerinin yapılandırılması.",
        icon: "yonetim",
        image: "/muhendislik/yonetim-danismanligi-1.jpg",
        gallery: [
          { src: "/muhendislik/yonetim-danismanligi-1.jpg", alt: "Strateji toplantısında yöneticiler" },
        ],
        paragraphs: [
          "Büyüyen her işletme bir noktada kurucusunun kişisel takibiyle yönetilemeyecek ölçeğe ulaşır. Kararlar gecikmeye, sorumluluklar bulanıklaşmaya ve günlük işler stratejinin önüne geçmeye başlar. Yönetim danışmanlığı hizmetimiz tam bu noktada devreye girer: şirketin bugün nerede durduğunu nesnel biçimde ortaya koyar, gitmek istediği yeri netleştirir ve aradaki yolu yönetilebilir adımlara böler.",
          "Çalışmaya kapsamlı bir mevcut durum analiziyle başlarız. Organizasyon yapısı, karar alma mekanizmaları, yetki ve sorumluluk dağılımı, finansal göstergeler ve iş süreçleri birlikte ele alınır. Yönetim ekibiyle yapılan görüşmeler ve saha gözlemleri, rakamların anlatmadığı yapısal sorunları görünür kılar.",
          "Analiz sonrasında şirketin vizyonuna uygun bir stratejik yol haritası hazırlanır. Hedefler ölçülebilir göstergelere bağlanır, her hedefin sahibi ve takvimi belirlenir. Organizasyon şeması, görev tanımları, yetki matrisi ve toplantı sistematiği yeniden kurgulanarak yönetimin kurumsal bir ritim kazanması sağlanır.",
          "Danışmanlığımız rapor teslimiyle bitmez. Uygulama döneminde yönetim ekibine eşlik eder, periyodik değerlendirme toplantılarında ilerlemeyi ölçer ve gerektiğinde planı sahadaki gerçeklere göre güncelleriz. Amacımız şirketin bize bağımlı kalması değil, kendi kendini yönetebilen sürdürülebilir bir yapıya kavuşmasıdır.",
        ],
        scope: [
          "Mevcut durum analizi ve kurumsal olgunluk değerlendirmesi",
          "Vizyon, misyon ve stratejik hedeflerin belirlenmesi",
          "Organizasyon yapısı, görev tanımları ve yetki matrisi tasarımı",
          "Kurumsal performans göstergeleri (KPI) sisteminin kurulması",
          "Yönetim toplantı sistematiği ve raporlama düzeni",
          "Aile şirketlerinde kurumsallaşma ve devir planlaması",
        ],
      },
      {
        slug: "insan-kaynaklari",
        title: "İnsan Kaynakları Danışmanlığı",
        text: "İK süreçleri, performans sistemleri ve yetkinlik yönetimi.",
        icon: "insan",
        image: "/muhendislik/insan-kaynaklari-1.jpg",
        gallery: [
          { src: "/muhendislik/insan-kaynaklari-1.jpg", alt: "Belgeler üzerinde el sıkışma: işe alım anlaşması" },
        ],
        paragraphs: [
          "Bir şirketin en kalıcı rekabet avantajı, doğru insanların doğru işlerde ve doğru sistemlerle çalışmasıdır. Makine ve teknoloji satın alınabilir; ancak kurum kültürü, yetkinlik ve motivasyon ancak iyi tasarlanmış insan kaynakları süreçleriyle inşa edilir. İK danışmanlığı hizmetimiz, insan kaynağını maliyet kalemi olmaktan çıkarıp stratejik bir varlığa dönüştürmeyi hedefler.",
          "İşe başlarken mevcut İK uygulamalarını uçtan uca inceleriz: işe alım, oryantasyon, ücretlendirme, performans değerlendirme, eğitim ve kariyer planlaması. Çalışan görüşmeleri ve anketlerle bağlılık düzeyini ve beklentileri ölçer, iş gücü devir hızı ve devamsızlık gibi göstergeleri sektör ortalamalarıyla kıyaslarız.",
          "Bulgular doğrultusunda şirkete özgü bir İK mimarisi kurarız. Pozisyon bazlı yetkinlik modelleri hazırlanır, adil ve şeffaf bir ücret ve yan haklar yapısı oluşturulur, hedef ve yetkinlik temelli performans sistemi devreye alınır. Eğitim ihtiyaç analizine dayanan gelişim programlarıyla çalışanların potansiyeli açığa çıkarılır.",
          "Kurduğumuz sistemlerin sahiplenilmesi için İK ekibine ve yöneticilere uygulamalı eğitimler veririz. Performans görüşmesi yapma, geri bildirim verme ve ekip yönetimi gibi konularda yöneticilerin donanımı artırılır. Böylece İK süreçleri kağıt üzerinde kalmaz, günlük yönetim pratiğinin parçası haline gelir.",
        ],
        scope: [
          "İK süreç analizi ve çalışan bağlılığı ölçümü",
          "Görev tanımları ve pozisyon bazlı yetkinlik modelleri",
          "İşe alım ve oryantasyon sürecinin yapılandırılması",
          "Performans yönetim sistemi tasarımı ve uygulaması",
          "Ücret, prim ve yan haklar yapısının kurulması",
          "Eğitim ihtiyaç analizi ve yönetici gelişim programları",
        ],
      },
      {
        slug: "is-gelistirme",
        title: "İş Geliştirme Danışmanlığı",
        text: "Yeni pazar, ürün ve iş modeli geliştirme çalışmaları.",
        icon: "buyume",
        image: "/muhendislik/is-gelistirme-1.jpg",
        gallery: [
          { src: "/muhendislik/is-gelistirme-1.jpg", alt: "Büyüme grafikleri üzerinde analiz" },
        ],
        paragraphs: [
          "Pazarlar, müşteri beklentileri ve rekabet koşulları her geçen yıl daha hızlı değişiyor. Bugün iyi çalışan bir iş modeli, birkaç yıl içinde geçerliliğini yitirebilir. İş geliştirme danışmanlığı hizmetimiz, şirketlerin mevcut işlerini korurken yeni büyüme alanlarını sistematik biçimde keşfetmesine ve bu alanlara güvenle adım atmasına yardımcı olur.",
          "Çalışmaya pazar ve rakip analiziyle başlarız. Hedef segmentler, müşteri ihtiyaçları, fiyatlandırma dinamikleri ve dağıtım kanalları incelenir; şirketin güçlü ve zayıf yönleri fırsat ve tehditlerle birlikte değerlendirilir. Bu analiz, hangi pazarlara, hangi ürün ve hizmetlerle girilmesi gerektiğine dair veriye dayalı bir çerçeve sunar.",
          "Belirlenen fırsatlar için iş modeli tasarımı yapılır: değer önerisi, gelir modeli, maliyet yapısı, kilit ortaklıklar ve operasyonel gereksinimler netleştirilir. Yatırım getirisi ve başabaş analizleriyle her seçeneğin finansal fizibilitesi ortaya konur; yönetim, karar için somut senaryolarla donatılır.",
          "Uygulama aşamasında satış ve pazarlama organizasyonunun yeni hedeflere göre yapılandırılması, bayi ve iş ortağı ağının geliştirilmesi, ihracat pazarlarına giriş planlaması ve müşteri ilişkileri yönetimi gibi konularda ekibin yanında oluruz. İlerleme, önceden belirlenmiş göstergelerle düzenli olarak izlenir.",
        ],
        scope: [
          "Pazar, rakip ve müşteri analizi",
          "Yeni ürün ve hizmet fırsatlarının değerlendirilmesi",
          "İş modeli tasarımı ve finansal fizibilite",
          "Satış ve pazarlama organizasyonunun yapılandırılması",
          "İhracat pazarlarına giriş stratejisi",
          "Bayi, distribütör ve iş ortağı ağının geliştirilmesi",
        ],
      },
      {
        slug: "uretim",
        title: "Üretim Danışmanlığı",
        text: "Üretim planlama, kapasite ve verimlilik iyileştirme.",
        icon: "uretim",
        image: "/muhendislik/uretim-1.jpg",
        gallery: [
          { src: "/muhendislik/uretim-1.jpg", alt: "Üretim hattında robot kol" },
        ],
        paragraphs: [
          "Üretim sahası, bir işletmenin kârlılığının belirlendiği yerdir. Plansız duruşlar, uzun hazırlık süreleri, stok yığılmaları ve kalite kayıpları çoğu zaman fark edilmeden maliyetleri yukarı çeker. Üretim danışmanlığı hizmetimiz, sahadaki gerçek verilere dayanarak bu kayıpları görünür kılar ve kapasiteyi yeni yatırım yapmadan artırmanın yollarını ortaya koyar.",
          "İlk adımda üretim akışı, hat dengesi, makine kullanım oranları, çevrim süreleri ve darboğazlar ölçülür. Toplam ekipman etkinliği (OEE), ilk seferde doğru üretim ve teslimat performansı gibi göstergelerle işletmenin mevcut verimlilik seviyesi belirlenir. Bakım, kalite ve planlama süreçleri üretimle birlikte değerlendirilir.",
          "Analiz sonuçlarına göre üretim planlama ve çizelgeleme sistemi yeniden kurulur; malzeme ihtiyaç planlaması, stok politikaları ve tedarik süreçleri üretim hızıyla uyumlu hale getirilir. Yerleşim düzenlemeleri, hat dengeleme ve hazırlık sürelerinin kısaltılması gibi çalışmalarla darboğazlar giderilir, kapasite artırılır.",
          "Kalıcı sonuç için üretim ekibine ölçme, analiz ve problem çözme yetkinlikleri kazandırılır. Günlük yönetim panoları, vardiya toplantıları ve performans göstergeleri sistemi ile iyileştirmeler izlenir ve sürekli hale getirilir. Böylece elde edilen kazanımlar danışmanlık sonrasında da korunur ve geliştirilir.",
        ],
        scope: [
          "Üretim akış analizi ve darboğaz tespiti",
          "OEE ölçümü ve makine verimliliği iyileştirme",
          "Üretim planlama ve çizelgeleme sistemi kurulumu",
          "Stok ve malzeme ihtiyaç planlaması (MRP)",
          "Yerleşim (layout) tasarımı ve hat dengeleme",
          "Bakım yönetimi ve kalite kontrol süreçleri",
        ],
      },
      {
        slug: "yalin-donusum",
        title: "Yalın Dönüşüm Danışmanlığı",
        text: "Yalın üretim araçlarıyla israfı azaltan dönüşüm programları.",
        icon: "yalin",
        image: "/muhendislik/yalin-donusum-1.jpg",
        gallery: [
          { src: "/muhendislik/yalin-donusum-1.jpg", alt: "5S düzeninde alet panosu" },
        ],
        paragraphs: [
          "Yalın düşünce, müşterinin para ödemeye razı olmadığı her faaliyeti israf olarak tanımlar: bekleme, fazla üretim, gereksiz taşıma, stok, hatalı üretim, gereksiz hareket ve fazla işlem. Yalın dönüşüm danışmanlığı hizmetimiz, bu israfları sistematik biçimde ortadan kaldırarak daha kısa termin, daha düşük maliyet ve daha yüksek kaliteyi aynı anda mümkün kılar.",
          "Dönüşüme değer akış haritalamayla başlarız. Siparişten teslimata kadar tüm süreç adım adım çizilir, katma değerli ve değersiz süreler ayrıştırılır. Bu harita, nereden başlanacağını ve hangi iyileştirmenin en büyük etkiyi yaratacağını nesnel olarak gösterir; öncelikli pilot alanlar buna göre seçilir.",
          "Pilot alanlarda 5S, standart iş, SMED ile hızlı tip değişimi, kanban ile çekme sistemi, toplam üretken bakım ve hata önleme gibi yalın araçlar uygulanır. Her uygulama, sahadaki çalışanlarla birlikte kaizen çalışmaları içinde hayata geçirilir; böylece değişim dışarıdan dayatılan bir program değil, ekibin sahiplendiği bir kültür haline gelir.",
          "Pilot sonuçları ölçülüp doğrulandıktan sonra uygulamalar diğer alanlara yaygınlaştırılır. Günlük yönetim sistemi, görsel yönetim panoları ve yalın liderlik eğitimleriyle iyileştirme sürekli hale getirilir. Hedefimiz tek seferlik bir proje değil, kendi kendini sürekli geliştiren yalın bir organizasyondur.",
        ],
        scope: [
          "Değer akış haritalama ve israf analizi",
          "5S ve görsel yönetim uygulamaları",
          "SMED ile hazırlık sürelerinin kısaltılması",
          "Kanban ve çekme sistemi kurulumu",
          "Toplam üretken bakım (TPM) ve hata önleme (poka-yoke)",
          "Kaizen çalışmaları ve yalın liderlik eğitimleri",
        ],
      },
      {
        slug: "veri-analizi",
        title: "Veri Analizi & Raporlama Sistemleri",
        text: "Karar destek için veri altyapısı, analiz ve raporlama sistemleri.",
        icon: "veri",
        image: "/muhendislik/veri-analizi-1.jpg",
        gallery: [
          { src: "/muhendislik/veri-analizi-1.jpg", alt: "Veri merkezi sunucu koridoru" },
        ],
        paragraphs: [
          "Çoğu işletme ihtiyaç duyduğundan çok daha fazla veri üretir; ancak bu veri farklı sistemlerde, tablolarda ve kişisel dosyalarda dağınık durduğu için karar anında elde doğru bilgi bulunmaz. Veri analizi ve raporlama danışmanlığı hizmetimiz, dağınık veriyi güvenilir tek bir kaynağa dönüştürür ve yönetimin sezgi yerine kanıtla karar almasını sağlar.",
          "İlk adımda yönetimin hangi kararlar için hangi bilgilere ihtiyaç duyduğu belirlenir. Buna göre kurumsal performans göstergeleri tanımlanır, her göstergenin hesaplama yöntemi, veri kaynağı ve sorumlusu netleştirilir. ERP, üretim, satış, finans ve İK sistemlerindeki veriler incelenerek veri kalitesi ve erişilebilirliği değerlendirilir.",
          "Ardından veri altyapısı kurulur: kaynak sistemlerden veri toplama, temizleme ve birleştirme süreçleri otomatikleştirilir. Yönetim, üretim, satış ve finans için rol bazlı raporlama panoları tasarlanır; göstergeler hedeflerle karşılaştırmalı ve zaman içindeki eğilimi gösterecek biçimde sunulur. Panolar manuel tablo hazırlama yükünü ortadan kaldırır.",
          "Kullanıcılara panoları okuma ve yorumlama eğitimi verilir, raporların yönetim toplantılarında nasıl kullanılacağı birlikte kurgulanır. Gerektiğinde ileri analizlerle satış tahmini, stok optimizasyonu ve kalite kök neden analizleri gibi konularda veriden somut aksiyonlar üretilir.",
        ],
        scope: [
          "Karar ihtiyaçları ve performans göstergesi (KPI) tanımlama",
          "Veri kaynakları envanteri ve veri kalitesi analizi",
          "Otomatik veri toplama ve birleştirme altyapısı",
          "Yönetim, üretim, satış ve finans raporlama panoları",
          "Satış tahmini, stok ve kalite analizleri",
          "Kullanıcı eğitimi ve raporlama kültürünün yerleştirilmesi",
        ],
      },
      {
        slug: "proje-yonetimi",
        title: "Proje Yönetimi Danışmanlığı",
        text: "Proje planlama, izleme ve teslimat metodolojileri.",
        icon: "proje",
        image: "/muhendislik/proje-yonetimi-1.jpg",
        gallery: [
          { src: "/muhendislik/proje-yonetimi-1.jpg", alt: "Proje planı, baret ve su terazisi" },
        ],
        paragraphs: [
          "Yeni tesis yatırımı, makine devreye alma, ürün geliştirme ya da yazılım geçişi; her biri sınırlı sürede, sınırlı bütçeyle ve belirli bir kalite hedefiyle tamamlanması gereken projelerdir. Projelerin gecikmesi ve bütçeyi aşması çoğu zaman teknik yetersizlikten değil, planlama ve koordinasyon eksikliğinden kaynaklanır. Proje yönetimi danışmanlığı hizmetimiz bu boşluğu kapatır.",
          "Projenin başında kapsam, hedefler ve başarı kriterleri yazılı olarak netleştirilir. İş kırılım yapısı hazırlanır, faaliyetler arası bağımlılıklar belirlenir ve gerçekçi bir zaman planı ile bütçe oluşturulur. Riskler önceden tanımlanır, her risk için önlem ve sorumlu atanır; paydaşların rol ve beklentileri iletişim planına bağlanır.",
          "Uygulama döneminde ilerleme, maliyet ve kalite düzenli olarak ölçülür. Haftalık proje toplantıları, sapma analizleri ve karar kayıtlarıyla proje şeffaf biçimde yönetilir; sorunlar büyümeden fark edilir ve çözülür. Değişiklik talepleri kontrollü bir süreçle değerlendirilerek kapsam kayması önlenir.",
          "Kurumların kendi proje yönetim yetkinliğini geliştirmesi için proje yönetim ofisi kurulumu, metodoloji ve şablonların hazırlanması ve proje yöneticisi eğitimleri sunarız. Böylece şirket, bir sonraki projesini kendi ekibiyle aynı disiplinle yönetebilir hale gelir.",
        ],
        scope: [
          "Proje kapsamı, hedefler ve başarı kriterlerinin tanımlanması",
          "İş kırılım yapısı, zaman planı ve bütçe oluşturma",
          "Risk analizi ve paydaş iletişim planı",
          "İlerleme, maliyet ve kalite takibi; sapma analizleri",
          "Değişiklik yönetimi ve kapsam kontrolü",
          "Proje yönetim ofisi (PMO) kurulumu ve eğitimler",
        ],
      },
    ],
    theme: {
      bg: "bg-[#0c1b30]",
      line: "border-[#0c1b30]",
      lineSoft: "border-[#0c1b30]/15",
      lineHover: "hover:border-[#0c1b30]",
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
