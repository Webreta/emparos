"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { localizeDivisions } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";
import { LangSwitcher } from "@/components/site/LangSwitcher";

// Kurumsal (cover) sayfaların header'ı: Ege Yatçılık'taki gibi üstten sarkan,
// alt köşeleri oval tek parça kart: transparan/cam efektli, altın çerçeveli.
// Sol: Sektörler, Hakkımızda (cam butonlar) · Orta: logo
// Sağ: e-posta (düz metin), sosyal ikonlar (yalın), dil seçici, İletişim (cam buton, en sağda)

// Sosyal medya: adres boşsa gösterilmez (site.ts / ileride panelden)
const socials = [
  { key: "instagram", href: site.instagram, label: "Instagram" },
  { key: "linkedin", href: site.linkedin, label: "LinkedIn" },
  { key: "facebook", href: site.facebook, label: "Facebook" },
];

const btn = (active = false) =>
  `inline-flex h-10 min-w-40 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-semibold tracking-wide transition ${
    active
      ? "border-gold-400/70 bg-gold-500/20 text-white"
      : "border-white/20 bg-white/5 text-white/90 hover:border-gold-400/60 hover:bg-white/10 hover:text-white"
  }`;

// Sosyal ikonlar: dil kutularından biraz küçük, çerçeveli kutular
const iconLink =
  "inline-flex size-7 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/75 transition hover:border-white/50 hover:bg-white/10 hover:text-white";

const iconBtn =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:border-gold-400/60 hover:bg-white/10 hover:text-white";

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M6.5 8.5A1.75 1.75 0 1 1 6.5 5a1.75 1.75 0 0 1 0 3.5ZM5 10h3v9H5v-9Zm5 0h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.5V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3v-9Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z" />
    </svg>
  );
}

export function CoverHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = ui[locale];
  const divisions = localizeDivisions(locale);
  const left = [
    { href: "/sektorler", label: t.nav.sectors, dropdown: true },
    { href: "/hakkimizda", label: t.nav.about },
  ];
  const right = [{ href: "/iletisim", label: t.nav.contact }];
  const isActive = (href: string) => href.startsWith("/") && pathname.startsWith(href);
  const activeSocials = socials.filter((s) => s.href);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl rounded-b-[2.5rem] border-x border-b border-gold-400/40 bg-navy-950/70 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10 backdrop-blur-2xl">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 lg:px-8">
          {/* Sol butonlar */}
          <nav className="hidden items-center gap-2 lg:flex">
            {left.map((item) =>
              item.dropdown ? (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={btn(isActive(item.href))}>
                    {item.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 transition group-hover:rotate-180">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-0 top-full w-max min-w-72 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-gold-400/30 bg-navy-950/90 p-2 shadow-xl backdrop-blur-2xl">
                      {divisions.map((d) => (
                        <a
                          key={d.key}
                          href={d.href}
                          target={d.external ? "_blank" : undefined}
                          rel={d.external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
                        >
                          {d.title}
                          {d.external && <span className="text-xs text-white/50">↗</span>}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={btn(isActive(item.href))}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobil: hamburger solda */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className={`${iconBtn} justify-self-start lg:hidden`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          {/* Orta logo */}
          <Link href="/" onClick={() => setOpen(false)} className="px-2 py-1">
            <Image src="/logo-white.png" alt={site.name} width={760} height={228} priority className="h-11 w-auto sm:h-14" />
          </Link>

          {/* Sağ: sosyal ikonlar (kutulu), dil seçici, İletişim */}
          <nav className="hidden items-center justify-end gap-3 lg:flex">
            {activeSocials.length > 0 && (
              <span className="flex items-center gap-1.5">
                {activeSocials.map((s) => (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={iconLink}>
                    <SocialIcon name={s.key} />
                  </a>
                ))}
              </span>
            )}
            <LangSwitcher current={locale} />
            <Link href="/iletisim" className={btn(isActive("/iletisim"))}>
              {t.nav.contact}
            </Link>
          </nav>
          {/* Mobil: sağda dil seçici */}
          <div className="flex justify-end lg:hidden">
            <LangSwitcher current={locale} />
          </div>
        </div>

        {/* Mobil menü */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav className="overflow-hidden">
            <div className="flex flex-col gap-2 px-5 pb-6 pt-2">
              {[...left, ...right].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`${btn(isActive(item.href))} w-full`}>
                  {item.label}
                </Link>
              ))}
              <a href={`mailto:${site.email}`} className="px-3 py-2 text-sm text-white/80">
                {site.email}
              </a>
              <div className="mt-1 flex flex-col gap-1 border-t border-white/10 pt-3">
                {divisions.map((d) => (
                  <a
                    key={d.key}
                    href={d.href}
                    target={d.external ? "_blank" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/80"
                  >
                    {d.title}
                  </a>
                ))}
              </div>
              {activeSocials.length > 0 && (
                <div className="flex gap-1 px-2 pt-1">
                  {activeSocials.map((s) => (
                    <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={iconLink}>
                      <SocialIcon name={s.key} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
