import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/data/site";

/**
 * Section / Contact (Figma 24:2) — Riyadh-at-night background with navy → blue-dark overlay ·
 * copy column (header + 3 contact details with 48 px icon badges) · 520 wide form card.
 */
export function Contact() {
  const { s } = useLocale();
  const c = s.home.contact;
  const details = [
    { Icon: Phone, label: c.phoneLabel, value: SITE.phone, href: SITE.phoneHref, ltr: true },
    { Icon: Mail, label: c.emailLabel, value: SITE.email, href: `mailto:${SITE.email}`, ltr: true },
    { Icon: MapPin, label: c.hqLabel, value: c.hq, href: undefined, ltr: false },
  ];
  return (
    <section id="contact" className="dark-surface relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0" aria-hidden>
        <SmartImage name="riyadh-night" width={1440} height={834} alt="" frameClassName="h-full w-full" className="h-full w-full object-cover" />
        <div className="contact-overlay absolute inset-0" />
      </div>
      <div className="container-site section-y relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:gap-16 2xl:gap-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow color="cyan">{c.eyebrow}</Eyebrow>
            <h2 className="heading-h2 text-white">{c.title}</h2>
            <p className="body-l text-white/78">{c.intro}</p>
          </div>
          <ul className="flex flex-col gap-4">
            {details.map(({ Icon, label, value, href, ltr }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-12 border border-white/14 bg-white/8 text-brand-cyan">
                  <Icon className="size-[22px]" aria-hidden strokeWidth={2} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="label-caption text-white/60">{label}</span>
                  {href ? (
                    <a href={href} className={`heading-h5 text-white hover:text-brand-cyan ${ltr ? "num" : ""}`} dir={ltr ? "ltr" : undefined}>
                      {value}
                    </a>
                  ) : (
                    <span className="heading-h5 text-white">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
