import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * /contact page-local strings (Figma 38:1021). Hero title, intro, details heading and support hours follow the
 * previous site's contact page and homepage contact block (alsharhanenergy.com/contact-us · /ar/اتصل-بنا);
 * the LinkedIn note and map card are design copy with Arabic in the same register.
 */
export const contactEn = {
  description: "Send a message to inquire about our projects and services! Our support agent is available 24/7.",
  hero: {
    crumb: "Contact us",
    title: "Got a project idea? Let's discuss",
    intro: "Send a message to inquire about our projects and services! Our support agent is available 24/7.",
    imageAlt: "Riyadh skyline at night",
  },
  details: {
    title: "Contact info",
    hoursLabel: "Support hours",
    hoursDays: "Around the clock",
    hoursTime: "Support agent available 24/7",
    linkedinLead: "Prefer LinkedIn?",
    linkedinLink: "Follow Grid Nova Energy",
    linkedinTail: "for project updates and announcements.",
  },
  map: {
    title: "Grid Nova Energy — Headquarters",
    address: "3842 Makkah Al Mukarramah Rd., Riyadh 12421",
    directions: "Get directions",
    frameTitle: "Google Maps — Grid Nova Energy headquarters, Riyadh",
  },
};

export type ContactStrings = typeof contactEn;

/** Arabic: every key of `contactEn` is covered (pass as `useStrings(contactEn, contactAr)`). */
export const contactAr: DeepPartial<ContactStrings> = {
  description: "أرسل رسالة للاستفسار عن مشاريعنا وخدماتنا! وكيل الدعم متاح على مدار الساعة.",
  hero: {
    crumb: "تواصل معنا",
    title: "هل لديك فكرة مشروع؟ دعنا نناقشها",
    intro: "أرسل رسالة للاستفسار عن مشاريعنا وخدماتنا! وكيل الدعم متاح على مدار الساعة.",
    imageAlt: "أفق مدينة الرياض ليلاً",
  },
  details: {
    title: "معلومات التواصل",
    hoursLabel: "ساعات الدعم",
    hoursDays: "على مدار الساعة",
    hoursTime: "وكيل الدعم متاح 24/7",
    linkedinLead: "تفضّل LinkedIn؟",
    linkedinLink: "تابع جريد نوفا للطاقة",
    linkedinTail: "لمتابعة تحديثات المشاريع والإعلانات.",
  },
  map: {
    title: "جريد نوفا للطاقة — المقر الرئيسي",
    address: "3842 طريق مكة المكرمة، الرياض 12421",
    directions: "الحصول على الاتجاهات",
    frameTitle: "خرائط Google — المقر الرئيسي لشركة جريد نوفا للطاقة، الرياض",
  },
};
