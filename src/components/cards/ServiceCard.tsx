import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Service } from "@/data/services";

/**
 * Service card (Design System › 10, handoff › 18): 4-up 282 wide · radius 20 · 1 px neutral/200 ·
 * image 16:10 → 176 · body 22 / 24, gap 10 · number eyebrow + 24 px green rule · H4 · caption · Body/S clamp 4 ·
 * "See more" link. Whole card is the link; hover lifts with the layered shadow.
 */
export function ServiceCard({ service, style, className = "" }: { service: Service; style?: React.CSSProperties; className?: string }) {
  const { s, l, path } = useLocale();
  const title = l(service.title);
  return (
    <Link
      to={path(`/services/${service.slug}`)}
      title={title}
      style={style}
      className={`card-hover group flex flex-col overflow-hidden rounded-20 border border-neutral-200 bg-white ${className}`}
    >
      <SmartImage name={service.image} width={282} height={176} alt={service.imageAlt} frameClassName="aspect-[282/176] w-full" className="card-img" />
      <div className="flex flex-1 flex-col gap-2.5 px-6 pt-[22px] pb-6">
        <div className="flex items-center gap-2">
          <span className="label-eyebrow num text-brand-green-dark">{service.number}</span>
          <span aria-hidden className="h-px w-6 bg-brand-green" />
        </div>
        <h3 className="heading-h4 text-neutral-900">{title}</h3>
        <p className="label-caption text-brand-blue">{l(service.tagline)}</p>
        <p className="body-s line-clamp-4 text-neutral-500">{l(service.summary)}</p>
        <span className="card-link label-button mt-auto inline-flex items-center gap-1.5 pt-3 text-neutral-900 transition-colors">
          {s.common.seeMore}
          <ArrowRight className="rtl-flip size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
