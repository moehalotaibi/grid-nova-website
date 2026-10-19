import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLocale, type L } from "@/i18n/LocaleProvider";

export type FaqEntry = { q: L | string; a: L | string };

type Props = {
  items: FaqEntry[];
  /** "lg" = Section / FAQ rows (py 22, 32 px toggle) · "md" = detail-page rows (py 18, 30 px toggle) */
  size?: "lg" | "md";
  /** Index opened on mount (Figma draws the first row open); null = all closed. */
  defaultOpen?: number | null;
  className?: string;
};

/**
 * FAQ accordion (Figma 29:158 / 30:279, handoff › 18): the row is the `<button aria-expanded>`,
 * the panel animates with grid-template-rows 0fr → 1fr (.accordion-panel), the toggle is a
 * blue minus when open and a neutral/100 plus when closed. One row open at a time.
 */
export function FaqAccordion({ items, size = "lg", defaultOpen = 0, className = "" }: Props) {
  const { l } = useLocale();
  const id = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const lg = size === "lg";
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;
        const buttonId = `${id}-button-${i}`;
        return (
          <li key={l(item.q)} className={`border-b border-neutral-200 ${lg ? "py-[22px]" : "py-[18px]"}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                data-analytics="faq_toggle"
                className="group flex w-full items-center justify-between gap-4 text-start"
              >
                <span className="heading-h5 text-neutral-900">{l(item.q)}</span>
                <span
                  aria-hidden
                  className={`inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-[var(--dur-micro)] ${
                    lg ? "size-8" : "size-[30px]"
                  } ${isOpen ? "bg-brand-blue text-white" : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200"}`}
                >
                  {isOpen ? (
                    <Minus className={lg ? "size-4" : "size-[15px]"} strokeWidth={1.75} />
                  ) : (
                    <Plus className={lg ? "size-4" : "size-[15px]"} strokeWidth={1.75} />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              data-open={isOpen ? "true" : "false"}
              inert={!isOpen || undefined}
            >
              <div>
                <p className={`body-m text-neutral-700 ${lg ? "pt-3" : "pt-2.5"}`}>{l(item.a)}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
