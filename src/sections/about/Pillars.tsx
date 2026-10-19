import { Award, Lightbulb, ShieldCheck } from "lucide-react";
import { useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

const ICONS = [
  { Icon: ShieldCheck, badge: "bg-tint-blue-50 text-brand-blue" },
  { Icon: Lightbulb, badge: "bg-tint-green-50 text-brand-green-dark" },
  { Icon: Award, badge: "bg-tint-cyan-50 text-brand-cyan-dark" },
];

/**
 * Section / Pillars (Figma 37:792) — neutral/50 · green eyebrow + H2 (max 760) ·
 * three white cards: 1 px neutral/200, radius 20, padding 28, 52 px tinted icon badge, H4, Body/M. 3 → 2 → 1 columns.
 */
export function Pillars() {
  const { pillars: t } = useStrings(aboutEn, aboutAr);
  const grid = useReveal<HTMLDivElement>();
  return (
    <section className="bg-neutral-50">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
        <SectionHeader eyebrow={t.eyebrow} eyebrowColor="green" title={t.title} />
        <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const { Icon, badge } = ICONS[i] ?? ICONS[0];
            return (
              <article
                key={item.title}
                className="reveal flex flex-col gap-3.5 rounded-20 border border-neutral-200 bg-white p-6 md:p-7"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={`inline-flex size-[52px] items-center justify-center rounded-[14px] ${badge}`}>
                  <Icon className="size-6" aria-hidden strokeWidth={2} />
                </span>
                <h3 className="heading-h4 text-neutral-900">{item.title}</h3>
                <p className="body-m text-neutral-500">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
