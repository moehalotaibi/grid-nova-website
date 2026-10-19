import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { Articles } from "@/sections/news/Articles";
import { Newsletter } from "@/sections/news/Newsletter";
import { newsEn, newsAr } from "@/i18n/pages/news";

/** News — Figma 38:812: page hero 38:813 · Section / Articles 38:857 · Section / Newsletter 38:951. */
export default function NewsPage() {
  const { s } = useLocale();
  const t = useStrings(newsEn, newsAr);
  usePageMeta(s.nav.news, t.description);
  return (
    <>
      <PageHero
        image="news-hero"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ label: s.nav.news }]}
        eyebrow={s.home.news.eyebrow}
        title={s.home.news.title}
        intro={t.hero.intro}
      />
      <Articles />
      <Newsletter />
    </>
  );
}
