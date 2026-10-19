import type { CSSProperties } from "react";
import { Check, Flag, Shield, TrendingUp, Zap } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Project, ProjectImpact } from "@/data/projects";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";
import { ProjectSidebar } from "@/sections/projects/ProjectSidebar";

const IMPACT_ICONS: Record<ProjectImpact["icon"], typeof Shield> = { shield: Shield, trend: TrendingUp, zap: Zap };

/**
 * Section / Main (Figma 35:706) — white · content column (776) + sidebar (360), gap 64 · content blocks gap 48:
 * Project overview (H2 + Body/L neutral/700, max 660) · Scope of work (intro + 2 × 2 numbered checklist cards on
 * neutral/50, radius 16, padding 24) · Gallery (2 × 380 × 250, radius 16) · Strategic impact (3 icon cards, radius 14,
 * padding 20) · closing paragraph · green milestone callout (tint/green-50, 4 px brand/green start border).
 * Sidebar stacks under the content below 1024.
 */
export function ProjectMain({ project }: { project: Project }) {
  const { l } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  const scopeGrid = useReveal<HTMLOListElement>();
  const impactGrid = useReveal<HTMLUListElement>();
  const d = project.detail;
  if (!d) return null;

  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <div className="flex flex-col gap-3.5">
            <h2 className="heading-h2 text-neutral-900">{t.detail.overview}</h2>
            {d.overview.map((p, i) => (
              <p key={i} className="body-l prose-measure text-neutral-700">
                {l(p)}
              </p>
            ))}
          </div>

          {d.scope.length > 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="heading-h2 text-neutral-900">{t.detail.scope}</h2>
              {d.scopeIntro && <p className="body-l prose-measure text-neutral-700">{l(d.scopeIntro)}</p>}
              <ol ref={scopeGrid} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {d.scope.map((block, i) => (
                  <li
                    key={l(block.title)}
                    className="reveal flex flex-col gap-3 rounded-16 border border-neutral-200 bg-neutral-50 p-6"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <h3 className="flex items-center gap-2.5">
                      <span className="label-eyebrow num text-brand-green-dark">{String(i + 1).padStart(2, "0")}</span>
                      <span className="heading-h5 text-neutral-900">{l(block.title)}</span>
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={l(item)} className="body-s flex items-start gap-2 text-neutral-700">
                          <Check className="mt-[3px] size-4 shrink-0 text-brand-green-dark" strokeWidth={1.75} aria-hidden />
                          <span>{l(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {d.gallery && d.gallery.length > 0 && (
            <figure className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <figcaption className="sr-only">{t.detail.gallery}</figcaption>
              {d.gallery.map((photo) => (
                <SmartImage
                  key={photo.image}
                  name={photo.image}
                  width={384}
                  height={256}
                  alt={photo.alt}
                  frameClassName="aspect-[38/25] rounded-16 border border-black/10"
                  className="rounded-16"
                />
              ))}
            </figure>
          )}

          {d.impact && d.impact.length > 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="heading-h2 text-neutral-900">{t.detail.impact}</h2>
              {d.impactIntro && <p className="body-l prose-measure text-neutral-700">{l(d.impactIntro)}</p>}
              <ul ref={impactGrid} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {d.impact.map((card, i) => {
                  const Icon = IMPACT_ICONS[card.icon];
                  return (
                    <li
                      key={l(card.title)}
                      className="reveal flex flex-col gap-2.5 rounded-[14px] border border-neutral-200 p-5"
                      style={{ "--i": i } as CSSProperties}
                    >
                      <Icon className="size-6 text-brand-blue" aria-hidden />
                      <h3 className="heading-h5 text-neutral-900">{l(card.title)}</h3>
                      <p className="body-s text-neutral-500">{l(card.body)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {d.commitment && (
            <div className="flex flex-col gap-3.5">
              <h2 className="heading-h2 text-neutral-900">{l(d.commitment.title)}</h2>
              <p className="body-l prose-measure text-neutral-700">{l(d.commitment.body)}</p>
            </div>
          )}

          {d.milestone && (
            <aside className="flex items-center gap-4 rounded-[14px] border-s-4 border-brand-green bg-tint-green-50 px-6 py-5">
              <Flag className="size-[22px] shrink-0 text-brand-green-dark" aria-hidden />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="label-eyebrow text-brand-green-dark">{t.detail.milestone}</p>
                <p className="body-m text-neutral-900">{l(d.milestone)}</p>
              </div>
            </aside>
          )}
        </div>

        <ProjectSidebar project={project} />
      </div>
    </section>
  );
}
