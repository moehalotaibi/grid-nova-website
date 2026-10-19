import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import type { Project } from "@/data/projects";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";

type Cell = { label: string; value: string; num?: boolean };

/**
 * Brief wrap / Project brief bar (Figma 35:681) — white card, radius 20, padding 24 / 32,
 * floating shadow, overlapping the hero by about half its height. Six equal cells
 * (Label/Caption + Heading/H5) with 1 × 44 neutral/200 dividers; 2 → 3 → 6 columns.
 */
export function ProjectBrief({ project }: { project: Project }) {
  const { s, l } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  const d = project.detail;

  const cells: Cell[] = [
    { label: t.detail.brief.category, value: l(d?.category ?? project.tag) },
    { label: s.common.client, value: l(project.client) },
  ];
  if (d?.startDate && d?.endDate) {
    cells.push({ label: t.detail.brief.start, value: l(d.startDate), num: true }, { label: t.detail.brief.end, value: l(d.endDate), num: true });
  } else if (project.status === "completed") {
    cells.push({ label: s.common.status, value: s.common.completed });
    if (project.timeline) cells.push({ label: s.common.timeline, value: l(project.timeline), num: true });
  } else {
    cells.push({ label: s.common.timeline, value: l(project.timeline ?? project.period), num: true });
  }
  cells.push({ label: t.detail.brief.place, value: l(project.location) });
  if (project.deliveryModel) cells.push({ label: s.common.deliveryModel, value: l(project.deliveryModel) });

  const cols = cells.length >= 6 ? "lg:grid-cols-6" : cells.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <div className="container-site relative z-10 -mt-8 lg:-mt-12">
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 rounded-20 bg-white px-6 py-5 shadow-[0_16px_40px_-8px_rgba(5,20,38,0.14)] md:grid-cols-3 md:px-8 md:py-6 ${cols}`}>
        {cells.map((cell, i) => (
          <div key={cell.label} className={`flex min-w-0 flex-col gap-1 ${i > 0 ? "lg:border-s lg:border-neutral-200 lg:ps-6" : ""}`}>
            <dt className="label-caption text-neutral-500">{cell.label}</dt>
            {/* Values wrap instead of truncating (long Arabic client names). Dates take dir="auto" so "09 مارس 2025"
                keeps its day › month › year order in RTL while "09 Mar 2025" stays LTR; `num` would force LTR. */}
            <dd className={`heading-h5 text-neutral-900 [overflow-wrap:anywhere] ${cell.num ? "tabular-nums" : ""}`} dir={cell.num ? "auto" : undefined}>
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
