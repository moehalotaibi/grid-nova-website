import { ArrowRight, Check } from "lucide-react";
import { useLocale, type L } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { services } from "@/data/services";
import { extraServiceRows, serviceDetails, type ServiceRowContent } from "@/data/serviceDetails";

type Row = ServiceRowContent & { id: string; slug?: string; number: string; title: L };

/** The four services (from services.ts + serviceDetails.ts) followed by rows without a detail page. */
const rows: Row[] = [
  ...services.flatMap<Row>((svc) => {
    const detail = serviceDetails[svc.slug];
    return detail ? [{ id: svc.slug, slug: svc.slug, number: svc.number, title: svc.title, ...detail.row }] : [];
  }),
  ...extraServiceRows,
];

function ServiceRow({ row, index }: { row: Row; index: number }) {
  const { s, l } = useLocale();
  const ref = useReveal<HTMLElement>();
  const flipped = index % 2 === 1;
  const title = l(row.title);
  return (
    <article
      ref={ref}
      id={row.id}
      aria-labelledby={`service-row-${row.id}`}
      className={`reveal flex flex-col gap-8 lg:items-center lg:gap-12 xl:gap-20 ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <SmartImage
        name={row.image}
        width={560}
        height={380}
        alt={row.imageAlt}
        frameClassName="aspect-[560/380] w-full shrink-0 rounded-20 border border-black/10 lg:w-[46%] xl:w-[560px]"
        className="rounded-20"
      />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="label-eyebrow num text-brand-green-dark">{row.number}</span>
          <span aria-hidden className="h-px w-7 bg-brand-green" />
          <Eyebrow>{l(row.tagline)}</Eyebrow>
        </div>
        <h2 id={`service-row-${row.id}`} className="heading-h2 text-neutral-900">
          {title}
        </h2>
        <p className="body-l text-neutral-700">{l(row.description)}</p>
        <ul className="flex flex-col gap-2.5">
          {row.bullets.map((bullet) => (
            <li key={l(bullet)} className="body-m flex items-center gap-2.5 text-neutral-900">
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-tint-green-50 text-brand-green-dark">
                <Check className="size-[13px]" aria-hidden strokeWidth={2} />
              </span>
              {l(bullet)}
            </li>
          ))}
        </ul>
        <Button
          to={row.slug ? `/services/${row.slug}` : "/contact"}
          variant={flipped ? "outlineDark" : "blue"}
          icon={<ArrowRight />}
          aria-label={`${s.common.learnMore}: ${title}`}
          data-analytics={`cta_click:service-row-${row.id}`}
        >
          {s.common.learnMore}
        </Button>
      </div>
    </article>
  );
}

/**
 * Section / Service rows (Figma 28:123) — white · five alternating rows, gap 96:
 * 560 × 380 photo (radius 20, 1 px black 10 %) + copy column (number eyebrow + 28 px rule + blue tagline,
 * H2, Body/L neutral/700, check-list, blue / outline "Learn more"). Stacks photo-over-copy below 1024.
 */
export function ServiceRows() {
  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-16 lg:gap-20 xl:gap-24">
        {rows.map((row, i) => (
          <ServiceRow key={row.id} row={row} index={i} />
        ))}
      </div>
    </section>
  );
}
