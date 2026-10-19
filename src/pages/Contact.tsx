import { useSearchParams } from "react-router-dom";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { ContactDetails } from "@/sections/contact/ContactDetails";
import { MapSection } from "@/sections/contact/MapSection";
import { serviceBySlug } from "@/data/services";
import { contactEn, contactAr } from "@/i18n/pages/contact";

/**
 * Contact — Figma 38:1021: page hero 38:1022 · Section / Contact 38:1066 · Section / Map 38:1131.
 * Service pages link to /contact?service=<slug>; a known slug preselects the form's Service field.
 */
export default function ContactPage() {
  const { s } = useLocale();
  const t = useStrings(contactEn, contactAr);
  const [searchParams] = useSearchParams();
  const service = serviceBySlug(searchParams.get("service") ?? undefined)?.slug;
  usePageMeta(s.nav.contact, t.description);
  return (
    <>
      <PageHero
        image="contact-hero"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: t.hero.crumb }]}
        eyebrow={s.home.contact.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
      />
      <ContactDetails initialService={service} />
      <MapSection />
    </>
  );
}
