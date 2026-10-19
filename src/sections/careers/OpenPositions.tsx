import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CAREERS_EMAIL, roles } from "@/data/careers";
import { careersEn, careersAr } from "@/i18n/pages/careers";

/**
 * Section / Open positions (Figma 39:1062) — neutral/50 · header with the role count in the aside ·
 * job rows (white, 1 px neutral/200, radius 16, padding 22 / 28, H4 + Body/S meta with 15 px icons, outline "Apply")
 * · navy "CV card" application CTA (radius 20, padding 28 / 32, H3 + Body/M 70 %, primary button).
 * Each row is a stretched link to its /careers/:slug deep dive; "Apply" opens /careers/apply?role=<id> above it.
 * No roles → "No open roles right now — send your CV" + mailto (handoff › board 20). Rows stack their button below 768.
 */
export function OpenPositions() {
  const { l, isAr, path } = useLocale();
  const { positions: t } = useStrings(careersEn, careersAr);
  const list = useReveal<HTMLUListElement>();
  const hasRoles = roles.length > 0;
  const locations = Array.from(new Set(roles.map((role) => l(role.location)))).join(isAr ? "، " : ", ");

  return (
    <section className="bg-neutral-50">
      <div className="container-site section-y flex flex-col gap-8 xl:gap-10">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          aside={hasRoles ? <p className="body-m text-neutral-500">{t.summary(roles.length, locations)}</p> : undefined}
        />

        {hasRoles ? (
          <ul ref={list} className="flex flex-col gap-3">
            {roles.map((role, i) => {
              const title = l(role.title);
              const meta = [
                { key: "department", Icon: Briefcase, value: l(role.department) },
                { key: "location", Icon: MapPin, value: l(role.location) },
                { key: "type", Icon: Clock, value: l(role.type) },
              ];
              return (
                <li
                  key={role.id}
                  className="reveal relative flex flex-col gap-4 rounded-16 border border-neutral-200 bg-white px-6 py-5 transition-[border-color,box-shadow] duration-200 hover:border-brand-blue/40 hover:shadow-card-hover md:flex-row md:items-center md:justify-between md:gap-6 md:px-7 md:py-[22px]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="heading-h4 text-neutral-900">
                      <Link
                        to={path(`/careers/${role.id}`)}
                        className="transition-colors hover:text-brand-blue after:absolute after:inset-0 after:rounded-16 after:content-['']"
                        data-analytics="job_open"
                      >
                        {title}
                      </Link>
                    </h3>
                    <ul className="body-s flex flex-wrap items-center gap-x-4 gap-y-1.5 text-neutral-500">
                      {meta.map(({ key, Icon, value }) => (
                        <li key={key} className="flex items-center gap-1.5">
                          <Icon className="size-[15px] shrink-0" aria-hidden />
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-2.5">
                    <Button
                      to={`/careers/${role.id}`}
                      variant="outlineDark"
                      icon={<ArrowRight />}
                      aria-label={t.viewFor(title)}
                      data-analytics="cta_click:job-details"
                    >
                      {t.view}
                    </Button>
                    <Button
                      to={`/careers/apply?role=${role.id}`}
                      icon={<ArrowRight />}
                      aria-label={t.applyFor(title)}
                      data-analytics="cta_click:apply"
                    >
                      {t.apply}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div role="status" className="flex flex-col items-center gap-4 rounded-20 border border-dashed border-neutral-300 bg-white px-6 py-12 text-center md:py-16">
            <span className="inline-flex size-[52px] items-center justify-center rounded-[14px] bg-tint-blue-50 text-brand-blue">
              <Briefcase className="size-6" aria-hidden />
            </span>
            <h3 className="heading-h4 text-neutral-900">{t.emptyTitle}</h3>
            <p className="body-m max-w-[520px] text-neutral-500">{t.cvBody(CAREERS_EMAIL)}</p>
            <Button to="/careers/apply" icon={<ArrowRight />} data-analytics="cta_click:send-cv">
              {t.sendCv}
            </Button>
          </div>
        )}

        {hasRoles && (
          <div className="dark-surface flex flex-col gap-5 rounded-20 bg-navy px-6 py-7 text-white md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
            <div className="flex flex-col gap-1.5">
              <h3 className="heading-h3 text-white">{t.cvTitle}</h3>
              <p className="body-m text-white/70">{t.cvBody(CAREERS_EMAIL)}</p>
            </div>
            <Button to="/careers/apply" icon={<ArrowRight />} className="shrink-0" data-analytics="cta_click:send-cv">
              {t.sendCv}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
