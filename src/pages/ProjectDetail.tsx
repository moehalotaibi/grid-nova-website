import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { projectBySlug, type Project } from "@/data/projects";
import { ProjectBrief } from "@/sections/projects/ProjectBrief";
import { ProjectMain } from "@/sections/projects/ProjectMain";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";

const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Project detail — Figma 35:632 (Ad-Dayir 2): Page hero 35:633 (size "md", category + status pills) ·
 * Brief wrap 35:681 overlapping the hero · Section / Main 35:706. Unknown slug → NotFound.
 */
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  if (!project) {
    return (
      <Suspense fallback={<div className="min-h-[60vh] bg-navy-deep" aria-busy="true" />}>
        <NotFound />
      </Suspense>
    );
  }
  return <ProjectDetail project={project} />;
}

function ProjectDetail({ project }: { project: Project }) {
  const { s, l } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  const d = project.detail;
  const title = l(project.title);
  const intro = d ? l(d.intro) : project.summary ? l(project.summary) : undefined;
  const inProgress = project.status === "in-progress";
  usePageMeta(title, intro);

  return (
    <>
      <PageHero
        size="md"
        image={d?.heroImage ?? "projects-hero"}
        imageAlt={d?.heroImageAlt ?? t.hero.imageAlt}
        crumbs={[{ label: s.nav.projects, to: "/projects" }, { label: l(project.shortTitle ?? project.title) }]}
        title={title}
        intro={intro}
      >
        <ul className="flex flex-wrap items-center gap-2 lg:mb-10">
          <li className="label-caption rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-white">{l(project.tag)}</li>
          <li
            className={`label-caption inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white ${
              inProgress ? "bg-brand-green-dark" : "bg-brand-blue"
            }`}
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white" />
            {inProgress ? s.common.inProgress : s.common.completed}
          </li>
        </ul>
      </PageHero>
      <div className="bg-white">
        <ProjectBrief project={project} />
        <ProjectMain project={project} />
      </div>
    </>
  );
}
