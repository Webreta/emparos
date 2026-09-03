import Link from "next/link";
import Image from "next/image";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";
import { SectorIcon } from "@/components/sector/icons";

// Alt site footer'ı: tam genişlik, koyu sektör zemini.
// Marka bloğu + ürün grupları + hızlı linkler + ikonlu iletişim.
export function SectorFooter({ sector }: { sector: Sector }) {
  const { theme } = sector;
  const quick = [
    { href: sector.base, label: "Ana Sayfa" },
    { href: `${sector.base}#urunler`, label: sector.itemsLabel },
    ...(sector.hasAboutPage
      ? [{ href: `${sector.base}/hakkimizda`, label: "Hakkımızda" }]
      : []),
    ...(sector.hasBrandsPage ? [{ href: `${sector.base}/markalar`, label: "Markalar" }] : []),
    { href: `${sector.base}/iletisim`, label: "İletişim" },
    { href: `${sector.base}/teklif`, label: "Teklif Al" },
  ];
  const contact = [
    { icon: "telefon" as const, label: site.phone, href: site.phoneHref },
    {
      icon: "eposta" as const,
      label: site.email,
      href: `mailto:${site.email}`,
    },
    { icon: "adres" as const, label: site.address },
  ];

  return (
    <footer className={`relative overflow-hidden ${theme.bg} text-white`}>
      {/* Arka plan dokusu: sağ üstte büyük, silik halka */}
      <span
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border-[28px] border-white/[0.04]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-16 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Marka */}
        <div className="lg:col-span-5">
          <Link href={sector.base} className="inline-flex items-center gap-3">
            <Image
              src="/logo-white.png"
              alt={site.name}
              width={760}
              height={228}
              className="h-10 w-auto"
            />
            <span className="border-l border-white/20 pl-3">
              <span className="block text-sm font-bold leading-tight">
                {sector.name}
              </span>
              <span className="block text-[11px] text-white/60">
                {sector.tagline}
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
            {sector.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`${sector.base}/teklif`}
              className={`inline-flex items-center gap-2 rounded-full ${theme.accent} ${theme.accentHover} px-5 py-2.5 text-sm font-bold text-white transition`}
            >
              Teklif Al
              <ArrowIcon />
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              <SectorIcon name="whatsapp" className="size-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Ürün grupları */}
        <div className="lg:col-span-2">
          <FooterHeading>{sector.itemsLabel}</FooterHeading>
          <ul className="mt-5 space-y-3">
            {sector.items.map((it) => (
              <li key={it.slug}>
                <FooterLink href={`${sector.base}/${it.slug}`}>
                  {it.title}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Hızlı linkler */}
        <div className="lg:col-span-2">
          <FooterHeading>Hızlı Erişim</FooterHeading>
          <ul className="mt-5 space-y-3">
            {quick.map((q) => (
              <li key={q.href}>
                <FooterLink href={q.href}>{q.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div className="lg:col-span-3">
          <FooterHeading>İletişim</FooterHeading>
          <ul className="mt-5 space-y-3">
            {contact.map((c) => {
              const inner = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition group-hover:border-white/40 group-hover:bg-white group-hover:text-ink">
                    <SectorIcon name={c.icon} className="size-4" />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-white/80 transition group-hover:text-white">
                    {c.label}
                  </span>
                </>
              );
              return (
                <li key={c.icon}>
                  {c.href ? (
                    <a href={c.href} className="group flex items-start gap-3">
                      {inner}
                    </a>
                  ) : (
                    <span className="group flex items-start gap-3">
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Alt bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {sector.name}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Emparos Global ana sayfa
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
    >
      <span
        className="h-px w-3 bg-white/30 transition-all group-hover:w-5 group-hover:bg-white"
        aria-hidden="true"
      />
      {children}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
