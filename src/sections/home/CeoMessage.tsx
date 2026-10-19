import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SITE } from "@/data/site";
import quoteMark from "@/assets/decor/quote-mark.svg";

/**
 * Section / Message from the CEO (Figma 31:279) — navy surface with a decorative blue glow ·
 * portrait 440 × 520 (name set on the overlay, green offset frame) · quote column, gap 20, Quote/L.
 * 768–1023: portrait above the quote (board 20).
 */
export function CeoMessage() {
  const { s, path } = useLocale();
  const c = s.home.ceo;
  return (
    <section id="ceo" className="dark-surface relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-[46%] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(26,104,175,0.35)_0%,rgba(26,104,175,0)_70%)]"
      />
      <div className="container-site section-y relative grid gap-14 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-24">
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
          <div aria-hidden className="absolute start-5 top-5 h-full w-full rounded-24 border-2 border-brand-green" />
          <figure className="relative aspect-[440/520] overflow-hidden rounded-24 shadow-hero-card">
            <SmartImage name="ceo-mutlaq-alotaibi" width={440} height={520} alt={c.portraitAlt} frameClassName="absolute inset-0 h-full w-full" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-navy-deep/92" />
            <figcaption className="absolute bottom-7 start-7 flex items-center gap-3.5">
              <span aria-hidden className="h-11 w-1 rounded-sm bg-brand-green" />
              <div className="flex flex-col gap-0.5">
                <p className="heading-h4 text-white">{c.name}</p>
                <p className="body-s text-brand-cyan">{c.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <blockquote className="flex flex-col gap-5">
          <img src={quoteMark} alt="" aria-hidden width={56} height={56} className="size-14" />
          <Eyebrow color="cyan">{c.eyebrow}</Eyebrow>
          <p className="quote-l text-white">{c.quote}</p>
          <footer className="flex flex-wrap items-center gap-4 pt-3">
            <span aria-hidden className="h-0.5 w-14 bg-brand-green" />
            <Link to={path("/about#ceo")} className="label-button inline-flex items-center gap-2 text-brand-cyan transition-colors hover:text-white">
              {c.read}
              <ArrowRight className="rtl-flip size-[18px]" aria-hidden />
            </Link>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={c.linkedin}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/16"
            >
              <SocialIcon name="linkedin" width={16} height={16} />
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
