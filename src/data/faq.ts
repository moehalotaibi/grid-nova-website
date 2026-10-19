import type { L } from "@/i18n/LocaleProvider";

export type FaqItem = { id: string; q: L; a: L };
export type FaqCategory = { id: string; title: L; items: FaqItem[] };

/**
 * FAQ content (Figma 39:1298). Questions and answers are the previous site's FAQ, rebranded
 * (energy.shrhan.com/faq · /ar/الاسئلة-المتكررة): its "Manufacturing" tab fills the Manufacturing category;
 * its "Construction / Energy Generation" tab is spread over Energy generation, Construction and
 * Commissioning & testing by subject. The EPC question is the one the design draws (no old-site counterpart).
 * Category labels reuse the existing Arabic service titles.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: { en: "General", ar: "عام" },
    items: [
      {
        id: "epc",
        q: {
          en: "Does Grid Nova Energy offer full EPC (engineering, procurement, construction) services?",
          ar: "هل تقدم جريد نوفا للطاقة خدمات EPC متكاملة (الهندسة والمشتريات والإنشاء)؟",
        },
        a: {
          en: "Yes. We provide a comprehensive turnkey solution, managing the entire project lifecycle from the first blueprint to the final construction and energization.",
          ar: "نعم. نقدم حلاً متكاملاً بنظام تسليم المفتاح، وندير دورة حياة المشروع بأكملها من المخطط الأول حتى الإنشاء النهائي والتشغيل الكهربائي.",
        },
      },
    ],
  },
  {
    id: "manufacturing",
    title: { en: "Manufacturing", ar: "التصنيع" },
    items: [
      {
        id: "in-house",
        q: {
          en: "What types of electrical equipment does Grid Nova Energy manufacture in-house?",
          ar: "ما هي أنواع المعدات الكهربائية التي تقوم شركة جريد نوفا للطاقة بتصنيعها داخلياً؟",
        },
        a: {
          en: "At Grid Nova Energy, we produce high-quality power transformers, MV/LV switchgears, and customized distribution boards. Our in-house manufacturing ensures that every component meets our strict internal quality benchmarks.",
          ar: "في شركة جريد نوفا للطاقة، نُنتج محولات طاقة عالية الجودة، ومفاتيح كهربائية متوسطة/منخفضة الجهد، ولوحات توزيع مُخصصة. يضمن تصنيعنا الداخلي أن كل مُكون يُلبي معايير الجودة الداخلية الصارمة لدينا.",
        },
      },
      {
        id: "standards",
        q: {
          en: "Do Grid Nova Energy products comply with international standards?",
          ar: "هل منتجات شركة جريد نوفا للطاقة متوافقة مع المعايير الدولية؟",
        },
        a: {
          en: "Yes, all equipment leaving the Grid Nova Energy factory is fully compliant with international standards like IEC and IEEE, ensuring global compatibility and maximum safety.",
          ar: "نعم، جميع المعدات التي تغادر مصنع جريد نوفا للطاقة متوافقة تمامًا مع المعايير الدولية مثل IEC وIEEE، مما يضمن التوافق العالمي وأقصى درجات السلامة.",
        },
      },
      {
        id: "custom",
        q: {
          en: "Can Grid Nova Energy customize equipment for specialized project needs?",
          ar: "هل تستطيع شركة جريد نوفا للطاقة تخصيص المعدات لتلبية احتياجات المشاريع المتخصصة؟",
        },
        a: {
          en: "Customization is one of our core strengths. Grid Nova Energy engineers can design and build bespoke electrical solutions tailored to the specific technical constraints of your site.",
          ar: "يُعدّ التخصيص أحد أهم نقاط قوتنا. يستطيع مهندسو شركة جريد نوفا للطاقة تصميم وبناء حلول كهربائية مصممة خصيصًا لتناسب القيود الفنية المحددة لموقعك.",
        },
      },
      {
        id: "quality",
        q: {
          en: "How does Grid Nova Energy ensure the quality of its manufactured goods?",
          ar: "كيف تضمن شركة جريد نوفا للطاقة جودة منتجاتها المصنعة؟",
        },
        a: {
          en: "Grid Nova Energy utilizes a multi-stage Quality Management System (QMS), testing raw materials upon arrival and performing rigorous stress tests on finished products before they are cleared for dispatch.",
          ar: "تستخدم شركة جريد نوفا للطاقة نظام إدارة الجودة متعدد المراحل، حيث تقوم باختبار المواد الخام عند وصولها وإجراء اختبارات إجهاد صارمة على المنتجات النهائية قبل السماح بشحنها.",
        },
      },
      {
        id: "lead-time",
        q: {
          en: "What is the lead time for equipment manufactured by Grid Nova Energy?",
          ar: "ما هي المدة الزمنية اللازمة لتوريد المعدات المصنعة من قبل شركة جريد نوفا للطاقة؟",
        },
        a: {
          en: "Because Grid Nova Energy controls the production line, we offer highly competitive lead times, often delivering critical equipment faster than competitors who rely on external suppliers.",
          ar: "لأن شركة جريد نوفا للطاقة تتحكم في خط الإنتاج، فإننا نقدم أوقات تسليم تنافسية للغاية، وغالبًا ما نقوم بتسليم المعدات الحيوية بشكل أسرع من المنافسين الذين يعتمدون على الموردين الخارجيين.",
        },
      },
    ],
  },
  {
    id: "energy-generation",
    title: { en: "Energy generation", ar: "توليد الطاقة" },
    items: [
      {
        id: "lifespan",
        q: {
          en: "What is the lifespan of a project implemented by Grid Nova Energy?",
          ar: "ما هو العمر الافتراضي لمشروع تنفذه شركة جريد نوفا للطاقة؟",
        },
        a: {
          en: "We build for the long term. Projects and equipment managed by Grid Nova Energy are designed for a lifecycle of 25–30 years with proper maintenance.",
          ar: "نحن نبني للمستقبل. المشاريع والمعدات التي تديرها شركة جريد نوفا للطاقة مصممة لدورة حياة تتراوح بين 25 و30 عامًا مع الصيانة المناسبة.",
        },
      },
      {
        id: "maintenance",
        q: {
          en: "Does Grid Nova Energy provide ongoing maintenance after construction?",
          ar: "هل تقدم شركة جريد نوفا للطاقة خدمات الصيانة المستمرة بعد الإنشاء؟",
        },
        a: {
          en: "Beyond construction, Grid Nova Energy offers long-term maintenance contracts, including routine inspections and rapid-response repair services to ensure maximum uptime.",
          ar: "إلى جانب أعمال البناء، تقدم شركة جريد نوفا للطاقة عقود صيانة طويلة الأجل، بما في ذلك عمليات التفتيش الروتينية وخدمات الإصلاح سريعة الاستجابة لضمان أقصى وقت تشغيل.",
        },
      },
    ],
  },
  {
    id: "construction",
    title: { en: "Construction", ar: "الإنشاءات" },
    items: [
      {
        id: "grid-integration",
        q: {
          en: "Can Grid Nova Energy integrate new power stations into the existing national grid?",
          ar: "هل تستطيع شركة جريد نوفا للطاقة دمج محطات توليد الطاقة الجديدة في الشبكة الوطنية الحالية؟",
        },
        a: {
          en: "Specialized grid integration is a key service. Grid Nova Energy ensures that all new installations are perfectly synchronized with the existing utility infrastructure for seamless power flow.",
          ar: "يُعدّ دمج الشبكة الكهربائية المتخصصة خدمةً أساسية. وتضمن شركة جريد نوفا للطاقة تزامن جميع التركيبات الجديدة تماماً مع البنية التحتية القائمة للمرافق العامة لضمان تدفق سلس للطاقة.",
        },
      },
    ],
  },
  {
    id: "commissioning-testing",
    title: { en: "Commissioning & testing", ar: "التشغيل والاختبار" },
    items: [
      {
        id: "process",
        q: {
          en: "What is the Grid Nova Energy process for commissioning a new station?",
          ar: "ما هي آلية شركة جريد نوفا للطاقة لتشغيل محطة جديدة؟",
        },
        a: {
          en: "Our team conducts thorough Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure that every Grid Nova Energy project is fully optimized and safe for live operation.",
          ar: "يقوم فريقنا بإجراء اختبارات قبول المصنع (FAT) واختبارات قبول الموقع (SAT) لضمان أن كل مشروع من مشاريع شركة جريد نوفا للطاقة يتم تحسينه بالكامل ويكون آمنًا للتشغيل الفعلي.",
        },
      },
      {
        id: "remote-monitoring",
        q: {
          en: "Does Grid Nova Energy offer remote monitoring for its power stations?",
          ar: "هل تقدم شركة جريد نوفا للطاقة خدمة المراقبة عن بعد لمحطات توليد الطاقة التابعة لها؟",
        },
        a: {
          en: "Yes, Grid Nova Energy integrates advanced SCADA and IoT monitoring systems, allowing clients to track performance and detect faults remotely in real-time.",
          ar: "نعم، تقوم شركة جريد نوفا للطاقة بدمج أنظمة مراقبة SCADA وIoT المتقدمة، مما يسمح للعملاء بتتبع الأداء واكتشاف الأعطال عن بعد في الوقت الفعلي.",
        },
      },
    ],
  },
];
