import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale, stripLang } from "@/i18n/LocaleProvider";

/** Title "{Page} — Grid Nova Energy", meta description and hreflang pairs (handoff › board 16 & 21). */
export function usePageMeta(title: string, description?: string) {
  const { s } = useLocale();
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title ? `${title} — ${s.meta.siteName}` : s.meta.siteName;
    if (description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.name = "description";
        document.head.appendChild(el);
      }
      el.content = description.slice(0, 155);
    }
    const bare = stripLang(pathname);
    const set = (lang: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = "alternate";
        el.hreflang = lang;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    set("en", `${location.origin}${bare}`);
    set("ar", `${location.origin}${bare === "/" ? "/ar" : `/ar${bare}`}`);
  }, [title, description, s.meta.siteName, pathname]);
}
