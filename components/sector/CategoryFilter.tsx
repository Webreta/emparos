"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Ürün listesi sayfasının sol filtresi.
// Ana kategoriler (ürün grupları) akordeon olarak açılır, altındaki alt kategoriler
// onay kutusuyla çoklu seçilir. Seçim URL'deki `k` parametresinde tutulur (?k=slug,slug),
// sayfa sunucuda seçili kategorilerin ürünlerini birleştirip listeler.

export type FilterGroup = {
  slug: string;
  title: string;
  cats: { slug: string; name: string; count: number }[];
};

export function CategoryFilter({
  groups,
  selected,
  accent,
}: {
  groups: FilterGroup[];
  selected: string[];
  accent: string; // sektör vurgu zemini (örn. bg-gold-500)
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Aynı anda yalnızca bir grup açık. Başlangıçta seçili kategori içeren ilk grup açılır.
  const [open, setOpen] = useState<string | null>(
    () => groups.find((g) => g.cats.some((c) => selected.includes(c.slug)))?.slug ?? null
  );

  // Açık gruba tıklanırsa kapanır, başka gruba tıklanırsa o açılır (öncekini kapatır)
  const toggleGroup = (slug: string) => setOpen((prev) => (prev === slug ? null : slug));

  // Seçimi URL'ye yazar; hiç seçim kalmazsa parametre kaldırılır, sayfa kendi kategorisine döner
  const apply = (next: string[]) => {
    const qs = next.length ? `?k=${next.join(",")}` : "";
    router.replace(`${pathname}${qs}`, { scroll: false });
  };

  const toggleCat = (slug: string) =>
    apply(selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug]);

  // Ana kategori kutusu: tümü seçiliyse hepsini kaldırır, değilse grubun tüm alt kategorilerini ekler
  const toggleGroupAll = (g: FilterGroup) => {
    const slugs = g.cats.map((c) => c.slug);
    const allSelected = slugs.every((x) => selected.includes(x));
    apply(allSelected ? selected.filter((x) => !slugs.includes(x)) : [...new Set([...selected, ...slugs])]);
  };

  // Tüm filtreleri kaldır: ?k=tumu → sayfa bütün kategorilerin ürünlerini listeler
  const clear = () => router.replace(`${pathname}?k=tumu`, { scroll: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">Filtrele</p>
        {/* Seçimleri sıfırlar; sayfa kendi kategorisine döner */}
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-semibold text-ink/70 transition hover:border-navy-800 hover:text-navy-800"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          Filtreleri kaldır
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {groups.map((g) => {
          const isOpen = open === g.slug;
          const selectedInGroup = g.cats.filter((c) => selected.includes(c.slug)).length;
          return (
            <div key={g.slug} className="overflow-hidden rounded-lg border border-ink/10 bg-white">
              {/* Ana kategori satırı: solda "tümünü seç" kutusu, sağda akordeon düğmesi */}
              <div className="flex items-center gap-2.5 pl-4 transition hover:bg-navy-50">
                <input
                  type="checkbox"
                  aria-label={`${g.title}: tüm alt kategorileri seç`}
                  checked={selectedInGroup === g.cats.length}
                  ref={(el) => {
                    if (el) el.indeterminate = selectedInGroup > 0 && selectedInGroup < g.cats.length;
                  }}
                  onChange={() => toggleGroupAll(g)}
                  className="size-4 shrink-0 rounded border-ink/30 accent-gold-500"
                />
              <button
                type="button"
                onClick={() => toggleGroup(g.slug)}
                aria-expanded={isOpen}
                className="flex flex-1 items-center justify-between gap-3 py-3 pr-4 text-left text-sm font-bold text-ink"
              >
                <span className="flex items-center gap-2">
                  {g.title}
                  {selectedInGroup > 0 && (
                    <span className={`rounded-full ${accent} px-1.5 py-0.5 text-[10px] font-bold leading-none text-white`}>{selectedInGroup}</span>
                  )}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`size-4 shrink-0 text-muted transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              </div>

              {/* Alt kategoriler: liste her zaman basılır, grid satır yüksekliği 0fr↔1fr arasında animasyonla açılıp kapanır */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                inert={!isOpen}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="border-t border-ink/10 py-1.5">
                    {g.cats.map((c) => {
                      const checked = selected.includes(c.slug);
                      return (
                        <li key={c.slug}>
                          <label className="flex cursor-pointer items-center gap-2.5 px-4 py-1.5 text-[13px] text-ink/80 transition hover:bg-navy-50 hover:text-ink">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCat(c.slug)}
                              className="size-3.5 shrink-0 rounded border-ink/30 accent-gold-500"
                            />
                            <span className={`flex-1 ${checked ? "font-semibold text-ink" : ""}`}>{c.name}</span>
                            <span className="text-[11px] tabular-nums text-muted">{c.count}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
