import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";
import { SectorIcon, type SectorIconKey } from "@/components/sector/icons";
import { QuoteForm } from "@/components/sector/QuoteForm";
import { CategoryFilter, type FilterGroup } from "@/components/sector/CategoryFilter";
import { BrandGrid } from "@/components/sector/BrandGrid";
import { markalar } from "@/lib/gida-markalar";

// Alt site sayfa şablonları. İki sektör de aynı iskeleti kullanır,
// renk/metin/menü farkı `sector` nesnesinden gelir.

export function SectorHome({ sector }: { sector: Sector }) {
  const { theme } = sector;
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
              Teklif Alın
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
        {/* 2'li dizilim; her kartın üstünde 3:1 banner alanı (görsel gelene kadar boş yer tutucu; `banner` alanı dolunca görsel basılır) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sector.items.map((it) => (
            <Link
              key={it.slug}
              href={`${sector.base}/${it.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-[#f7f7f4] shadow-[0_8px_30px_-12px_rgba(23,32,51,0.12)] transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(23,32,51,0.25)]"
            >
              <div className="relative aspect-[3/1] w-full overflow-hidden bg-navy-50">
                {it.banner ? (
                  <Image
                    src={it.banner}
                    alt={it.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-widest text-navy-300">
                    Görsel gelecek
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-8">
              <h3 className="text-[22px] font-bold tracking-tight text-ink">{it.title}</h3>
              <p className="mt-3 flex-1 truncate text-[15px] leading-relaxed text-ink/80" title={it.text}>{it.text}</p>
              <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-ink bg-white px-4 py-2 text-sm font-semibold text-ink transition duration-300 group-hover:bg-ink group-hover:text-white">
                İncele
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tedarik süreci */}
      {sector.process && (
        <section className={`${theme.bg} px-5 py-20 text-white lg:px-8`}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">Nasıl Çalışıyoruz?</h2>
            {/* Soldan sağa akış: kart → ok → kart. Mobilde dikey, oklar aşağı bakar. */}
            <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
              {sector.process.map((step, i) => (
                <Fragment key={step.title}>
                  {i > 0 && (
                    <span className="flex shrink-0 items-center justify-center py-1 text-white/50 lg:px-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="size-6 rotate-90 lg:rotate-0" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  )}
                  <div className="flex flex-1 flex-col rounded-2xl border border-white/25 p-7 transition hover:border-white/50 hover:bg-white/5">
                    <span className={`flex size-10 items-center justify-center rounded-full ${theme.accent} text-sm font-bold`}>
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Neden biz */}
      {sector.features && (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <h2 className="text-3xl font-bold text-ink">Neden {sector.name}?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sector.features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-ink/10 bg-[#f7f7f4] p-7 shadow-[0_8px_30px_-12px_rgba(23,32,51,0.12)] transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(23,32,51,0.25)]"
              >
                {f.icon ? (
                  <span className={`flex size-14 items-center justify-center rounded-2xl bg-white ${theme.accentText} shadow-sm ring-1 ring-black/5 transition duration-300 ${theme.iconHover} group-hover:text-white`}>
                    <SectorIcon name={f.icon} className="size-7" />
                  </span>
                ) : (
                  <span className={`block h-1.5 w-10 rounded-full ${theme.accent}`} />
                )}
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <SectorCta sector={sector} />
    </>
  );
}

// Ana sayfa ve tüm iç sayfaların altında ortak çağrı bloğu.
export function SectorCta({ sector }: { sector: Sector }) {
  const { theme } = sector;
  return (
    <section className={`${theme.soft} px-5 py-20 lg:px-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-ink">İhtiyacınızı konuşalım</h2>
        <p className="mt-3 text-ink/80">Size özel teklif için formu doldurun ya da WhatsApp üzerinden hemen yazın.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`${sector.base}/teklif`} className={`rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}>
            Teklif Formu
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            WhatsApp
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

export function SectorItemPage({ sector, slug }: { sector: Sector; slug: string }) {
  const item = sector.items.find((i) => i.slug === slug);
  if (!item) notFound();
  return (
    <>
      <SectorPageHero sector={sector} title={item.title} text={item.text} image={item.image} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          {/* Ürün listesi olan sayfalarda giriş metni gösterilmez, doğrudan kategoriler gelir */}
          {!item.products && (
            <div className="space-y-4 text-[17px] leading-relaxed text-ink/80">
              {item.paragraphs ? item.paragraphs.map((p) => <p key={p}>{p}</p>) : <p>{item.text}</p>}
            </div>
          )}
          {item.products && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">{item.productsLabel ?? "Ürünler"}</h2>
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
                        Ürünleri Gör
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
            <p className="text-lg font-bold">Bu ürün grubu için teklif alın</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Adet ve teslimat noktasını iletin, aynı gün fiyat teklifiyle dönelim.</p>
            <Link
              href={`${sector.base}/teklif`}
              className={`mt-5 inline-flex items-center gap-2 rounded-full ${sector.theme.accent} ${sector.theme.accentHover} px-5 py-2.5 text-sm font-bold text-white transition`}
            >
              Teklif Formu
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </aside>
      </section>
      <SectorCta sector={sector} />
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
}: {
  sector: Sector;
  slug: string;
  category: string;
  selected?: string[];
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

  // Seçili kategorilerin ürünleri birleştirilir, Türkçe alfabetik sıralanır
  const chosenCats = sector.items.flatMap((it) => (it.products ?? []).filter((c) => chosen.includes(c.slug)));
  const products = chosenCats
    .flatMap((c) => c.products ?? [])
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return (
    <>
      <SectorPageHero sector={sector} title={cat.name} text={cat.desc} image={item.image} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <aside className="self-start lg:sticky lg:top-28">
          <CategoryFilter groups={groups} selected={hepsi ? [] : chosen} accent={sector.theme.accent} />
        </aside>

        {/* Ürünler */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">{hepsi ? "Tüm Ürünler" : "Ürünler"}</h2>
              {!hepsi && chosenCats.length > 1 && (
                <p className="mt-1 text-sm text-ink/70">{chosenCats.map((c) => c.name).join(" · ")}</p>
              )}
            </div>
            <p className="text-sm text-ink/70">{products.length} ürün</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              // Aynı ad birden fazla üründe geçebilir (varyantlar); görsel yolu slug tabanlı ve benzersiz
              <div key={p.image} className="group flex flex-col overflow-hidden rounded-lg border border-navy-800 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(27,42,73,0.35)]">
                <div className="relative aspect-square w-full bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-navy-800/20 px-4 py-3.5">
                  <h3 className="text-center text-sm font-normal leading-snug text-ink/80">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectorCta sector={sector} />
    </>
  );
}

// Markalar sayfası: tedarik edilen tüm markalar, logo veya baş harf kartlarıyla (arama kutulu grid).
export function SectorBrandsPage({ sector }: { sector: Sector }) {
  const liste = markalar();
  return (
    <>
      <SectorPageHero
        sector={sector}
        title="Markalar"
        text={`Katalogumuzda ${liste.length} markanın gıda, içecek ve temizlik ürünleri yer alıyor. Aradığınız markayı bulamazsanız teklif formundan iletin.`}
        image={sector.heroImage}
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <BrandGrid brands={liste} />
      </section>
      <SectorCta sector={sector} />
    </>
  );
}

// Teklif formu sayfası: solda form, sağda iletişim bilgileri ve süreç özeti.
export function SectorQuotePage({ sector }: { sector: Sector }) {
  return (
    <>
      <SectorPageHero
        sector={sector}
        title="Teklif Alın"
        text="Formu doldurun, aynı gün içinde size özel fiyat teklifiyle dönelim."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <QuoteForm sector={sector} />
        </div>
        <aside className="space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Doğrudan ulaşın</p>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li>
                <a href={site.phoneHref} className="font-semibold text-ink hover:underline">{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:underline">{site.email}</a>
              </li>
              <li>{site.address}</li>
            </ul>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              WhatsApp ile yazın
            </a>
          </div>
          {sector.process && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Süreç</p>
              <ol className="mt-4 space-y-3">
                {sector.process.map((step, i) => (
                  <li key={step.title} className="flex gap-3 text-sm">
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${sector.theme.accent} text-xs font-bold text-white`}>
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{step.title}</span>
                      <span className="text-ink/70">{step.text}</span>
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

export function SectorSimplePage({ sector, title, text, children }: { sector: Sector; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <>
      <SectorPageHero sector={sector} title={title} text={text} />
      <section className="mx-auto max-w-4xl px-5 py-16 text-[17px] leading-relaxed text-ink/80 lg:px-8">
        {children ?? <p>Bu sayfanın içeriği tasarım yönlendirmesiyle hazırlanacak.</p>}
      </section>
      <SectorCta sector={sector} />
    </>
  );
}

// İletişim sayfası: ana sayfa kart dilinde üç bilgi kartı + teklif ve WhatsApp yönlendirmesi.
export function SectorContactPage({ sector }: { sector: Sector }) {
  const cards: { icon: SectorIconKey; title: string; body: React.ReactNode; href?: string; external?: boolean }[] = [
    { icon: "telefon", title: "Telefon", body: site.phone, href: site.phoneHref },
    { icon: "eposta", title: "E-posta", body: site.email, href: `mailto:${site.email}` },
    { icon: "adres", title: "Adres", body: site.address },
  ];
  return (
    <>
      <SectorPageHero sector={sector} title="İletişim" text="Teklif ve bilgi için bize ulaşın. Aynı gün içinde dönüş yapıyoruz." />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const inner = (
              <>
                <CardIcon sector={sector} name={c.icon} />
                <h2 className="mt-6 text-lg font-bold text-ink">{c.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{c.body}</p>
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className={`group block p-8 ${cardClass}`}>
                {inner}
              </a>
            ) : (
              <div key={c.title} className={`group p-8 ${cardClass}`}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Teklif kartı */}
          <div className={`rounded-2xl ${sector.theme.bg} p-8 text-white`}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">Fiyat teklifi</p>
            <h2 className="mt-3 text-2xl font-bold">Teklif formunu doldurun</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              İhtiyacınız olan ürün grubu, adet ve teslimat noktasını iletin; ekibimiz size özel fiyat teklifiyle dönsün.
            </p>
            <Link
              href={`${sector.base}/teklif`}
              className={`mt-6 inline-flex items-center gap-2 rounded-full ${sector.theme.accent} ${sector.theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}
            >
              Teklif Formu
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* WhatsApp kartı */}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={`group block p-8 ${cardClass}`}>
            <CardIcon sector={sector} name="whatsapp" />
            <h2 className="mt-6 text-2xl font-bold text-ink">WhatsApp ile hemen yazın</h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/80">
              Hızlı sorularınız için mesaj gönderin, mesai saatleri içinde anında yanıt alın.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink bg-white px-5 py-2.5 text-sm font-semibold text-ink transition duration-300 group-hover:bg-ink group-hover:text-white">
              Sohbeti başlat
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </>
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
