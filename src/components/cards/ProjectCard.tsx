import { Link } from "react-router-dom";
import { ArrowRight, Building2, Calendar, MapPin } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Project } from "@/data/projects";

/**
 * Project card (handoff › 18): 3-up 384 wide · no border · image 3:2 → 256, radius 16, 1 px white 10 % outline ·
 * tag pill inset 16 · body gap 14 · H4 clamp 2 · meta Body/S 70 % with 15 px icons, gap 18 · link + arrow.
 * Hover: image scale 1.03 @ 300 ms. `tone="light"` is used on the Projects page grid.
 */
export function ProjectCard({
  project,
  tone = "dark",
  style,
  className = "",
}: {
  project: Project;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
  className?: string;
}) {
  const { s, l, path } = useLocale();
  const title = l(project.title);
  const dark = tone === "dark";
  const period = project.status === "completed" && !project.period.ar && project.period.en === "Completed" ? s.common.completed : l(project.period);
  return (
    <Link
      to={path(`/projects/${project.slug}`)}
      title={title}
      style={style}
      className={`card-hover group flex flex-col gap-5 rounded-16 ${className}`}
    >
      <div className={`relative aspect-[3/2] overflow-hidden rounded-16 border ${dark ? "border-white/10" : "border-black/10"}`}>
        <SmartImage name={project.image} width={384} height={256} alt={project.imageAlt} frameClassName="absolute inset-0 h-full w-full" className="card-img" />
        <span className="label-caption absolute start-4 top-4 rounded-full border border-white/20 bg-navy-deep/60 px-2.5 py-[5px] text-white backdrop-blur-sm">
          {l(project.tag)}
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        <h3 className={`heading-h4 line-clamp-2 ${dark ? "text-white" : "text-neutral-900"}`}>{title}</h3>
        <ul className={`body-s flex flex-wrap items-center gap-x-[18px] gap-y-1.5 ${dark ? "text-white/70" : "text-neutral-500"}`}>
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
        <span
          className={`label-button inline-flex items-center gap-1.5 transition-colors ${
            dark ? "text-white group-hover:text-brand-cyan" : "card-link text-neutral-900"
          }`}
        >
          {s.common.projectDetails}
          <ArrowRight className="rtl-flip size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
