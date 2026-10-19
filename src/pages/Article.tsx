import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Check } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useReveal } from "@/hooks/useReveal";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/cards/NewsCard";
import { articleBySlug, articles, formatDate, type ArticleBlock } from "@/data/news";

const NotFound = lazy(() => import("./NotFound"));

/**
 * /news/:slug — article page for the company news migrated from the previous website.
 * (The Figma file has no article frame; this reuses the page-hero, prose and news-card patterns.)
 */
export default function ArticlePage() {
  const { slug } = useParams();
  const article = articleBySlug(slug);
  const { s, l, lang, path } = useLocale();
  const title = article ? l(article.title) : "";
  usePageMeta(title || s.nav.news, article ? l(article.lead) : undefined);
  const moreGrid = useReveal<HTMLDivElement>();

  if (!article) {
    return (
      <Suspense fallback={<div className="min-h-[60vh] bg-navy-deep" aria-busy="true" />}>
        <NotFound />
      </Suspense>
    );
  }

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        size="md"
        image={article.heroImage ?? article.image}
        crumbs={[{ label: s.nav.news, to: "/news" }, { label: title }]}
        eyebrow={article.tags.map((t) => l(t.label)).join(" · ")}
        title={title}
        intro={l(article.lead)}
      >
        <p className="body-s flex flex-wrap items-center gap-3.5 text-white/70">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-[15px]" aria-hidden />
            <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
          </span>
          <span aria-hidden className="size-1 rounded-full bg-white/40" />
          <span>
            <span className="num">{article.readMinutes}</span> {s.common.minRead}
          </span>
        </p>
      </PageHero>

      <section className="bg-white">
        <div className="container-site section-y">
          <article className="flex w-full max-w-[760px] flex-col gap-6">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <footer className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
              <ul className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag.label.en}
                    className={`label-caption rounded-full px-2.5 py-1 ${tag.tone === "green" ? "bg-tint-green-50 text-brand-green-dark" : "bg-tint-blue-50 text-brand-blue"}`}
                  >
                    {l(tag.label)}
                  </li>
                ))}
              </ul>
              <Link to={path("/news")} className="label-button inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark">
                <ArrowLeft className="rtl-flip size-[18px]" aria-hidden />
                {s.nav.news}
              </Link>
            </footer>
          </article>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-neutral-50">
          <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
            <SectionHeader
              eyebrow={s.home.news.eyebrow}
              title={s.home.news.more}
              aside={
                <Button to="/news" variant="outlineDark" icon={<ArrowRight />}>
                  {s.nav.news}
                </Button>
              }
            />
            <div ref={moreGrid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((a, i) => (
                <NewsCard key={a.slug} article={a} className="reveal" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  const { l } = useLocale();
  switch (block.type) {
    case "heading":
      return <h2 className="heading-h3 pt-2 text-neutral-900">{l(block.text)}</h2>;
    case "paragraph":
      return <p className="body-l text-neutral-700">{l(block.text)}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item.en} className="body-m flex items-start gap-3 text-neutral-700">
              <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-tint-green-50 text-brand-green-dark">
                <Check className="size-3.5" aria-hidden strokeWidth={2.5} />
              </span>
              {l(item)}
            </li>
          ))}
        </ul>
      );
    case "image": {
      const w = block.width ?? 760;
      const h = block.height ?? 480;
      return (
        <figure className="my-2 w-full">
          <SmartImage
            name={block.image}
            width={w}
            height={h}
            alt={block.alt}
            frameClassName="w-full rounded-16 border border-black/10"
            frameStyle={{ aspectRatio: `${w} / ${h}` }}
            className="rounded-16"
          />
          {block.caption && <figcaption className="body-s mt-3 text-neutral-500">{l(block.caption)}</figcaption>}
        </figure>
      );
    }
  }
}
