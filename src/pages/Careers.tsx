import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { WhyJoin } from "@/sections/careers/WhyJoin";
import { OpenPositions } from "@/sections/careers/OpenPositions";
import { careersEn, careersAr } from "@/i18n/pages/careers";

/** Careers — Figma 39:992. Hero → Why join → Open positions (with the CV application CTA). */
export default function CareersPage() {
  const { s } = useLocale();
  const t = useStrings(careersEn, careersAr);
  usePageMeta(s.nav.careers, t.meta.description);
  return (
    <>
      <PageHero image="careers-hero" imageAlt={t.hero.imageAlt} crumbs={[{ label: s.nav.careers }]} eyebrow={s.nav.careers} title={t.hero.title} intro={t.hero.intro} />
      <WhyJoin />
      <OpenPositions />
    </>
  );
}
