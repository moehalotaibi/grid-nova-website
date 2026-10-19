import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { Intro } from "@/sections/about/Intro";
import { Pillars } from "@/sections/about/Pillars";
import { BridgingGap } from "@/sections/about/BridgingGap";
import { Capabilities } from "@/sections/about/Capabilities";
import { Board } from "@/sections/about/Board";
import { Standards } from "@/sections/about/Standards";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

/** About — Figma 37:722. Hero → Intro → Pillars → Bridging the gap → Capabilities → Board → Standards → CTA band. */
export default function AboutPage() {
  const { s } = useLocale();
  const t = useStrings(aboutEn, aboutAr);
  usePageMeta(s.nav.about, t.meta.description);

  return (
    <>
      <PageHero
        image="about-control-room"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: s.nav.about }]}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
      />
      <Intro />
      <Pillars />
      <BridgingGap />
      <Capabilities />
      <Board />
      <Standards />
      <CtaBand title={t.cta.title} intro={t.cta.intro} secondary={{ label: t.cta.secondary, to: "/projects" }} />
    </>
  );
}
