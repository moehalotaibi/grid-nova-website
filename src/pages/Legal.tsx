import { Link } from "react-router-dom";
import { Calendar, Check } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageHero } from "@/components/layout/PageHero";
import { formatDate } from "@/data/news";
import { legalBySlug, legalDocs, type LegalBlock, type LegalSlug } from "@/data/legal";
import { SITE } from "@/data/site";

const en = {
  eyebrow: "Legal",
  updated: "Last updated",
  onThisPage: "On this page",
  related: "Related pages",
  questions: "Questions about this page? Email",
};
const ar = {
  eyebrow: "المعلومات القانونية",
  updated: "آخر تحديث",
  onThisPage: "في هذه الصفحة",
  related: "صفحات ذات صلة",
  questions: "لديك سؤال حول هذه الصفحة؟ راسلنا على",
};

/**
 * /privacy, /terms and /cookies — the legal pages linked from the footer. Page hero (md) with the
 * last-updated date, a sticky "On this page" list on large screens and the document body (760 max).
 * Content lives in src/data/legal.ts; no Figma frame.
 */
export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = legalBySlug(slug);
  const { l, lang, path } = useLocale();
  const t = useStrings(en, ar);
  usePageMeta(l(doc.title), l(doc.description));
  const others = legalDocs.filter((d) => d.slug !== slug);

  return (
    <>
      <PageHero size="md" image="faq-hero" crumbs={[{ label: l(doc.title) }]} eyebrow={t.eyebrow} title={l(doc.title)} intro={l(doc.intro)}>
        <p className="body-s flex items-center gap-1.5 text-white/70">
          <Calendar className="size-[15px]" aria-hidden />
          <span>
            {t.updated}: <time dateTime={doc.updated}>{formatDate(doc.updated, lang)}</time>
          </span>
        </p>
      </PageHero>

      <section className="bg-white">
        <div className="container-site section-y grid gap-12 lg:grid-cols-[minmax(0,260px)_minmax(0,760px)] lg:gap-16">
          <nav aria-label={t.onThisPage} className="lg:sticky lg:top-[calc(var(--nav-height)+24px)] lg:self-start">
            <p className="label-eyebrow mb-3 text-neutral-500">{t.onThisPage}</p>
            <ol className="flex flex-col gap-1 border-s border-neutral-200">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="body-s -ms-px block border-s-2 border-transparent py-1 ps-4 text-neutral-600 transition-colors hover:border-brand-blue hover:text-neutral-900"
                  >
                    {l(section.heading)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="flex flex-col gap-10">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="flex scroll-mt-[calc(var(--nav-height)+24px)] flex-col gap-4">
                <h2 className="heading-h4 text-neutral-900">{l(section.heading)}</h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            <footer className="mt-2 flex flex-col gap-5 border-t border-neutral-200 pt-8">
              <div className="flex flex-col gap-2">
                <p className="label-eyebrow text-neutral-500">{t.related}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {others.map((d) => (
                    <li key={d.slug}>
                      <Link to={path(`/${d.slug}`)} className="label-button text-brand-blue hover:text-brand-blue-dark">
                        {l(d.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="body-s text-neutral-500">
                {t.questions}{" "}
                <a href={`mailto:${SITE.email}`} className="text-brand-blue hover:text-brand-blue-dark" dir="ltr">
                  {SITE.email}
                </a>
              </p>
            </footer>
          </article>
        </div>
      </section>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  const { l } = useLocale();
  switch (block.type) {
    case "paragraph":
      return <p className="body-m text-neutral-700">{l(block.text)}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item.en} className="body-m flex items-start gap-3 text-neutral-700">
              <span className="mt-[3px] inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-tint-blue-50 text-brand-blue">
                <Check className="size-3" aria-hidden strokeWidth={2.5} />
              </span>
              {l(item)}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-16 border border-neutral-200">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-neutral-50">
              <tr>
                {block.head.map((cell) => (
                  <th key={cell.en} scope="col" className="label-caption px-4 py-3 text-start text-neutral-700">
                    {l(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-neutral-200 align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="body-s px-4 py-3 text-neutral-700">
                      {l(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
