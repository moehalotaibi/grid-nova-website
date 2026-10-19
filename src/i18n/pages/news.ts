import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * /news page-local strings (Figma 38:812). Newsletter copy follows the previous site's newsletter band
 * (energy.shrhan.com/company-news · /ar/أخبار-الشركة); the rest is design copy with Arabic in the same register.
 */
export const newsEn = {
  description: "Announcements, partnerships and project milestones from Grid Nova Energy.",
  hero: {
    intro: "Announcements, partnerships and project milestones from Grid Nova Energy.",
    imageAlt: "Riyadh skyline with the Al Faisaliah tower on a clear day",
  },
  articles: {
    all: "All",
    filterLabel: "Filter articles by topic",
    loadMore: "Load more articles",
    emptyFilter: "No stories in this category yet.",
    soonBody: "We're preparing announcements, partnerships and project milestones. Check back soon or follow us on LinkedIn.",
    followLinkedin: "Follow us on LinkedIn",
  },
  newsletter: {
    title: "Revolutionizing the economy with quality projects",
    intro: "For our newsletter, enter your email.",
  },
};

export type NewsStrings = typeof newsEn;

/** Arabic: every key of `newsEn` is covered (pass as `useStrings(newsEn, newsAr)`). */
export const newsAr: DeepPartial<NewsStrings> = {
  description: "إعلانات وشراكات ومحطات بارزة في مشاريع جريد نوفا للطاقة.",
  hero: {
    intro: "إعلانات وشراكات ومحطات بارزة في مشاريع جريد نوفا للطاقة.",
    imageAlt: "أفق مدينة الرياض وبرج الفيصلية في يوم صافٍ",
  },
  articles: {
    all: "الكل",
    filterLabel: "تصفية المقالات حسب الموضوع",
    loadMore: "تحميل المزيد من المقالات",
    emptyFilter: "لا توجد مقالات في هذه الفئة حتى الآن.",
    soonBody: "نعمل على إعداد الإعلانات والشراكات ومحطات المشاريع البارزة. عُد قريباً أو تابعنا على LinkedIn.",
    followLinkedin: "تابعنا على LinkedIn",
  },
  newsletter: {
    title: "إحداث ثورة في الاقتصاد من خلال مشاريع عالية الجودة",
    intro: "للحصول على نشرتنا الإخبارية، أدخل بريدك الإلكتروني",
  },
};
