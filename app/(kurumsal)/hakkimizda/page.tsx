import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { getLocale } from "@/lib/i18n/server";
import { ui } from "@/lib/i18n/ui";
import { coverContent, localizeDivisions } from "@/lib/i18n/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: ui[locale].cover.aboutTitle };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = ui[locale].cover;
  const { about } = coverContent(locale);
  const divisions = localizeDivisions(locale);
  return (
    <CoverPage eyebrow={t.aboutEyebrow} title={t.aboutTitle}>
      <div className="space-y-6 text-white/80">
        <p className="text-lg leading-relaxed text-white">{about.lead}</p>
        <p className="leading-relaxed">{about.body}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          {about.values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="block h-1 w-8 rounded-full bg-gold-500" />
              <h2 className="mt-3 font-bold text-white">{v.title}</h2>
              <p className="mt-1 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold-400">{t.divisionsTitle}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {divisions.map((d) => (
              <li key={d.key}>
                <a
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span className={`size-2 rounded-full ${d.accent}`} />
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CoverPage>
  );
}
