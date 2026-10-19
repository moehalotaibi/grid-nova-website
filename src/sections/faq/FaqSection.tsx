import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronRight, CircleQuestionMark, Minus, Plus } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { faqCategories, type FaqCategory } from "@/data/faq";
import { SITE } from "@/data/site";
import { faqEn, faqAr } from "@/i18n/pages/faq";

/** Group headings are jump targets: clear the fixed navigation. */
const ANCHOR = "scroll-mt-[calc(var(--nav-height)+24px)]";
const groupId = (id: string) => `faq-${id}`;

/**
 * One category (Figma 39:1321): H3 title + accordion rows. Row = <button aria-expanded aria-controls>,
 * 30 px plus/minus disc (neutral/100 → brand/blue), panel via .accordion-panel grid-rows 0fr → 1fr, 250 ms.
 */
function FaqGroup({ category, openId, onToggle }: { category: FaqCategory; openId: string | null; onToggle: (id: string) => void }) {
  const { l } = useLocale();
  const base = useId();
  return (
    <section id={groupId(category.id)} aria-labelledby={`${base}-title`} className={`${ANCHOR} flex flex-col gap-2`}>
      <h2 id={`${base}-title`} className="heading-h3 text-neutral-900">
        {l(category.title)}
      </h2>
      <ul>
        {category.items.map((item) => {
          const open = openId === item.id;
          const buttonId = `${base}-${item.id}-button`;
          const panelId = `${base}-${item.id}-panel`;
          return (
            <li key={item.id} className="border-b border-neutral-200">
              <h3 className="heading-h5 text-neutral-900">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => onToggle(item.id)}
                  data-analytics="faq_toggle"
                  className={`flex w-full items-center justify-between gap-6 pt-5 text-start transition-[padding,color] duration-[250ms] ease-[var(--ease-standard)] hover:text-brand-blue ${
                    open ? "pb-2.5" : "pb-5"
                  }`}
                >
                  <span>{l(item.q)}</span>
                  <span
                    aria-hidden
                    className={`inline-flex size-[30px] shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-[250ms] ease-[var(--ease-standard)] ${
                      open ? "rotate-180 bg-brand-blue text-white" : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {open ? <Minus className="size-[15px]" /> : <Plus className="size-[15px]" />}
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open} className="accordion-panel" data-open={open ? "true" : "false"}>
                <div>
                  <p className="body-m pb-5 text-neutral-700">{l(item.a)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * Section / FAQ (Figma 39:1298): category jump-nav (300 wide, sticky, end side; a scrollable chip row below 1024)
 * + every group as an accordion list (one row open at a time) + the tint/blue-50 "Still have questions?" card.
 */
export function FaqSection() {
  const { s, l } = useLocale();
  const t = useStrings(faqEn, faqAr);
  const [openId, setOpenId] = useState<string | null>(faqCategories[0]?.items[0]?.id ?? null);
  const [active, setActive] = useState(faqCategories[0]?.id ?? "");
  const lockUntil = useRef(0);

  // Highlight the category whose group sits in the upper part of the viewport (20–35 %).
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace(/^faq-/, ""));
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    faqCategories.forEach((c) => {
      const el = document.getElementById(groupId(c.id));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => {
    lockUntil.current = Date.now() + 1000;
    setActive(id);
  };

  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <nav aria-label={t.nav.label} className="lg:sticky lg:top-[calc(var(--nav-height)+24px)] lg:order-last lg:w-[300px] lg:shrink-0">
          <ul className="flex gap-1 overflow-x-auto rounded-16 border border-neutral-200 bg-neutral-50 p-2 lg:flex-col lg:overflow-visible">
            {faqCategories.map((category) => {
              const isActive = active === category.id;
              return (
                <li key={category.id} className="shrink-0 lg:w-full">
                  <a
                    href={`#${groupId(category.id)}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => jump(category.id)}
                    className={`label-nav flex items-center justify-between gap-3 whitespace-nowrap rounded-10 px-4 py-[13px] transition-colors duration-[var(--dur-micro)] ${
                      isActive ? "bg-brand-blue text-white" : "text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    {l(category.title)}
                    <ChevronRight className={`rtl-flip size-4 shrink-0 ${isActive ? "text-white" : "text-neutral-500"}`} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          {faqCategories.map((category) => (
            <FaqGroup key={category.id} category={category} openId={openId} onToggle={(id) => setOpenId((cur) => (cur === id ? null : id))} />
          ))}

          <div className="flex flex-col gap-5 rounded-16 bg-tint-blue-50 p-6 md:flex-row md:items-center md:justify-between md:px-7">
            <div className="flex items-center gap-4">
              <CircleQuestionMark className="size-7 shrink-0 text-brand-blue" aria-hidden strokeWidth={1.75} />
              <div className="flex flex-col gap-0.5">
                <h2 className="heading-h4 text-neutral-900">{t.help.title}</h2>
                <p className="body-m text-neutral-700">
                  {t.help.callPrefix}{" "}
                  <a href={SITE.phoneHref} dir="ltr" className="num text-brand-blue underline-offset-4 hover:underline">
                    {SITE.phone}
                  </a>{" "}
                  {t.help.callSuffix}
                </p>
              </div>
            </div>
            <Button to="/contact" variant="blue" icon={<ArrowRight />} className="shrink-0 self-start md:self-auto" data-analytics="cta_click:faq-help">
              {s.nav.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
