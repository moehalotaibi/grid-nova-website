import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Clock,
  HardHat,
  Lightbulb,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CAREERS_EMAIL, roleById, roles, type SectionKind } from "@/data/careers";

const NotFound = lazy(() => import("./NotFound"));

/** Icon + tint per section kind: duties = briefcase/green, requirements = check/blue, and so on. */
const SECTION_STYLE: Record<SectionKind, { Icon: LucideIcon; badge: string }> = {
  duties: { Icon: Briefcase, badge: "bg-tint-green-50 text-brand-green-dark" },
  requirements: { Icon: Check, badge: "bg-tint-blue-50 text-brand-blue" },
  skills: { Icon: Lightbulb, badge: "bg-amber-50 text-amber-700" },
  kpi: { Icon: Target, badge: "bg-teal-50 text-teal-700" },
  reporting: { Icon: Users, badge: "bg-violet-50 text-violet-700" },
  authority: { Icon: ShieldCheck, badge: "bg-sky-50 text-sky-700" },
  certifications: { Icon: Award, badge: "bg-orange-50 text-orange-700" },
  environment: { Icon: HardHat, badge: "bg-neutral-100 text-neutral-700" },
};

const en = {
  eyebrow: "Open position",
  apply: "Apply for this role",
  applyIntro: "Fill in the short application form and attach your CV; it takes about five minutes.",
  applyNote: "We reply to every application within ten business days.",
  otherRoles: "Other open roles",
  allRoles: "All open positions",
  back: "Back to careers",
  department: "Department",
  location: "Location",
  type: "Employment type",
};
const ar = {
  eyebrow: "وظيفة شاغرة",
  apply: "قدّم على هذه الوظيفة",
  applyIntro: "عبّئ نموذج التقديم المختصر وأرفق سيرتك الذاتية؛ لا يستغرق الأمر أكثر من خمس دقائق.",
  applyNote: "نرد على جميع الطلبات خلال عشرة أيام عمل.",
  otherRoles: "وظائف شاغرة أخرى",
  allRoles: "جميع الوظائف المتاحة",
  back: "العودة إلى الوظائف",
  department: "القسم",
  location: "الموقع",
  type: "نوع الدوام",
};

/**
 * /careers/:slug — deep dive into one open position (summary, responsibilities, requirements…),
 * built from the postings on the previous website. No Figma frame; reuses the page-hero and prose patterns.
 */
export default function JobDetailPage() {
  const { slug } = useParams();
  const role = roleById(slug);
  const { s, l, path } = useLocale();
  const t = useStrings(en, ar);
  const title = role ? l(role.title) : "";
  usePageMeta(title || s.nav.careers, role ? l(role.summary) : undefined);

  if (!role) {
    return (
      <Suspense fallback={<div className="min-h-[60vh] bg-navy-deep" aria-busy="true" />}>
        <NotFound />
      </Suspense>
    );
  }

  const others = roles.filter((r) => r.id !== role.id).slice(0, 4);
  const applyTo = `/careers/apply?role=${role.id}`;
  const meta = [
    { Icon: Briefcase, label: t.department, value: l(role.department) },
    { Icon: MapPin, label: t.location, value: l(role.location) },
    { Icon: Clock, label: t.type, value: l(role.type) },
  ];

  return (
    <>
      <PageHero
        size="md"
        image="careers-hero"
        crumbs={[{ label: s.nav.careers, to: "/careers" }, { label: title }]}
        eyebrow={t.eyebrow}
        title={title}
        intro={l(role.summary)}
      >
        <ul className="body-s flex flex-wrap items-center gap-x-5 gap-y-2 text-white/75">
          {meta.map(({ Icon, label, value }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-[15px] shrink-0" aria-hidden />
              <span className="sr-only">{label}: </span>
              {value}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-3 xs:flex-row">
          <Button to={applyTo} icon={<ArrowRight />} data-analytics="cta_click:job-apply-hero">
            {t.apply}
          </Button>
        </div>
      </PageHero>

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start lg:gap-16">
          <article className="flex flex-col gap-10">
            {role.sections.map((section) => {
              const { Icon, badge } = SECTION_STYLE[section.kind];
              return (
                <div key={section.title.en} className="flex flex-col gap-4">
                  <h2 className="heading-h3 flex items-center gap-3 text-neutral-900">
                    <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-10 ${badge}`}>
                      <Icon className="size-[18px]" aria-hidden strokeWidth={2.25} />
                    </span>
                    {l(section.title)}
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item) => (
                      <li key={item.en} className="body-m flex items-start gap-3 text-neutral-700">
                        {/* Same 36 px column as the heading chip, so item text lines up with the heading text. */}
                        <span className="mt-[3px] inline-flex w-9 shrink-0 justify-center">
                          <span className={`inline-flex size-5 items-center justify-center rounded-full ${badge}`}>
                            <Icon className="size-3" aria-hidden strokeWidth={2.5} />
                          </span>
                        </span>
                        {l(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <Link to={path("/careers")} className="label-button inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark">
              <ArrowLeft className="rtl-flip size-[18px]" aria-hidden />
              {t.back}
            </Link>
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+24px)]">
            <div className="dark-surface flex flex-col gap-4 rounded-20 border border-navy bg-navy p-6 text-white md:p-7">
              <h2 className="heading-h4 text-white">{t.apply}</h2>
              <p className="body-s text-white/75">{t.applyIntro}</p>
              <Button to={applyTo} fullWidth icon={<ArrowRight />} data-analytics="cta_click:job-apply">
                {t.apply}
              </Button>
              <a href={`mailto:${CAREERS_EMAIL}`} className="body-s inline-flex items-center gap-2 text-white/85 hover:text-white" dir="ltr">
                <Mail className="size-4" aria-hidden />
                {CAREERS_EMAIL}
              </a>
              <p className="label-caption text-white/55">{t.applyNote}</p>
            </div>

            {others.length > 0 && (
              <div className="flex flex-col gap-3 rounded-20 border border-neutral-200 bg-neutral-50 p-6 md:p-7">
                <h2 className="label-eyebrow text-neutral-500">{t.otherRoles}</h2>
                <ul className="flex flex-col divide-y divide-neutral-200">
                  {others.map((r) => (
                    <li key={r.id}>
                      <Link to={path(`/careers/${r.id}`)} className="flex items-center justify-between gap-3 py-3 text-neutral-900 hover:text-brand-blue">
                        <span className="flex flex-col">
                          <span className="heading-h5">{l(r.title)}</span>
                          <span className="body-s text-neutral-500">{l(r.department)}</span>
                        </span>
                        <ArrowRight className="rtl-flip size-4 shrink-0" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={path("/careers")} className="label-button mt-1 inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark">
                  {t.allRoles}
                  <ArrowRight className="rtl-flip size-4" aria-hidden />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
