import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { NewsCard } from "@/components/cards/NewsCard";
import { articles, formatDate, newsCategories, type Article } from "@/data/news";
import { SITE } from "@/data/site";
import { newsEn, newsAr } from "@/i18n/pages/news";

const PAGE_SIZE = 6;
const ALL = "all";
/** Anchored articles (/news#slug from the homepage) clear the fixed navigation. */
const ANCHOR = "scroll-mt-[calc(var(--nav-height)+24px)]";

const hasTag = (a: Article, key: string) => a.tags.some((t) => t.label.en === key);

/** Featured article (Figma 38:858): navy card, radius 24, 640 image + 48 padded copy; stacks below 1024. */
function FeaturedArticle({ article }: { article: Article }) {
  const { s, l, lang } = useLocale();
  const tags = [...article.tags].sort((a, b) => Number(b.tone === "green") - Number(a.tone === "green"));
  return (
    <article id={article.slug} className={`${ANCHOR} dark-surface grid overflow-hidden rounded-24 bg-navy text-white lg:grid-cols-[8fr_7fr] xl:grid-cols-[640px_minmax(0,1fr)]`}>
      <SmartImage
        name={article.featuredImage ?? article.image}
        width={640}
        height={462}
        alt={article.imageAlt}
        frameClassName="relative aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]"
        className="lg:absolute lg:inset-0"
      />
      <div className="flex flex-col justify-center gap-[18px] p-7 md:p-10 xl:p-12">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag.label.en}
              className={`label-caption rounded-full px-2.5 py-1 ${tag.tone === "green" ? "bg-brand-green-dark text-white" : "bg-white/12 text-white"}`}
            >
              {l(tag.label)}
            </li>
          ))}
        </ul>
        <h2 className="quote-l text-white">{l(article.title)}</h2>
        {article.lead && <p className="body-m text-white/75">{l(article.lead)}</p>}
        <div className="body-s flex flex-wrap items-center gap-3.5 text-white/80">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-[15px]" aria-hidden />
            <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
          </span>
          <span>
            <span className="num">{article.readMinutes}</span> {s.common.minRead}
          </span>
        </div>
        <div>
          <Button to={`/news/${article.slug}`} icon={<ArrowRight />} data-analytics="cta_click:news-featured">
            {s.common.readArticle}
          </Button>
        </div>
      </div>
    </article>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`label-nav inline-flex min-h-11 items-center rounded-full px-4 transition-colors duration-[var(--dur-micro)] ${
        active ? "bg-neutral-900 text-white" : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      {children}
    </button>
  );
}

/** 3 → 2 → 1 card grid with the enter-on-scroll stagger. Cards appended by "Load more" show immediately. */
function ArticleGrid({ items }: { items: Article[] }) {
  const grid = useReveal<HTMLDivElement>();
  const initial = useRef(items.length);
  return (
    <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((article, i) => (
        <div
          key={article.slug}
          id={article.slug}
          className={`${ANCHOR} reveal ${i >= initial.current ? "is-visible" : ""}`}
          style={{ "--i": i % PAGE_SIZE } as CSSProperties}
        >
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
}

/** Empty state (handoff › board 20): a single "Stories coming soon" card. */
function ComingSoon() {
  const { s } = useLocale();
  const t = useStrings(newsEn, newsAr);
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-4 rounded-24 border border-neutral-200 bg-neutral-50 px-6 py-14 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-16 bg-tint-blue-50 text-brand-blue">
        <Newspaper className="size-7" aria-hidden />
      </span>
      <h2 className="heading-h3 text-neutral-900">{s.home.news.soon}</h2>
      <p className="body-m max-w-[460px] text-neutral-500">{t.articles.soonBody}</p>
      <Button href={SITE.social.linkedin} variant="outlineDark" target="_blank" rel="noreferrer" icon={<ArrowRight />}>
        {t.articles.followLinkedin}
      </Button>
    </div>
  );
}

/**
 * Section / Articles (Figma 38:857): featured article · topic chips (aria-pressed) · article grid · "Load more".
 * "All" shows the featured block plus the rest; a topic filters every article, including the featured one.
 */
export function Articles() {
  const { s, l } = useLocale();
  const t = useStrings(newsEn, newsAr);
  const { hash } = useLocation();
  const [filter, setFilter] = useState(ALL);
  const [shown, setShown] = useState(PAGE_SIZE);

  const featured = filter === ALL ? articles.find((a) => a.featured) : undefined;
  const pool = articles.filter((a) => (filter === ALL ? a !== featured : hasTag(a, filter)));
  const visible = pool.slice(0, shown);

  const select = (key: string) => {
    setFilter(key);
    setShown(PAGE_SIZE);
  };

  // Deep links from the homepage (/news#slug): this route is lazy, so the layout's own hash handling runs
  // before the article exists. Reveal it if it is paged out, then scroll once it is in the DOM.
  useEffect(() => {
    if (!hash) return;
    const slug = hash.slice(1);
    const index = articles.findIndex((a) => a.slug === slug);
    if (index < 0) return;
    setFilter(ALL);
    setShown((n) => Math.max(n, index + 1));
    const raf = requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(raf);
  }, [hash]);

  if (articles.length === 0) {
    return (
      <section className="bg-white">
        <div className="container-site section-y">
          <ComingSoon />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-12">
        {featured && <FeaturedArticle article={featured} />}

        <div role="group" aria-label={t.articles.filterLabel} className="flex flex-wrap gap-2">
          <Chip active={filter === ALL} onClick={() => select(ALL)}>
            {t.articles.all}
          </Chip>
          {newsCategories.map((category) => (
            <Chip key={category.en} active={filter === category.en} onClick={() => select(category.en)}>
              {l(category)}
            </Chip>
          ))}
        </div>

        {visible.length > 0 ? (
          <ArticleGrid key={filter} items={visible} />
        ) : filter !== ALL ? (
          <div role="status" className="flex flex-col items-start gap-3 rounded-16 border border-neutral-200 bg-neutral-50 p-6">
            <p className="body-m text-neutral-700">{t.articles.emptyFilter}</p>
            <Button variant="ghost" onClick={() => select(ALL)} icon={<ArrowRight />}>
              {s.common.showAll}
            </Button>
          </div>
        ) : null}

        {pool.length > shown && (
          <div className="flex justify-center">
            <Button variant="outlineDark" onClick={() => setShown((n) => n + PAGE_SIZE)}>
              {t.articles.loadMore}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
