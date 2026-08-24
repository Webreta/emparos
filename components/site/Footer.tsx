import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { divisions } from "@/lib/divisions";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="inline-block rounded-xl bg-white px-4 py-3">
            <Image src="/logo.png" alt={site.name} width={760} height={228} className="h-10 w-auto" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Connecting Markets. Managing Trust. Ambalaj, gıda-içecek tedariki ve
            mühendislik danışmanlığında pazarları birleştiren güvenilir iş ortağınız.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400">Çözümlerimiz</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {divisions.map((d) => (
              <li key={d.key}>
                <a href={d.href} target={d.external ? "_blank" : undefined} className="hover:text-white">
                  {d.title}
                </a>
              </li>
            ))}
            <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400">İletişim</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{site.address}</li>
            <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/kvkk" className="hover:text-white">KVKK</Link>
            <Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik</Link>
            <Link href="/cerez-politikasi" className="hover:text-white">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
