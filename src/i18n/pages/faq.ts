import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * /faq page-local strings (Figma 39:1253). Intro and help-card copy follow the previous site's FAQ page
 * (energy.shrhan.com/faq · /ar/الاسئلة-المتكررة); the rest is design copy with Arabic in the same register.
 */
export const faqEn = {
  description: "The most frequently asked questions about our products, services and energy generation projects.",
  hero: {
    eyebrow: "Help centre",
    titleLine1: "Frequently asked",
    titleLine2: "questions",
    intro: "The most frequently asked questions about our products, services and energy generation projects.",
    imageAlt: "High-voltage transmission lines against a hazy sky at dusk",
  },
  nav: { label: "FAQ categories" },
  help: {
    title: "Ask us any questions you have",
    callPrefix: "Call our support agent 24/7 on",
    callSuffix: "or send us a message",
  },
};

export type FaqStrings = typeof faqEn;

/** Arabic: every key of `faqEn` is covered (pass as `useStrings(faqEn, faqAr)`). */
export const faqAr: DeepPartial<FaqStrings> = {
  description: "أكثر الأسئلة شيوعاً حول منتجاتنا وخدماتنا ومشاريع الطاقة وتوليدها.",
  hero: {
    eyebrow: "مركز المساعدة",
    titleLine1: "الأسئلة",
    titleLine2: "الشائعة",
    intro: "أكثر الأسئلة شيوعاً حول منتجاتنا وخدماتنا ومشاريع الطاقة وتوليدها.",
    imageAlt: "خطوط نقل الجهد العالي في سماء ضبابية عند الغسق",
  },
  nav: { label: "فئات الأسئلة الشائعة" },
  help: {
    title: "اسألنا أي أسئلة لديك",
    callPrefix: "اتصل بوكيل الدعم على مدار الساعة عبر الرقم",
    callSuffix: "أو أرسل لنا رسالة",
  },
};
