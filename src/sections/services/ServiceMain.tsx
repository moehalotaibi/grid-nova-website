import { useId, useState, type CSSProperties, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Award, Box, Check, ChevronDown, ChevronRight, Cpu, FileText, Grid2x2, Phone, Zap } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { services, type Service } from "@/data/services";
import { extraServiceRows, type DetailIcon, type ServiceDetail } from "@/data/serviceDetails";
import { SITE } from "@/data/site";
import { servicesAr, servicesEn } from "@/i18n/pages/services";
import { FaqAccordion } from "./FaqAccordion";

const ICONS: Record<DetailIcon, typeof Zap> = { zap: Zap, grid: Grid2x2, box: Box, cpu: Cpu, award: Award };

/**
 * Section / Main (Figma 30:209) — white, padding 96 / 112 · content column (gap 48): chairman quote card,
 * two text blocks (the second with a check-list), feature tiles, capability grid, 2-up gallery and
 * service FAQs · 360 wide sidebar (gap 24): service nav, brochure card, contact card. Sidebar stacks under
 * the content below 1024.
 */
export function ServiceMain({ service, detail }: { service: Service; detail: ServiceDetail }) {
  const { s, l, path } = useLocale();
  const t = useStrings(servicesEn, servicesAr);
  const tiles = useReveal<HTMLDivElement>();
  const products = useReveal<HTMLUListElement>();
  const gallery = useReveal<HTMLUListElement>();
  const navigate = useNavigate();
  const selectId = useId();
  const [selected, setSelected] = useState(service.slug);

  const navItems = [
    ...services.map((svc) => ({ key: svc.slug, label: l(svc.title), to: `/services/${svc.slug}`, current: svc.slug === service.slug })),
    ...extraServiceRows.map((row) => ({ key: row.id, label: l(row.title), to: `/services#${row.id}`, current: false })),
  ];

  const requestCallBack = (e: FormEvent) => {
    e.preventDefault();
    navigate(path(`/contact?service=${encodeURIComponent(selected)}`));
  };

  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-12 pt-16 pb-16 md:pt-20 md:pb-20 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12 lg:pt-24 lg:pb-24 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-16 xl:pb-28">
        {/* Content */}
        <div className="flex min-w-0 flex-col gap-12">
          <figure className="flex flex-col gap-4 rounded-16 bg-tint-blue-50 px-6 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-7 sm:py-6">
            <SmartImage
              name="chairman-tawfik-alsharhan-avatar"
              width={64}
              height={64}
              alt={t.detail.chairman.portraitAlt}
              frameClassName="size-16 shrink-0 rounded-full"
              className="rounded-full"
            />
            <div className="flex min-w-0 flex-col gap-1.5">
              <blockquote className="heading-h4 text-neutral-900">{t.detail.chairman.quote}</blockquote>
              <figcaption className="body-s text-brand-blue">
                {t.detail.chairman.name} — {t.detail.chairman.role}
              </figcaption>
            </div>
          </figure>

          {detail.overview.map((block) => (
            <div key={l(block.title)} className="flex flex-col gap-3.5">
              <h2 className="heading-h3 text-neutral-900">{l(block.title)}</h2>
              <p className="body-l max-w-[660px] text-neutral-700">{l(block.body)}</p>
              {block.bullets && (
                <ul className="flex flex-col gap-2.5 pt-1">
                  {block.bullets.map((bullet) => (
                    <li key={l(bullet)} className="body-m flex items-center gap-2.5 text-neutral-900">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-tint-green-50 text-brand-green-dark">
                        <Check className="size-[13px]" aria-hidden strokeWidth={2} />
                      </span>
                      {l(bullet)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div ref={tiles} className="grid gap-5 md:grid-cols-2">
            {detail.keyFacts.map((tile, i) => {
              const Icon = ICONS[tile.icon];
              return (
                <div
                  key={l(tile.title)}
                  className="reveal flex flex-col gap-3 rounded-16 border border-neutral-200 bg-neutral-50 p-6"
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-12 bg-brand-blue text-white">
                    <Icon className="size-5" aria-hidden strokeWidth={2} />
                  </span>
                  <h3 className="heading-h5 text-neutral-900">{l(tile.title)}</h3>
                  <p className="body-s text-neutral-500">{l(tile.body)}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="heading-h3 text-neutral-900">{l(detail.capabilities.title)}</h2>
            <ul ref={products} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {detail.capabilities.items.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <li
                    key={l(item.title)}
                    className="reveal flex flex-col gap-2.5 rounded-[14px] border border-neutral-200 bg-white p-5"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <Icon className="size-6 text-brand-green-dark" aria-hidden strokeWidth={2} />
                    <h3 className="heading-h5 text-neutral-900">{l(item.title)}</h3>
                    <p className="body-s text-neutral-500">{l(item.body)}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul ref={gallery} className="grid gap-4 sm:grid-cols-2">
            {detail.gallery.map((photo, i) => (
              <li key={photo.image} className="reveal" style={{ "--i": i } as CSSProperties}>
                <SmartImage
                  name={photo.image}
                  width={380}
                  height={240}
                  alt={photo.alt}
                  frameClassName="aspect-[380/240] w-full rounded-16 border border-black/10"
                  className="rounded-16"
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <h2 className="heading-h3 text-neutral-900">{t.detail.faqTitle}</h2>
            <FaqAccordion items={detail.faqs} size="md" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <nav aria-label={t.detail.sidebar.navLabel} className="rounded-16 border border-neutral-200 bg-neutral-50 p-2">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={path(item.to)}
                    aria-current={item.current ? "page" : undefined}
                    className={`label-nav flex items-center justify-between gap-3 rounded-10 px-4 py-3.5 transition-colors duration-[var(--dur-micro)] ${
                      item.current ? "bg-brand-blue text-white" : "text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    {item.label}
                    <ChevronRight className={`rtl-flip size-4 shrink-0 ${item.current ? "text-white" : "text-neutral-500"}`} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={SITE.profilePdf}
            target="_blank"
            rel="noreferrer"
            data-analytics="cta_click:service-brochure"
            className="dark-surface flex items-center gap-3.5 rounded-16 bg-navy p-5 text-white transition-colors duration-[var(--dur-micro)] hover:bg-navy-deep"
          >
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-12 bg-white/10">
              <FileText className="size-[22px]" aria-hidden strokeWidth={2} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="heading-h5 text-white">{t.detail.sidebar.brochureTitle}</span>
              <span className="body-s num text-white/65">{t.detail.sidebar.brochureMeta}</span>
            </span>
            <ArrowRight className="rtl-flip size-[18px] shrink-0" aria-hidden />
          </a>

          <form onSubmit={requestCallBack} className="flex flex-col gap-4 rounded-16 border border-neutral-200 bg-white p-6">
            <h2 className="heading-h4 text-neutral-900">{t.detail.sidebar.contactTitle}</h2>
            <p className="body-s text-neutral-500">{t.detail.sidebar.contactIntro}</p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={selectId} className="sr-only">
                {s.form.service}
              </label>
              <div className="relative">
                <select id={selectId} name="service" value={selected} onChange={(e) => setSelected(e.target.value)} className="field-control appearance-none pe-10">
                  {services.map((svc) => (
                    <option key={svc.slug} value={svc.slug}>
                      {l(svc.title)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" aria-hidden />
              </div>
            </div>
            <Button type="submit" fullWidth icon={<ArrowRight />} data-analytics="cta_click:service-callback">
              {t.detail.sidebar.callBack}
            </Button>
            <a href={SITE.phoneHref} className="label-nav inline-flex items-center gap-2 self-start text-neutral-900 transition-colors hover:text-brand-blue">
              <Phone className="size-4 shrink-0 text-brand-blue" aria-hidden strokeWidth={2} />
              <span className="num" dir="ltr">
                {SITE.phone}
              </span>
            </a>
          </form>
        </aside>
      </div>
    </section>
  );
}
