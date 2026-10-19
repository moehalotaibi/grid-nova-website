import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Eyebrow } from "@/components/ui/SectionHeader";

export type Crumb = { label: string; to?: string };

type Props = {
  /** Background photo base name under /public/images (1440 × 640 WebP + @2x). */
  image: string;
  imageAlt?: string;
  crumbs: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** "lg" = 72 / 88 padding (page heroes, Figma 28:86) · "md" = 64 / 80 (service & project detail, Figma 30:169) */
  size?: "lg" | "md";
  /** Extra content under the intro (meta rows, buttons). */
  children?: ReactNode;
  className?: string;
};

/**
 * Page hero shared by every inner page: navy-deep, background photo with the
 * navy-deep 92 → 60 → 35 % overlay, breadcrumb, cyan eyebrow, Display/Hero h1 and Body/L intro (max 680).
 * The fixed Navigation / Dark sits on top, so the hero pads by --nav-height.
 */
export function PageHero({ image, imageAlt = "", crumbs, eyebrow, title, intro, size = "lg", children, className = "" }: Props) {
  const { s, path } = useLocale();
  const pad =
    size === "lg"
      ? "pt-[calc(var(--nav-height)+48px)] pb-16 lg:pt-[calc(var(--nav-height)+72px)] lg:pb-[88px]"
      : "pt-[calc(var(--nav-height)+40px)] pb-14 lg:pt-[calc(var(--nav-height)+64px)] lg:pb-20";
  return (
    <section className={`dark-surface relative overflow-hidden bg-navy-deep text-white ${className}`}>
      <div className="absolute inset-0">
        <img
          src={`/images/${image}.webp`}
          srcSet={`/images/${image}.webp 1440w, /images/${image}@2x.webp 2880w`}
          sizes="100vw"
          width={1440}
          height={640}
          alt={imageAlt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="page-hero-overlay absolute inset-0" />
      </div>
      <div className={`container-site relative flex flex-col gap-4 lg:gap-5 ${pad}`}>
        <nav aria-label={s.nav.breadcrumb} className="body-s flex flex-wrap items-center gap-2 text-white/70">
          <Link to={path("/")} className="hover:text-white">
            {s.nav.home}
          </Link>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                <ChevronRight className="rtl-flip size-3.5 shrink-0" aria-hidden />
                {c.to && !last ? (
                  <Link to={path(c.to)} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-white" : ""} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
        {eyebrow && <Eyebrow color="cyan">{eyebrow}</Eyebrow>}
        <h1 className="display-hero max-w-[900px] text-white">{title}</h1>
        {intro && <p className="body-l max-w-[680px] text-white/80">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
