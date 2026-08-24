// Kurumsal sayfalar (Hakkımızda, İletişim, vb.) cover içinde tam ekran kalır:
// koyu lacivert zemin, ortada cam efektli içerik kartı. Masaüstünde sayfa
// kaydırılmaz; uzun içerik kartın içinde kayar.
export function CoverPage({
  eyebrow,
  title,
  children,
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-5 pb-10 pt-28 text-white lg:h-screen lg:pt-32">
      {/* Dekoratif dünya çizgileri */}
      <svg
        viewBox="0 0 400 400"
        aria-hidden
        className="pointer-events-none absolute -left-40 -bottom-40 size-[40rem] opacity-[0.07]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="200" cy="200" r="180" />
        <ellipse cx="200" cy="200" rx="80" ry="180" />
        <ellipse cx="200" cy="200" rx="140" ry="180" />
        <path d="M20 200h360M50 120h300M50 280h300M95 60h210M95 340h210" />
      </svg>
      <span className="pointer-events-none absolute right-[-10%] top-[-20%] size-[30rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div
        className={`relative flex max-h-full w-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-md ${
          wide ? "max-w-6xl" : "max-w-4xl"
        }`}
      >
        <div className="border-b border-white/10 px-8 py-6 lg:px-12">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold lg:text-3xl">{title}</h1>
        </div>
        <div className="overflow-y-auto px-8 py-6 lg:px-12 lg:py-8">{children}</div>
      </div>
    </section>
  );
}
