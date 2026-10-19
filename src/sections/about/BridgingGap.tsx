import { ArrowRight, Check } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

/**
 * Section / Bridging the gap (Figma 37:817) — 560 × 420 photo (radius 24, 1 px black 10 %) on the start side ·
 * copy column gap 20: blue eyebrow, H2 (max 520), Body/L, three green check points, outline-dark button.
 * Photo stacks above the copy below 1024 (board 20).
 */
export function BridgingGap() {
  const { s } = useLocale();
  const { bridging: t } = useStrings(aboutEn, aboutAr);
  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16 xl:grid-cols-[560px_minmax(0,1fr)] xl:gap-24">
        <SmartImage
          name="energy-aerial-solar"
          width={560}
          height={420}
          alt={t.imageAlt}
          frameClassName="aspect-[560/420] w-full max-w-[560px] rounded-24 border border-black/10"
          className="rounded-24"
        />
        <div className="flex flex-col gap-5">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="heading-h2 max-w-[520px] text-neutral-900">{t.title}</h2>
          <p className="body-l text-neutral-700">{t.body}</p>
          <ul className="flex flex-col gap-2.5">
            {t.points.map((point) => (
              <li key={point} className="body-m flex items-start gap-2.5 text-neutral-900">
                <Check className="mt-[5px] size-4 shrink-0 text-brand-green-dark" aria-hidden strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>
          <div className="pt-1">
            <Button to="/contact" variant="outlineDark" icon={<ArrowRight />} data-analytics="cta_click:about-bridging">
              {s.nav.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
