import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Share2 } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { projects, type Project } from "@/data/projects";
import { projectsStrings, projectsStringsAr } from "@/i18n/pages/projects";

/**
 * Sidebar (Figma 35:814) — 360 wide, gap 24:
 * CTA card (navy, radius 16, padding 24, H4 + Body/S 70 % + full-width primary button) ·
 * Share row (1 px neutral/200, radius 14, padding 16 / 20 — Web Share API with clipboard fallback) ·
 * Recent projects (neutral/50, radius 16, padding 20: eyebrow + 72 × 56 thumb, Label/Nav title, caption tag).
 */
export function ProjectSidebar({ project }: { project: Project }) {
  const { l, path } = useLocale();
  const t = useStrings(projectsStrings, projectsStringsAr);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const share = async () => {
    const url = window.location.href;
    const title = l(project.title);
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share sheet dismissed or clipboard blocked — nothing to recover */
    }
  };

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[320px] xl:w-[360px]">
      <div className="dark-surface flex flex-col gap-3.5 rounded-16 bg-navy p-6 text-white">
        <h2 className="heading-h4 text-white">{t.detail.sidebar.title}</h2>
        <p className="body-s text-white/70">{t.detail.sidebar.body}</p>
        <Button to="/contact" fullWidth icon={<ArrowRight />} data-analytics="cta_click:project-sidebar">
          {t.detail.sidebar.cta}
        </Button>
      </div>

      <button
        type="button"
        onClick={share}
        aria-live="polite"
        className="label-nav flex items-center gap-2.5 rounded-[14px] border border-neutral-200 px-5 py-4 text-start text-neutral-900 transition-colors duration-[var(--dur-micro)] hover:border-neutral-300 hover:bg-neutral-50"
      >
        <Share2 className="size-[18px] shrink-0 text-brand-blue" aria-hidden />
        {copied ? t.detail.sidebar.copied : t.detail.sidebar.share}
      </button>

      {related.length > 0 && (
        <nav aria-label={t.detail.sidebar.recent} className="flex flex-col gap-3 rounded-16 border border-neutral-200 bg-neutral-50 p-5">
          <p className="label-eyebrow text-neutral-500">{t.detail.sidebar.recent}</p>
          <ul className="flex flex-col gap-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link to={path(`/projects/${p.slug}`)} className="group flex items-center gap-3 rounded-10">
                  <SmartImage
                    name={p.image}
                    width={384}
                    height={256}
                    alt=""
                    frameClassName="h-14 w-[72px] shrink-0 rounded-[8px]"
                    className="rounded-[8px]"
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="label-nav text-neutral-900 group-hover:text-brand-blue-dark">{l(p.shortTitle ?? p.title)}</span>
                    <span className="label-caption text-neutral-500">{l(p.tag)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
