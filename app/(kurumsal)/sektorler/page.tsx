import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { getLocale } from "@/lib/i18n/server";
import { ui } from "@/lib/i18n/ui";
import { localizeDivisions } from "@/lib/i18n/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: ui[locale].cover.sectorsTitle };
}

export default async function SectorsPage() {
  const locale = await getLocale();
  const t = ui[locale].cover;
  const divisions = localizeDivisions(locale);
  return (
    <CoverPage eyebrow={t.sectorsEyebrow} title={t.sectorsTitle} wide>
      <div className="grid gap-5 lg:grid-cols-3">
        {divisions.map((d) => (
          <a
            key={d.key}
            href={d.href}
            target={d.external ? "_blank" : undefined}
            rel={d.external ? "noopener noreferrer" : undefined}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${d.bg} p-7 text-white transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <span className={`block h-1 w-12 rounded-full ${d.accent}`} />
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/60">{d.subtitle}</p>
            <h2 className="mt-1 text-xl font-bold">{d.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{d.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition group-hover:gap-3">
              {d.cta} →
            </span>
          </a>
        ))}
      </div>
    </CoverPage>
  );
}
