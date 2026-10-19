import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

/** Section / Services (Figma 14:2) — neutral/50 · header with aside copy + outline button · 4-up cards (3 → 2 → 1). */
export function Services() {
  const { s } = useLocale();
  const grid = useReveal<HTMLDivElement>();
  return (
    <section className="bg-neutral-50">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
        <SectionHeader
          eyebrow={s.home.services.eyebrow}
          title={s.home.services.title}
          intro={s.home.services.intro}
          introInAside
          aside={
            <Button to="/services" variant="outlineDark" icon={<ArrowRight />} data-analytics="cta_click:services">
              {s.home.services.all}
            </Button>
          }
        />
        <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} className="reveal" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
