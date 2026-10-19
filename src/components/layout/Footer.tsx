import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SITE } from "@/data/site";

/**
 * Footer (Design System › 09, handoff › 18): navy-deep · padding 80 top / 32 bottom / 120 sides ·
 * columns 260 / fill / fill / 220 / 260, gap 40 · stack gap 48 · legal row Body/S white 60 %.
 * 768–1023: 2 columns · < 768: 1 column.
 */
export function Footer() {
  const { s, path, isAr, togglePath } = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const col = "flex flex-col gap-3.5";
  const link = "body-s text-white/85 transition-colors hover:text-white";

  return (
    <footer className="dark-surface bg-navy-deep text-white">
      <div className="container-site flex flex-col gap-10 pt-16 pb-8 md:gap-12 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[260px_1fr_1fr_220px] xl:grid-cols-[260px_1fr_1fr_220px_260px]">
          {/* Brand */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
            <Link to={path("/")} className="inline-block w-fit rounded-6" aria-label={`${s.meta.siteName} — ${s.nav.home}`}>
              <img
                src="/images/logo-stacked.webp"
                srcSet="/images/logo-stacked.webp 1x, /images/logo-stacked@2x.webp 2x"
                alt={s.meta.siteName}
                width={170}
                height={120}
                loading="lazy"
                className="h-[120px] w-[170px] object-contain"
              />
            </Link>
            <p className="body-s max-w-[260px] text-white/70">{s.footer.blurb}</p>
            <ul className="flex gap-2.5">
              {(["x", "linkedin", "instagram"] as const)
                .filter((name) => SITE.social[name])
                .map((name) => (
                <li key={name}>
                  <a
                    href={SITE.social[name]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.footer.social[name]}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/16"
                  >
                    <SocialIcon name={name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <nav aria-label={s.footer.company} className={col}>
            <Eyebrow color="cyan">{s.footer.company}</Eyebrow>
            <Link to={path("/")} className={link}>{s.footer.links.home}</Link>
            <Link to={path("/about")} className={link}>{s.footer.links.about}</Link>
            <Link to={path("/projects")} className={link}>{s.footer.links.projects}</Link>
            <Link to={path("/news")} className={link}>{s.footer.links.news}</Link>
            <Link to={path("/careers")} className={link}>{s.footer.links.careers}</Link>
            <Link to={path("/about#board")} className={link}>{s.footer.links.board}</Link>
            <Link to={path("/faq")} className={link}>{s.footer.links.faqs}</Link>
          </nav>

          {/* Services */}
          <nav aria-label={s.footer.services} className={col}>
            <Eyebrow color="cyan">{s.footer.services}</Eyebrow>
            <Link to={path("/services/manufacturing")} className={link}>{s.footer.serviceLinks.manufacturing}</Link>
            <Link to={path("/services/energy-generation")} className={link}>{s.footer.serviceLinks.energy}</Link>
            <Link to={path("/services/construction")} className={link}>{s.footer.serviceLinks.construction}</Link>
            <Link to={path("/services/commissioning-testing")} className={link}>{s.footer.serviceLinks.commissioning}</Link>
          </nav>

          {/* Headquarters */}
          <address className={`${col} not-italic`}>
            <Eyebrow color="cyan">{s.footer.headquarters}</Eyebrow>
            <p className="body-s text-white/85">
              {s.footer.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a href={SITE.phoneHref} className={`${link} num`} dir="ltr">
              {s.footer.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className={link} dir="ltr">
              {s.footer.email}
            </a>
          </address>

          {/* Newsletter */}
          <div className={`${col} md:col-span-2 lg:col-span-4 xl:col-span-1`}>
            <Eyebrow color="cyan">{s.footer.newsletter}</Eyebrow>
            <p className="body-s max-w-[260px] text-white/70">{s.footer.newsletterBlurb}</p>
            {subscribed ? (
              <p role="status" className="body-s text-brand-cyan">
                {s.footer.subscribed}
              </p>
            ) : (
              <form className="flex w-full max-w-[360px] gap-2" onSubmit={onSubscribe}>
                <label htmlFor="footer-email" className="sr-only">
                  {s.footer.emailPlaceholder}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={s.footer.emailPlaceholder}
                  className="body-s h-12 min-w-0 flex-1 rounded-10 border border-white/16 bg-white/8 px-3.5 text-white placeholder:text-white/55 focus:border-brand-cyan focus:outline-none"
                />
                <Button type="submit" className="shrink-0 !px-[18px] max-xs:!w-auto">
                  {s.footer.subscribe}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-white/12" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="body-s text-white/55">{s.footer.copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link to={path("/privacy")} className="body-s text-white/70 hover:text-white">
                {s.footer.privacy}
              </Link>
            </li>
            <li>
              <Link to={path("/terms")} className="body-s text-white/70 hover:text-white">
                {s.footer.terms}
              </Link>
            </li>
            <li>
              <Link to={path("/cookies")} className="body-s text-white/70 hover:text-white">
                {s.footer.cookies}
              </Link>
            </li>
            <li>
              <Link
                to={togglePath}
                hrefLang={isAr ? "en" : "ar"}
                lang={isAr ? "en" : "ar"}
                aria-label={s.nav.languageAria}
                className={`flex items-center gap-1.5 text-[14px] leading-6 text-white/85 hover:text-white ${isAr ? "font-latin" : "font-arabic"}`}
              >
                <Globe className="size-[15px]" aria-hidden />
                {s.nav.language}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
