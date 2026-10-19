import type { L } from "@/i18n/LocaleProvider";

/** Company facts, taken from the previous website (energy.shrhan.com › Contact us). */
export const SITE = {
  name: "Grid Nova Energy",
  phone: "+966 11 233 3370",
  phoneHref: "tel:+966112333370",
  email: "info@grid-nova.com",
  address: "3842 Makkah Al Mukarramah Rd., Riyadh 12421, Saudi Arabia",
  /** Branch offices (the old site lists one, with the same switchboard number). */
  branches: [
    {
      name: { en: "Dammam office", ar: "مكتب الدمام" } as L,
      address: { en: "Abdul Rahman Bin Bishr Al-Abdi St., Dammam 32444, Saudi Arabia", ar: "شارع عبدالرحمن بن بشر العبدي، الدمام 32444، المملكة العربية السعودية" } as L,
      phone: "+966 11 233 3370",
      phoneHref: "tel:+966112333370",
    },
  ],
  /** Only LinkedIn is live on the old site; X and Instagram were placeholder links. Empty = hidden. */
  social: {
    linkedin: "https://www.linkedin.com/company/alsharhan-energy/",
    x: "",
    instagram: "",
  },
  /** Company profile facts as published on the LinkedIn page (not rendered yet). */
  linkedin: {
    industry: { en: "Electric Power Transmission, Control, and Distribution", ar: "نقل الطاقة الكهربائية والتحكم فيها وتوزيعها" } as L,
    companySize: { en: "51–200 employees", ar: "51–200 موظف" } as L,
    type: { en: "Partnership", ar: "شراكة" } as L,
    about: {
      en: "At Grid Nova Energy, we provide innovative and sustainable solutions to meet today’s needs and tomorrow’s aspirations. With a commitment to quality and excellence, we provide comprehensive services that include planning, implementation, and maintenance of renewable and conventional energy projects. We are your ideal partner in your journey towards clean and efficient energy.",
    } as L,
  },
  profilePdf: "/grid-nova-company-profile.pdf",
};

/** `suffix` renders smaller next to the number (“90 %”, “45 +”, “4.5 k”, “30 years”). */
export type Stat = { value: string; suffix?: L; label: L };
export const stats: Stat[] = [
  { value: "90", suffix: { en: "%" }, label: { en: "Client satisfaction", ar: "رضا العملاء" } },
  { value: "45", suffix: { en: "+" }, label: { en: "Completed projects", ar: "مشاريع منجزة" } },
  { value: "4.5", suffix: { en: "k", ar: "ألف" }, label: { en: "Items in stock", ar: "منتجات متوفرة" } },
  { value: "30", suffix: { en: "years", ar: "عاماً" }, label: { en: "Years of experience", ar: "سنوات الخبرة" } },
];

export type Partner = { id: string; name: string; src: string; width: number; height: number; srcSet?: string };
