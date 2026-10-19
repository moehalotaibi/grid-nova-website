import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { LanguageToggle } from "./LanguageToggle";

type Props = { open: boolean; onClose: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Mobile navigation (handoff › board 20, 768–1023 and below): sheet from the inline-end,
 * 320 wide, inert background, Escape closes, focus trapped, body scroll locked.
 */
export function MobileMenu({ open, onClose }: Props) {
  const { s, path, l } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);

  // close after navigating
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      if (open) onClose();
    }
  }, [pathname, open, onClose]);

  useEffect(() => {
    if (!open) return;
    const root = document.getElementById("root");
    const previouslyFocused = document.activeElement as HTMLElement | null;
    root?.setAttribute("inert", "");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center gap-3 rounded-10 px-3 py-2 text-[17px] leading-6 font-semibold transition-colors ${
      isActive ? "bg-white/8 text-white" : "text-white/85 hover:bg-white/8 hover:text-white"
    }`;

  return createPortal(
    <div className="dark-surface fixed inset-0 z-[70] lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-navy-deep/60" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={s.nav.menu}
        className="absolute inset-y-0 end-0 flex w-[320px] max-w-[88vw] animate-sheet-in flex-col overflow-y-auto border-s border-white/10 bg-navy-deep text-white shadow-hero-card"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <Logo height={26} />
          <button
            type="button"
            onClick={onClose}
            aria-label={s.nav.close}
            className="inline-flex size-11 items-center justify-center rounded-10 text-white hover:bg-white/10"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <nav aria-label={s.nav.main} className="flex flex-col gap-1 px-3 py-2">
          <NavLink to={path("/")} end className={linkCls}>
            {s.nav.home}
          </NavLink>
          <NavLink to={path("/services")} end className={linkCls}>
            {s.nav.services}
          </NavLink>
          <ul className="ms-3 flex flex-col border-s border-white/12 ps-3">
            {services.map((svc) => (
              <li key={svc.slug}>
                <NavLink
                  to={path(`/services/${svc.slug}`)}
                  className={({ isActive }) =>
                    `body-m flex min-h-11 items-center rounded-10 px-3 py-2 ${isActive ? "text-white" : "text-white/75 hover:text-white"}`
                  }
                >
                  {l(svc.title)}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to={path("/projects")} className={linkCls}>
            {s.nav.projects}
          </NavLink>
          <NavLink to={path("/news")} className={linkCls}>
            {s.nav.news}
          </NavLink>
          <NavLink to={path("/about")} className={linkCls}>
            {s.nav.about}
          </NavLink>
          <NavLink to={path("/careers")} className={linkCls}>
            {s.nav.careers}
          </NavLink>
          <NavLink to={path("/faq")} className={linkCls}>
            {s.nav.faq}
          </NavLink>
          <NavLink to={path("/contact")} className={linkCls}>
            {s.nav.contact}
          </NavLink>
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 p-4">
          <Button to="/contact" fullWidth data-analytics="cta_click:mobile-menu">
            {s.nav.cta}
          </Button>
          <LanguageToggle className="w-full justify-center" onClick={onClose} />
          <Link to={path("/")} className="sr-only">
            {s.nav.home}
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
