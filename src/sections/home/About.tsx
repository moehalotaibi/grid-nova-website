import { ArrowRight, Award, FileText, Lightbulb, ShieldCheck } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { SITE } from "@/data/site";

const PILLAR_ICONS = [
  { Icon: ShieldCheck, badge: "bg-tint-blue-50 text-brand-blue" },
  { Icon: Lightbulb, badge: "bg-tint-green-50 text-brand-green-dark" },
  { Icon: Award, badge: "bg-tint-cyan-50 text-brand-cyan-dark" },
];

/**
 * Section / About (Figma 12:34) — visual 560 × 640 with the "25+" badge offset −40 at the bottom,
 * copy column gap 28, pillars with 48 px tinted icon badges, blue button + PDF link.
 */
export function About() {
  const { s } = useLocale();
  const a = s.home.about;
  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,560px)_minmax(0,1fr)] xl:gap-16 2xl:gap-24">
        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
          <SmartImage
            name="about-line-crew"
            width={560}
            height={640}
            alt={a.imageAlt}
            frameClassName="aspect-[560/640] w-full rounded-24 border border-black/10"
            className="rounded-24"
          />
          <div className="absolute bottom-6 start-0 flex items-center gap-4 rounded-16 bg-white py-4 ps-5 pe-6 shadow-float md:py-5 md:ps-6 md:pe-7 lg:-start-10 lg:bottom-16">
            <span className="stat-number num text-brand-green-dark">{a.years}</span>
            <div className="flex flex-col gap-0.5">
              <p className="heading-h5 text-neutral-900">{a.yearsTitle}</p>
              <p className="body-s text-neutral-500">{a.yearsSub}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <Eyebrow color="green">{a.eyebrow}</Eyebrow>
          <h2 className="heading-h2 text-neutral-900">{a.title}</h2>
          <p className="body-l text-neutral-700">{a.body}</p>
          <ul className="flex flex-col gap-5">
            {a.pillars.map((pillar, i) => {
              const { Icon, badge } = PILLAR_ICONS[i] ?? PILLAR_ICONS[0];
              return (
                <li key={pillar.title} className="flex items-start gap-4">
                  <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-12 ${badge}`}>
                    <Icon className="size-[22px]" aria-hidden strokeWidth={2} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="heading-h5 text-neutral-900">{pillar.title}</h3>
                    <p className="body-m text-neutral-500">{pillar.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col items-start gap-4 xs:flex-row xs:items-center xs:gap-6">
            <Button to="/about" variant="blue" icon={<ArrowRight />} data-analytics="cta_click:about">
              {a.more}
            </Button>
            <a
              href={SITE.profilePdf}
              className="label-button inline-flex items-center gap-2 text-brand-blue transition-colors hover:text-brand-blue-dark"
              target="_blank"
              rel="noreferrer"
            >
              <FileText className="size-[18px]" aria-hidden />
              {a.profile}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
