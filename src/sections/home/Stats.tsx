import { useLocale } from "@/i18n/LocaleProvider";
import { stats } from "@/data/site";

/**
 * Section / Stats (Figma 12:17) — 205 high, padding 56 / 120 · 4 equal cells with 1 × 64 dividers ·
 * Stat/Number brand/blue + Body/M label, gap 6 · 2 × 2 at 768 · 1-up with dividers below.
 */
export function Stats() {
  const { l } = useLocale();
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="container-site py-6 md:py-10 xl:py-14">
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label.en}
              className={`relative flex flex-col items-center gap-1.5 py-5 text-center md:py-6 lg:py-2 ${
                i > 0 ? "border-t border-neutral-200" : ""
              } ${i >= 2 ? "md:border-t" : "md:border-t-0"} lg:border-t-0`}
            >
              <span
                aria-hidden
                className={`absolute start-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-neutral-200 ${i % 2 === 1 ? "md:block" : ""} ${
                  i > 0 ? "lg:block" : "lg:hidden"
                }`}
              />
              <dt className="body-m order-2 text-neutral-500">{l(stat.label)}</dt>
              <dd className="stat-number num order-1 text-brand-blue">
                {stat.value}
                {stat.suffix && <span className="ms-1 text-[0.5em] font-semibold">{l(stat.suffix)}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
