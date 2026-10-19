import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { partners } from "@/data/partners";

/**
 * Section / Clients & partners (Figma 23:2) — stripe 105 high, padding 28 · label + 1 × 36 divider + track ·
 * track gap 72, slot 48, logos 26–46 high monochrome · 40 s linear loop · pauses on hover / focus-within /
 * control · edge fade 120 · static under reduced motion. Fewer than 4 logos → static centred row (board 20).
 *
 * The track is two identical halves and the animation translates it by −50 %, so the loop is seamless.
 * Each half repeats the logo set as many times as needed to cover the viewport width (measured with a
 * ResizeObserver), which keeps the stripe full on very wide screens.
 */
export function PartnerMarquee() {
  const { s } = useLocale();
  const [paused, setPaused] = useState(false);
  const [reps, setReps] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLUListElement>(null);
  const animate = partners.length >= 4;

  useEffect(() => {
    if (!animate) return;
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet || typeof ResizeObserver === "undefined") return;
    const update = () => {
      const setWidth = firstSet.getBoundingClientRect().width;
      const viewWidth = viewport.clientWidth;
      if (setWidth > 0 && viewWidth > 0) setReps(Math.max(1, Math.ceil(viewWidth / setWidth)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    ro.observe(firstSet);
    return () => ro.disconnect();
  }, [animate]);

  const copies = animate ? reps * 2 : 1;

  return (
    <section aria-label={`${s.home.partners.eyebrow} ${s.home.partners.title}`} className="border-b border-neutral-200 bg-white">
      <div
        className="marquee relative flex items-center gap-6 py-6 ps-4 md:gap-12 md:py-7 md:ps-8 lg:ps-16 xl:ps-[120px]"
        data-paused={paused ? "true" : "false"}
      >
        <div className="flex shrink-0 flex-col gap-0.5 md:w-[190px]">
          <p className="label-eyebrow text-neutral-500">{s.home.partners.eyebrow}</p>
          <p className="heading-h5 text-neutral-900">{s.home.partners.title}</p>
        </div>
        <div aria-hidden className="h-9 w-px shrink-0 bg-neutral-200" />

        <div ref={viewportRef} className="relative min-w-0 flex-1 overflow-hidden">
          <div className={`flex w-max ${animate ? "marquee-track" : "mx-auto"}`}>
            {Array.from({ length: copies }, (_, c) => (
              <ul
                key={c}
                ref={c === 0 ? firstSetRef : undefined}
                aria-hidden={c > 0 || undefined}
                className={`flex shrink-0 items-center gap-10 pe-10 md:gap-[72px] md:pe-[72px] ${c > 0 ? "motion-reduce:hidden" : ""}`}
              >
                {partners.map((p) => (
                  <li key={p.id} className="flex h-12 shrink-0 items-center justify-center">
                    <img
                      src={p.src}
                      srcSet={p.srcSet}
                      alt={c === 0 ? p.name : ""}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      style={{ "--logo-h": `${p.height}px` } as CSSProperties}
                      className="h-[var(--logo-h)] w-auto opacity-75 grayscale max-xs:h-6"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div aria-hidden className="edge-fade-end pointer-events-none absolute inset-y-0 end-0 w-[72px] md:w-[120px]" />
        </div>

        {animate && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? s.home.partners.play : s.home.partners.pause}
            data-analytics="marquee_pause"
            className="absolute end-3 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:text-neutral-900 motion-reduce:hidden md:end-6"
          >
            {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
          </button>
        )}
      </div>
    </section>
  );
}
