import { useLocale } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Hero } from "@/sections/home/Hero";
import { PartnerMarquee } from "@/sections/home/PartnerMarquee";
import { Stats } from "@/sections/home/Stats";
import { About } from "@/sections/home/About";
import { Services } from "@/sections/home/Services";
import { Projects } from "@/sections/home/Projects";
import { WhoWeAre } from "@/sections/home/WhoWeAre";
import { CeoMessage } from "@/sections/home/CeoMessage";
import { Contact } from "@/sections/home/Contact";
import { News } from "@/sections/home/News";

/**
 * Homepage — Figma 8:2 (EN) / 40:1173 (AR). Sections top → bottom per handoff board 16.
 * The "Vision 2030 band" (src/sections/home/Vision.tsx) was dropped at the owner's request; the component is kept.
 */
export default function HomePage() {
  const { s } = useLocale();
  usePageMeta(s.nav.home, s.home.hero.sub);
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <Stats />
      <About />
      <Services />
      <Projects />
      <WhoWeAre />
      <CeoMessage />
      <Contact />
      <News />
    </>
  );
}
