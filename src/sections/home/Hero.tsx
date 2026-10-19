import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { featuredProject } from "@/data/projects";

/** Supply the loop here (MP4 H.264, 1440 × 824, ≤ 6 MB, 8–12 s, no audio — handoff › board 21). */
const HERO_VIDEO_SRC = "/videos/hero-highvoltage-dusk.mp4";

type VideoState = "idle" | "ready" | "failed";

/**
 * Section / Hero (Figma 11:2) — 824 high incl. nav · content padding 88 / 104 · copy column 700, gap 28
 * · featured card 372, padding 28, radius 20 · pause control pill 32 from the bottom.
 * Video is deferred until the page is interactive, skipped on Save-Data / slow connections and
 * under reduced motion (poster + Play control instead). If it fails the poster stays and the control hides.
 */
export function Hero() {
  const { s, l, path, isAr } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const project = featuredProject;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|[^3-9])2g$/.test(nav.connection?.effectiveType ?? "");
    if (slow) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const schedule = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb) : window.setTimeout(cb, 1200));
    schedule(() => {
      video.src = HERO_VIDEO_SRC;
      video.load();
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoState !== "ready") return;
    if (reducedMotion) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [videoState, reducedMotion]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="dark-surface relative overflow-hidden bg-navy-deep text-white">
      {/* Background: poster frame (LCP) → looping video crossfades in */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/hero-highvoltage-dusk.webp"
          srcSet="/images/hero-highvoltage-dusk.webp 1440w, /images/hero-highvoltage-dusk@2x.webp 2880w"
          sizes="100vw"
          width={1440}
          height={824}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hero-highvoltage-dusk.webp"
          onCanPlay={() => setVideoState("ready")}
          onError={() => setVideoState("failed")}
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--dur-enter)] ${
            videoState === "ready" && playing ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-navy-deep/42" />
        <div className="hero-overlay-side absolute inset-0" />
        <div className="hero-overlay-bottom absolute inset-0" />
      </div>

      <div className="container-site relative flex flex-col gap-12 pt-[calc(var(--nav-height)+64px)] pb-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pt-[calc(var(--nav-height)+128px)] lg:pb-[112px] xl:pt-[calc(var(--nav-height)+144px)] xl:pb-[120px]">
        {/* Copy */}
        <div className="flex w-full max-w-[700px] flex-col gap-7 lg:w-[60%] xl:w-[700px]">
          <h1 className="display-hero text-white">
            {s.home.hero.h1.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="body-l max-w-[580px] text-white/78">{s.home.hero.sub}</p>
          <div className="flex flex-col gap-3.5 xs:flex-row xs:items-center">
            <Button to="/services" icon={<ArrowRight />} data-analytics="cta_click:hero-primary">
              {s.home.hero.primary}
            </Button>
            <Button to="/projects" variant="outlineLight" className="bg-white/10" data-analytics="cta_click:hero-secondary">
              {s.home.hero.secondary}
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-5 border-t border-white/18 pt-5 xl:gap-x-7">
            {s.home.hero.facts.map((fact, i) => (
              <li key={fact.label} className={`flex flex-col gap-1.5 ${i > 0 ? "sm:border-s sm:border-white/18 sm:ps-5 xl:ps-7" : ""}`}>
                <span aria-hidden className="h-0.5 w-[18px] bg-brand-cyan" />
                <span className="label-eyebrow text-white/60">{fact.label}</span>
                <span className="heading-h5 text-white">{fact.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured project card */}
        <aside
          aria-labelledby="hero-featured-title"
          className="flex w-full max-w-[372px] flex-col gap-5 rounded-20 border border-white/18 bg-navy-deep/72 p-6 shadow-hero-card backdrop-blur-[14px] md:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <Eyebrow color="cyan">{s.home.hero.featured}</Eyebrow>
            <span className="label-caption inline-flex items-center gap-1.5 rounded-full bg-brand-green/20 px-2.5 py-1 text-white">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-green" />
              {project.status === "in-progress" ? s.common.inProgress : s.common.completed}
            </span>
          </div>
          <h2 id="hero-featured-title" className="heading-h4 text-white">
            {l(project.shortTitle ?? project.title)}
          </h2>
          <p className="body-s text-white/86">{l(project.summary)}</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3.5">
            <div className="flex flex-col gap-[3px]">
              <dt className="label-caption text-white/64">{s.common.client}</dt>
              <dd className="body-s text-white">{l(project.client)}</dd>
            </div>
            <div className="flex flex-col gap-[3px]">
              <dt className="label-caption text-white/64">{s.common.location}</dt>
              <dd className="body-s text-white">{l(project.location)}</dd>
            </div>
            <div className="flex flex-col gap-[3px]">
              <dt className="label-caption text-white/64">{s.common.timeline}</dt>
              <dd className="body-s text-white">{l(project.timeline)}</dd>
            </div>
            <div className="flex flex-col gap-[3px]">
              <dt className="label-caption text-white/64">{s.common.deliveryModel}</dt>
              <dd className="body-s text-white">{l(project.deliveryModel)}</dd>
            </div>
          </dl>
          <div className="h-px w-full bg-white/16" />
          <Link
            to={path(`/projects/${project.slug}`)}
            className="label-button inline-flex items-center gap-2 text-white transition-colors hover:text-brand-cyan"
          >
            {s.home.hero.viewProject}
            <ArrowRight className="rtl-flip size-[18px]" aria-hidden />
          </Link>
        </aside>
      </div>

      {videoState === "ready" && (
        <button
          type="button"
          onClick={toggleVideo}
          aria-pressed={!playing}
          data-analytics="video_pause"
          className="label-caption absolute bottom-8 end-4 z-10 inline-flex h-[42px] items-center gap-2 rounded-full border border-white/25 bg-navy-deep/60 ps-2.5 pe-3.5 text-white backdrop-blur hover:bg-navy-deep/80 md:end-8 lg:end-16 xl:end-[120px]"
        >
          {playing ? <Pause className="size-5" aria-hidden /> : <Play className={`size-5 ${isAr ? "rtl-flip" : ""}`} aria-hidden />}
          {playing ? s.home.hero.pause : s.home.hero.play}
        </button>
      )}
    </section>
  );
}
