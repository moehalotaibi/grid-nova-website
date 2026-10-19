import type { L } from "@/i18n/LocaleProvider";

/**
 * Per-service content for /services (Section / Service rows, Figma 28:123) and the
 * Service detail template (Section / Main, Figma 30:209 · 32:269 · 32:466 · 32:663).
 * Keyed by the four slugs in `services.ts`; `extraServiceRows` holds rows drawn on the
 * overview page that have no detail design (AI & Robotics).
 *
 * Arabic: overview blocks, check-list, feature tiles and most FAQs are transcribed from the
 * previous company site (rebranded to Grid Nova Energy); the hero intros, row descriptions,
 * capability grids and CTAs have no counterpart there and are translated from the English.
 */
export type DetailIcon = "zap" | "grid" | "box" | "cpu" | "award";

export type TextBlock = { title: L; body: L; bullets?: L[] };
export type FactTile = { icon: DetailIcon; title: L; body: L };
export type Capability = { icon: DetailIcon; title: L; body: L };
export type GalleryPhoto = { image: string; alt: string };
export type FaqItem = { q: L; a: L };

export type ServiceRowContent = {
  /** Blue eyebrow after the number rule on the overview row */
  tagline: L;
  description: L;
  bullets: L[];
  /** 560 × 380 WebP base name */
  image: string;
  imageAlt: string;
};

export type ServiceDetail = {
  slug: string;
  hero: { eyebrow: L; intro: L; image: string; imageAlt: string };
  row: ServiceRowContent;
  /** Text blocks s1 / s2 — the second carries the check-list */
  overview: TextBlock[];
  /** Feature tiles */
  keyFacts: FactTile[];
  /** "What we produce / build / construct / test" */
  capabilities: { title: L; items: Capability[] };
  /** 380 × 240 WebP base names */
  gallery: GalleryPhoto[];
  faqs: FaqItem[];
  cta: { title: L; intro: L };
  /** Slugs from projects.ts (not drawn in the Figma Main section; kept for cross-linking) */
  relatedProjects: string[];
};

/* Check-list under the second text block — identical on all four detail pages in Figma. */
const SYSTEMATIC_BULLETS: L[] = [
  { en: "Efficient power generation using advanced and reliable technologies", ar: "توليد الطاقة بكفاءة باستخدام تقنيات متقدمة وموثوقة" },
  { en: "Smart grid integration for stable transmission and distribution", ar: "دمج الشبكة الذكية لتحقيق استقرار في النقل والتوزيع" },
  { en: "Continuous monitoring and maintenance to ensure power supply", ar: "المراقبة والصيانة المستمرة لضمان توفير الطاقة" },
];

const PREDICTIVE_TILE: FactTile = {
  icon: "cpu",
  title: { en: "Predictive machines", ar: "آلات تنبؤية" },
  body: {
    en: "Advanced sensors and AI monitor equipment to predict failures.",
    ar: "تراقب المستشعرات المتقدمة والذكاء الاصطناعي المعدات للتنبؤ بالأعطال.",
  },
};

/* Shared Arabic answers (the English pool below repeats the same answer under long / short questions). */
const AR_REMOTE_MONITORING =
  "نعم، ندمج أنظمة المراقبة المتقدمة SCADA وIoT، مما يتيح للعملاء تتبع الأداء واكتشاف الأعطال عن بُعد في الوقت الفعلي.";
const AR_GRID_INTEGRATION =
  "يُعدّ الدمج المتخصص في الشبكة الكهربائية خدمةً أساسية لدينا، إذ نضمن تزامن جميع التركيبات الجديدة تماماً مع البنية التحتية القائمة للمرافق لضمان تدفق سلس للطاقة.";
const AR_QUALITY =
  "نستخدم نظام إدارة جودة متعدد المراحل، حيث نختبر المواد الخام عند وصولها ونجري اختبارات إجهاد صارمة على المنتجات النهائية قبل السماح بشحنها.";

/* FAQ pool. Figma only draws the first (open) answer of each list; the others are composed from
   the services copy and should be confirmed with the client before launch. */
const FAQ = {
  remoteMonitoring: {
    q: {
      en: "Does Grid Nova Energy offer remote monitoring for its power stations?",
      ar: "هل تقدم جريد نوفا للطاقة خدمة المراقبة عن بُعد لمحطات توليد الطاقة التابعة لها؟",
    },
    a: {
      en: "Yes — we integrate advanced SCADA and IoT monitoring systems, allowing clients to track performance and detect faults remotely in real time.",
      ar: AR_REMOTE_MONITORING,
    },
  },
  remoteMonitoringShort: {
    q: { en: "Do you offer remote monitoring for power stations?", ar: "هل تقدمون خدمة المراقبة عن بُعد لمحطات توليد الطاقة؟" },
    a: {
      en: "Yes — we integrate advanced SCADA and IoT monitoring systems, allowing clients to track performance and detect faults remotely in real time.",
      ar: AR_REMOTE_MONITORING,
    },
  },
  gridIntegration: {
    q: {
      en: "Can you integrate new power stations into the existing national grid?",
      ar: "هل يمكنكم دمج محطات توليد الطاقة الجديدة في الشبكة الوطنية الحالية؟",
    },
    a: {
      en: "Specialised grid integration is a key service — we ensure all new installations are perfectly synchronised with the existing utility infrastructure for seamless power flow.",
      ar: AR_GRID_INTEGRATION,
    },
  },
  gridIntegrationShort: {
    q: { en: "Can you integrate new stations into the national grid?", ar: "هل يمكنكم دمج المحطات الجديدة في الشبكة الوطنية؟" },
    a: {
      en: "Specialised grid integration is a key service — we ensure all new installations are perfectly synchronised with the existing utility infrastructure for seamless power flow.",
      ar: AR_GRID_INTEGRATION,
    },
  },
  qualityGoods: {
    q: { en: "How do you ensure the quality of manufactured goods?", ar: "كيف تضمنون جودة المنتجات المصنّعة؟" },
    a: {
      en: "We use a multi-stage Quality Management System — testing raw materials on arrival and performing rigorous stress tests on finished products before dispatch.",
      ar: AR_QUALITY,
    },
  },
  safety: {
    q: { en: "How do you manage safety on construction sites?", ar: "كيف تديرون السلامة في مواقع البناء؟" },
    a: {
      en: "Safety is a core value at Grid Nova Energy. We implement strict HSE protocols and provide continuous safety training to our on-site crews to ensure a zero-accident environment.",
      ar: "السلامة قيمة أساسية لدينا في جريد نوفا للطاقة. نطبق بروتوكولات صارمة للصحة والسلامة والبيئة، ونوفر تدريباً مستمراً على السلامة لأطقم العمل لدينا في الموقع لضمان بيئة خالية من الحوادث.",
    },
  },
  commissioningProcess: {
    q: { en: "What is the process for commissioning a new station?", ar: "ما هي آلية تشغيل محطة جديدة لدى جريد نوفا للطاقة؟" },
    a: {
      en: "Our team conducts thorough Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure every project is fully optimised and safe for live operation.",
      ar: "يقوم فريقنا بإجراء اختبارات قبول المصنع (FAT) واختبارات قبول الموقع (SAT) لضمان أن كل مشروع يتم تحسينه بالكامل ويكون آمناً للتشغيل الفعلي.",
    },
  },
  customised: {
    q: { en: "Can equipment be customised for specialised project needs?", ar: "هل يمكن تخصيص المعدات لتلبية احتياجات المشاريع المتخصصة؟" },
    a: {
      en: "Yes — customisation is one of our core strengths. Our engineers can design and build bespoke electrical solutions tailored to the specific technical constraints of your site.",
      ar: "نعم، يُعدّ التخصيص أحد أهم نقاط قوتنا. يستطيع مهندسونا تصميم وبناء حلول كهربائية مصممة خصيصاً لتناسب القيود الفنية المحددة لموقعك.",
    },
  },
  standards: {
    q: { en: "Do your products comply with international standards?", ar: "هل منتجاتكم متوافقة مع المعايير الدولية؟" },
    a: {
      en: "Yes. All equipment leaving our factory is fully compliant with international standards such as IEC and IEEE, ensuring global compatibility and maximum safety.",
      ar: "نعم، جميع المعدات التي تغادر مصنعنا متوافقة تماماً مع المعايير الدولية مثل IEC وIEEE، مما يضمن التوافق العالمي وأقصى درجات السلامة.",
    },
  },
  leadTime: {
    q: { en: "What is the lead time for manufactured equipment?", ar: "ما المدة الزمنية اللازمة لتوريد المعدات المصنّعة؟" },
    a: {
      en: "Because we control the production line, we offer highly competitive lead times — often delivering critical equipment faster than competitors who rely on external suppliers.",
      ar: "لأننا نتحكم في خط الإنتاج، فإننا نقدم أوقات تسليم تنافسية للغاية، وغالباً ما نسلّم المعدات الحيوية بشكل أسرع من المنافسين الذين يعتمدون على الموردين الخارجيين.",
    },
  },
  stationTypes: {
    q: { en: "What types of energy stations are you capable of building?", ar: "ما أنواع محطات الطاقة التي تستطيعون بناءها؟" },
    a: {
      en: "We have the experience to build a wide range of facilities — from traditional power stations to solar PV plants and industrial electrical hubs — all planned, designed and executed to prioritise performance, safety and long-term reliability.",
      ar: "نمتلك الخبرة اللازمة لبناء مجموعة واسعة من المرافق — من محطات الطاقة التقليدية إلى محطات الطاقة الشمسية الكهروضوئية والمراكز الكهربائية الصناعية — ويتم تخطيطها وتصميمها وتنفيذها جميعاً مع إعطاء الأولوية للأداء والسلامة والموثوقية طويلة الأمد.",
    },
  },
  maintenance: {
    q: { en: "Do you provide ongoing maintenance after construction?", ar: "هل تقدمون صيانة مستمرة بعد الإنشاء؟" },
    a: {
      en: "Yes. Beyond construction, we offer long-term maintenance contracts, including routine inspections and rapid-response repair services to ensure maximum uptime.",
      ar: "نعم. إلى جانب الإنشاء، نقدم عقود صيانة طويلة الأجل تشمل الفحوصات الدورية وخدمات الإصلاح سريعة الاستجابة لضمان أقصى وقت تشغيل.",
    },
  },
  lifespan: {
    q: { en: "What is the lifespan of a project you implement?", ar: "ما العمر الافتراضي لمشروع تنفذه جريد نوفا للطاقة؟" },
    a: {
      en: "We build for the long term. Projects and equipment we deliver are designed for a lifecycle of 25–30 years with proper maintenance.",
      ar: "نحن نبني للمستقبل. المشاريع والمعدات التي ننفذها مصممة لدورة حياة تتراوح بين 25 و30 عاماً مع الصيانة المناسبة.",
    },
  },
} satisfies Record<string, FaqItem>;

const CONTROL_ROOM_ALT = "Operators' control room lined with switchgear and instrument panels";

export const serviceDetails: Record<string, ServiceDetail> = {
  manufacturing: {
    slug: "manufacturing",
    hero: {
      eyebrow: { en: "Top rated quality products", ar: "منتجات عالية الجودة ذات تصنيف مرتفع" },
      intro: {
        en: "Certified in-house production of transformers, switchgear and distribution boards — engineered for a reliable, modern grid.",
        ar: "إنتاج داخلي معتمد للمحولات والمفاتيح الكهربائية ولوحات التوزيع — مصمم هندسياً لشبكة حديثة وموثوقة.",
      },
      image: "svc-hero-manufacturing",
      imageAlt: "Inside an industrial manufacturing hall",
    },
    row: {
      tagline: { en: "High-quality products", ar: "منتجات عالية الجودة" },
      description: {
        en: "Modern energy manufacturing relies on highly integrated systems that combine generation, transmission and distribution into a reliable network. Our certified facility produces equipment that meets strict internal quality benchmarks and international standards such as IEC and IEEE.",
        ar: "يعتمد التصنيع الحديث للطاقة على أنظمة متكاملة للغاية تجمع بين التوليد والنقل والتوزيع في شبكة موثوقة. تُنتج منشأتنا المعتمدة معدات تلبي معايير الجودة الداخلية الصارمة والمعايير الدولية مثل IEC وIEEE.",
      },
      bullets: [
        { en: "Power transformers", ar: "محولات الطاقة" },
        { en: "MV / LV switchgear", ar: "مفاتيح كهربائية متوسطة / منخفضة الجهد" },
        { en: "Customised distribution boards", ar: "لوحات توزيع مخصصة" },
      ],
      image: "svc-row-manufacturing",
      imageAlt: "Inside an industrial manufacturing hall",
    },
    overview: [
      {
        title: { en: "Modern ways of manufacturing", ar: "طرق حديثة لتصنيع المنتجات" },
        body: {
          en: "Modern energy and electricity manufacturing relies on highly integrated systems that combine generation, transmission and distribution into a reliable network. Power plants are designed for efficiency and resilience, using advanced control systems to manage load demand, minimise losses and ensure uninterrupted supply. From renewable sources to conventional generation, facilities are optimised to balance performance, safety and environmental responsibility.",
          ar: "يعتمد التصنيع الحديث للطاقة والكهرباء على أنظمة متكاملة للغاية تجمع بين التوليد والنقل والتوزيع في شبكة موثوقة. تم تصميم محطات الطاقة لتحقيق الكفاءة والمرونة، باستخدام أنظمة التحكم المتقدمة لإدارة الطلب على الأحمال وتقليل الخسائر وضمان الإمداد المستمر. من المصادر المتجددة إلى التوليد التقليدي، يتم تحسين المنشآت لتحقيق التوازن بين الأداء والسلامة والمسؤولية البيئية.",
        },
      },
      {
        title: { en: "Industry 4.0 — the systematic approach", ar: "الصناعة 4.0 — النهج المنهجي" },
        body: {
          en: "Large-scale electrical infrastructure supports the stable flow of energy across regions. Substations, transmission lines and grid management systems work together to regulate voltage, prevent overloads and maintain grid stability. Continuous monitoring and predictive maintenance enable operators to detect faults early, improve reliability and adapt to fluctuating demand while supporting the transition toward cleaner, smarter power systems.",
          ar: "تدعم البنية التحتية الكهربائية واسعة النطاق التدفق المستقر للطاقة عبر المناطق. تعمل المحطات الفرعية وخطوط النقل وأنظمة إدارة الشبكة معاً لتنظيم الجهد ومنع التحميل الزائد والحفاظ على استقرار الشبكة. وتُمكّن المراقبة المستمرة والصيانة التنبؤية المشغلين من اكتشاف الأعطال مبكراً وتحسين الموثوقية والتكيف مع الطلب المتغير على الطاقة، مع دعم الانتقال نحو أنظمة طاقة أنظف وأكثر ذكاءً.",
        },
        bullets: SYSTEMATIC_BULLETS,
      },
    ],
    keyFacts: [
      PREDICTIVE_TILE,
      {
        icon: "award",
        title: { en: "Certified factory", ar: "مصنع معتمد" },
        body: {
          en: "Manufactured in a certified facility meeting strict quality standards.",
          ar: "تم التصنيع في منشأة معتمدة تلبي معايير الجودة الصارمة.",
        },
      },
    ],
    capabilities: {
      title: { en: "What we produce", ar: "ما نصنّعه" },
      items: [
        {
          icon: "zap",
          title: { en: "Power transformers", ar: "محولات الطاقة" },
          body: { en: "High-capacity 132/13.8 kV and 132/33 kV units", ar: "وحدات عالية السعة بجهد 132/13.8 kV و132/33 kV" },
        },
        {
          icon: "grid",
          title: { en: "MV / LV switchgear", ar: "مفاتيح كهربائية متوسطة / منخفضة الجهد" },
          body: { en: "GIS and AIS configurations", ar: "بتهيئتي GIS وAIS" },
        },
        {
          icon: "box",
          title: { en: "Distribution boards", ar: "لوحات التوزيع" },
          body: { en: "Customised to site constraints", ar: "مصممة خصيصاً لتناسب قيود الموقع" },
        },
      ],
    },
    gallery: [
      { image: "svc-gallery-manufacturing-1", alt: "Overhead cranes and assembly bays inside the manufacturing hall" },
      { image: "svc-gallery-manufacturing-2", alt: CONTROL_ROOM_ALT },
    ],
    faqs: [FAQ.remoteMonitoring, FAQ.qualityGoods, FAQ.customised, FAQ.commissioningProcess],
    cta: {
      title: { en: "Need bespoke equipment for your site?", ar: "هل تحتاج معدات مخصصة لموقعك؟" },
      intro: {
        en: "Customisation is one of our core strengths — our engineers design and build to your technical constraints.",
        ar: "التخصيص أحد أهم نقاط قوتنا — يصمم مهندسونا ويبنون وفق قيودك الفنية.",
      },
    },
    relatedProjects: ["al-rain-prefabricated-substation"],
  },

  "energy-generation": {
    slug: "energy-generation",
    hero: {
      eyebrow: { en: "For a more sustainable power", ar: "لتحقيق طاقة أكثر استدامة" },
      intro: {
        en: "Reliable, efficient power generation facilities — planned, designed and executed to meet diverse operational demands.",
        ar: "منشآت توليد طاقة موثوقة وفعالة — مخططة ومصممة ومنفذة لتلبية متطلبات التشغيل المتنوعة.",
      },
      image: "svc-hero-energy-generation",
      imageAlt: "Rows of solar panels under a clear sky",
    },
    row: {
      tagline: { en: "For sustainable power", ar: "من أجل طاقة مستدامة" },
      description: {
        en: "Energy generation is at the core of modern development. We plan, design and execute power generation facilities that prioritise performance, safety and long-term reliability — from traditional power stations to solar PV plants and industrial electrical hubs.",
        ar: "توليد الطاقة هو جوهر التطور الحديث. نخطط ونصمم وننفذ مرافق توليد الطاقة التي تعطي الأولوية للأداء والسلامة والموثوقية طويلة الأمد — من محطات الطاقة التقليدية إلى محطات الطاقة الشمسية الكهروضوئية والمراكز الكهربائية الصناعية.",
      },
      bullets: [
        { en: "Grid integration & synchronisation", ar: "الدمج في الشبكة والتزامن معها" },
        { en: "Solar PV plants and industrial hubs", ar: "محطات الطاقة الشمسية الكهروضوئية والمراكز الصناعية" },
        { en: "Designed for a 25–30 year lifecycle", ar: "مصممة لدورة حياة تتراوح بين 25 و30 عاماً" },
      ],
      image: "svc-row-energy-generation",
      imageAlt: "Rows of solar panels under a clear sky",
    },
    overview: [
      {
        title: { en: "Modern development of energy generation", ar: "التطوير الحديث لتوليد الطاقة" },
        body: {
          en: "Energy generation is at the core of modern development, providing the power required to support industries, infrastructure and growing communities. We specialise in delivering reliable and efficient energy generation solutions designed to meet diverse operational demands — spanning the planning, design and execution of power generation facilities that prioritise performance, safety and long-term reliability.",
          ar: "توليد الطاقة هو جوهر التطور الحديث، حيث يوفر القوة اللازمة لدعم الصناعات والبنية التحتية والمجتمعات المتنامية. في جريد نوفا للطاقة، نحن متخصصون في تقديم حلول توليد الطاقة الموثوقة والفعالة المصممة لتلبية متطلبات التشغيل المتنوعة. وتمتد خبرتنا إلى تخطيط وتصميم وتنفيذ مرافق توليد الطاقة التي تعطي الأولوية للأداء والسلامة والموثوقية طويلة الأمد.",
        },
      },
      {
        title: { en: "Energy generation — the systematic approach", ar: "توليد الطاقة — النهج المنهجي" },
        body: {
          en: "We integrate advanced technologies and proven engineering practices to maximise efficiency while minimising environmental impact. By emphasising sustainability, operational excellence and compliance with international standards, we help clients achieve dependable power generation that supports economic growth and a resilient energy future.",
          ar: "نركز على دمج التقنيات المتقدمة والممارسات الهندسية المثبتة لزيادة الكفاءة مع تقليل التأثير البيئي. ومن خلال التركيز على الاستدامة والتميز التشغيلي والامتثال للمعايير الدولية، نساعد عملاءنا في تحقيق توليد طاقة يُعتمد عليه يدعم النمو الاقتصادي ومستقبل الطاقة المستدام.",
        },
        bullets: SYSTEMATIC_BULLETS,
      },
    ],
    keyFacts: [
      PREDICTIVE_TILE,
      {
        icon: "award",
        title: { en: "Certified company", ar: "شركة معتمدة" },
        body: {
          en: "Energy generated in a certified facility meeting strict quality standards.",
          ar: "توليد الطاقة في منشأة معتمدة تلبي معايير الجودة الصارمة.",
        },
      },
    ],
    capabilities: {
      title: { en: "What we build", ar: "ما نبنيه" },
      items: [
        { icon: "zap", title: { en: "Power substations", ar: "المحطات الفرعية للطاقة" }, body: { en: "132/13.8 kV and 132/33 kV", ar: "بجهد 132/13.8 kV و132/33 kV" } },
        {
          icon: "grid",
          title: { en: "Solar PV plants", ar: "محطات الطاقة الشمسية الكهروضوئية" },
          body: { en: "High-quality, sustainable energy projects", ar: "مشاريع طاقة مستدامة وعالية الجودة" },
        },
        { icon: "box", title: { en: "Industrial electrical hubs", ar: "المراكز الكهربائية الصناعية" }, body: { en: "Grid-synchronised", ar: "متزامنة مع الشبكة" } },
      ],
    },
    gallery: [
      { image: "svc-gallery-energy-generation-1", alt: "Aerial view of a utility-scale solar farm" },
      { image: "svc-gallery-energy-generation-2", alt: "Rows of solar panels under a clear sky" },
    ],
    faqs: [FAQ.gridIntegration, FAQ.stationTypes, FAQ.maintenance, FAQ.lifespan],
    cta: {
      title: { en: "Planning a new generation facility?", ar: "هل تخطط لمنشأة توليد جديدة؟" },
      intro: {
        en: "From substations to solar PV plants — we design, build and integrate with the national grid.",
        ar: "من المحطات الفرعية إلى محطات الطاقة الشمسية الكهروضوئية — نصمم ونبني وندمج مع الشبكة الوطنية.",
      },
    },
    relatedProjects: ["ad-dayir-2-substation", "al-rain-prefabricated-substation"],
  },

  construction: {
    slug: "construction",
    hero: {
      eyebrow: { en: "Building the entire energy station", ar: "بناء محطة الطاقة بالكامل" },
      intro: {
        en: "Power and energy stations built to the highest standards of quality, safety and performance — on time and in full compliance.",
        ar: "محطات طاقة وكهرباء تُبنى وفق أعلى معايير الجودة والسلامة والأداء — في الوقت المحدد وبامتثال كامل.",
      },
      image: "svc-hero-construction",
      imageAlt: "Tower cranes silhouetted against a sunset",
    },
    row: {
      tagline: { en: "Construction of power stations", ar: "إنشاء محطات الطاقة" },
      description: {
        en: "We specialise in the construction of power and energy stations built to the highest standards of quality, safety and performance. Strict quality control, advanced methodologies and proven materials ensure long-term durability and operational reliability.",
        ar: "نحن متخصصون في بناء محطات الطاقة والكهرباء وفقاً لأعلى معايير الجودة والسلامة والأداء. وتضمن إجراءات مراقبة الجودة الصارمة والمنهجيات المتقدمة والمواد المثبتة المتانة طويلة الأمد والموثوقية التشغيلية.",
      },
      bullets: [
        { en: "Civil, structural & electrical works", ar: "الأعمال المدنية والإنشائية والكهربائية" },
        { en: "Control buildings & transformer bays", ar: "مباني التحكم وخلايا المحولات" },
        { en: "On-time, fully compliant delivery", ar: "تسليم في الوقت المحدد وبامتثال كامل" },
      ],
      image: "svc-row-construction",
      imageAlt: "Tower cranes silhouetted against a sunset",
    },
    overview: [
      {
        title: { en: "Modern ways of construction", ar: "طرق البناء الحديثة" },
        body: {
          en: "Construction is a critical phase in delivering reliable power and energy infrastructure. We specialise in the construction of power and energy stations built to the highest standards of quality, safety and performance. Our experienced teams manage every stage of the construction process with precision, ensuring projects are delivered on time and in full compliance with technical and regulatory requirements.",
          ar: "يُعتبر البناء مرحلة حاسمة في تقديم بنية تحتية موثوقة للطاقة والكهرباء. في جريد نوفا للطاقة، نحن متخصصون في بناء محطات الطاقة والكهرباء وفقاً لأعلى معايير الجودة والسلامة والأداء. وتدير فرقنا ذات الخبرة كل مرحلة من مراحل عملية البناء بدقة، لضمان تسليم المشاريع في الوقت المحدد ووفقاً للمتطلبات الفنية والتنظيمية.",
        },
      },
      {
        title: { en: "Constructing — the systematic approach", ar: "البناء — النهج المنهجي" },
        body: {
          en: "We apply strict quality control procedures, advanced construction methodologies and proven materials to ensure long-term durability and operational reliability. By combining skilled workmanship with strong project management, we construct energy facilities that support efficient operation, sustainable performance and lasting value for our clients.",
          ar: "نطبق إجراءات صارمة لمراقبة الجودة، ومنهجيات بناء متقدمة، ومواد مثبتة لضمان المتانة طويلة الأمد والموثوقية التشغيلية. ومن خلال الجمع بين المهارة في العمل والإدارة القوية للمشاريع، نقوم ببناء مرافق الطاقة التي تدعم التشغيل الفعال والأداء المستدام والقيمة الدائمة لعملائنا.",
        },
        bullets: SYSTEMATIC_BULLETS,
      },
    ],
    keyFacts: [
      PREDICTIVE_TILE,
      {
        icon: "award",
        title: { en: "Certified company", ar: "شركة معتمدة" },
        body: {
          en: "Constructed in a certified facility meeting strict quality standards.",
          ar: "تم البناء في منشأة معتمدة تلبي معايير الجودة الصارمة.",
        },
      },
    ],
    capabilities: {
      title: { en: "What we construct", ar: "ما ننشئه" },
      items: [
        { icon: "zap", title: { en: "132 kV substations", ar: "محطات فرعية بجهد 132 kV" }, body: { en: "Greenfield EPC delivery", ar: "تنفيذ EPC لمشاريع جديدة" } },
        {
          icon: "grid",
          title: { en: "Overhead transmission lines", ar: "خطوط النقل الهوائية" },
          body: { en: "OHTL and pole retirement", ar: "خطوط OHTL وإزالة الأعمدة القديمة" },
        },
        {
          icon: "box",
          title: { en: "Prefabricated substations", ar: "المحطات الفرعية مسبقة الصنع" },
          body: { en: "132/33 kV rapid deployment", ar: "تنفيذ سريع بجهد 132/33 kV" },
        },
      ],
    },
    gallery: [
      { image: "svc-gallery-construction-1", alt: "A high-voltage substation with transformers and steel gantries" },
      { image: "svc-gallery-construction-2", alt: "Construction crew in hard hats and high-visibility vests" },
    ],
    faqs: [FAQ.safety, FAQ.customised, FAQ.standards, FAQ.leadTime],
    cta: {
      title: { en: "Have a station to build?", ar: "هل لديك محطة تريد بناءها؟" },
      intro: {
        en: "Our construction teams deliver complete substations and power plants — from earthworks to energization.",
        ar: "تنفذ فرق الإنشاء لدينا محطات فرعية ومحطات توليد متكاملة — من الأعمال الترابية حتى التزويد بالطاقة.",
      },
    },
    relatedProjects: ["ad-dayir-2-substation", "khurais-ohtl-wooden-poles", "al-rain-prefabricated-substation"],
  },

  "commissioning-testing": {
    slug: "commissioning-testing",
    hero: {
      eyebrow: { en: "Commissioning & testing energy systems", ar: "تشغيل واختبار أنظمة الطاقة" },
      intro: {
        en: "Every system inspected, tested and validated to achieve safe, efficient and reliable operation.",
        ar: "فحص كل نظام واختباره والتحقق من صحته لتحقيق تشغيل آمن وفعال وموثوق.",
      },
      image: "svc-hero-commissioning-testing",
      imageAlt: "Technician wiring an electrical panel",
    },
    row: {
      tagline: { en: "Verified, ready to energize", ar: "تحقق كامل قبل التشغيل" },
      description: {
        en: "Modern commissioning methodologies strengthen safety, reliability and operational performance. Systematic inspections, performance testing, calibration and verification identify issues early, reduce risk and ensure every system performs to its design specification.",
        ar: "تُعزز منهجيات التشغيل الحديثة السلامة والموثوقية والأداء التشغيلي. وتساعد عمليات الفحص المنهجية واختبار الأداء والمعايرة والتحقق على تحديد المشكلات مبكراً، والحد من المخاطر، وضمان عمل كل نظام وفقاً لمواصفات التصميم.",
      },
      bullets: [
        { en: "Factory & site acceptance tests (FAT / SAT)", ar: "اختبارات القبول المصنعية والموقعية (FAT / SAT)" },
        { en: "Insulation, grounding & relay coordination", ar: "العزل والتأريض وتنسيق مرحّلات الحماية" },
        { en: "SCADA & IoT remote monitoring", ar: "المراقبة عن بُعد عبر SCADA وIoT" },
      ],
      image: "svc-row-commissioning-testing",
      imageAlt: "Technician wiring an electrical panel",
    },
    overview: [
      {
        title: { en: "Modern ways of commissioning & testing", ar: "أساليب حديثة للتشغيل والاختبار" },
        body: {
          en: "We integrate modern technologies and advanced engineering practices to enhance the commissioning and testing of power and energy facilities. Our expertise ensures that all systems and equipment are thoroughly inspected, tested and validated to achieve safe, efficient and reliable operation — optimising plant readiness, minimising operational risks and ensuring successful delivery across every stage of the lifecycle.",
          ar: "نُدمج التقنيات الحديثة والممارسات الهندسية المتقدمة لتحسين عمليات تشغيل واختبار منشآت الطاقة. وتضمن خبرتنا فحص جميع الأنظمة والمعدات واختبارها والتحقق من صحتها بدقة لتحقيق تشغيل آمن وفعال وموثوق. ومن خلال عمليات تشغيل منظمة والتحقق من الأداء، نساعد في تحسين جاهزية المحطة، وتقليل المخاطر التشغيلية، وضمان نجاح تنفيذ المشاريع في جميع مراحل دورة حياة البنية التحتية للطاقة.",
        },
      },
      {
        title: { en: "Commissioning and testing — the systematic approach", ar: "التشغيل والاختبار — النهج المنهجي" },
        body: {
          en: "Advanced commissioning methodologies and modern testing technologies strengthen safety, reliability and operational performance. Systematic inspections, performance testing, calibration and verification identify issues early, reduce operational risks, minimise downtime and ensure all equipment functions according to design specifications.",
          ar: "تُعزز منهجيات التشغيل المتقدمة وتقنيات الاختبار الحديثة السلامة والموثوقية والأداء التشغيلي في جميع مرافق الطاقة. وتساعد عمليات الفحص المنهجية واختبار الأداء والمعايرة والتحقق على تحديد المشكلات مبكراً، والحد من المخاطر التشغيلية، وتقليل وقت التوقف، وضمان عمل جميع المعدات وفقاً لمواصفات التصميم.",
        },
        bullets: SYSTEMATIC_BULLETS,
      },
    ],
    keyFacts: [
      PREDICTIVE_TILE,
      {
        icon: "award",
        title: { en: "Certified company", ar: "شركة معتمدة" },
        body: {
          en: "Commissioning and testing delivered to the highest industry and regulatory standards.",
          ar: "تشغيل واختبار وفق أعلى معايير الصناعة واللوائح التنظيمية.",
        },
      },
    ],
    capabilities: {
      title: { en: "What we test", ar: "ما نختبره" },
      items: [
        {
          icon: "zap",
          title: { en: "FAT / SAT acceptance", ar: "اختبارات القبول FAT / SAT" },
          body: { en: "Factory and site acceptance tests", ar: "اختبارات القبول المصنعية والموقعية" },
        },
        {
          icon: "grid",
          title: { en: "Protection & relay coordination", ar: "الحماية وتنسيق مرحّلات الحماية" },
          body: { en: "Insulation and grounding", ar: "العزل والتأريض" },
        },
        { icon: "box", title: { en: "SCADA & IoT monitoring", ar: "المراقبة عبر SCADA وIoT" }, body: { en: "Remote fault detection", ar: "اكتشاف الأعطال عن بُعد" } },
      ],
    },
    gallery: [
      { image: "svc-gallery-commissioning-testing-1", alt: CONTROL_ROOM_ALT },
      { image: "svc-gallery-commissioning-testing-2", alt: "Technician wiring an electrical panel" },
    ],
    faqs: [FAQ.commissioningProcess, FAQ.remoteMonitoringShort, FAQ.standards, FAQ.gridIntegrationShort],
    cta: {
      title: { en: "Ready to energize safely?", ar: "هل أنت مستعد للتزويد بالطاقة بأمان؟" },
      intro: {
        en: "Our commissioning team validates every system before it goes live — FAT, SAT and grid integration.",
        ar: "يتحقق فريق التشغيل لدينا من كل نظام قبل تشغيله الفعلي — FAT وSAT والدمج في الشبكة.",
      },
    },
    relatedProjects: ["ad-dayir-2-substation"],
  },
};

export const serviceDetailBySlug = (slug: string | undefined): ServiceDetail | undefined => (slug ? serviceDetails[slug] : undefined);

/** Overview rows without a detail page in Figma (row 05, 28:240). Linked to /contact until a detail design exists. */
export type ExtraServiceRow = ServiceRowContent & { id: string; number: string; title: L };

/** Extra overview rows without a detail page. The AI & Robotics row was removed at the owner's request. */
export const extraServiceRows: ExtraServiceRow[] = [];
