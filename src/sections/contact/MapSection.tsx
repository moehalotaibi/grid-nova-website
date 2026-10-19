import { MapPin } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { contactEn, contactAr } from "@/i18n/pages/contact";
import mapPlaceholder from "@/assets/contact/map-placeholder.svg";

const place = encodeURIComponent(SITE.address);
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${place}`;

/**
 * Section / Map (Figma 38:1131): full-width 420 px Google Maps embed of the HQ (no API key) over the design's
 * map-tile placeholder while it loads · white location card (radius 14, green pin tile, "Get directions")
 * floating at the bottom-start corner; the card sits under the map below 768.
 */
export function MapSection() {
  const { lang } = useLocale();
  const t = useStrings(contactEn, contactAr);
  const embed = `https://www.google.com/maps?q=${place}&hl=${lang}&z=15&output=embed`;

  return (
    <section className="bg-neutral-100">
      <div className="relative">
        <div
          className="h-[320px] md:h-[420px]"
          style={{ backgroundImage: `url(${mapPlaceholder})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <iframe
            title={t.map.frameTitle}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-full w-full border-0"
          />
        </div>
        <div className="container-site relative -mt-10 pb-6 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-7 md:mt-0 md:pb-0">
          <div className="pointer-events-auto flex max-w-[600px] flex-col gap-4 rounded-[14px] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center sm:gap-3.5 sm:py-4 sm:pe-6 sm:ps-5">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
              <MapPin className="size-5" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h2 className="heading-h5 text-neutral-900">{t.map.title}</h2>
              <p className="body-s text-neutral-500">{t.map.address}</p>
            </div>
            <Button variant="blue" href={DIRECTIONS} target="_blank" rel="noreferrer" className="shrink-0" data-analytics="cta_click:directions">
              {t.map.directions}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
