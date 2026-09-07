"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions/locale";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

// Dil seçici: yan yana üç bayrak kutusu (TR / EN / FR). Seçili olan vurgulu.
// Tıklanınca çerez yazılır ve sayfa yenilenir; URL değişmez.
export function LangSwitcher({
  current,
  variant = "dark",
  className = "",
}: {
  current: Locale;
  variant?: "dark" | "light"; // dark: koyu zemin üstünde (header'lar), light: açık zemin
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (l: Locale) => {
    if (l === current) return;
    startTransition(async () => {
      await setLocale(l);
      router.refresh();
    });
  };

  const base =
    variant === "dark"
      ? "border-white/20 bg-white/5 hover:border-white/50 hover:bg-white/10"
      : "border-ink/15 bg-white hover:border-ink/40";
  const active = variant === "dark" ? "border-white bg-white/15 ring-2 ring-white/30" : "border-ink bg-navy-50 ring-2 ring-ink/10";

  return (
    <div className={`inline-flex items-center gap-1.5 ${pending ? "opacity-60" : ""} ${className}`} role="group" aria-label="Dil / Language">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          disabled={pending}
          aria-label={localeNames[l]}
          aria-pressed={l === current}
          title={localeNames[l]}
          className={`flex size-8 items-center justify-center overflow-hidden rounded-md border transition ${l === current ? active : base}`}
        >
          <Flag code={l} className="h-4 w-6 rounded-[2px]" />
        </button>
      ))}
    </div>
  );
}

// Bayraklar inline SVG (Windows'ta emoji bayraklar görünmediği için)
function Flag({ code, className }: { code: Locale; className?: string }) {
  if (code === "tr")
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
        <rect width="30" height="20" fill="#E30A17" />
        <circle cx="11.5" cy="10" r="5" fill="#fff" />
        <circle cx="12.75" cy="10" r="4" fill="#E30A17" />
        <polygon fill="#fff" points="18.5,7.7 19.06,9.23 20.69,9.29 19.4,10.29 19.85,11.86 18.5,10.95 17.15,11.86 17.6,10.29 16.31,9.29 17.94,9.23" />
      </svg>
    );
  if (code === "en")
    return (
      <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
        <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    );
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  );
}
