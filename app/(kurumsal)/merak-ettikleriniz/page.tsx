import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { getLocale } from "@/lib/i18n/server";
import { ui } from "@/lib/i18n/ui";
import { coverContent } from "@/lib/i18n/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: ui[locale].cover.faqTitle };
}

// Sık sorulan sorular: içerik lib/i18n/content*.ts içinde, panelden yönetilir hale getirilecek
export default async function FaqPage() {
  const locale = await getLocale();
  const t = ui[locale].cover;
  const { faq } = coverContent(locale);
  return (
    <CoverPage eyebrow={t.faqEyebrow} title={t.faqTitle}>
      <div className="space-y-3">
        {faq.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="group rounded-2xl border border-white/10 bg-white/5 open:bg-white/[0.08]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white">
              {f.q}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4 shrink-0 text-gold-400 transition group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/75">{f.a}</p>
          </details>
        ))}
      </div>
    </CoverPage>
  );
}
