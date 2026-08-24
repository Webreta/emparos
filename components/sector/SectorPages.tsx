import Link from "next/link";
import { notFound } from "next/navigation";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";

// Alt site sayfa şablonları. İki sektör de aynı iskeleti kullanır,
// renk/metin/menü farkı `sector` nesnesinden gelir.

export function SectorHome({ sector }: { sector: Sector }) {
  const { theme } = sector;
  return (
    <>
      {/* Hero */}
      <section className={`${theme.bg} px-5 pb-20 pt-44 text-white lg:px-8 lg:pt-52`}>
        <div className="mx-auto max-w-7xl">
          <span className={`block h-1 w-14 rounded-full ${theme.accent}`} />
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-white/60">{sector.tagline}</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight lg:text-5xl">{sector.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{sector.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#urunler" className={`rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}>
              {sector.itemsLabel}
            </a>
            <Link href={`${sector.base}/iletisim`} className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10">
              Teklif Alın
            </Link>
          </div>
        </div>
      </section>

      {/* Ürün / hizmet grupları */}
      <section id="urunler" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <h2 className="text-3xl font-bold text-ink">{sector.itemsLabel}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sector.items.map((it) => (
            <Link
              key={it.slug}
              href={`${sector.base}/${it.slug}`}
              className="group rounded-3xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={`block h-1.5 w-12 rounded-full ${theme.accent}`} />
              <h3 className="mt-5 text-lg font-bold text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
              <span className={`mt-5 inline-block text-sm font-bold ${theme.accentText}`}>İncele →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${theme.soft} px-5 py-20 lg:px-8`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-ink">İhtiyacınızı konuşalım</h2>
          <p className="mt-3 text-muted">Size özel teklif için formu doldurun ya da WhatsApp üzerinden hemen yazın.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={`${sector.base}/iletisim`} className={`rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition`}>
              İletişim Formu
            </Link>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-navy-50">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function SectorItemPage({ sector, slug }: { sector: Sector; slug: string }) {
  const item = sector.items.find((i) => i.slug === slug);
  if (!item) notFound();
  return (
    <>
      <SectorPageHero sector={sector} title={item.title} text={item.text} crumb={sector.itemsLabel} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 leading-relaxed text-muted lg:col-span-2">
          <p>{item.text}</p>
          <p>Bu sayfanın detay içeriği (ürün listesi, görseller, teknik bilgiler) panelden yönetilecek biçimde hazırlanacak.</p>
        </div>
        <aside className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">{sector.itemsLabel}</p>
          {sector.items.map((it) => (
            <Link
              key={it.slug}
              href={`${sector.base}/${it.slug}`}
              className={`block rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                it.slug === slug ? `${sector.theme.accent} border-transparent text-white` : "border-line bg-white text-ink hover:bg-navy-50"
              }`}
            >
              {it.title}
            </Link>
          ))}
        </aside>
      </section>
    </>
  );
}

export function SectorSimplePage({ sector, title, text, children }: { sector: Sector; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <>
      <SectorPageHero sector={sector} title={title} text={text} />
      <section className="mx-auto max-w-4xl px-5 py-16 leading-relaxed text-muted lg:px-8">
        {children ?? <p>Bu sayfanın içeriği tasarım yönlendirmesiyle hazırlanacak.</p>}
      </section>
    </>
  );
}

function SectorPageHero({ sector, title, text, crumb }: { sector: Sector; title: string; text?: string; crumb?: string }) {
  return (
    <section className={`${sector.theme.bg} px-5 pb-16 pt-44 text-white lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
          <Link href={sector.base} className="hover:text-white">{sector.name}</Link>
          {crumb && <> · {crumb}</>}
        </p>
        <span className={`mt-4 block h-1 w-12 rounded-full ${sector.theme.accent}`} />
        <h1 className="mt-4 text-3xl font-bold lg:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-xl text-white/70">{text}</p>}
      </div>
    </section>
  );
}
