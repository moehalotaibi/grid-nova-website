import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * About page strings (Figma 37:722). English is the source of truth; the Arabic partial only
 * reuses strings that already exist in the shared set — everything else falls back to English
 * (handoff › board 20 "Missing data"). Arrays are never partially overridden (deepMerge replaces them).
 */
export const aboutEn = {
  meta: {
    description:
      "A national player in smart energy solutions and local equipment manufacturing — focusing on efficiency and performance since day one.",
  },
  hero: {
    eyebrow: "About Grid Nova Energy",
    title: "Building a sustainable future",
    intro: "A national player in smart energy solutions and local equipment manufacturing — focusing on efficiency and performance since day one.",
    imageAlt: "Control room of an electrical substation lined with switchgear and metering panels",
  },
  intro: {
    eyebrow: "Who we are",
    title: "Focusing on efficiency & performance",
    paragraphs: [
      "Grid Nova Energy was established to seize emerging opportunities in the energy transmission infrastructure sector in the Kingdom of Saudi Arabia, with the aim of supporting Vision 2030 by becoming a national player in smart energy solutions and local equipment manufacturing.",
      "We implement quality projects and are fully committed to ISO 9001 standards — a trusted partner in developing integrated energy projects to the highest international standards, providing smart and innovative solutions that enhance the reliability and flexibility of the network.",
    ],
    download: "Download company profile",
    stats: [
      { value: "30", label: "Years of energy construction experience", tone: "green" as const },
      { value: "45+", label: "Completed projects", tone: "blue" as const },
      { value: "90%", label: "Client satisfaction", tone: "blue" as const },
      { value: "4.5k", label: "Items in stock", tone: "green" as const },
    ],
  },
  pillars: {
    eyebrow: "What drives us",
    title: "Trusted expertise, innovative ideas, quality assurance",
    items: [
      {
        title: "Trusted expertise",
        body: "Integrated solutions for clean and sustainable energy generation — helping institutions and projects move with confidence.",
      },
      {
        title: "Innovative ideas",
        body: "Transforming creative concepts into practical, efficient and sustainable energy solutions that drive progress across the industry.",
      },
      {
        title: "Quality assurance",
        body: "High-quality products crafted with precision and reliability, designed to meet industry standards and exceed customer expectations.",
      },
    ],
  },
  bridging: {
    eyebrow: "Energy generation & production",
    title: "Bridging the gap: today's ideas, tomorrow's solutions",
    body: "A trusted partner in developing integrated energy projects according to the highest international standards — providing smart and innovative solutions that enhance the reliability and flexibility of the network.",
    points: ["Efficient power generation", "Smart grid integration for stable transmission", "Continuous monitoring and maintenance"],
    imageAlt: "Aerial view of rows of solar panels stretching across a desert plain",
  },
  capabilities: {
    eyebrow: "Large production capabilities",
    title: "Made with respect for our planet and people",
    features: [
      { title: "Quality inspection", body: "We perform quality inspection activities in manufacturing, in energy and in project delivery." },
      { title: "Energy delivery", body: "We are committed to delivering power in a safe and reliable manner." },
    ],
    bars: [
      { label: "AI automation", value: 80 },
      { label: "Oil & gas industry", value: 60 },
      { label: "Mechanical engineering", value: 70 },
      { label: "Cost-saving deals", value: 90 },
    ],
  },
  board: {
    eyebrow: "Leadership",
    title: "Board of directors",
    intro: "A vision of principle and a team committed to success.",
    linkedin: (name: string) => `${name} on LinkedIn`,
  },
  standards: {
    label: "Standards we work to",
    items: ["ISO 9001", "IEC", "IEEE", "National Grid SA standards", "Vision 2030"],
  },
  cta: {
    title: "Work with a partner who builds for the long term.",
    intro: "Projects and equipment designed for a 25–30 year lifecycle, maintained by our own teams.",
    secondary: "See our projects",
  },
};

export type AboutStrings = typeof aboutEn;

/**
 * Arabic copy. Transcribed from the previous company website (Al Sharhan Energy → Grid Nova Energy:
 * /ar/حولنا, /ar/المديرون and the Arabic homepage) wherever our copy has a counterpart; the remaining
 * keys (hero intro, alt text, standards, CTA, aria labels) are translated to match. Arrays are given in
 * full because deepMerge replaces them wholesale.
 */
export const aboutAr: DeepPartial<AboutStrings> = {
  meta: {
    description: "شركة وطنية رائدة في حلول الطاقة الذكية وتصنيع المعدات محلياً — نركز على الكفاءة والأداء منذ اليوم الأول.",
  },
  hero: {
    eyebrow: "عن جريد نوفا للطاقة",
    title: "بناء مستقبل مستدام",
    intro: "شركة وطنية رائدة في حلول الطاقة الذكية وتصنيع المعدات محلياً — نركز على الكفاءة والأداء منذ اليوم الأول.",
    imageAlt: "غرفة التحكم في محطة كهرباء فرعية تصطف فيها لوحات المفاتيح وأجهزة القياس",
  },
  intro: {
    eyebrow: "من نحن",
    title: "نركز على الكفاءة والأداء",
    paragraphs: [
      "تأسست شركة جريد نوفا للطاقة لاغتنام الفرص الناشئة في قطاع البنية التحتية لنقل الطاقة في المملكة العربية السعودية، بهدف دعم رؤية 2030 من خلال أن تصبح شركة وطنية رائدة في حلول الطاقة الذكية وتصنيع المعدات محلياً.",
      "نحن ننفذ مشاريع عالية الجودة ونلتزم تماماً بمعايير ISO 9001 — شريك موثوق به في تطوير مشاريع الطاقة المتكاملة وفقاً لأعلى المعايير الدولية، من خلال توفير حلول ذكية ومبتكرة تعزز موثوقية ومرونة شبكات الطاقة.",
    ],
    download: "تحميل الملف التعريفي",
    stats: [
      { value: "30", label: "سنوات من الخبرة في مجال إنشاءات الطاقة", tone: "green" },
      { value: "45+", label: "مشاريع منجزة", tone: "blue" },
      { value: "90%", label: "مستوى رضى العملاء", tone: "blue" },
      { value: "4.5 ألف", label: "منتجات متوفرة", tone: "green" },
    ],
  },
  pillars: {
    eyebrow: "ما يحركنا",
    title: "خبرة موثوقة، وابتكار الأفكار، وضمان الجودة",
    items: [
      {
        title: "خبرة موثوقة",
        body: "حلول متكاملة لتوليد الطاقة النظيفة والمستدامة — نسعى لمساعدة المؤسسات والمشاريع على المضي قدماً بثقة.",
      },
      {
        title: "ابتكار الأفكار",
        body: "تحويل المفاهيم الإبداعية إلى حلول طاقة عملية وفعالة ومستدامة تدفع التقدم والابتكار في الصناعة.",
      },
      {
        title: "ضمان الجودة",
        body: "تقديم منتجات عالية الجودة مصنوعة بدقة وموثوقية، مصممة لتلبية معايير الصناعة وتجاوز توقعات العملاء.",
      },
    ],
  },
  bridging: {
    eyebrow: "توليد وإنتاج الطاقة",
    title: "سد الفجوة: أفكار اليوم، حلول الغد",
    body: "شريك موثوق به في تطوير مشاريع الطاقة المتكاملة وفقاً لأعلى المعايير الدولية — من خلال توفير حلول ذكية ومبتكرة تعزز موثوقية ومرونة شبكات الطاقة.",
    points: ["توليد الطاقة بكفاءة", "دمج الشبكة الذكية لنقل مستقر", "المراقبة والصيانة المستمرة"],
    imageAlt: "منظر جوي لصفوف من الألواح الشمسية تمتد عبر سهل صحراوي",
  },
  capabilities: {
    eyebrow: "قدرات إنتاجية كبيرة",
    title: "صُنع باحترام لكوكبنا وشعبنا",
    features: [
      { title: "فحص الجودة", body: "بإمكاننا القيام بأنشطة فحص الجودة في مجالات التصنيع والطاقة وتسليم المشاريع." },
      { title: "توصيل الطاقة", body: "نحن ملتزمون بتوفير الطاقة بطريقة آمنة وموثوقة." },
    ],
    bars: [
      { label: "الأتمتة بالذكاء الاصطناعي", value: 80 },
      { label: "مصانع النفط والغاز", value: 60 },
      { label: "الهندسة الميكانيكية", value: 70 },
      { label: "صفقات موفّرة للتكاليف", value: 90 },
    ],
  },
  board: {
    eyebrow: "القيادة",
    title: "مجلس الإدارة",
    intro: "رؤية واضحة وفريق ملتزم نحو النجاح.",
    linkedin: (name: string) => `${name} على LinkedIn`,
  },
  standards: {
    label: "المعايير التي نعمل وفقها",
    items: ["ISO 9001", "IEC", "IEEE", "معايير الشركة الوطنية لنقل الكهرباء", "رؤية 2030"],
  },
  cta: {
    title: "اعمل مع شريك يبني للمدى الطويل.",
    intro: "مشاريع ومعدات مصممة لدورة حياة تمتد من 25 إلى 30 عاماً، وتتولى صيانتها فرقنا الخاصة.",
    secondary: "عرض مشاريعنا",
  },
};
