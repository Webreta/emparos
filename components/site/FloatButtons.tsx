import { site } from "@/lib/site";
import { ui } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

// Sağ altta sabit WhatsApp butonu
export function FloatButtons({ locale }: { locale: Locale }) {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui[locale].float.whatsapp}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.6.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.5-.7-.5h-.5Z" />
      </svg>
    </a>
  );
}
