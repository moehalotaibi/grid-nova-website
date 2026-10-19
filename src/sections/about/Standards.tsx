import { Check } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

/**
 * Section / Standards (Figma 37:924) — neutral/50 stripe with 1 px top/bottom borders, padding 40 ·
 * muted eyebrow + white pills (16 × 10, radius full, 1 px neutral/200, 14 px green check, Label/Nav), gap 48.
 * Label stacks above the wrapping pills below 768.
 */
export function Standards() {
  const { standards: t } = useStrings(aboutEn, aboutAr);
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="container-site flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8 md:py-10 xl:gap-12">
        <p className="label-eyebrow shrink-0 text-neutral-500">{t.label}</p>
        <ul className="flex flex-wrap gap-3 md:gap-4 xl:gap-12">
          {t.items.map((item) => (
            <li key={item} className="label-nav inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-neutral-900">
              <Check className="size-3.5 shrink-0 text-brand-green-dark" aria-hidden strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
