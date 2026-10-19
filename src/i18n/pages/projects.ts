import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * Page-local strings for /projects (Figma 34:542) and /projects/:slug (Figma 35:632).
 * Shared labels (Client, Timeline, Delivery model, Status, Show all…) come from `s.common`.
 */
export const projectsStrings = {
  hero: {
    eyebrow: "Our projects",
    title: "Efficient project execution",
    intro:
      "Turnkey EPC delivery across the Kingdom's transmission network — substations, overhead lines, underground cable works and manufactured equipment.",
    imageAlt: "High-voltage transmission towers against an evening sky",
  },
  grid: {
    filterGroup: "Filter projects by category",
    sort: "Sort projects",
    newest: "Newest first",
    oldest: "Oldest first",
    count: (n: number) => `${n} ${n === 1 ? "project" : "projects"} shown`,
    emptyTitle: "No projects in this category yet",
    emptyBody: "We add case studies as projects are delivered. In the meantime, browse everything we have built.",
  },
  cta: {
    title: "From raw materials to finished products — we do it all.",
    intro: "Helping industry across the Kingdom with experience, dedication, vision and goals.",
    primary: "Start a project",
    secondary: "Company profile (PDF)",
  },
  detail: {
    brief: { category: "Category", start: "Start date", end: "End date", place: "Place" },
    overview: "Project overview",
    scope: "Scope of work",
    gallery: "Project gallery",
    impact: "Strategic impact",
    milestone: "Project milestone",
    sidebar: {
      title: "Planning a similar project?",
      body: "Our engineering division can evaluate your site and scope within days.",
      cta: "Start a project",
      share: "Share this project",
      copied: "Link copied",
      recent: "Recent projects",
    },
  },
};

export type ProjectsStrings = typeof projectsStrings;

/**
 * Arabic copy. Section headings, brief labels and the CTA line are transcribed from the
 * previous (Al Sharhan Energy) Arabic site; the rest is translated in the same register.
 * Shared vocabulary ("المشاريع", "مكتمل", "تسليم مفتاح (EPC)"…) matches `ar` in strings.ts.
 */
export const projectsStringsAr: DeepPartial<ProjectsStrings> = {
  hero: {
    eyebrow: "مشاريعنا",
    title: "تنفيذ المشاريع بكفاءة",
    intro:
      "تنفيذ متكامل (EPC) بنظام تسليم المفتاح عبر شبكة النقل في المملكة — محطات فرعية وخطوط هوائية وأعمال كابلات أرضية ومعدات مصنّعة محلياً.",
    imageAlt: "أبراج نقل الجهد العالي في سماء المساء",
  },
  grid: {
    filterGroup: "تصفية المشاريع حسب الفئة",
    sort: "ترتيب المشاريع",
    newest: "الأحدث أولاً",
    oldest: "الأقدم أولاً",
    count: (n: number) =>
      n === 0
        ? "لا توجد مشاريع معروضة"
        : n === 1
          ? "مشروع واحد معروض"
          : n === 2
            ? "مشروعان معروضان"
            : n <= 10
              ? `${n} مشاريع معروضة`
              : `${n} مشروعاً معروضاً`,
    emptyTitle: "لا توجد مشاريع في هذه الفئة بعد",
    emptyBody: "نضيف دراسات الحالة مع تسليم المشاريع. في هذه الأثناء، تصفّح جميع ما أنجزناه.",
  },
  cta: {
    title: "من المواد الخام إلى المنتجات النهائية — نقوم بكل شيء.",
    intro: "نساعد قطاع الصناعة في المملكة بالخبرة والتفاني والرؤية والأهداف.",
    primary: "ابدأ مشروعاً",
    secondary: "الملف التعريفي (PDF)",
  },
  detail: {
    brief: { category: "الفئة", start: "تاريخ البداية", end: "تاريخ النهاية", place: "المكان" },
    overview: "نظرة عامة على المشروع",
    scope: "نطاق العمل",
    gallery: "معرض صور المشروع",
    impact: "الأثر الاستراتيجي",
    milestone: "مرحلة مهمة في المشروع",
    sidebar: {
      title: "هل تخطط لمشروع مماثل؟",
      body: "يمكن لقسم الهندسة لدينا تقييم موقعك ونطاق عملك خلال أيام.",
      cta: "ابدأ مشروعاً",
      share: "مشاركة هذا المشروع",
      copied: "تم نسخ الرابط",
      recent: "أحدث المشاريع",
    },
  },
};
