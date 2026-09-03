"use client";

import { useActionState } from "react";
import { sendQuoteRequest, type QuoteState } from "@/app/actions/teklif";
import type { Sector } from "@/lib/sectors";

// Alt site teklif formu. Sektör rengi ve ürün grubu listesi `sector` nesnesinden gelir.
export function QuoteForm({ sector }: { sector: Sector }) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(sendQuoteRequest, {});
  const { theme } = sector;

  const input =
    `w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-ink/40 focus:ring-2 ${theme.ring}`;
  const label = "flex flex-col gap-1.5 text-sm font-semibold text-ink";

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-[#f7f7f4] p-8 text-center">
        <span className={`mx-auto flex size-14 items-center justify-center rounded-full ${theme.accent} text-white`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold text-ink">Talebiniz alındı</h2>
        <p className="mt-2 text-ink/80">
          Teşekkürler. Ekibimiz talebinizi inceleyip en kısa sürede size fiyat teklifiyle dönecek.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-ink/10 bg-[#f7f7f4] p-6 shadow-[0_8px_30px_-12px_rgba(23,32,51,0.12)] sm:p-8">
      <input type="hidden" name="sector" value={sector.key} />
      {/* Bot tuzağı: görünmez alan, dolarsa istek reddedilir */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Ad Soyad *
          <input type="text" name="name" required autoComplete="name" className={input} />
        </label>
        <label className={label}>
          Firma
          <input type="text" name="company" autoComplete="organization" className={input} />
        </label>
        <label className={label}>
          E-posta *
          <input type="email" name="email" required autoComplete="email" className={input} />
        </label>
        <label className={label}>
          Telefon
          <input type="tel" name="phone" autoComplete="tel" placeholder="+90 5xx xxx xx xx" className={input} />
        </label>
        <label className={label}>
          {sector.itemsLabel}
          <select name="product" defaultValue="" className={input}>
            <option value="">Seçin (isteğe bağlı)</option>
            {sector.items.map((it) => (
              <option key={it.slug} value={it.slug}>
                {it.title}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Tahmini Miktar
          <input type="text" name="quantity" placeholder="Örn. 20 palet, 1 konteyner" className={input} />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Talebiniz *
          <textarea
            name="message"
            required
            rows={5}
            placeholder="İhtiyacınız olan ürünler, adetler, teslimat noktası ve zamanlama hakkında kısaca bilgi verin."
            className={`${input} resize-y`}
          />
        </label>
      </div>

      {state.error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink/60">* işaretli alanlar zorunludur.</p>
        <button
          type="submit"
          disabled={pending}
          className={`inline-flex items-center gap-2 rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition disabled:opacity-60`}
        >
          {pending ? "Gönderiliyor…" : "Teklif İste"}
          {!pending && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
