import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/data/projects";

/** Section / Projects (Figma 15:2) — navy · header + outline-light button · 3-up project cards (3 → 2 → 1). */
export function Projects() {
  const { s } = useLocale();
  const grid = useReveal<HTMLDivElement>();
  return (
    <section className="dark-surface bg-navy text-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
        <SectionHeader
          tone="dark"
          eyebrowColor="cyan"
          eyebrow={s.home.projects.eyebrow}
          title={s.home.projects.title}
          intro={s.home.projects.intro}
          aside={
            <Button to="/projects" variant="outlineLight" icon={<ArrowRight />} data-analytics="cta_click:projects">
              {s.home.projects.all}
            </Button>
          }
        />
        <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} className="reveal" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
