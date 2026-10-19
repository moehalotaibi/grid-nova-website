import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Language toggle (Navigation / Dark): pill, 1 px white 25 % border, globe 16 + label.
 * Swaps / ↔ /ar and keeps the current route; no animation (handoff › board 19).
 */
export function LanguageToggle({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const { s, isAr, togglePath } = useLocale();
  return (
    <Link
      to={togglePath}
      hrefLang={isAr ? "en" : "ar"}
      lang={isAr ? "en" : "ar"}
      aria-label={s.nav.languageAria}
      onClick={onClick}
      data-analytics="language_toggle"
      className={`inline-flex h-10 items-center gap-2 rounded-full border border-white/25 px-3 text-[15px] leading-[22px] text-white transition-colors duration-[var(--dur-micro)] hover:bg-white/10 ${
        isAr ? "font-latin" : "font-arabic"
      } ${className}`}
    >
      <Globe className="size-4 shrink-0" aria-hidden strokeWidth={2} />
      <span>{s.nav.language}</span>
    </Link>
  );
}
