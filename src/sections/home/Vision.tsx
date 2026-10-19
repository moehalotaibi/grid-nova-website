import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import cursor from "@/assets/decor/cursor.svg";

type Card = { image: string; border: string; chip: string; rotate: string; left: string; top: string; chipLeft: string; chipTop: string };

/* Stage 1200 × 480 at 1440 (Figma 26:7): cards 340 × 420 at x 53 / 430 / 770, rotated 5° / 0 / −5°. */
const CARDS: Card[] = [
  { image: "vision-engineering", border: "border-brand-blue", chip: "bg-brand-blue", rotate: "rotate-[5deg]", left: "5.9%", top: "8.3%", chipLeft: "20.8%", chipTop: "68.7%" },
  { image: "vision-energy-generation", border: "border-brand-green", chip: "bg-brand-green-dark", rotate: "", left: "35.8%", top: "0%", chipLeft: "50%", chipTop: "62.5%" },
  { image: "vision-construction", border: "border-brand-cyan", chip: "bg-brand-cyan", rotate: "-rotate-[5deg]", left: "65.6%", top: "2.2%", chipLeft: "75%", chipTop: "23%" },
];

/**
 * Section / Vision 2030 band (Figma 26:2) — centred header · stage with three tilted photo cards that
 * float in with a 100 ms stagger · cursor chips drift toward the pointer (60 ms lag) and loop ±8 px;
 * chips are hidden under (hover: none) and below 768 the cards simply stack (board 19/20).
 */
export function Vision() {
  const { s } = useLocale();
  const v = s.home.vision;
  const stage = useReveal<HTMLDivElement>();
  const stack = useReveal<HTMLUListElement>();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    setPointer({ x: ((e.clientX - r.left) / r.width - 0.5) * 24, y: ((e.clientY - r.top) / r.height - 0.5) * 24 });
  };

  return (
    <section className="bg-neutral-50">
      <div className="container-site flex flex-col gap-10 pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 xl:gap-14 xl:pt-[112px] xl:pb-24">
        <SectionHeader align="center" eyebrowColor="green" eyebrow={v.eyebrow} title={v.title} intro={v.intro} />

        {/* ≥ 768: tilted stage */}
        <div
          ref={(el) => {
            stageRef.current = el;
            (stage as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }}
          onPointerMove={onMove}
          onPointerLeave={() => setPointer({ x: 0, y: 0 })}
          className="relative mx-auto hidden w-full max-w-[1200px] md:block"
          style={{ aspectRatio: "1200 / 480" }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.image}
              className="reveal absolute w-[28.33%]"
              style={{ insetInlineStart: card.left, top: card.top, "--i": i } as CSSProperties}
            >
              <div className={`relative aspect-[340/420] overflow-hidden rounded-24 border-4 ${card.border} shadow-[0_24px_48px_-8px_rgba(8,20,36,0.22)] ${card.rotate}`}>
                <SmartImage name={card.image} width={340} height={420} alt={v.cards[i]?.alt ?? ""} frameClassName="absolute inset-0 h-full w-full" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/45" />
              </div>
            </div>
          ))}
          {CARDS.map((card, i) => (
            <div
              key={`${card.image}-chip`}
              aria-hidden
              className="pointer-events-none absolute hidden transition-transform duration-200 ease-out pointer-fine:block"
              style={{ insetInlineStart: card.chipLeft, top: card.chipTop, transform: `translate(${pointer.x}px, ${pointer.y}px)` }}
            >
              <div className="flex flex-col items-start motion-safe:animate-drift" style={{ animationDelay: `${i * 1.3}s` }}>
                <img src={cursor} alt="" width={22} height={22} className="-mb-1 size-[22px]" />
                <span className={`label-button rounded-full px-3 py-1.5 text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] ${card.chip}`}>{v.cards[i]?.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* < 768: stacked cards with their labels */}
        <ul ref={stack} className="flex flex-col gap-5 md:hidden">
          {CARDS.map((card, i) => (
            <li key={card.image} className="reveal" style={{ "--i": i } as CSSProperties}>
              <div className={`relative aspect-[340/240] overflow-hidden rounded-20 border-4 ${card.border}`}>
                <SmartImage name={card.image} width={340} height={420} alt={v.cards[i]?.alt ?? ""} frameClassName="absolute inset-0 h-full w-full" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/45" />
                <span className={`label-button absolute bottom-4 start-4 rounded-full px-3 py-1.5 text-white ${card.chip}`}>{v.cards[i]?.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
