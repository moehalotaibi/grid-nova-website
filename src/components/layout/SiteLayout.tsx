import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Skip link: first Tab stop, visible on focus, lands on <main> (handoff › board 21). */
function SkipLink() {
  const { s } = useLocale();
  return (
    <a
      href="#main"
      className="label-button sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-10 focus:bg-white focus:px-4 focus:py-3 focus:text-brand-blue focus:shadow-card-hover"
    >
      {s.nav.skip}
    </a>
  );
}

/** Sticky bottom "Contact us" bar, 56 high, < 768 only (board 20). Hidden on the contact page. */
function StickyContactBar() {
  const { s, path } = useLocale();
  const { pathname } = useLocation();
  if (pathname.endsWith("/contact")) return null;
  return (
    <div className="dark-surface fixed inset-x-0 bottom-0 z-40 md:hidden">
      <Link
        to={path("/contact")}
        data-analytics="cta_click:sticky-bar"
        className="label-button flex h-14 items-center justify-center bg-brand-green-dark text-white shadow-[0_-4px_16px_rgba(0,0,0,0.18)]"
      >
        {s.nav.stickyContact}
      </Link>
    </div>
  );
}

/**
 * Scroll to top on navigation, or to the #hash target. Lazy routes mount after this effect
 * runs, so a missing hash target is retried for up to ~2 s before giving up.
 */
function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      if (attempts++ < 20) timer = window.setTimeout(tryScroll, 100);
    };
    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export function SiteLayout() {
  return (
    <>
      <ScrollRestoration />
      <SkipLink />
      <Header />
      <main id="main" className="pb-14 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyContactBar />
    </>
  );
}
