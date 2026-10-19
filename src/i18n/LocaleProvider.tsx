import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { en, ar, type Strings } from "./strings";

export type Lang = "en" | "ar";

/** A localisable string: Arabic falls back to English when missing (handoff › board 20 "Missing data"). */
export type L = { en: string; ar?: string };

type LocaleValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  /** Merged UI strings for the active language. */
  s: Strings;
  /** Pick a localised field with English fallback. */
  l: (v: L | string | undefined) => string;
  /** Prefix a route with /ar when Arabic is active. */
  path: (to: string) => string;
  /** Same route in the other language (language toggle keeps the current route). */
  togglePath: string;
};

const LocaleContext = createContext<LocaleValue | null>(null);

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, over: unknown): T {
  if (!isObject(base) || !isObject(over)) return (over === undefined ? base : (over as T)) as T;
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(over)) {
    const b = (base as Record<string, unknown>)[key];
    const o = over[key];
    out[key] = isObject(b) && isObject(o) ? deepMerge(b, o) : o === undefined ? b : o;
  }
  return out as T;
}

export function stripLang(pathname: string): string {
  if (pathname === "/ar" || pathname === "/ar/") return "/";
  return pathname.startsWith("/ar/") ? pathname.slice(3) : pathname;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  const lang: Lang = isAr ? "ar" : "en";

  const value = useMemo<LocaleValue>(() => {
    const s = isAr ? deepMerge(en, ar) : en;
    const bare = stripLang(pathname);
    const path = (to: string) => {
      if (/^(https?:|mailto:|tel:|#)/.test(to)) return to;
      if (!isAr) return to;
      return to === "/" ? "/ar" : `/ar${to}`;
    };
    return {
      lang,
      dir: isAr ? "rtl" : "ltr",
      isAr,
      s,
      l: (v) => (typeof v === "string" ? v : v ? (isAr ? (v.ar ?? v.en) : v.en) : ""),
      path,
      togglePath: isAr ? bare : bare === "/" ? "/ar" : `/ar${bare}`,
    };
  }, [isAr, lang, pathname]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = value.dir;
  }, [lang, value.dir]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...a: never[]) => unknown ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Page-local strings: pass the English source and an optional Arabic partial;
 * returns the merged object for the active language (English fallback per key).
 */
export function useStrings<T extends object>(enStrings: T, arStrings?: DeepPartial<T>): T {
  const { isAr } = useLocale();
  return useMemo(() => (isAr && arStrings ? deepMerge(enStrings, arStrings) : enStrings), [isAr, enStrings, arStrings]);
}
