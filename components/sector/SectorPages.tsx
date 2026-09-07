import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";
import { SectorIcon, type SectorIconKey } from "@/components/sector/icons";
import { QuoteForm } from "@/components/sector/QuoteForm";
import type { FilterGroup } from "@/components/sector/CategoryFilter";
import { ProductCatalog, type CatalogProduct } from "@/components/sector/ProductCatalog";
import { BrandGrid } from "@/components/sector/BrandGrid";
import { markalar } from "@/lib/gida-markalar";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

// Alt site sayfa şablonları. İki sektör de aynı iskeleti kullanır,
// renk/metin/menü farkı `sector` nesnesinden gelir.

// Tüm şablonlar `sector`'ü yerelleştirilmiş (localizeSector) alır; arayüz metinleri ui[locale]'den gelir.
export function SectorHome({ sector, locale }: { sector: Sector; locale: Locale }) {
  const { theme } = sector;
  const t = ui[locale];
  // Ana sayfa logo kaydırağı: logosu olan markalardan en fazla 30 tanesi (ürün sayısına göre)
  const brands = sector.hasBrandsPage ? markalar().filter((b) => b.logo).slice(0, 30) : [];
  return (
    <>
      {/* Hero */}
      <section className={`relative ${theme.bg} px-5 pt-44 text-white lg:px-8 lg:pt-56 ${brands.length ? "pb-48 lg:pb-60" : "pb-20 lg:pb-28"}`}>
        {sector.heroImage && (
          <>
            <Image
              src={sector.heroImage}
              alt={sector.name}
              fill
              priority
              sizes="100vw"
              // Görsel üstten hizalı: raflar ve paletler görünür, forkliftin yalnızca üst kısmı kadrajda kalır
              className="object-cover object-[center_15%]"
            />
            {/* Soldan sağa açılan sektör rengi katmanı: metin okunur kalsın, görsel sağda net görünsün */}
            <span className={`absolute inset-0 bg-gradient-to-r ${theme.heroFrom} via-black/50 to-black/20`} />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </>
        )}
        {/* Logo şeridi varsa hero alt kenarı beyaza akarak biter, şerit bu geçişin üzerine biner */}
        {brands.length > 0 && <span className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/60 to-transparent" />}
        <div className="relative mx-auto max-w-7xl">
          {/* Üst başlık ve vurgu çizgisi kaldırıldı; alt metin en fazla 2 satır */}
          <h1 className="max-w-3xl text-4xl font-bold leading-tight lg:text-5xl">{sector.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 lg:line-clamp-2">{sector.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#urunler" className={`rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}>
              {sector.itemsLabel}
            </a>
            <Link href={`${sector.base}/teklif`} className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10">
              {t.home.quoteBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Marka kaydırağı: hero'nun alt kenarına binen eşit boyutlu logo kutuları (aynı liste iki kez basılır, sonsuz akar) */}
      {brands.length > 0 && (
        <section className="relative z-10 -mt-24 px-0 pb-4">
          <div className="marquee relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-4 pr-4">
                  {brands.map((b) => (
                    <Link
                      key={b.slug}
                      href={`${sector.base}/markalar`}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-white px-6 shadow-[0_8px_30px_-12px_rgba(23,32,51,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-navy-800"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- SVG/PNG logolar, boyutlar değişken */}
                      <img
                        src={b.logo}
                        alt={copy === 0 ? b.name : ""}
                        className="h-14 w-[140px] object-contain"
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ürün / hizmet grupları */}
      <section id="urunler" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <h2 className="text-3xl font-bold text-ink">{sector.itemsLabel}</h2>
        {/* Sektör koyu zeminli ikonlu kartlar. 4 grup → 4'lü tek satır (Gıda); diğer sayılar → 2'li satırlar,
            tek kalan son kart satırda ortalanır (Mühendislik: 2-2-2-1). Banner görseli kullanılmıyor. */}
        <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${sector.items.length === 4 ? "lg:grid-cols-4" : ""}`}>
          {sector.items.map((it, i) => (
            <Link
              key={it.slug}
              href={`${sector.base}/${it.slug}`}
              className={`group flex flex-col rounded-2xl ${theme.bg} p-7 text-white shadow-[0_12px_36px_-14px_rgba(27,42,73,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_64px_-24px_rgba(27,42,73,0.6)] ${
                sector.items.length !== 4 && sector.items.length % 2 === 1 && i === sector.items.length - 1
                  ? "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center"
                  : ""
              }`}
            >
              {/* İkon kutusuz, doğrudan vurgu renginde; hover'da beyaza döner */}
              {it.icon ? (
                <SectorIcon name={it.icon} className={`size-12 ${theme.accentText} transition duration-300 group-hover:text-white`} />
              ) : (
                <span className={`block h-1.5 w-10 rounded-full ${theme.accent}`} />
              )}
              <h3 className="mt-5 text-lg font-bold tracking-tight">{it.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{it.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                {t.home.explore}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Neden biz: koyu (lacivert) zeminli bölüm, üzerinde açık kartlar. ("Nasıl Çalışıyoruz" bölümü kaldırıldı.) */}
      {sector.features && (
        <section className={`${theme.bg} px-5 py-20 text-white lg:px-8`}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">{t.home.why(sector.name)}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sector.features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-white/10 bg-white p-7 text-ink shadow-[0_12px_36px_-14px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.5)]"
                >
                  {/* İkon kutusuz, koyu sektör renginde (lacivert) */}
                  {f.icon ? (
                    <SectorIcon name={f.icon} className="size-12 text-navy-800" />
                  ) : (
                    <span className={`block h-1.5 w-10 rounded-full ${theme.accent}`} />
                  )}
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectorCta sector={sector} locale={locale} />
    </>
  );
}

// Ana sayfa ve tüm iç sayfaların altında ortak çağrı bloğu.
export function SectorCta({ sector, locale }: { sector: Sector; locale: Locale }) {
  const { theme } = sector;
  const t = ui[locale].cta;
  return (
    <section className={`${theme.soft} px-5 py-20 lg:px-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-ink">{t.title}</h2>
        <p className="mt-3 text-ink/80">{t.text}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`${sector.base}/teklif`} className={`rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}>
            {t.formBtn}
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

// Ana sayfa kartlarıyla aynı görsel dil: kırık beyaz zemin, ince çerçeve, yumuşak gölge, hover'da yükselme.
const cardClass =
  "rounded-2xl border border-ink/10 bg-[#f7f7f4] shadow-[0_8px_30px_-12px_rgba(23,32,51,0.12)] transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(23,32,51,0.25)]";

// Kart içindeki ikon kutusu (hover'da sektör rengine dolar)
function CardIcon({ sector, name, size = "md" }: { sector: Sector; name: SectorIconKey; size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-11 rounded-xl" : "size-14 rounded-2xl";
  const icon = size === "sm" ? "size-5" : "size-7";
  return (
    <span className={`flex ${box} items-center justify-center bg-white ${sector.theme.accentText} shadow-sm ring-1 ring-black/5 transition duration-300 ${sector.theme.iconHover} group-hover:text-white`}>
      <SectorIcon name={name} className={icon} />
    </span>
  );
}

// Hizmet sayfası metin arası görseli (16:9, yuvarlak köşe)
function ItemFigure({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="!mb-8 overflow-hidden rounded-2xl border border-ink/10 shadow-[0_12px_36px_-14px_rgba(23,32,51,0.3)]">
      <div className="relative aspect-[16/9] w-full bg-navy-50">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>
    </figure>
  );
}

export function SectorItemPage({ sector, slug, locale }: { sector: Sector; slug: string; locale: Locale }) {
  const item = sector.items.find((i) => i.slug === slug);
  if (!item) notFound();
  const t = ui[locale].item;
  return (
    <>
      <SectorPageHero sector={sector} title={item.title} text={item.text} image={item.image} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          {/* Ürün listesi olan sayfalarda giriş metni gösterilmez, doğrudan kategoriler gelir */}
          {!item.products && (
            <div className="space-y-4 text-[17px] leading-relaxed text-ink/80">
              {/* Tek görsel, metnin başında */}
              {item.gallery?.[0] && <ItemFigure {...item.gallery[0]} />}
              {(item.paragraphs ?? [item.text]).map((p) => (
                <p key={p}>{p}</p>
              ))}

              {item.scope && (
                <div className="!mt-10">
                  <h2 className="text-xl font-bold tracking-tight text-ink">{t.scope}</h2>
                  {/* Her madde ayrı kutu: solda koyu zeminli onay ikonu, sağda metin; 2 sütun */}
                  <ul className="mt-5 grid gap-3 text-[15px] sm:grid-cols-2">
                    {item.scope.map((s) => (
                      <li
                        key={s}
                        className={`flex items-center gap-3 rounded-xl border ${sector.theme.lineSoft} bg-white p-4 leading-snug text-ink transition duration-300 ${sector.theme.lineHover} hover:shadow-[0_16px_40px_-20px_rgba(27,42,73,0.35)]`}
                      >
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${sector.theme.bg} text-white`}>
                          <SectorIcon name="onay" className="size-4" />
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {item.products && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">{item.productsLabel ?? t.products}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {item.products.map((p) => {
                  const hasList = !!p.products?.length;
                  const inner = (
                    <>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-ink">{p.name}</h3>
                        <p className="mt-2 truncate text-sm leading-relaxed text-ink/80" title={p.desc}>{p.desc}</p>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-ink bg-white px-4 py-2 text-sm font-semibold text-ink transition duration-300 group-hover:bg-ink group-hover:text-white">
                        {t.viewProducts}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </>
                  );
                  return hasList ? (
                    <Link key={p.slug} href={`${sector.base}/${item.slug}/${p.slug}`} className={`group flex flex-col p-6 ${cardClass}`}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={p.slug} className={`group flex flex-col p-6 ${cardClass}`}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <aside className="space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">{sector.itemsLabel}</p>
            <div className="mt-4 space-y-2.5">
              {sector.items.map((it) => {
                const active = it.slug === slug;
                return (
                  <Link
                    key={it.slug}
                    href={`${sector.base}/${it.slug}`}
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition duration-300 ${
                      active
                        ? `${sector.theme.accent} border-transparent text-white shadow-[0_12px_30px_-14px_rgba(23,32,51,0.4)]`
                        : "border-ink/10 bg-[#f7f7f4] text-ink hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white hover:shadow-[0_16px_40px_-20px_rgba(23,32,51,0.25)]"
                    }`}
                  >
                    {it.icon && (
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${active ? "bg-white/15 text-white" : `bg-white ${sector.theme.accentText} ring-1 ring-black/5`}`}>
                        <SectorIcon name={it.icon} className="size-5" />
                      </span>
                    )}
                    {it.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Teklif kartı */}
          <div className={`rounded-2xl ${sector.theme.bg} p-7 text-white`}>
            {(() => {
              const q = sector.key === "muhendislik" ? t.quoteEng : t.quoteFood;
              return (
                <>
                  <p className="text-lg font-bold">{q.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{q.text}</p>
                </>
              );
            })()}
            <Link
              href={`${sector.base}/teklif`}
              className={`mt-5 inline-flex items-center gap-2 rounded-full ${sector.theme.accent} ${sector.theme.accentHover} px-5 py-2.5 text-sm font-bold text-white transition`}
            >
              {t.formBtn}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </aside>
      </section>
      <SectorCta sector={sector} locale={locale} />
    </>
  );
}

// Kategori sayfası: solda akordeon filtre (ana kategoriler > alt kategoriler, çoklu seçim), sağda 3'lü ürün grid'i.
// `selected` URL'deki ?k=slug,slug parametresinden gelir; boşsa yalnızca sayfanın kendi kategorisi listelenir.
export function SectorCategoryPage({
  sector,
  slug,
  category,
  selected = [],
  locale,
}: {
  sector: Sector;
  slug: string;
  category: string;
  selected?: string[];
  locale: Locale;
}) {
  const item = sector.items.find((i) => i.slug === slug);
  const cat = item?.products?.find((p) => p.slug === category);
  if (!item || !cat || !cat.products?.length) notFound();

  // Filtre ağacı: ürün listesi olan tüm gruplar ve alt kategorileri
  const groups: FilterGroup[] = sector.items
    .map((it) => ({
      slug: it.slug,
      title: it.title,
      cats: (it.products ?? []).filter((c) => c.products?.length).map((c) => ({ slug: c.slug, name: c.name, count: c.products!.length })),
    }))
    .filter((g) => g.cats.length > 0);
  const allCats = groups.flatMap((g) => g.cats.map((c) => c.slug));

  // Geçerli seçim; hiç yoksa sayfanın kendi kategorisi. "tumu" → filtre yok, tüm ürünler.
  const hepsi = selected.includes("tumu");
  const active = selected.filter((k) => allCats.includes(k));
  const chosen = hepsi ? allCats : active.length ? active : [cat.slug];

  // Sektörün bütün ürünleri düz listeye açılır (arama tüm ürünlerde çalışır), Türkçe alfabetik sıralanır.
  // Listeleme/arama mantığı client tarafında ProductCatalog içinde.
  const all: CatalogProduct[] = sector.items
    .flatMap((it) => (it.products ?? []).flatMap((c) => (c.products ?? []).map((p) => ({ ...p, cat: c.slug, catName: c.name }))))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
  const chosenNames = sector.items.flatMap((it) => (it.products ?? []).filter((c) => chosen.includes(c.slug)).map((c) => c.name));

  return (
    <>
      <SectorPageHero sector={sector} title={cat.name} text={cat.desc} image={item.image} />
      <ProductCatalog
        groups={groups}
        selected={hepsi ? [] : chosen}
        accent={sector.theme.accent}
        all={all}
        chosen={chosen}
        hepsi={hepsi}
        chosenNames={chosenNames}
        locale={locale}
      />
      <SectorCta sector={sector} locale={locale} />
    </>
  );
}

// Markalar sayfası: tedarik edilen tüm markalar, logo veya baş harf kartlarıyla (arama kutulu grid).
export function SectorBrandsPage({ sector, locale }: { sector: Sector; locale: Locale }) {
  const liste = markalar();
  const t = ui[locale].brands;
  return (
    <>
      <SectorPageHero sector={sector} title={t.title} text={t.heroText(liste.length)} image={sector.heroImage} />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <BrandGrid brands={liste} locale={locale} />
      </section>
      <SectorCta sector={sector} locale={locale} />
    </>
  );
}

// Teklif formu sayfası: solda form, sağda süreç özeti.
export function SectorQuotePage({ sector, locale }: { sector: Sector; locale: Locale }) {
  const t = ui[locale].quote;
  return (
    <>
      <SectorPageHero sector={sector} title={t.title} text={t.text} image={sector.heroImage} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <QuoteForm sector={sector} locale={locale} />
        </div>
        {/* Sağ sütun yalnızca süreç özeti (iletişim bilgileri İletişim sayfasında) */}
        <aside className="space-y-8">
          {sector.process && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">{t.process}</p>
              {/* Alt alta ikon kutuları: solda koyu (lacivert) ikon karesi, sağda adım numarası + başlık + açıklama */}
              <ol className="mt-4 space-y-3">
                {sector.process.map((step, i) => (
                  <li
                    key={step.title}
                    className={`group flex gap-4 rounded-2xl border ${sector.theme.lineSoft} bg-white p-4 transition duration-300 ${sector.theme.lineHover} hover:shadow-[0_16px_40px_-20px_rgba(27,42,73,0.35)]`}
                  >
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${sector.theme.bg} text-white`}>
                      <SectorIcon name={step.icon ?? "onay"} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-[11px] font-bold tracking-widest ${sector.theme.accentText}`}>0{i + 1}</span>
                      <span className="mt-0.5 block text-sm font-bold text-ink">{step.title}</span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-ink/70">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}

export function SectorSimplePage({
  sector,
  title,
  text,
  locale,
  children,
}: {
  sector: Sector;
  title: string;
  text?: string;
  locale: Locale;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SectorPageHero sector={sector} title={title} text={text} />
      <section className="mx-auto max-w-4xl px-5 py-16 text-[17px] leading-relaxed text-ink/80 lg:px-8">
        {children ?? <p>Bu sayfanın içeriği tasarım yönlendirmesiyle hazırlanacak.</p>}
      </section>
      <SectorCta sector={sector} locale={locale} />
    </>
  );
}

// İletişim sayfası: ana sayfa kart dilinde üç bilgi kartı + teklif ve WhatsApp yönlendirmesi.
export function SectorContactPage({ sector, locale }: { sector: Sector; locale: Locale }) {
  const t = ui[locale].contact;
  const cards: { icon: SectorIconKey; title: string; body: React.ReactNode; href?: string; external?: boolean }[] = [
    { icon: "telefon", title: t.phone, body: site.phone, href: site.phoneHref },
    { icon: "eposta", title: t.email, body: site.email, href: `mailto:${site.email}` },
    { icon: "adres", title: t.address, body: site.address },
  ];
  return (
    <>
      <SectorPageHero sector={sector} title={t.title} text={t.text} image={sector.heroImage} />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {/* Bilgi kartları: koyu sektör rengi (lacivert) çerçeveli, beyaz zemin */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const cls = `group block rounded-2xl border ${sector.theme.line} bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(27,42,73,0.35)]`;
            const inner = (
              <>
                <CardIcon sector={sector} name={c.icon} />
                <h2 className="mt-6 text-lg font-bold text-ink">{c.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{c.body}</p>
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className={cls}>
                {inner}
              </a>
            ) : (
              <div key={c.title} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Teklif kartı */}
          <div className={`rounded-2xl ${sector.theme.bg} p-8 text-white`}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">{t.priceQuote}</p>
            <h2 className="mt-3 text-2xl font-bold">{t.fillTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{t.fillText}</p>
            <Link
              href={`${sector.base}/teklif`}
              className={`mt-6 inline-flex items-center gap-2 rounded-full ${sector.theme.accent} ${sector.theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}
            >
              {t.formBtn}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* WhatsApp kartı: WhatsApp yeşili çerçeve, gerçek WhatsApp simgesi ve yeşil düğme */}
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border-2 border-[#25D366] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(37,211,102,0.5)]"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.7)]">
              <WhatsAppGlyph className="size-8" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#128C7E]">WhatsApp</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">{t.waTitle}</h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/80">{t.waText}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition duration-300 group-hover:bg-[#1ebe5b]">
              <WhatsAppGlyph className="size-4" />
              {site.phone}
            </span>
          </a>
        </div>
      </section>
    </>
  );
}

// WhatsApp marka simgesi (dolgulu)
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.6.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.5-.7-.5h-.5Z" />
    </svg>
  );
}

function SectorPageHero({
  sector,
  title,
  text,
  image,
}: {
  sector: Sector;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className={`relative ${sector.theme.bg} px-5 pb-16 pt-44 text-white lg:px-8`}>
      {image && (
        <>
          <Image src={image} alt={title} fill sizes="100vw" className="object-cover opacity-20" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </>
      )}
      {/* Üst başlık (ekmek kırıntısı) ve vurgu çizgisi kaldırıldı; hero yalnızca başlık + kısa metin */}
      <div className="relative mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold lg:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-xl text-white/70">{text}</p>}
      </div>
    </section>
  );
}
