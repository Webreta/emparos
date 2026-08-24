import type { Metadata } from "next";
import { CoverPage } from "@/components/site/CoverPage";
import { divisions } from "@/lib/divisions";

export const metadata: Metadata = { title: "Sektörler" };

export default function SectorsPage() {
  return (
    <CoverPage eyebrow="Üç iş kolu, tek güvenilir ortak" title="Sektörler" wide>
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
            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              {d.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${d.accent}`} />
                  {it}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition group-hover:gap-3">
              {d.cta} →
            </span>
          </a>
        ))}
      </div>
    </CoverPage>
  );
}
