import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ServiceRows } from "@/sections/services/ServiceRows";
import { HowWeDeliver } from "@/sections/services/HowWeDeliver";
import { ServiceFaq } from "@/sections/services/ServiceFaq";
import { servicesAr, servicesEn } from "@/i18n/pages/services";

/** Services — Figma 28:85. Page hero · Service rows · How we deliver · FAQ · CTA band. */
export default function ServicesPage() {
  const { s } = useLocale();
  const t = useStrings(servicesEn, servicesAr);
  usePageMeta(t.meta.title, t.meta.description);
  return (
    <>
      <PageHero
        image="services-hero"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: s.nav.services }]}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
      />
      <ServiceRows />
      <HowWeDeliver />
      <ServiceFaq />
      <CtaBand title={s.cta.readyTitle} intro={s.cta.readyIntro} />
    </>
  );
}
