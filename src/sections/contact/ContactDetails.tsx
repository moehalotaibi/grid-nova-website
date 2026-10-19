import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/data/site";
import { contactEn, contactAr } from "@/i18n/pages/contact";

type Detail = { Icon: typeof Phone; label: string; lines: string[]; href?: string };

/**
 * Section / Contact (Figma 38:1066): "Contact details" + 2 × 2 detail cards (neutral/50, border neutral/200,
 * radius 16, 44 px tint/blue-50 icon tile) and a LinkedIn note on the start side; the shared contact form card
 * (560 wide, message 140 high) on the end side. Form goes full width below 1024 (board 20).
 */
export function ContactDetails({ initialService }: { initialService?: string }) {
  const { s, l } = useLocale();
  const t = useStrings(contactEn, contactAr);
  const c = s.home.contact;
  const [street, city, country] = s.footer.address;
  const details: Detail[] = [
    { Icon: Phone, label: c.phoneLabel, lines: [SITE.phone], href: SITE.phoneHref },
    { Icon: Mail, label: c.emailLabel, lines: [SITE.email], href: `mailto:${SITE.email}` },
    { Icon: MapPin, label: c.hqLabel, lines: [street, `${city}, ${country}`] },
    { Icon: Clock, label: t.details.hoursLabel, lines: [t.details.hoursDays, t.details.hoursTime] },
    // Branch offices from the previous website (same switchboard number)
    ...SITE.branches.map((b) => ({ Icon: Building2, label: l(b.name), lines: [l(b.address)] })),
  ];

  return (
    <section className="bg-white">
      <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="heading-h3 text-neutral-900">{t.details.title}</h2>
          <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2">
            {details.map(({ Icon, label, lines, href }) => (
              <li key={label} className="flex flex-col gap-3 rounded-16 border border-neutral-200 bg-neutral-50 p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-12 bg-tint-blue-50 text-brand-blue">
                  <Icon className="size-5" aria-hidden strokeWidth={2} />
                </span>
                <span className="label-caption text-neutral-500">{label}</span>
                {href ? (
                  <a href={href} dir="ltr" className="heading-h5 num self-start text-neutral-900 transition-colors hover:text-brand-blue">
                    {lines[0]}
                  </a>
                ) : (
                  <p className="heading-h5 text-neutral-900">
                    {lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="body-m text-neutral-500">
            {t.details.linkedinLead}{" "}
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="text-brand-blue underline-offset-4 hover:underline">
              {t.details.linkedinLink}
            </a>{" "}
            {t.details.linkedinTail}
          </p>
        </div>
        {/* `initialService` (/contact?service=<slug> from the service pages) is forwarded via the spread so the form
            picks it up once ContactForm gains the optional `initialService` prop; the key remounts it when the param changes. */}
        <ContactForm
          key={initialService ?? "default"}
          messageHeight={140}
          className="border border-neutral-200 !shadow-[0_16px_40px_-8px_rgba(5,20,38,0.1)]"
          {...(initialService ? { initialService } : {})}
        />
      </div>
    </section>
  );
}
