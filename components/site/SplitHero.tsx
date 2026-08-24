import { divisions } from "@/lib/divisions";

// Ana sayfa cover'ı: tam ekran, üç iş kolu üç dikey panel (seta-global mantığı).
// Header üstte yüzdüğü için panel içerikleri alta hizalanır.
// Masaüstünde hover edilen panel genişler; mobilde alt alta dizilir.
export function SplitHero() {
  return (
    <section className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
      {divisions.map((d, i) => (
        <a
          key={d.key}
          href={d.href}
          target={d.external ? "_blank" : undefined}
          rel={d.external ? "noopener noreferrer" : undefined}
          className={`group relative flex min-h-[60vh] flex-1 flex-col justify-end overflow-hidden bg-gradient-to-br ${d.bg} p-8 pt-28 text-white transition-all duration-500 ease-out lg:min-h-0 lg:p-12 lg:pb-14 lg:hover:flex-[1.6]`}
        >
          {/* Dekoratif dünya çizgileri (logoya gönderme) */}
          <svg
            viewBox="0 0 400 400"
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 size-[28rem] opacity-[0.08] transition duration-700 group-hover:rotate-12 group-hover:opacity-[0.14]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="200" cy="200" r="180" />
            <ellipse cx="200" cy="200" rx="80" ry="180" />
            <ellipse cx="200" cy="200" rx="140" ry="180" />
            <path d="M20 200h360M50 120h300M50 280h300M95 60h210M95 340h210" />
          </svg>

          {/* Paneller arası ince ayraç */}
          {i > 0 && <span className="absolute inset-y-0 left-0 hidden w-px bg-white/10 lg:block" />}

          <div className="relative max-w-md">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              0{i + 1}
            </span>
            <span className={`mt-3 block h-1 w-12 rounded-full ${d.accent}`} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-white/70">
              {d.subtitle}
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight lg:text-4xl">
              {d.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 lg:text-base">
              {d.text}
            </p>
            <ul className="mt-4 hidden flex-wrap gap-2 lg:flex">
              {d.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {it}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy-900 transition group-hover:gap-3">
              {d.cta}
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4Z" />
              </svg>
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}
