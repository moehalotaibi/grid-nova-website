import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/sections/faq/FaqSection";
import { faqEn, faqAr } from "@/i18n/pages/faq";

/** FAQ — Figma 39:1253: page hero 39:1254 · Section / FAQ 39:1298. */
export default function FaqPage() {
  const { s } = useLocale();
  const t = useStrings(faqEn, faqAr);
  usePageMeta(s.nav.faq, t.description);
  return (
    <>
      <PageHero
        image="faq-hero"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: s.footer.links.faqs }]}
        eyebrow={t.hero.eyebrow}
        title={
          <>
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </>
        }
        intro={t.hero.intro}
      />
      <FaqSection />
    </>
  );
}
