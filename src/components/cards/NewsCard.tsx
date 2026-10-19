import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatDate, type Article } from "@/data/news";

/**
 * News card (Figma 25:12): image 16:10 → 240, radius 16 · tag pills · H4 · date · read time · "Read article".
 * Whole card is the link; description (when present) clamps to 3 lines (board 20).
 */
export function NewsCard({ article, style, className = "" }: { article: Article; style?: React.CSSProperties; className?: string }) {
  const { s, l, lang, path } = useLocale();
  const title = l(article.title);
  return (
    <Link
      to={path(`/news/${article.slug}`)}
      title={title}
      style={style}
      className={`card-hover group flex h-full flex-col gap-[18px] rounded-16 ${className}`}
    >
      <SmartImage
        name={article.image}
        width={384}
        height={240}
        alt={article.imageAlt}
        frameClassName="aspect-[384/240] w-full rounded-16 border border-black/10"
        className="card-img rounded-16"
      />
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
      <h3 className="heading-h4 line-clamp-3 text-neutral-900">{title}</h3>
      {article.excerpt && <p className="body-s line-clamp-3 text-neutral-500">{l(article.excerpt)}</p>}
      <div className="body-s mt-auto flex items-center gap-3.5 text-neutral-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-[15px]" aria-hidden />
          <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
        </span>
        <span aria-hidden className="size-1 rounded-full bg-neutral-300" />
        <span>
          <span className="num">{article.readMinutes}</span> {s.common.minRead}
        </span>
      </div>
      <span className="card-link label-button inline-flex items-center gap-1.5 text-brand-blue transition-colors">
        {s.common.readArticle}
        <ArrowRight className="rtl-flip size-4" aria-hidden />
      </span>
    </Link>
  );
}
