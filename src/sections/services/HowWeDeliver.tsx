import type { CSSProperties } from "react";
import { Box, Gauge, HardHat, PenLine } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesAr, servicesEn } from "@/i18n/pages/services";

const STEP_ICONS = [PenLine, Box, HardHat, Gauge];

/**
 * Section / How we deliver (Figma 29:108) — navy · dark header with cyan eyebrow ·
 * 4 step cards (white 6 % fill, white 12 % border, radius 16, padding 28 / 24, gap 16):
 * 44 px blue icon badge + ghost "01" Stat/Number at 15 %, H4 white, Body/S white 70 %. 4 → 2 → 1.
 */
export function HowWeDeliver() {
  const t = useStrings(servicesEn, servicesAr);
  const grid = useReveal<HTMLOListElement>();
  return (
    <section className="dark-surface bg-navy text-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
        <SectionHeader tone="dark" eyebrowColor="cyan" eyebrow={t.deliver.eyebrow} title={t.deliver.title} intro={t.deliver.intro} />
        <ol ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.deliver.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? PenLine;
            return (
              <li
                key={step.title}
                className="reveal flex flex-col gap-4 rounded-16 border border-white/12 bg-white/6 px-6 py-7"
                style={{ "--i": i } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-12 bg-brand-blue text-white">
                    <Icon className="size-5" aria-hidden strokeWidth={2} />
                  </span>
                  <span aria-hidden className="stat-number num text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="heading-h4 text-white">{step.title}</h3>
                <p className="body-s text-white/70">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
