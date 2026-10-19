import { Clock, Heart, Target } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CARD_ICONS = [
  { Icon: Target, badge: "bg-tint-blue-50 text-brand-blue" },
  { Icon: Heart, badge: "bg-tint-green-50 text-brand-green-dark" },
  { Icon: Clock, badge: "bg-tint-cyan-50 text-brand-cyan-dark" },
];

/** Section / Who we are (Figma 31:251) — header with aside intro · 3 tinted-icon cards on neutral/50, radius 20, padding 28. */
export function WhoWeAre() {
  const { s } = useLocale();
  const grid = useReveal<HTMLDivElement>();
  const w = s.home.who;
  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-12">
        <SectionHeader eyebrow={w.eyebrow} title={w.title} intro={w.intro} introInAside />
        <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {w.cards.map((card, i) => {
            const { Icon, badge } = CARD_ICONS[i] ?? CARD_ICONS[0];
            return (
              <article
                key={card.title}
                className="reveal flex flex-col gap-4 rounded-20 border border-neutral-200 bg-neutral-50 p-6 md:p-7"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={`inline-flex size-[52px] items-center justify-center rounded-[14px] ${badge}`}>
                  <Icon className="size-6" aria-hidden strokeWidth={2} />
                </span>
                <h3 className="heading-h4 text-neutral-900">{card.title}</h3>
                <p className="body-m text-neutral-700">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
