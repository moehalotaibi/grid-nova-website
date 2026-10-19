import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProjectsGrid } from "@/sections/projects/ProjectsGrid";
import { SITE } from "@/data/site";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";

/** Projects — Figma 34:542: Page hero 34:543 · Section / Project grid 34:587 · Section / CTA band 34:733. */
export default function ProjectsPage() {
  const { s } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  usePageMeta(s.nav.projects, t.hero.intro);
  return (
    <>
      <PageHero
        image="projects-hero"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: s.nav.projects }]}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
      />
      <ProjectsGrid />
      <CtaBand
        title={t.cta.title}
        intro={t.cta.intro}
        primary={{ label: t.cta.primary, to: "/contact" }}
        secondary={{ label: t.cta.secondary, href: SITE.profilePdf }}
      />
    </>
  );
}
