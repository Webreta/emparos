"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CategoryFilter, type FilterGroup } from "@/components/sector/CategoryFilter";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

// Ürün listesi sayfasının etkileşimli gövdesi: canlı arama kutusu + sol filtre + ürün grid'i.
// Arama kutusu boşken sayfa, URL'deki kategori seçimine göre listeler (sunucudan gelen `chosen`).
// Kutuya bir şey yazılınca kategori seçimi devre dışı kalır ve TÜM ürünler içinde arama yapılır;
// kutu temizlenince sol filtre kaldığı seçimle görünmeye devam eder (URL değişmez).

export type CatalogProduct = {
  name: string;
  image: string;
  cat: string; // alt kategori slug'ı
  catName: string;
};

export function ProductCatalog({
  groups,
  selected,
  accent,
  all,
  chosen,
  hepsi,
  chosenNames,
  locale,
}: {
  groups: FilterGroup[];
  selected: string[]; // filtrede işaretli kategoriler (hepsi modunda boş)
  accent: string;
  all: CatalogProduct[]; // sektörün bütün ürünleri
  chosen: string[]; // arama yokken listelenecek kategori slug'ları
  hepsi: boolean; // ?k=tumu
  chosenNames: string[]; // seçili kategorilerin adları (alt başlık)
  locale: Locale;
}) {
  const t = ui[locale].catalog;
  const [q, setQ] = useState("");
  const aranan = normalize(q);
  const searching = aranan.length > 0;

  // Mobil filtre paneli (alt sayfa). Açıkken sayfa kaydırması kilitlenir, Esc ile kapanır.
  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    if (!filterOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFilterOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [filterOpen]);

  // Arama: her kelime ürün adında (veya kategori adında) geçmeli
  const tokens = aranan.split(/\s+/).filter(Boolean);
  const products = searching
    ? all.filter((p) => {
        const hay = normalize(`${p.name} ${p.catName}`);
        return tokens.every((t) => hay.includes(t));
      })
    : all.filter((p) => chosen.includes(p.cat));

  const title = searching ? t.results : hepsi ? t.all : t.products;

  return (
    <>
      {/* Arama kutusu: hero'nun bittiği çizgiye oturur (yarısı banner üstünde, yarısı liste alanında) */}
      <div className="relative z-10 mx-auto -mt-7 max-w-7xl px-5 lg:px-8">
        <label className="relative mx-auto block w-full max-w-3xl">
          <span className="sr-only">{t.search}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-navy-800/60" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            autoComplete="off"
            className="h-14 w-full rounded-full border border-ink/10 bg-white pl-13 pr-14 text-[15px] text-ink shadow-[0_12px_40px_-12px_rgba(23,32,51,0.35)] outline-none transition placeholder:text-ink/40 focus:border-navy-800 focus:shadow-[0_16px_48px_-12px_rgba(27,42,73,0.45)] [&::-webkit-search-cancel-button]:hidden"
          />
          {/* Temizle düğmesi: yalnızca kutu doluyken */}
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label={t.clear}
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition hover:bg-navy-50 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </label>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-4 lg:px-8">
        {/* Masaüstü: sol sütunda sabit filtre. Mobilde gizli; sol alttaki yüzen düğmeyle alt panel olarak açılır. */}
        <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
          <CategoryFilter groups={groups} selected={selected} accent={accent} search={searching ? q.trim() : undefined} locale={locale} />
        </aside>

        {/* Mobil filtre düğmesi: WhatsApp düğmesiyle aynı boyut/konum dili, sol altta */}
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          aria-label={t.filter}
          aria-expanded={filterOpen}
          className="fixed bottom-5 left-5 z-40 flex size-14 items-center justify-center rounded-full bg-navy-800 text-white shadow-lg transition hover:scale-105 lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
            <line x1="21" x2="14" y1="4" y2="4" />
            <line x1="10" x2="3" y1="4" y2="4" />
            <line x1="21" x2="12" y1="12" y2="12" />
            <line x1="8" x2="3" y1="12" y2="12" />
            <line x1="21" x2="16" y1="20" y2="20" />
            <line x1="12" x2="3" y1="20" y2="20" />
            <line x1="14" x2="14" y1="2" y2="6" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="16" x2="16" y1="18" y2="22" />
          </svg>
          {/* Seçili kategori sayısı rozeti */}
          {selected.length > 0 && !searching && (
            <span className={`absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full ${accent} px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ring-2 ring-white`}>
              {selected.length}
            </span>
          )}
        </button>

        {/* Mobil filtre paneli: alttan açılan sayfa */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.filter}>
            <button type="button" aria-label={t.close} onClick={() => setFilterOpen(false)} className="absolute inset-0 bg-ink/50" />
            <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-[#f7f7f4] shadow-[0_-16px_48px_-16px_rgba(23,32,51,0.45)]">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
                <span className="text-sm font-bold text-ink">{t.filterTitle}</span>
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  aria-label={t.close}
                  className="flex size-9 items-center justify-center rounded-full text-ink/60 transition hover:bg-white hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto px-5 pb-4 pt-4">
                <CategoryFilter groups={groups} selected={selected} accent={accent} search={searching ? q.trim() : undefined} locale={locale} />
              </div>
              <div className="border-t border-ink/10 bg-white px-5 py-3">
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="w-full rounded-full bg-navy-800 py-3 text-sm font-bold text-white transition hover:bg-navy-900"
                >
                  {t.show(products.length)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ürünler */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
              {searching ? (
                <p className="mt-1 text-sm text-ink/70">{t.searchedFor(q.trim())}</p>
              ) : (
                !hepsi && chosenNames.length > 1 && <p className="mt-1 text-sm text-ink/70">{chosenNames.join(" · ")}</p>
              )}
            </div>
            <p className="text-sm text-ink/70">{t.count(products.length)}</p>
          </div>

          {products.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted">{t.noResults}</p>
          ) : (
            // Mobilde 2'li, masaüstünde 3'lü grid
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {products.map((p) => (
                // Aynı ad birden fazla üründe geçebilir (varyantlar); görsel yolu slug tabanlı ve benzersiz
                <div key={p.image} className="group flex flex-col overflow-hidden rounded-lg border border-navy-800 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(27,42,73,0.35)]">
                  <div className="relative aspect-square w-full bg-white">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-6"
                    />
                  </div>
                  <div className="border-t border-navy-800/20 px-3 py-3 sm:px-4 sm:py-3.5">
                    <h3 className="text-center text-xs font-normal leading-snug text-ink/80 sm:text-sm">{p.name}</h3>
                    {/* Arama modunda ürünün hangi kategoriden geldiği gösterilir */}
                    {searching && <p className="mt-1 text-center text-[11px] text-muted">{p.catName}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Türkçe küçük harf + fazla boşluk temizliği
function normalize(s: string) {
  return s.toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();
}
