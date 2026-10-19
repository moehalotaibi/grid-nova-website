import type { L } from "@/i18n/LocaleProvider";

/**
 * Company news, migrated from the previous website (energy.shrhan.com, English + Arabic posts).
 * The company name was updated to Grid Nova Energy throughout; everything else is the original copy.
 * The SPARK post originally named "Al-Sharhan Contracting Company" as the signatory.
 */

export type NewsTag = { label: L; tone: "blue" | "green" };

export type ArticleBlock =
  | { type: "heading"; text: L }
  | { type: "paragraph"; text: L }
  | { type: "list"; items: L[] }
  | { type: "image"; image: string; alt: string; width?: number; height?: number; caption?: L };

export type Article = {
  slug: string;
  title: L;
  tags: NewsTag[];
  /** ISO date */
  date: string;
  readMinutes: number;
  /** card image base name (16:10 → 384 × 240) */
  image: string;
  imageAlt: string;
  /** Short description on the news card (the homepage grid, Figma 25:2, draws none). */
  excerpt?: L;
  featured?: boolean;
  /** Standfirst: the /news featured block and the article hero intro. */
  lead?: L;
  /** Larger crop for the /news featured block (640 × 462 WebP + @2x); falls back to `image`. */
  featuredImage?: string;
  /** Page-hero crop for /news/:slug (1440 × 640 WebP + @2x); falls back to `image`. */
  heroImage?: string;
  /** Article body, rendered on /news/:slug. */
  body: ArticleBlock[];
  /** Original post on the previous website. */
  source?: string;
};

export const articles: Article[] = [
  // ── From the company LinkedIn page (linkedin.com/company/alsharhan-energy) ──
  {
    slug: "grid-nova-sieyuan-joint-meeting-riyadh",
    title: {
      en: "Advancing a promising strategic partnership: Grid Nova Energy and Sieyuan meet in Riyadh",
      ar: "نحو شراكة استراتيجية واعدة: اجتماع مشترك بين جريد نوفا للطاقة وSieyuan في الرياض",
    },
    tags: [
      { label: { en: "Partnership", ar: "شراكة" }, tone: "blue" },
      { label: { en: "Featured", ar: "مميز" }, tone: "green" },
    ],
    date: "2026-09-30",
    readMinutes: 2,
    image: "news-sieyuan-meeting",
    imageAlt: "Grid Nova Energy and Sieyuan teams at their joint meeting in Riyadh",
    featuredImage: "news-sieyuan-meeting-featured",
    heroImage: "news-sieyuan-meeting-hero",
    lead: {
      en: "Grid Nova Energy and Sieyuan held a joint meeting in Riyadh as part of their ongoing efforts to strengthen collaboration and build solid foundations for future partnership.",
      ar: "عقدت جريد نوفا للطاقة وSieyuan اجتماعًا مشتركًا في الرياض، في إطار تعزيز التعاون وبناء أسس قوية للشراكة المستقبلية بين الجانبين.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7510959761446711298",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The meeting reinforced the importance of corporate governance, clear accountability, and effective collaboration as key foundations for sustainable partnerships and long-term value creation.",
          ar: "ويأتي اللقاء تأكيدًا على أهمية الحوكمة المؤسسية، ووضوح الأدوار، وفعالية التعاون كأسس لبناء شراكات مستدامة وقادرة على تحقيق قيمة طويلة المدى.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "It builds on the strategic joint venture the two companies announced earlier this year, which combines Sieyuan Electric’s technical expertise and advanced manufacturing capabilities with Grid Nova Energy’s leadership in the Saudi market to localise the production of advanced electrical equipment in the Kingdom.",
          ar: "ويأتي هذا اللقاء امتدادًا للمشروع المشترك الاستراتيجي الذي أعلنت عنه الشركتان مطلع هذا العام، والذي يجمع بين الخبرات الفنية والقدرات التصنيعية المتقدمة لشركة Sieyuan Electric وريادة جريد نوفا للطاقة في السوق السعودي، بهدف توطين تصنيع المعدات الكهربائية المتقدمة داخل المملكة.",
        },
      },
      {
        type: "image",
        image: "news-sieyuan-meeting-body",
        width: 760,
        height: 950,
        alt: "Grid Nova Energy and Sieyuan delegations around the table during the joint meeting in Riyadh",
        caption: { en: "The Grid Nova Energy and Sieyuan delegations during the joint meeting in Riyadh.", ar: "وفدا جريد نوفا للطاقة وSieyuan خلال الاجتماع المشترك في الرياض." },
      },
      {
        type: "paragraph",
        text: {
          en: "The two sides reviewed the governance framework of the partnership, the roles and responsibilities of each party, and the mechanisms for joint decision-making, so that the venture moves from agreement to execution on a solid institutional footing.",
          ar: "واستعرض الجانبان إطار حوكمة الشراكة، وأدوار ومسؤوليات كل طرف، وآليات اتخاذ القرار المشترك، بما يضمن انتقال المشروع من مرحلة الاتفاق إلى مرحلة التنفيذ على أسس مؤسسية راسخة.",
        },
      },
      {
        type: "list",
        items: [
          { en: "Strong governance", ar: "حوكمة راسخة" },
          { en: "Stronger partnership", ar: "شراكة أقوى" },
          { en: "A more sustainable future", ar: "مستقبل أكثر استدامة" },
        ],
      },
      {
        type: "paragraph",
        text: {
          en: "Grid Nova Energy × Sieyuan: strong governance, stronger partnership, a more sustainable future.",
          ar: "جريد نوفا للطاقة × Sieyuan: حوكمة راسخة، شراكة أقوى، مستقبل أكثر استدامة.",
        },
      },
    ],
  },
  {
    slug: "saudi-national-day-96",
    title: { en: "Saudi National Day 96: 96 years of pride and glory", ar: "عزّنا بطبعنا.. 96 عامًا من العز والفخر" },
    tags: [{ label: { en: "Greetings", ar: "تهاني" }, tone: "blue" }],
    date: "2026-09-23",
    readMinutes: 1,
    image: "news-national-day-96",
    imageAlt: "Grid Nova Energy greeting card for the 96th Saudi National Day",
    featuredImage: "news-national-day-96-featured",
    heroImage: "news-national-day-96-hero",
    lead: {
      en: "On the 96th Saudi National Day, Grid Nova Energy extends its warmest congratulations to the leadership of the Kingdom of Saudi Arabia and its people.",
      ar: "بمناسبة اليوم الوطني السعودي الـ96، تتقدم شركة جريد نوفا للطاقة بأسمى التهاني والتبريكات إلى قيادة المملكة العربية السعودية وشعبها الكريم.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7508579229727625216",
    body: [
      {
        type: "paragraph",
        text: {
          en: "We celebrate an ambitious nation, a journey full of achievement, and a future we build together with brighter energy. May your glory endure, our homeland, and may the Kingdom, its leadership and its people enjoy another year of prosperity, security and wellbeing.",
          ar: "نحتفي بوطنٍ طموح، ومسيرةٍ حافلة بالإنجاز، ومستقبلٍ نصنعه معًا بطاقةٍ أكثر إشراقًا. دام عزّك يا وطن، وكل عام والمملكة قيادةً وشعبًا بخير وأمن وازدهار.",
        },
      },
      {
        type: "image",
        image: "news-national-day-96-body",
        width: 760,
        height: 912,
        alt: "Grid Nova Energy greeting card for the 96th Saudi National Day",
      },
      {
        type: "paragraph",
        text: {
          en: "Grid Nova Energy is proud to take part in building the Kingdom’s energy infrastructure, in support of the goals of Saudi Vision 2030.",
          ar: "وتفخر شركة جريد نوفا للطاقة بمشاركتها في بناء البنية التحتية للطاقة في المملكة، دعمًا لمستهدفات رؤية السعودية 2030.",
        },
      },
      { type: "paragraph", text: { en: "Pride is in our nature.", ar: "عزّنا بطبعنا 💚" } },
    ],
  },
  {
    slug: "ceo-site-visit-king-fahd-station-cordoba",
    title: {
      en: "CEO visits the King Fahd Station and Cordoba projects to review progress",
      ar: "الرئيس التنفيذي يقوم بزيارة ميدانية لمشروعي محطة الملك فهد وقرطبة",
    },
    tags: [
      { label: { en: "Construction", ar: "البناء" }, tone: "blue" },
      { label: { en: "Development", ar: "التطوير" }, tone: "blue" },
    ],
    date: "2026-06-24",
    readMinutes: 2,
    image: "news-ceo-site-visit",
    imageAlt: "Eng. Mutlaq Alotaibi with the project team during a site visit",
    featuredImage: "news-ceo-site-visit-featured",
    heroImage: "news-ceo-site-visit-hero",
    lead: {
      en: "As part of the company's continuous follow-up of its projects, Grid Nova Energy's Chief Executive Officer, Eng. Mutlaq Alotaibi, made a field visit to the King Fahd Station and Cordoba projects to review the latest progress, follow up on completion rates and confirm that work is proceeding according to the approved plans.",
      ar: "في إطار المتابعة المستمرة لمشاريع الشركة، قام الرئيس التنفيذي لشركة جريد نوفا للطاقة، المهندس مطلق العتيبي، بزيارة ميدانية لمشروع محطة الملك فهد ومشروع قرطبة، وذلك للاطلاع على مستجدات الأعمال ومتابعة نسب الإنجاز والتأكد من سير العمل وفق الخطط المعتمدة.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7475496503302651904",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The visit underlines the company's commitment to strengthening operational performance, supporting the teams on site and adhering to the highest standards of quality and safety, contributing to the achievement of project objectives and greater execution efficiency.",
          ar: "وتأتي هذه الزيارة تأكيداً على حرص الشركة على تعزيز الأداء التشغيلي، ودعم فريق العمل في المواقع، والالتزام بأعلى معايير الجودة والسلامة، بما يسهم في تحقيق أهداف المشاريع ورفع كفاءة التنفيذ.",
        },
      },
      {
        type: "image",
        image: "news-ceo-site-visit-body",
        width: 720,
        height: 960,
        alt: "Eng. Mutlaq Alotaibi with the site team during the visit",
        caption: { en: "Eng. Mutlaq Alotaibi reviewing progress with the project team on site.", ar: "م. مطلق العتيبي يستعرض سير العمل مع فريق المشروع في الموقع." },
      },
      {
        type: "paragraph",
        text: {
          en: "During the tour, the CEO met the site engineers and supervisors, reviewed the progress of the civil and electrical works against the approved schedule, and followed up on the application of the company's health, safety and quality procedures across the two sites.",
          ar: "وخلال الجولة، التقى الرئيس التنفيذي بمهندسي الموقع والمشرفين، واطلع على تقدم الأعمال المدنية والكهربائية مقارنةً بالجدول الزمني المعتمد، وتابع تطبيق إجراءات الصحة والسلامة والجودة المعتمدة لدى الشركة في الموقعين.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Grid Nova Energy values the outstanding efforts of the project team and looks forward to continuing to achieve further successes and milestones.",
          ar: "وتثمن شركة جريد نوفا للطاقة الجهود المتميزة التي يبذلها فريق المشروع، وتتطلع إلى مواصلة تحقيق المزيد من النجاحات والإنجازات.",
        },
      },
    ],
  },
  {
    slug: "hijri-new-year-1448",
    title: { en: "Greetings for the new Hijri year 1448", ar: "تهنئة بمناسبة العام الهجري الجديد 1448هـ" },
    tags: [{ label: { en: "Greetings", ar: "تهاني" }, tone: "blue" }],
    date: "2026-06-16",
    readMinutes: 1,
    image: "news-hijri-new-year-1448",
    imageAlt: "Grid Nova Energy greeting card for the Hijri new year 1448",
    featuredImage: "news-hijri-new-year-1448-featured",
    heroImage: "news-hijri-new-year-1448-hero",
    lead: {
      en: "On the occasion of the new Hijri year 1448, Grid Nova Energy extends its sincerest congratulations to the Custodian of the Two Holy Mosques, His Royal Highness the Crown Prince, the people of Saudi Arabia, and all our clients, partners and employees.",
      ar: "بمناسبة حلول العام الهجري الجديد 1448هـ، تتقدم شركة جريد نوفا للطاقة بأسمى آيات التهاني والتبريكات إلى مقام خادم الحرمين الشريفين وسمو ولي عهده الأمين، وإلى الشعب السعودي الكريم، وإلى جميع عملائنا وشركائنا ومنسوبي الشركة.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7472554108663521280",
    body: [
      {
        type: "paragraph",
        text: {
          en: "We ask God to make this a year full of goodness, growth and achievement, to preserve our beloved nation's security, stability and prosperity, and to grant us all success in continuing the journey of building, giving and achieving.",
          ar: "نسأل الله أن يجعل هذا العام عامًا حافلًا بالخير والنماء والإنجازات، وأن يديم على وطننا الغالي نعمة الأمن والاستقرار والازدهار، وأن يوفقنا جميعًا لمواصلة مسيرة البناء والعطاء وتحقيق المزيد من النجاحات.",
        },
      },
      {
        type: "image",
        image: "news-hijri-new-year-1448-body",
        width: 760,
        height: 428,
        alt: "Grid Nova Energy greeting card for the Hijri new year 1448",
      },
      {
        type: "paragraph",
        text: {
          en: "Happy new year, and may the new Hijri year be full of hope, ambition and achievement.",
          ar: "كل عام وأنتم بخير، وعام هجري جديد مليء بالأمل والطموح والإنجاز.",
        },
      },
    ],
  },
  {
    slug: "eid-al-adha-1447",
    title: { en: "Eid al-Adha greetings", ar: "تهنئة بمناسبة عيد الأضحى المبارك" },
    tags: [{ label: { en: "Greetings", ar: "تهاني" }, tone: "blue" }],
    date: "2026-05-27",
    readMinutes: 1,
    image: "news-eid-al-adha-1447",
    imageAlt: "Grid Nova Energy Eid al-Adha greeting card",
    featuredImage: "news-eid-al-adha-1447-featured",
    heroImage: "news-eid-al-adha-1447-hero",
    lead: {
      en: "Grid Nova Energy extends its sincerest greetings on the occasion of Eid al-Adha. May God bring it back to you with goodness, blessings and happiness. Eid Mubarak.",
      ar: "تتقدم شركة جريد نوفا للطاقة بأصدق التهاني والتبريكات بمناسبة عيد الأضحى المبارك، سائلين الله أن يعيده عليكم بالخير والبركة والسعادة. كل عام وأنتم بخير.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7465144740879941632",
    body: [
      { type: "image", image: "news-eid-al-adha-1447-body", width: 720, height: 960, alt: "Grid Nova Energy Eid al-Adha greeting card" },
      {
        type: "paragraph",
        text: {
          en: "From all of us at Grid Nova Energy, we wish our clients, partners and employees a blessed Eid with their families and loved ones.",
          ar: "من جميع منسوبي شركة جريد نوفا للطاقة، نتمنى لعملائنا وشركائنا وموظفينا عيداً مباركاً مع عائلاتهم وأحبائهم.",
        },
      },
    ],
  },
  {
    slug: "day-of-arafah-1447",
    title: { en: "Blessed Day of Arafah", ar: "تهنئة بيوم عرفة المبارك" },
    tags: [{ label: { en: "Greetings", ar: "تهاني" }, tone: "blue" }],
    date: "2026-05-26",
    readMinutes: 1,
    image: "news-day-of-arafah-1447",
    imageAlt: "Grid Nova Energy Day of Arafah greeting card",
    featuredImage: "news-day-of-arafah-1447-featured",
    heroImage: "news-day-of-arafah-1447-hero",
    lead: {
      en: "On the blessed Day of Arafah, we ask God to grant you mercy and forgiveness and to fill your days with peace and blessings. Best wishes from Grid Nova Energy.",
      ar: "في يوم عرفة المبارك، نسأل الله أن يكتب لكم الرحمة والمغفرة، وأن يملأ أيامكم بالطمأنينة والبركة. كل عام وأنتم بخير — شركة جريد نوفا للطاقة.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7464782361793286144",
    body: [
      { type: "image", image: "news-day-of-arafah-1447-body", width: 760, height: 782, alt: "Grid Nova Energy Day of Arafah greeting card" },
      {
        type: "paragraph",
        text: {
          en: "May this blessed day bring peace and blessings to you and your families. Grid Nova Energy wishes you a blessed Day of Arafah and a happy Eid al-Adha.",
          ar: "نسأل الله أن يكون هذا اليوم المبارك يوم خير وبركة لكم ولعائلاتكم. تتمنى لكم شركة جريد نوفا للطاقة يوم عرفة مباركاً وعيد أضحى سعيداً.",
        },
      },
    ],
  },
  {
    slug: "international-hr-day-2026",
    title: { en: "International Human Resources Day", ar: "اليوم العالمي للموارد البشرية" },
    tags: [{ label: { en: "People", ar: "فريق العمل" }, tone: "blue" }],
    date: "2026-05-20",
    readMinutes: 1,
    image: "news-hr-day-2026",
    imageAlt: "Grid Nova Energy post for International Human Resources Day",
    featuredImage: "news-hr-day-2026-featured",
    heroImage: "news-hr-day-2026-hero",
    lead: {
      en: "At Grid Nova Energy we believe human resources is not just a department, but a core partner in success and in shaping the future.",
      ar: "في شركة جريد نوفا للطاقة نؤمن بأن الموارد البشرية ليست مجرد إدارة، بل شريك أساسي في النجاح وصناعة المستقبل.",
    },
    source: "https://www.linkedin.com/feed/update/urn:li:activity:7462749150447611904",
    body: [
      {
        type: "paragraph",
        text: {
          en: "We are proud of every effort made to attract talent, develop skills and build a work environment that supports growth, excellence and innovation. Our appreciation goes to the HR professionals who make a difference every day.",
          ar: "نفخر بكل الجهود المبذولة في استقطاب الكفاءات، تطوير المواهب، وبناء بيئة عمل تدعم النمو والتميز والابتكار. كل التقدير لمتخصصي الموارد البشرية الذين يصنعون الأثر كل يوم.",
        },
      },
      { type: "image", image: "news-hr-day-2026-body", width: 720, height: 960, alt: "Grid Nova Energy post for International Human Resources Day" },
      {
        type: "paragraph",
        text: {
          en: "Our people are at the heart of every project we deliver, from the factory floor to the substation site. Thank you to our HR team for the work that keeps that possible.",
          ar: "فريقنا هو جوهر كل مشروع ننفذه، من أرضية المصنع إلى موقع المحطة. شكراً لفريق الموارد البشرية على العمل الذي يجعل ذلك ممكناً.",
        },
      },
    ],
  },
  // ── From the previous website (energy.shrhan.com) ──
  {
    slug: "driving-localization-in-ksa",
    title: {
      en: "Driving localization in KSA: a strategic joint venture for a sustainable energy future",
      ar: "تعزيز التوطين في المملكة العربية السعودية: مشروع مشترك استراتيجي من أجل مستقبل طاقة مستدامة",
    },
    tags: [
      { label: { en: "Development", ar: "التطوير" }, tone: "blue" },
      { label: { en: "Investment", ar: "استثمار" }, tone: "blue" },
      { label: { en: "Featured", ar: "مميز" }, tone: "green" },
    ],
    date: "2026-01-12",
    readMinutes: 3,
    image: "news-localization",
    imageAlt: "Executives from Grid Nova Energy and Sieyuan Electric at the joint-venture signing",
    featured: true,
    featuredImage: "news-localization-featured",
    heroImage: "news-localization-hero",
    lead: {
      en: "Grid Nova Energy is proud to announce a strategic joint venture with Sieyuan Electric, marking a major milestone in advancing localized manufacturing excellence within the Kingdom of Saudi Arabia.",
      ar: "تفخر شركة جريد نوفا للطاقة بالإعلان عن تأسيس مشروع مشترك استراتيجي مع شركة Sieyuan Electric، في خطوة نوعية تمثل محطة مهمة نحو تعزيز التوطين والتميز في التصنيع داخل المملكة العربية السعودية.",
    },
    source: "https://energy.shrhan.com/2026/01/12/driving-localization-in-ksa-a-strategic-joint-venture-for-a-sustainable-energy-future/",
    body: [
      { type: "heading", text: { en: "Partnership with Sieyuan Electric", ar: "شراكة مع شركة سييوان للكهرباء" } },
      {
        type: "paragraph",
        text: {
          en: "This partnership represents more than a conventional business collaboration. It reflects a shared commitment to Saudi Vision 2030 and the Kingdom’s ambition to build a resilient, self-reliant, and globally competitive energy sector.",
          ar: "ولا تقتصر هذه الشراكة على كونها اتفاقًا تجاريًا، بل تعكس التزامًا مشتركًا بدعم رؤية السعودية 2030 والمساهمة في بناء قطاع طاقة قوي، مكتفٍ ذاتيًا، وقادر على المنافسة عالميًا.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "By combining Grid Nova Energy’s deep local market leadership and understanding with Sieyuan Electric’s global technical expertise and advanced manufacturing capabilities, this joint venture aims to redefine the energy and electrical infrastructure landscape in the Kingdom. Together, the partners will enable the localization of high-end electrical manufacturing, supporting national industrial development and strengthening local supply chains.",
          ar: "ومن خلال الجمع بين الخبرة المحلية العميقة والريادة السوقية لشركة جريد نوفا للطاقة، والخبرات الفنية العالمية والتقنيات المتقدمة لشركة Sieyuan Electric، يهدف هذا المشروع المشترك إلى إعادة رسم ملامح قطاع الطاقة والبنية التحتية الكهربائية في المملكة. كما يسهم في توطين تصنيع المنتجات الكهربائية المتقدمة وتعزيز سلاسل الإمداد المحلية.",
        },
      },
      {
        type: "list",
        items: [
          { en: "Strategic JV to advance localization in KSA", ar: "مشروع مشترك استراتيجي لتعزيز التوطين في المملكة" },
          { en: "Boosting “Made in Saudi” manufacturing and tech transfer", ar: "دعم التصنيع المحلي ونقل التقنيات المتقدمة" },
          { en: "Supporting Vision 2030 through jobs and sustainable growth", ar: "تمكين رؤية السعودية 2030 عبر الوظائف والنمو المستدام" },
        ],
      },
      { type: "heading", text: { en: "Made in Saudi", ar: "أضواء “صنع في السعودية”" } },
      {
        type: "paragraph",
        text: {
          en: "A key focus of this collaboration is empowering local content through the expansion of “Made in Saudi” capabilities, particularly in sophisticated electrical and power infrastructure solutions. The partnership will also facilitate technology transfer, introducing world-class manufacturing processes and innovation to local operations, while ensuring alignment with international standards.",
          ar: "يركز هذا التعاون بشكل أساسي على تمكين المحتوى المحلي من خلال توسيع نطاق منتجات “صنع في السعودية”، لا سيما في مجال حلول البنية التحتية الكهربائية والطاقة المتطورة. كما ستسهل هذه الشراكة نقل التكنولوجيا، من خلال إدخال عمليات تصنيع عالمية المستوى وابتكارات إلى العمليات المحلية، مع ضمان التوافق مع المعايير الدولية.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Beyond manufacturing, the joint venture is expected to contribute significantly to sustainable economic growth by creating specialized job opportunities, developing national talent, and enhancing technical expertise within the power and energy sectors. These efforts directly support the Kingdom’s goal of nurturing a highly skilled workforce and fostering long-term industrial sustainability.",
          ar: "إلى جانب التصنيع، من المتوقع أن يُسهم المشروع المشترك إسهاماً كبيراً في النمو الاقتصادي المستدام من خلال خلق فرص عمل متخصصة، وتنمية المواهب الوطنية، وتعزيز الخبرات الفنية في قطاعي الطاقة والكهرباء. وتدعم هذه الجهود بشكل مباشر هدف المملكة المتمثل في تنمية قوة عاملة عالية المهارة وتعزيز الاستدامة الصناعية على المدى الطويل.",
        },
      },
      { type: "image", image: "news-localization-2", alt: "Signing ceremony of the Grid Nova Energy and Sieyuan Electric joint venture" },
      { type: "heading", text: { en: "A strategic regional hub", ar: "مركز إقليمي استراتيجي" } },
      {
        type: "paragraph",
        text: {
          en: "In addition, this initiative positions Saudi Arabia as a strategic regional hub for the export of advanced energy solutions, reinforcing its role as a leader in the regional and global energy markets.",
          ar: "بالإضافة إلى ذلك، تضع هذه المبادرة المملكة العربية السعودية كمركز إقليمي استراتيجي لتصدير حلول الطاقة المتقدمة، مما يعزز دورها كقائدة في أسواق الطاقة الإقليمية والعالمية.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Together, Grid Nova Energy and Sieyuan Electric are not just building electrical components — they are building the foundation for a sustainable, innovative, and self-reliant energy future for the Kingdom of Saudi Arabia.",
          ar: "إن شركتي جريد نوفا للطاقة وسييوان للكهرباء لا تقومان فقط ببناء المكونات الكهربائية، بل تقومان أيضاً ببناء الأساس لمستقبل طاقة مستدام ومبتكر ومكتفٍ ذاتياً للمملكة العربية السعودية.",
        },
      },
    ],
  },
  {
    slug: "grid-nova-energy-strategy",
    title: {
      en: "Grid Nova Energy strategy: a vision of principle and a team committed to success",
      ar: "استراتيجية جريد نوفا للطاقة: رؤية واضحة وفريق ملتزم نحو النجاح",
    },
    tags: [
      { label: { en: "Construction", ar: "البناء" }, tone: "blue" },
      { label: { en: "Development", ar: "التطوير" }, tone: "blue" },
    ],
    date: "2026-01-28",
    readMinutes: 2,
    image: "news-strategy",
    imageAlt: "Grid Nova Energy team members reviewing plans together",
    featuredImage: "news-strategy-featured",
    heroImage: "news-strategy-hero",
    lead: {
      en: "Our strategic vision is the foundation from which we launch every future step: long-term goals that put sustainability and innovation at the centre of the energy sector.",
      ar: "تعتبر الرؤية الاستراتيجية لشركة جريد نوفا للطاقة الأساس الذي ننطلق منه في جميع خطواتنا المستقبلية، وتعتمد على أهداف بعيدة المدى تركز على الاستدامة والابتكار في مجالات الطاقة.",
    },
    source: "https://energy.shrhan.com/2026/01/12/al-sharhan-energy-strategy/",
    body: [
      { type: "heading", text: { en: "Strategic vision of Grid Nova Energy", ar: "الرؤية الاستراتيجية لجريد نوفا للطاقة" } },
      {
        type: "paragraph",
        text: {
          en: "The strategic vision of Grid Nova Energy is the foundation from which we launch all of our future steps. This vision is based on long-term goals that focus on sustainability and innovation in the energy sector. We believe that providing effective energy solutions that align with global trends in renewable energy and modern technology is the key to achieving sustainable success. Our company aims to offer high-quality energy solutions that meet the needs of the global market and enhance our ability to meet future demands.",
          ar: "تعتبر الرؤية الاستراتيجية لشركة جريد نوفا للطاقة الأساس الذي ننطلق منه في جميع خطواتنا المستقبلية. تعتمد هذه الرؤية على أهداف بعيدة المدى تركز على الاستدامة والابتكار في مجالات الطاقة. نحن نؤمن بأن توفير حلول طاقة فعّالة ومواكبة للتوجهات العالمية نحو الطاقة المتجددة والتكنولوجيا الحديثة هو الطريق لتحقيق النجاح المستدام. تسعى شركتنا إلى تقديم حلول طاقة ذات جودة عالية تواكب احتياجات السوق العالمية وتعزز من قدرتنا على تلبية متطلبات المستقبل.",
        },
      },
      {
        type: "list",
        items: [
          { en: "Sustainable innovation: developing renewable energy technologies for sustainability.", ar: "الابتكار المستدام: تطوير تقنيات طاقة متجددة لضمان الاستدامة." },
          { en: "Strategic partnerships: strengthening collaborations with global companies.", ar: "الشراكات الاستراتيجية: تعزيز التعاون مع الشركات العالمية." },
          { en: "Talent development: training employees to lead the future.", ar: "تطوير الكفاءات: تدريب الموظفين لقيادة المستقبل." },
        ],
      },
      { type: "heading", text: { en: "Business model and strategic pillars", ar: "نموذج العمل والركائز الاستراتيجية" } },
      {
        type: "paragraph",
        text: {
          en: "The business model we follow at Grid Nova Energy reflects the company’s strategy in its daily operations. This model relies on building strong strategic partnerships with major companies in the sector, as well as developing innovative technologies that contribute to improving efficiency and reducing environmental impacts. We also focus on providing reliable energy services that contribute to environmental protection while achieving a balance between economic growth and the conservation of natural resources. Innovation and continuous development are the fundamental pillars that support this model in achieving our goals.",
          ar: "نموذج العمل الذي نعتمده في جريد نوفا للطاقة يعكس استراتيجية الشركة في العمل اليومي. يعتمد هذا النموذج على بناء شراكات استراتيجية قوية مع الشركات الكبرى في القطاع، إضافة إلى تطوير تقنيات مبتكرة تسهم في تحسين الكفاءة وتقليل التأثيرات البيئية. كما نركز على تقديم خدمات طاقة موثوقة تسهم في الحفاظ على البيئة وتحقيق التوازن بين التوسع الاقتصادي وحماية الموارد الطبيعية. تعتبر الابتكار والتطوير المستمر من الركائز الأساسية التي تدعم هذا النموذج في تحقيق أهدافنا.",
        },
      },
      { type: "image", image: "news-strategy-2", alt: "Engineers from Grid Nova Energy on site" },
      { type: "heading", text: { en: "The team and its loyalty as a key to success", ar: "الفريق وولاؤه كمفتاح للنجاح" } },
      {
        type: "paragraph",
        text: {
          en: "The loyalty and deep belief of our team members are critical factors in achieving success at Grid Nova Energy. We believe that success is only realized through a committed team that prioritizes the company’s interests and works together to achieve the shared vision. Therefore, the company places special importance on developing its employees’ skills through continuous training programs and supporting innovation in all aspects of work. Working together as a unified team helps us overcome challenges and enhances our ability to achieve our major objectives.",
          ar: "إن الولاء والإيمان العميق من قبل فريق العمل يمثلان أحد العوامل الحاسمة في تحقيق النجاح في شركة جريد نوفا للطاقة. نحن نؤمن بأن النجاح لا يتحقق إلا من خلال فريق عمل ملتزم، يضع مصلحة الشركة في أولوياته ويعمل بروح جماعية لتحقيق الرؤية المشتركة. لذلك، تولي الشركة أهمية خاصة في تطوير مهارات موظفيها من خلال برامج تدريبية مستمرة ودعم الابتكار في كل جوانب العمل. إن العمل كفريق واحد يسهم في تجاوز التحديات ويعزز القدرة على تحقيق الأهداف الكبرى.",
        },
      },
    ],
  },
  {
    slug: "strategic-partnership-with-pwc",
    title: {
      en: "Grid Nova Energy enters a strategic partnership with PwC",
      ar: "شركة جريد نوفا للطاقة تدخل في شراكة استراتيجية مع شركة PwC",
    },
    tags: [
      { label: { en: "Development", ar: "التطوير" }, tone: "blue" },
      { label: { en: "Featured", ar: "مميز" }, tone: "green" },
    ],
    date: "2026-01-11",
    readMinutes: 2,
    image: "news-pwc",
    imageAlt: "Grid Nova Energy and PwC representatives at the partnership signing",
    featuredImage: "news-pwc-featured",
    heroImage: "news-pwc-hero",
    lead: {
      en: "Grid Nova Energy has announced the signing of a strategic partnership with PricewaterhouseCoopers (PwC), one of the world’s leading professional services firms, as part of its ongoing efforts to strengthen its market position and enhance competitiveness in the energy sector.",
      ar: "أعلنت شركة جريد نوفا للطاقة عن توقيع شراكة استراتيجية مع شركة برايس ووترهاوس كوبرز (PwC)، إحدى الشركات العالمية الرائدة في مجال الخدمات المهنية، وذلك في إطار سعيها المستمر لتعزيز مكانتها في السوق ورفع مستوى تنافسيتها في قطاع الطاقة.",
    },
    source: "https://energy.shrhan.com/2024/04/18/al-sharhan-energy-company-enters-strategic-partnership-with-pwc/",
    body: [
      { type: "heading", text: { en: "Excellence in the strategic partnership", ar: "التميز في الشراكة الاستراتيجية" } },
      {
        type: "paragraph",
        text: {
          en: "This strategic collaboration represents a significant milestone in Grid Nova Energy’s growth journey and reflects its commitment to adopting best-in-class practices, advancing its strategic capabilities, and responding effectively to the evolving dynamics of the energy market.",
          ar: "وتُعد هذه الشراكة محطة مهمة في مسيرة نمو شركة جريد نوفا للطاقة، وتعكس التزامها بتبني أفضل الممارسات العالمية، وتطوير قدراتها الاستراتيجية، والاستجابة بفاعلية للتغيرات المتسارعة التي يشهدها قطاع الطاقة على المستويين الإقليمي والعالمي.",
        },
      },
      {
        type: "list",
        items: [
          { en: "Strategic partnership with PwC", ar: "شراكة استراتيجية مع PwC" },
          { en: "Driving sustainable growth", ar: "دعم النمو المستدام" },
          { en: "Enhancing operational excellence", ar: "تعزيز التميز التشغيلي" },
        ],
      },
      { type: "heading", text: { en: "A transformative strategic vision", ar: "رؤية استراتيجية تحويلية" } },
      {
        type: "paragraph",
        text: {
          en: "The partnership focuses on the development of a comprehensive and transformative strategic vision, alongside the design of an advanced operating model that will enable Grid Nova Energy to achieve sustainable growth and long-term value creation. Through this collaboration, PwC will support the company in aligning its strategic objectives with operational execution, improving organizational efficiency, and enhancing overall performance.",
          ar: "وتركّز هذه الشراكة على تطوير رؤية استراتيجية شاملة وتحويلية، إلى جانب تصميم نموذج تشغيلي متقدم يمكّن شركة جريد نوفا للطاقة من تحقيق نمو مستدام وخلق قيمة طويلة الأمد. ومن خلال هذا التعاون، ستسهم PwC في مواءمة الأهداف الاستراتيجية مع التنفيذ التشغيلي، وتعزيز الكفاءة المؤسسية، وتحسين الأداء العام للشركة.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "By leveraging PwC’s global expertise, industry insights, and proven methodologies, Grid Nova Energy aims to strengthen its governance frameworks, optimize business processes, and build a more agile and resilient organization. The partnership is also expected to support the company in identifying new growth opportunities, improving decision-making capabilities, and reinforcing its competitive advantage in an increasingly complex and competitive energy landscape.",
          ar: "ومن خلال الاستفادة من الخبرات العالمية والرؤى المتخصصة والمنهجيات المعتمدة لدى PwC، تسعى شركة جريد نوفا للطاقة إلى تعزيز أطر الحوكمة، وتحسين العمليات التشغيلية، وبناء مؤسسة أكثر مرونة وقدرة على التكيف مع التحديات المستقبلية. كما يُتوقع أن تدعم هذه الشراكة الشركة في استكشاف فرص نمو جديدة، وتحسين قدرات اتخاذ القرار، وتعزيز ميزتها التنافسية في ظل بيئة أعمال تتسم بالتعقيد والمنافسة المتزايدة.",
        },
      },
      { type: "image", image: "news-pwc-2", alt: "The partnership agreement being signed with PwC" },
      { type: "heading", text: { en: "Committed to sustainable development", ar: "ملتزمون بالتنمية المستدامة" } },
      {
        type: "paragraph",
        text: {
          en: "Grid Nova Energy remains committed to innovation, operational excellence, and sustainable development. This partnership with PwC underscores the company’s dedication to investing in strategic initiatives that support long-term success and contribute positively to the energy sector.",
          ar: "وتؤكد شركة جريد نوفا للطاقة التزامها المستمر بالابتكار والتميز التشغيلي والتنمية المستدامة. وتأتي هذه الشراكة مع PwC تأكيدًا على حرص الشركة على الاستثمار في المبادرات الاستراتيجية التي تدعم نجاحها على المدى الطويل وتسهم في دعم وتطوير قطاع الطاقة.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "As the energy industry continues to undergo significant transformation, Grid Nova Energy is positioning itself to adapt proactively to market changes, regulatory developments, and emerging opportunities. The collaboration with PwC will play a key role in enabling the company to achieve its strategic ambitions and deliver lasting value to its stakeholders.",
          ar: "وفي ظل التحولات الكبيرة التي يشهدها قطاع الطاقة، تعمل شركة جريد نوفا للطاقة على ترسيخ موقعها كشركة قادرة على التكيف الاستباقي مع متغيرات السوق، والتطورات التنظيمية، والفرص المستقبلية. ومن المتوقع أن تلعب هذه الشراكة مع PwC دورًا محوريًا في تمكين الشركة من تحقيق طموحاتها الاستراتيجية وتقديم قيمة مستدامة لمختلف أصحاب المصلحة.",
        },
      },
    ],
  },
  {
    slug: "spark-agreement-electrical-insulators",
    title: {
      en: "Signing an agreement with King Salman Energy Park (SPARK)",
      ar: "توقيع اتفاقية مع مدينة الملك سلمان للطاقة (سبارك)",
    },
    tags: [
      { label: { en: "Construction", ar: "البناء" }, tone: "blue" },
      { label: { en: "Development", ar: "التطوير" }, tone: "blue" },
    ],
    date: "2025-12-30",
    readMinutes: 3,
    image: "news-spark",
    imageAlt: "King Salman Energy Park (SPARK) and Grid Nova Energy agreement signing at ADIPEC 2025",
    featuredImage: "news-spark-featured",
    heroImage: "news-spark-hero",
    lead: {
      en: "During ADIPEC 2025, King Salman Energy Park (SPARK) signed an agreement with Grid Nova Energy to establish an integrated industrial facility for the production of glass, ceramic, and composite electrical insulators used in electricity transmission and distribution projects.",
      ar: "خلال فعاليات أديبك 2025، وقعت مدينة الملك سلمان للطاقة (سبارك) اتفاقية مع شركة جريد نوفا للطاقة لإنشاء منشأة صناعية متكاملة لإنتاج العوازل الكهربائية الزجاجية والسيراميكية والمركبة المستخدمة في مشاريع نقل وتوزيع الكهرباء.",
    },
    source: "https://energy.shrhan.com/2024/04/18/avada-factory-quality-assurance-matching-internationl-demands/",
    body: [
      {
        type: "paragraph",
        text: {
          en: "The project aims to enhance local content and transfer advanced technologies in the field of electrical insulators, supporting Saudi Arabia’s Vision 2030 goals to develop the energy sector and promote advanced manufacturing in the Kingdom.",
          ar: "يهدف المشروع إلى تعزيز المحتوى المحلي ونقل التقنيات المتقدمة في مجال العوازل الكهربائية، دعمًا لأهداف رؤية المملكة 2030 لتطوير قطاع الطاقة وتعزيز التصنيع المتقدم في المملكة.",
        },
      },
      {
        type: "list",
        items: [
          { en: "SPARK teams up with Grid Nova Energy to produce advanced electrical insulators.", ar: "تتعاون سبارك مع جريد نوفا للطاقة لإنتاج عوازل كهربائية متقدمة." },
          { en: "Introduces cutting-edge insulator technology to Saudi Arabia.", ar: "تقديم تقنية عوازل متطورة إلى المملكة العربية السعودية." },
          { en: "Boosts local manufacturing and supports energy sector growth.", ar: "تعزيز التصنيع المحلي ودعم نمو قطاع الطاقة." },
        ],
      },
      {
        type: "image",
        image: "news-spark-body",
        width: 760,
        height: 760,
        alt: "The SPARK and Grid Nova Energy agreement signing ceremony at ADIPEC 2025",
        caption: { en: "The agreement was signed during ADIPEC 2025.", ar: "جرى توقيع الاتفاقية خلال فعاليات أديبك 2025." },
      },
      { type: "heading", text: { en: "Advancing Vision 2030", ar: "التقدم في دعم رؤية 2030" } },
      {
        type: "paragraph",
        text: {
          en: "The signing of this agreement is significant for several reasons. Firstly, it introduces advanced technology for the production of electrical insulators, which will enhance the quality and efficiency of Saudi Arabia’s energy infrastructure. By establishing a local manufacturing facility, the project will contribute to the growth of the Kingdom’s industrial capabilities, reduce dependency on imports, and create new job opportunities. Furthermore, it aligns with Saudi Arabia’s Vision 2030, supporting the development of the energy sector, fostering advanced manufacturing, and strengthening the Kingdom’s position as a regional leader in energy innovation. Ultimately, this initiative will contribute to the creation of a more sustainable and reliable energy grid, vital for the continued economic and industrial development of the Kingdom.",
          ar: "توقيع هذه الاتفاقية له أهمية كبيرة لعدة أسباب. أولاً، يقدم تقنية متقدمة لإنتاج العوازل الكهربائية، مما سيعزز جودة وكفاءة البنية التحتية للطاقة في المملكة العربية السعودية. من خلال إنشاء منشأة تصنيع محلية، سيساهم المشروع في نمو القدرات الصناعية للمملكة، تقليل الاعتماد على الواردات، وخلق فرص عمل جديدة. بالإضافة إلى ذلك، يتماشى مع رؤية المملكة 2030، دعمًا لتطوير قطاع الطاقة، تعزيز التصنيع المتقدم، وتقوية موقف المملكة كقائد إقليمي في الابتكار في مجال الطاقة. في النهاية، ستساهم هذه المبادرة في إنشاء شبكة طاقة أكثر استدامة وموثوقية، وهو أمر حيوي للتنمية الاقتصادية والصناعية المستمرة للمملكة.",
        },
      },
      { type: "heading", text: { en: "Impact of the SPARK – Grid Nova agreement", ar: "تأثير اتفاقية سبارك – جريد نوفا" } },
      {
        type: "paragraph",
        text: {
          en: "The signing of the agreement between SPARK and Grid Nova Energy is expected to have a significant positive impact on the Saudi market. By establishing a local facility for the production of electrical insulators, the project will reduce reliance on foreign imports, encouraging self-sufficiency in the energy sector. This shift toward local production will foster greater economic stability and create new business opportunities for suppliers, contractors, and skilled labor. Additionally, it will stimulate growth in the manufacturing sector, attracting investment and contributing to job creation, which aligns with the Kingdom’s broader goals of economic diversification. The technological advancements brought in by the project will not only improve the quality of the energy infrastructure but will also enhance the competitiveness of Saudi industries on a global scale.",
          ar: "من المتوقع أن يكون لتوقيع الاتفاقية بين سبارك وشركة جريد نوفا للطاقة تأثير إيجابي كبير على السوق السعودي. من خلال إنشاء منشأة محلية لإنتاج العوازل الكهربائية، سيقلل المشروع الاعتماد على الواردات الأجنبية، مما يشجع الاكتفاء الذاتي في قطاع الطاقة. هذا التحول نحو الإنتاج المحلي سيعزز الاستقرار الاقتصادي ويخلق فرص عمل جديدة للموردين والمقاولين والعمال المهرة. بالإضافة إلى ذلك، سيحفز النمو في قطاع التصنيع، يجذب الاستثمار ويساهم في خلق فرص العمل، مما يتماشى مع الأهداف الأوسع للمملكة في التنويع الاقتصادي. ستعمل التطورات التكنولوجية التي يجلبها المشروع على تحسين جودة البنية التحتية للطاقة وتعزيز تنافسية الصناعات السعودية على المستوى العالمي.",
        },
      },
    ],
  },
];

/** Topic chips on /news (Figma 38:881), in design order; matched against `tag.label.en`. */
export const newsCategories: L[] = [
  { en: "Development", ar: "التطوير" },
  { en: "Partnership", ar: "شراكة" },
  { en: "Investment", ar: "استثمار" },
  { en: "Construction", ar: "البناء" },
  { en: "Greetings", ar: "تهاني" },
  { en: "People", ar: "فريق العمل" },
  { en: "Featured", ar: "مميز" },
];

export const articleBySlug = (slug: string | undefined) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string, lang: "en" | "ar") =>
  new Date(iso).toLocaleDateString(lang === "ar" ? "ar-SA-u-nu-latn" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
