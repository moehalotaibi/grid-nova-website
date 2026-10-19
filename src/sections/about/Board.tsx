import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { board } from "@/data/team";
import { aboutEn, aboutAr } from "@/i18n/pages/about";

/** "Eng. Mutlaq Alotaibi" → "MA": skips honorifics (words ending in a full stop), first letter of the next two words. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => word && !/\.$/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Section / Board of directors (Figma 37:884) — header with the intro in the end-aligned aside (420) ·
 * three director cards (384): white, 1 px neutral/200, radius 20, portrait 420 high, name H4 + role Body/S,
 * 40 px LinkedIn chip on tint/blue-50. chairman first, CEO anchored as #ceo. `#board` is the footer target and `#ceo` the homepage
 * "Read the full message" target — both clear the fixed nav. No portrait → initials avatar on navy (board 20).
 * 3 → 2 → 1 columns.
 */
export function Board() {
  const { l } = useLocale();
  const { board: t } = useStrings(aboutEn, aboutAr);
  const grid = useReveal<HTMLUListElement>();
  return (
    <section id="board" className="scroll-mt-[var(--nav-height)] bg-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-12">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} introInAside />
        <ul ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {board.map((member, i) => {
            const name = l(member.name);
            return (
              <li key={member.id} id={member.anchor} className="reveal scroll-mt-[var(--nav-height)]" style={{ "--i": i } as React.CSSProperties}>
                <figure className="flex h-full flex-col overflow-hidden rounded-20 border border-neutral-200 bg-white">
                  {member.image ? (
                    <SmartImage
                      name={member.image}
                      width={440}
                      height={520}
                      alt={member.imageAlt}
                      frameClassName="aspect-[382/420] w-full"
                      className="object-top"
                    />
                  ) : (
                    <div role="img" aria-label={name} className="flex aspect-[382/420] w-full items-center justify-center bg-navy">
                      <span aria-hidden className="display-hero text-white/90">
                        {initials(name)}
                      </span>
                    </div>
                  )}
                  <figcaption className="flex items-center justify-between gap-4 px-6 pt-5 pb-6">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="heading-h4 text-neutral-900">{name}</h3>
                      <p className="body-s text-neutral-500">{l(member.role)}</p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t.linkedin(name)}
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-tint-blue-50 text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                      >
                        <SocialIcon name="linkedin" width={18} height={18} />
                      </a>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
