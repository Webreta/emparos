import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "İletişim" };

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20";

export default function ContactPage() {
  return (
    <CoverPage eyebrow="Bize Ulaşın" title="İletişim" wide>
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Bilgiler */}
        <div className="space-y-5 text-white/80 lg:col-span-2">
          <p className="leading-relaxed">
            Tedarik, ambalaj ya da danışmanlık; hangi konuda olursa olsun ilk
            görüşme için bize ulaşın.
          </p>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-gold-400">Adres</dt>
              <dd className="mt-1">{site.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-gold-400">Telefon</dt>
              <dd className="mt-1"><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-gold-400">E-posta</dt>
              <dd className="mt-1"><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></dd>
            </div>
          </dl>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:brightness-110"
          >
            WhatsApp ile yazın
          </a>
        </div>

        {/* Form: gönderim işlevi (server action + DB + e-posta) sonraki adımda bağlanacak */}
        <form className="grid gap-4 lg:col-span-3 sm:grid-cols-2">
          <input className={inputCls} name="name" placeholder="Ad Soyad" required />
          <input className={inputCls} name="phone" placeholder="Telefon" />
          <input className={`${inputCls} sm:col-span-2`} name="email" type="email" placeholder="E-posta" required />
          <select className={`${inputCls} sm:col-span-2`} name="subject" defaultValue="">
            <option value="" disabled className="text-ink">Konu seçin</option>
            <option className="text-ink">Ambalaj Çözümleri</option>
            <option className="text-ink">Gıda, İçecek & Temizlik Ürünleri</option>
            <option className="text-ink">Mühendislik Çözümleri</option>
            <option className="text-ink">Diğer</option>
          </select>
          <textarea className={`${inputCls} sm:col-span-2`} name="message" rows={4} placeholder="Mesajınız" required />
          <button
            type="submit"
            className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gold-600 sm:col-span-2 sm:justify-self-start"
          >
            Gönder
          </button>
        </form>
      </div>
    </CoverPage>
  );
}
