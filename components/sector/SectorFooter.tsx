import Link from "next/link";
import type { Sector } from "@/lib/sectors";
import { site } from "@/lib/site";

export function SectorFooter({ sector }: { sector: Sector }) {
  return (
    <footer className={`${sector.theme.bg} text-white`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold">{sector.name}</p>
          <p className="mt-1 text-sm text-white/60">{sector.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{sector.intro}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">{sector.itemsLabel}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {sector.items.map((it) => (
              <li key={it.slug}>
                <Link href={`${sector.base}/${it.slug}`} className="hover:text-white">{it.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">İletişim</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{site.address}</li>
            <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name} — {sector.name}</p>
          <Link href="/" className="hover:text-white">← Emparos Global ana sayfa</Link>
        </div>
      </div>
    </footer>
  );
}
