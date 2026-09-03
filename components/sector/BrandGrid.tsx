"use client";

import { useState } from "react";
import type { Marka } from "@/lib/gida-markalar";

// Markalar sayfası: arama kutusu + logo/baş harf kartları.
// Logosu olan markalar görselle, olmayanlar lacivert baş harf rozetiyle gösterilir.
export function BrandGrid({ brands }: { brands: Marka[] }) {
  const [q, setQ] = useState("");
  const aranan = q.trim().toLocaleLowerCase("tr");
  const list = aranan ? brands.filter((b) => b.name.toLocaleLowerCase("tr").includes(aranan)) : brands;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink/70">
          {aranan ? `${list.length} marka bulundu` : `Toplam ${brands.length} marka`}
        </p>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Marka ara</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Marka ara…"
            className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-navy-800"
          />
        </label>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">Aradığınız marka bulunamadı.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((b) => (
            <div
              key={b.slug}
              className="group flex flex-col items-center rounded-lg border border-ink/10 bg-white px-4 py-5 text-center transition duration-300 hover:-translate-y-0.5 hover:border-navy-800 hover:shadow-[0_16px_40px_-20px_rgba(27,42,73,0.35)]"
            >
              <div className="flex h-14 w-full items-center justify-center">
                {b.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- SVG/PNG logolar, boyutlar değişken
                  <img
                    src={b.logo}
                    alt={b.name}
                    loading="lazy"
                    className="h-14 w-[140px] object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="flex size-12 items-center justify-center rounded-full bg-navy-50 text-base font-bold tracking-tight text-navy-800 transition duration-300 group-hover:bg-navy-800 group-hover:text-white">
                    {basHarf(b.name)}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm font-semibold leading-snug text-ink">{b.name}</p>
              <p className="mt-0.5 text-xs text-muted">{b.count} ürün</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// "Kuru Kahveci" → "KK", "Ülker" → "Ü"
function basHarf(name: string) {
  const parts = name.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p.charAt(0).toLocaleUpperCase("tr")).join("");
}
