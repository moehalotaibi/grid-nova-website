import { useMemo, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Building2, Calendar, ChevronDown, Filter, MapPin } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { projectFilters, projects, isProjectFilterId, type Project, type ProjectFilterId } from "@/data/projects";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";

type Sort = "newest" | "oldest";

/**
 * Project card / Projects page (Figma 34:608): 2-up 584 wide · white, 1 px neutral/200, radius 20 ·
 * image 582 × 320 with category + status pills inset 16 · body 28 / 24 / 28, gap 12 ·
 * H3 title, Body/M excerpt, meta row (Body/S neutral/700, 15 px icons, gap 18), "Project details" link in brand/blue.
 * Whole card is the link; hover per board 19 (shadow, image 1.03, link → blue-dark).
 */
function ProjectGridCard({ project, style }: { project: Project; style?: CSSProperties }) {
  const { s, l, path } = useLocale();
  const title = l(project.title);
  const inProgress = project.status === "in-progress";
  const period =
    project.status === "completed" && !project.period.ar && project.period.en === "Completed"
      ? s.common.completed
      : l(project.timeline ?? project.period);
  return (
    <Link
      to={path(`/projects/${project.slug}`)}
      title={title}
      style={style}
      className="card-hover reveal group flex flex-col overflow-hidden rounded-20 border border-neutral-200 bg-white"
    >
      <div className="relative aspect-[73/40] overflow-hidden">
        <SmartImage
          name={project.image}
          width={384}
          height={256}
          alt={project.imageAlt}
          frameClassName="absolute inset-0 h-full w-full"
          className="card-img"
        />
        <div className="absolute start-4 top-4 flex flex-wrap items-center gap-2">
          <span className="label-caption rounded-full border border-white/20 bg-navy-deep/60 px-2.5 py-[5px] text-white backdrop-blur-sm">
            {l(project.tag)}
          </span>
          <span className={`label-caption rounded-full px-2.5 py-[5px] text-white ${inProgress ? "bg-brand-green-dark" : "bg-brand-blue"}`}>
            {inProgress ? s.common.inProgress : s.common.completed}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-7 md:px-7">
        <h3 className="heading-h3 text-neutral-900">{title}</h3>
        {project.excerpt && <p className="body-m text-neutral-500">{l(project.excerpt)}</p>}
        <ul className="body-s flex flex-wrap items-center gap-x-[18px] gap-y-1.5 text-neutral-700">
          <li className="flex items-center gap-1.5">
            <Building2 className="size-[15px] shrink-0" aria-hidden />
            {l(project.client)}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="size-[15px] shrink-0" aria-hidden />
            {l(project.location)}
          </li>
          <li className="flex items-center gap-1.5">
            <Calendar className="size-[15px] shrink-0" aria-hidden />
            <span className="num">{period}</span>
          </li>
        </ul>
        <span className="card-link label-button mt-auto inline-flex items-center gap-1.5 pt-1.5 text-brand-blue transition-colors">
          {s.common.projectDetails}
          <ArrowRight className="rtl-flip size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/** Remounted (via key) whenever the list changes so the enter-on-scroll reveal runs again for the new cards. */
function ProjectCards({ items }: { items: Project[] }) {
  const grid = useReveal<HTMLDivElement>();
  return (
    <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
      {items.map((project, i) => (
        <ProjectGridCard key={project.slug} project={project} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

/**
 * Section / Project grid (Figma 34:587) — white · filter chips + sort on one row · 2-up cards (2 → 1 below 768).
 * Filtering is client-side and mirrored in `?category=` so a chip state can be linked to.
 * Empty category → "No projects in this category yet" + "Show all" (handoff › board 20).
 */
export function ProjectsGrid() {
  const { s, l } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<Sort>("newest");

  const raw = params.get("category");
  const active: ProjectFilterId = isProjectFilterId(raw) ? raw : "all";

  const setFilter = (id: ProjectFilterId) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setParams(next, { replace: true });
  };

  const items = useMemo(() => {
    const filter = projectFilters.find((f) => f.id === active);
    const list = filter && filter.id !== "all" ? projects.filter((p) => filter.categories.includes(p.category)) : [...projects];
    return list.sort((a, b) => (sort === "newest" ? b.year - a.year : a.year - b.year));
  }, [active, sort]);

  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-10 pt-12 pb-16 md:pb-20 lg:pt-16 lg:pb-24 xl:pb-[112px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div role="group" aria-label={t.grid.filterGroup} className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const pressed = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(f.id)}
                  data-analytics={`project_filter:${f.id}`}
                  className={`label-nav inline-flex min-h-[42px] items-center rounded-full px-4 py-2.5 transition-colors duration-[var(--dur-micro)] ${
                    pressed
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  {l(f.label)}
                </button>
              );
            })}
          </div>

          <label className="label-nav relative inline-flex h-[42px] shrink-0 items-center gap-2 self-start rounded-10 border border-neutral-300 ps-3.5 pe-3 text-neutral-700 focus-within:border-brand-blue md:self-auto">
            <Filter className="size-4 shrink-0 text-neutral-500" aria-hidden />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label={t.grid.sort}
              className="cursor-pointer appearance-none bg-transparent pe-6 text-neutral-700 outline-none"
            >
              <option value="newest">{t.grid.newest}</option>
              <option value="oldest">{t.grid.oldest}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 size-4 text-neutral-500" aria-hidden />
          </label>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {t.grid.count(items.length)}
        </p>

        {items.length > 0 ? (
          <ProjectCards key={`${active}-${sort}`} items={items} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-20 border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
            <h2 className="heading-h4 text-neutral-900">{t.grid.emptyTitle}</h2>
            <p className="body-m max-w-[480px] text-neutral-500">{t.grid.emptyBody}</p>
            <Button variant="outlineDark" onClick={() => setFilter("all")} data-analytics="project_filter:all">
              {s.common.showAll}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
