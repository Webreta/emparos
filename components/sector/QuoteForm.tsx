"use client";

import { useActionState } from "react";
import { sendQuoteRequest, type QuoteState } from "@/app/actions/teklif";
import type { Sector } from "@/lib/sectors";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

// Alt site teklif formu. Sektör rengi ve ürün grubu listesi `sector` nesnesinden (yerelleştirilmiş) gelir.
export function QuoteForm({ sector, locale }: { sector: Sector; locale: Locale }) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(sendQuoteRequest, {});
  const { theme } = sector;
  const t = ui[locale].quote;

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
        <h2 className="mt-5 text-2xl font-bold text-ink">{t.thanksTitle}</h2>
        <p className="mt-2 text-ink/80">{t.thanksText}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-ink/10 bg-[#f7f7f4] p-6 shadow-[0_8px_30px_-12px_rgba(23,32,51,0.12)] sm:p-8">
      <input type="hidden" name="sector" value={sector.key} />
      {/* Hata mesajları seçili dilde dönsün */}
      <input type="hidden" name="locale" value={locale} />
      {/* Bot tuzağı: görünmez alan, dolarsa istek reddedilir */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {t.name} *
          <input type="text" name="name" required autoComplete="name" className={input} />
        </label>
        <label className={label}>
          {t.company}
          <input type="text" name="company" autoComplete="organization" className={input} />
        </label>
        <label className={label}>
          {t.email} *
          <input type="email" name="email" required autoComplete="email" className={input} />
        </label>
        <label className={label}>
          {t.phone}
          <input type="tel" name="phone" autoComplete="tel" className={input} />
        </label>
        <label className={label}>
          {sector.itemsLabel}
          <select name="product" defaultValue="" className={input}>
            <option value="">{t.select}</option>
            {sector.items.map((it) => (
              <option key={it.slug} value={it.slug}>
                {it.title}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          {t.quantity}
          <input type="text" name="quantity" className={input} />
        </label>
        <label className={`${label} sm:col-span-2`}>
          {t.message} *
          <textarea name="message" required rows={5} className={`${input} resize-y`} />
        </label>
      </div>

      {state.error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink/60">{t.required}</p>
        <button
          type="submit"
          disabled={pending}
          className={`inline-flex items-center gap-2 rounded-full ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-bold text-white transition disabled:opacity-60`}
        >
          {pending ? t.sending : t.submit}
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
