import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NewsCard } from "@/components/cards/NewsCard";
import { articles } from "@/data/news";

/** Section / News (Figma 25:2) — header + outline button · 3-up news cards. Hidden when there are no articles (board 20). */
export function News() {
  const { s } = useLocale();
  const grid = useReveal<HTMLDivElement>();
  if (articles.length === 0) return null;
  return (
    <section className="bg-white">
      <div className="container-site section-y flex flex-col gap-10 xl:gap-14">
        <SectionHeader
          eyebrow={s.home.news.eyebrow}
          title={s.home.news.title}
          aside={
            <Button to="/news" variant="outlineDark" icon={<ArrowRight />} data-analytics="cta_click:news">
              {s.home.news.more}
            </Button>
          }
        />
        <div ref={grid} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article, i) => (
            <NewsCard key={article.slug} article={article} className="reveal" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
