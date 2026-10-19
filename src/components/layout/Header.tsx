import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";

/**
 * Navigation / Dark (Design System › 08, handoff › 18/19)
 * 1440 × 93 · padding 22 / 120 · logo 234 × 36 · link gap 32 · nav item 46 (pad 10 / 8) · actions gap 20
 * Sticky; scrolled > 24 px → navy-deep 92 % + backdrop-blur 12 + 1 px white 8 % border (200 ms).
 * Active route = 2 px brand/green underline + aria-current. < 1024: logo + language + hamburger.
 */
export function Header() {
  const { s, path } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`dark-surface fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled ? "border-white/8 bg-navy-deep/92 backdrop-blur-[12px]" : "border-white/12 bg-transparent"
      }`}
    >
      <div className="container-site flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link to={path("/")} aria-label={`${s.meta.siteName} — ${s.nav.home}`} className="shrink-0 rounded-6">
          <Logo height={36} className="max-md:hidden" />
          <Logo height={28} className="md:hidden" />
        </Link>

        <nav aria-label={s.nav.main} className="hidden items-center gap-8 lg:flex">
          <NavItem to="/" end label={s.nav.home} />
          <ServicesItem />
          <NavItem to="/projects" label={s.nav.projects} />
          <NavItem to="/news" label={s.nav.news} />
          <NavItem to="/about" label={s.nav.about} />
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <LanguageToggle className="max-xs:px-2.5" />
          <div className="hidden lg:block">
            <Button to="/contact" data-analytics="cta_click:nav">
              {s.nav.cta}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-10 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={s.nav.menu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function NavItem({ to, label, end, children }: { to: string; label: string; end?: boolean; children?: React.ReactNode }) {
  const { path } = useLocale();
  return (
    <NavLink
      to={path(to)}
      end={end}
      className={({ isActive }) =>
        `label-nav group flex flex-col gap-1.5 pb-2 pt-2.5 transition-colors duration-[var(--dur-micro)] ${
          isActive ? "text-white" : "text-white/82 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="flex items-center gap-1 whitespace-nowrap">
            {label}
            {children}
          </span>
          <span
            aria-hidden
            className={`h-0.5 w-full rounded-[1px] transition-colors duration-[var(--dur-micro)] ${
              isActive ? "bg-brand-green" : "bg-transparent group-hover:bg-white/30"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

/** Services link with a dropdown of the four service detail pages (Nav item › Dropdown). */
function ServicesItem() {
  const { s, path, l } = useLocale();
  const [open, setOpen] = useState(false);
  const openedByHover = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center"
      onMouseEnter={() => {
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        setOpen(false);
      }}
    >
      <NavItem to="/services" label={s.nav.services} />
      <button
        type="button"
        aria-label={`${s.nav.services} ${s.nav.menu.toLowerCase()}`}
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => {
          // a mouse click right after hover-open must not immediately close the menu
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
        className="-ms-0.5 inline-flex size-6 items-center justify-center rounded-6 text-white/82 hover:text-white"
      >
        <ChevronDown className={`size-4 transition-transform duration-[var(--dur-micro)] ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div
          id="services-menu"
          className="absolute start-0 top-full z-50 w-64 animate-fade-in rounded-16 border border-white/12 bg-navy-deep p-2 shadow-hero-card"
        >
          <ul className="flex flex-col">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  to={path(`/services/${svc.slug}`)}
                  className="body-s flex items-center gap-3 rounded-10 px-3 py-2.5 text-white/85 hover:bg-white/8 hover:text-white"
                >
                  <span className="label-eyebrow text-brand-cyan">{svc.number}</span>
                  {l(svc.title)}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-white/10 pt-1">
              <Link to={path("/services")} className="label-button flex items-center rounded-10 px-3 py-2.5 text-white hover:bg-white/8">
                {s.nav.allServices}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
