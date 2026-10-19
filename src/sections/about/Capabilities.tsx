import { Search, Zap } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

const FEATURE_ICONS = [Search, Zap];

/**
 * Section / Capabilities (Figma 37:840) — navy · copy column (cyan eyebrow, H2 max 520, two features with
 * 44 px white/8 icon badges, H5 + Body/M 70 %) · 520-wide stack of capability bars: Label/Nav + cyan percentage,
 * 8 px track white/12, blue → cyan fill (mirrored in RTL). Fills grow from 0 as the list enters the viewport;
 * columns stack below 1024.
 */
export function Capabilities() {
  const { capabilities: t } = useStrings(aboutEn, aboutAr);
  const bars = useReveal<HTMLUListElement>();
  return (
    <section className="dark-surface bg-navy text-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-16 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-24">
        <div className="flex flex-col gap-6">
          <Eyebrow color="cyan">{t.eyebrow}</Eyebrow>
          <h2 className="heading-h2 max-w-[520px] text-white">{t.title}</h2>
          <ul className="flex flex-col gap-6">
            {t.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i] ?? Search;
              return (
                <li key={feature.title} className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-12 bg-white/8 text-brand-cyan">
                    <Icon className="size-5" aria-hidden strokeWidth={2} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="heading-h5 text-white">{feature.title}</h3>
                    <p className="body-m text-white/70">{feature.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <ul ref={bars} className="flex flex-col gap-[22px]">
          {t.bars.map((bar, i) => (
            <li key={bar.label} className="reveal flex flex-col gap-2.5" style={{ "--i": i } as React.CSSProperties}>
              <div className="label-nav flex items-center justify-between gap-4">
                <span className="text-white">{bar.label}</span>
                <span className="num text-brand-cyan">{bar.value}%</span>
              </div>
              <div
                role="meter"
                aria-label={bar.label}
                aria-valuenow={bar.value}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 w-full overflow-hidden rounded-[4px] bg-white/12"
              >
                <div
                  className="h-full w-0 rounded-[4px] bg-gradient-to-r from-brand-blue to-brand-cyan transition-[width] duration-700 ease-[var(--ease-standard)] motion-reduce:transition-none rtl:bg-gradient-to-l [.is-visible_&]:w-[var(--w)]"
                  style={{ "--w": `${bar.value}%` } as React.CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
