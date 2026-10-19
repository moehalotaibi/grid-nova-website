import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ServiceMain } from "@/sections/services/ServiceMain";
import { serviceBySlug, type Service } from "@/data/services";
import { serviceDetailBySlug, type ServiceDetail } from "@/data/serviceDetails";

const NotFoundPage = lazy(() => import("@/pages/NotFound"));

function ServiceDetailContent({ service, detail }: { service: Service; detail: ServiceDetail }) {
  const { s, l } = useLocale();
  const title = l(service.title);
  usePageMeta(title, l(detail.hero.intro));
  return (
    <>
      <PageHero
        size="md"
        image={detail.hero.image}
        imageAlt={detail.hero.imageAlt}
        crumbs={[{ label: s.nav.services, to: "/services" }, { label: title }]}
        eyebrow={
          <span className="inline-flex flex-wrap items-center gap-2.5">
            <span className="num">{service.number}</span>
            <span aria-hidden>/</span>
            <span>{l(detail.hero.eyebrow)}</span>
          </span>
        }
        title={title}
        intro={l(detail.hero.intro)}
      />
      <ServiceMain service={service} detail={detail} />
      <CtaBand title={l(detail.cta.title)} intro={l(detail.cta.intro)} secondary={{ label: s.nav.allServices, to: "/services" }} />
    </>
  );
}

/** Service detail template — Figma 30:168 (Manufacturing) and 32:251 / 32:448 / 32:645. Route /services/:slug. */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);
  const detail = serviceDetailBySlug(slug);
  if (!service || !detail) {
    return (
      <Suspense fallback={<div className="min-h-[60vh] bg-navy-deep" aria-busy="true" />}>
        <NotFoundPage />
      </Suspense>
    );
  }
  // Keyed by slug so sidebar navigation between services resets the select and the open FAQ row.
  return <ServiceDetailContent key={service.slug} service={service} detail={detail} />;
}
