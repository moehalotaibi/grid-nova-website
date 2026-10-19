import type { L } from "@/i18n/LocaleProvider";

export type Service = {
  slug: string;
  number: string;
  title: L;
  tagline: L;
  summary: L;
  /** card image base name (16:10 → 282 × 176) */
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "manufacturing",
    number: "01",
    title: { en: "Manufacturing", ar: "التصنيع" },
    tagline: { en: "High-quality products", ar: "منتجات عالية الجودة" },
    summary: {
      en: "Transformers, MV/LV switchgear and distribution boards produced in a certified facility under a multi-stage quality management system.",
      ar: "محولات ولوحات توزيع ومفاتيح جهد متوسط ومنخفض تُنتج في منشأة معتمدة وفق نظام إدارة جودة متعدد المراحل.",
    },
    image: "svc1",
    imageAlt: "Inside an industrial manufacturing hall",
  },
  {
    slug: "energy-generation",
    number: "02",
    title: { en: "Energy Generation", ar: "توليد الطاقة" },
    tagline: { en: "For sustainable power", ar: "من أجل طاقة مستدامة" },
    summary: {
      en: "Planning, design and execution of power generation facilities that prioritise performance, safety and long-term reliability.",
      ar: "تخطيط وتصميم وتنفيذ منشآت توليد الطاقة مع إعطاء الأولوية للأداء والسلامة والموثوقية طويلة الأمد.",
    },
    image: "svc2",
    imageAlt: "Rows of solar panels under a clear sky",
  },
  {
    slug: "construction",
    number: "03",
    title: { en: "Construction", ar: "الإنشاءات" },
    tagline: { en: "Building the entire station", ar: "بناء المحطة بالكامل" },
    summary: {
      en: "Complete power plants and substations built to the highest standards of quality, safety and regulatory compliance.",
      ar: "محطات توليد ومحطات فرعية متكاملة تُبنى وفق أعلى معايير الجودة والسلامة والامتثال التنظيمي.",
    },
    image: "svc3",
    imageAlt: "Tower cranes silhouetted against a sunset",
  },
  {
    slug: "commissioning-testing",
    number: "04",
    title: { en: "Commissioning & Testing", ar: "التشغيل والاختبار" },
    tagline: { en: "Verified, ready to energize", ar: "تحقق كامل قبل التشغيل" },
    summary: {
      en: "Structured FAT/SAT, inspection, calibration and verification so every system performs exactly to design specification.",
      ar: "اختبارات قبول مصنعية وموقعية (FAT/SAT) وفحص ومعايرة وتحقق لضمان أداء كل نظام وفق مواصفات التصميم.",
    },
    image: "svc4",
    imageAlt: "Technician wiring an electrical panel",
  },
];

export const serviceBySlug = (slug: string | undefined) => services.find((s) => s.slug === slug);
