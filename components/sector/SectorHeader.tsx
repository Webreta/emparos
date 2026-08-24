"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";

// Alt site header'ı: her sektör kendi rengi ve menüsüyle ayrı bir siteymiş gibi.
// Ege Yatçılık tarzı üstten sarkan, alt köşeleri oval kart; ancak opak ve sektör renginde.
export function SectorHeader({ sector }: { sector: Sector }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme } = sector;

  const nav = [
    { href: sector.base, label: "Ana Sayfa", exact: true },
    { href: `${sector.base}#urunler`, label: sector.itemsLabel, dropdown: true },
    { href: `${sector.base}/hakkimizda`, label: "Hakkımızda" },
    { href: `${sector.base}/iletisim`, label: "İletişim" },
  ];
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href.split("#")[0]) && !exact && href !== sector.base;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`mx-auto max-w-7xl rounded-b-[2.5rem] border-x border-b border-white/20 ${theme.bg} text-white shadow-xl shadow-black/20 ring-1 ring-inset ring-white/5`}>
        {/* Üst bar: ana siteye dönüş + iletişim */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-xs text-white/70">
          <Link href="/" className="flex items-center gap-1.5 hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Emparos Global
          </Link>
          <div className="flex items-center gap-4">
            <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="hidden hover:text-white sm:inline">{site.email}</a>
          </div>
        </div>

        {/* Ana bar */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 border-t border-white/10 px-6 py-3">
          <Link href={sector.base} onClick={() => setOpen(false)} className="flex items-center gap-3">
            <Image src="/logo-white.png" alt={site.name} width={760} height={228} priority className="h-10 w-auto" />
            <span className="hidden border-l border-white/20 pl-3 sm:block">
              <span className="block text-sm font-bold leading-tight">{sector.name}</span>
              <span className="block text-[11px] text-white/60">{sector.tagline}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.dropdown ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white/85 hover:text-white">
                    {item.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-0 top-full w-max min-w-72 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-line bg-white p-2 shadow-lg">
                      {sector.items.map((it) => (
                        <Link
                          key={it.slug}
                          href={`${sector.base}/${it.slug}`}
                          className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-navy-50 hover:${theme.accentText}`}
                        >
                          {it.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive(item.href, item.exact) ? "text-white underline decoration-2 underline-offset-8" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 rounded-lg ${theme.accent} ${theme.accentHover} px-4 py-2 text-sm font-bold text-white transition`}
            >
              Teklif Al
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
            aria-expanded={open}
            className="rounded-lg p-2 text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-6">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav className="overflow-hidden">
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-base font-semibold text-white/90 hover:bg-white/10">
                  {item.label}
                </Link>
              ))}
              <div className="mt-1 border-t border-white/10 pt-2">
                {sector.items.map((it) => (
                  <Link key={it.slug} href={`${sector.base}/${it.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-white/80">
                    {it.title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
