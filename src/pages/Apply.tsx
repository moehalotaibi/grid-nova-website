import { useSearchParams } from "react-router-dom";
import { Check, Mail } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero, type Crumb } from "@/components/layout/PageHero";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { CAREERS_EMAIL, roleById } from "@/data/careers";
import { careersEn, careersAr } from "@/i18n/pages/careers";

/**
 * /careers/apply?role=<id> — the application page every "Apply" button lands on. A known role id
 * preselects the Position field and adds the role to the breadcrumb; without one it is the general
 * "Send us your CV" page. No Figma frame; reuses the page-hero and form-card patterns.
 */
export default function ApplyPage() {
  const { s, l } = useLocale();
  const t = useStrings(careersEn, careersAr);
  const a = t.application;
  const [searchParams] = useSearchParams();
  const role = roleById(searchParams.get("role") ?? undefined);
  const title = role ? a.titleFor(l(role.title)) : a.titleGeneral;
  const intro = role ? a.introFor : a.introGeneral;
  usePageMeta(title, intro);

  const crumbs: Crumb[] = [
    { label: s.nav.careers, to: "/careers" },
    ...(role ? [{ label: l(role.title), to: `/careers/${role.id}` }] : []),
    { label: a.crumb },
  ];

  return (
    <>
      <PageHero size="md" image="careers-hero" imageAlt={t.hero.imageAlt} crumbs={crumbs} eyebrow={a.eyebrow} title={title} intro={intro} />

      <section className="bg-neutral-50">
        <div className="container-site section-y grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start lg:gap-16">
          <ApplicationForm initialRole={role?.id} />

          <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+24px)]">
            {/* The three cards share padding (24 / 28) and a 24 px bullet column so headings and text line up across them. */}
            <div className="dark-surface flex flex-col gap-4 rounded-20 border border-navy bg-navy p-6 text-white md:p-7">
              <h2 className="heading-h4 text-white">{a.aside.nextTitle}</h2>
              <ol className="flex flex-col gap-3">
                {a.aside.next.map((step, i) => (
                  <li key={step} className="body-s flex items-start gap-3 text-white/85">
                    <span className="label-caption num inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white/12 text-brand-cyan">
                      {i + 1}
                    </span>
                    <span className="pt-px">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-4 rounded-20 border border-neutral-200 bg-white p-6 md:p-7">
              <h2 className="heading-h4 text-neutral-900">{a.aside.prepTitle}</h2>
              <ul className="flex flex-col gap-3">
                {a.aside.prep.map((item) => (
                  <li key={item} className="body-s flex items-start gap-3 text-neutral-700">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center">
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-tint-green-50 text-brand-green-dark">
                        <Check className="size-3.5" aria-hidden strokeWidth={2.5} />
                      </span>
                    </span>
                    <span className="pt-px">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 rounded-20 border border-neutral-200 bg-white p-6 md:p-7">
              <h2 className="heading-h4 text-neutral-900">{a.aside.emailTitle}</h2>
              <p className="body-s text-neutral-500">{a.aside.emailBody}</p>
              <a href={`mailto:${CAREERS_EMAIL}`} className="body-s inline-flex items-center gap-2 font-medium text-brand-blue hover:text-brand-blue-dark" dir="ltr">
                <Mail className="size-4" aria-hidden />
                {CAREERS_EMAIL}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
