import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { SITE } from "@/data/site";

/** An internal route (`to`) or an external / file link (`href`) — one of the two is required. */
export type CtaAction = { label: string; to: string; href?: undefined } | { label: string; href: string; to?: undefined };

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  /** Defaults to "Get in touch" → /contact */
  primary?: CtaAction;
  /** Defaults to "Download company profile" → the PDF; `null` hides the second button */
  secondary?: CtaAction | null;
  className?: string;
};

/**
 * Section / CTA band (Figma 29:196): blue-dark → blue gradient, padding 80 / 120,
 * H2 + Body/L (max 640) on the start side, primary + outline-light buttons on the end side.
 */
export function CtaBand({ title, intro, primary, secondary, className = "" }: Props) {
  const { s } = useLocale();
  const p: CtaAction = primary ?? { label: s.nav.cta, to: "/contact" };
  const sec: CtaAction | null = secondary === null ? null : (secondary ?? { label: s.cta.downloadProfile, href: SITE.profilePdf });
  return (
    <section className={`dark-surface cta-gradient text-white ${className}`}>
      <div className="container-site flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-20">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h2 className="heading-h2 text-white">{title}</h2>
          {intro && <p className="body-l text-white/80">{intro}</p>}
        </div>
        <div className="flex shrink-0 flex-col gap-3 xs:flex-row xs:flex-wrap">
          {p.to !== undefined ? (
            <Button to={p.to} icon={<ArrowRight />} data-analytics="cta_click:cta-band">
              {p.label}
            </Button>
          ) : (
            <Button href={p.href} icon={<ArrowRight />} data-analytics="cta_click:cta-band">
              {p.label}
            </Button>
          )}
          {sec &&
            (sec.to !== undefined ? (
              <Button to={sec.to} variant="outlineLight" className="bg-white/10">
                {sec.label}
              </Button>
            ) : (
              <Button href={sec.href} variant="outlineLight" className="bg-white/10" target="_blank" rel="noreferrer">
                {sec.label}
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
}
