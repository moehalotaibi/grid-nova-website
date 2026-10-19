import { ArrowRight } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SITE } from "@/data/site";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

const TONE = { green: "text-brand-green-dark", blue: "text-brand-blue" } as const;

/**
 * Section / Intro (Figma 37:767) — copy column (blue eyebrow, H2 max 560, two Body/L paragraphs, blue button)
 * beside a 480-wide 2 × 2 grid of stat tiles (neutral/50, 1 px neutral/200, radius 16, padding 28 / 24, gap 6).
 * Columns stack below 1024; tiles are 2 × 2 from 768 and 1-up below (board 20).
 */
export function Intro() {
  const { intro: t } = useStrings(aboutEn, aboutAr);
  const grid = useReveal<HTMLDListElement>();
  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-16 xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-24">
        <div className="flex flex-col gap-6">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="heading-h2 max-w-[560px] text-neutral-900">{t.title}</h2>
          {t.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-l text-neutral-700">
              {paragraph}
            </p>
          ))}
          <div>
            <Button href={SITE.profilePdf} variant="blue" icon={<ArrowRight />} target="_blank" rel="noreferrer" data-analytics="cta_click:about-profile">
              {t.download}
            </Button>
          </div>
        </div>

        <dl ref={grid} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal flex flex-col gap-1.5 rounded-16 border border-neutral-200 bg-neutral-50 px-6 py-7"
              style={{ "--i": i } as React.CSSProperties}
            >
              <dt className="body-s order-2 text-neutral-500">{stat.label}</dt>
              <dd className={`stat-number num order-1 ${TONE[stat.tone]}`}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
