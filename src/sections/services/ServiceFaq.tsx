import { ArrowRight } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { servicesAr, servicesEn } from "@/i18n/pages/services";
import { FaqAccordion } from "./FaqAccordion";

/**
 * Section / FAQ (Figma 29:149) — white · intro column 380 (eyebrow, H2, Body/M neutral/500, outline button)
 * + accordion filling the rest, gap 96. Stacks below 1024.
 */
export function ServiceFaq() {
  const t = useStrings(servicesEn, servicesAr);
  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-24">
        <div className="flex flex-col items-start gap-5">
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2 className="heading-h2 text-neutral-900">{t.faq.title}</h2>
          <p className="body-m max-w-[360px] text-neutral-500">{t.faq.intro}</p>
          <Button to="/contact" variant="outlineDark" icon={<ArrowRight />} data-analytics="cta_click:services-faq">
            {t.faq.ask}
          </Button>
        </div>
        <FaqAccordion items={t.faq.items} size="lg" />
      </div>
    </section>
  );
}
