import type { DeepPartial } from "@/i18n/LocaleProvider";

/**
 * Page-local strings for /services (Figma 28:85) and /services/:slug (Figma 30:168 and siblings).
 * The inner pages have no Arabic board in Figma — only strings that already exist in the shared
 * dictionary are mirrored here; everything else falls back to English (handoff › board 20).
 */
export const servicesEn = {
  meta: {
    title: "Services",
    description:
      "Manufacturing, energy generation, construction and commissioning & testing — one integrated EPC model for the Kingdom's grid, delivered by Grid Nova Energy.",
  },
  hero: {
    eyebrow: "Our services",
    title: "Steering the power from action to creation",
    intro:
      "Grid Nova Energy combines technology, expertise and strategic production to create dependable energy solutions — with innovation, sustainability and excellence at every stage of power.",
    imageAlt: "High-voltage transmission towers crossing the desert at dusk",
  },
  deliver: {
    eyebrow: "How we deliver",
    title: "One integrated EPC model, four stages",
    intro: "Every component is synchronised with the client's standards — from the first blueprint to the final energization.",
    steps: [
      {
        title: "Design & engineering",
        body: "Civil, structural and electrical engineering; protection, control & communication design; substation automation.",
      },
      {
        title: "Procurement & supply",
        body: "High-capacity transformers, GIS / AIS switchgear, MV switchgear and auxiliary power units.",
      },
      {
        title: "Construction & installation",
        body: "Site preparation, control buildings and transformer bays, busbar assembly, cable laying and termination.",
      },
      {
        title: "Testing & energization",
        body: "FAT / SAT, insulation, grounding and relay coordination, then integration into the national grid.",
      },
    ],
  },
  faq: {
    eyebrow: "Service FAQs",
    title: "Questions we hear most",
    intro: "Can't find what you need? Our structural engineering division is happy to walk through your site requirements.",
    ask: "Ask a question",
    items: [
      {
        q: "Does Grid Nova Energy offer full EPC (engineering, procurement, construction) services?",
        a: "Yes. We provide a comprehensive turnkey solution, managing the entire project lifecycle from the first blueprint to the final construction and energization.",
      },
      // Answers below are not drawn in Figma (only the first item is open); composed from the services copy — confirm with the client.
      {
        q: "What types of electrical equipment do you manufacture in-house?",
        a: "We produce high-quality power transformers, MV / LV switchgear and customised distribution boards. In-house manufacturing ensures every component meets our strict internal quality benchmarks.",
      },
      {
        q: "Do your products comply with international standards?",
        a: "Yes. All equipment leaving our factory is fully compliant with international standards such as IEC and IEEE, ensuring global compatibility and maximum safety.",
      },
      {
        q: "Can you integrate new power stations into the existing national grid?",
        a: "Specialised grid integration is a key service — we ensure all new installations are perfectly synchronised with the existing utility infrastructure for seamless power flow.",
      },
      {
        q: "Do you provide ongoing maintenance after construction?",
        a: "Yes. Beyond construction, we offer long-term maintenance contracts, including routine inspections and rapid-response repair services to ensure maximum uptime.",
      },
      {
        q: "What is the lead time for manufactured equipment?",
        a: "Because we control the production line, we offer highly competitive lead times — often delivering critical equipment faster than competitors who rely on external suppliers.",
      },
    ],
  },
  detail: {
    chairman: {
      quote: "“Our approach is aimed at maximizing productivity & efficiency.”",
      name: "Mr. Tawfik Al Sharhan",
      role: "Chairman of the Board",
      portraitAlt: "Mr. Tawfik Al Sharhan, Chairman of the Board of Grid Nova Energy",
    },
    faqTitle: "Service related FAQs",
    sidebar: {
      navLabel: "Service pages",
      brochureTitle: "Service brochure",
      brochureMeta: "Download PDF",
      contactTitle: "Feel free to contact",
      contactIntro: "Tell us about your site and expected load — our engineers will evaluate compatibility.",
      callBack: "Request a call back",
    },
  },
};

export type ServicesStrings = typeof servicesEn;

/**
 * Arabic copy. Hero, chairman quote, FAQ title and the EPC / grid-integration / lead-time FAQs are
 * transcribed from the previous company site (services pages, rebranded to Grid Nova Energy);
 * the rest is translated from `servicesEn` in the same register. Arrays are given in full because
 * `useStrings` replaces arrays wholesale.
 */
export const servicesAr: DeepPartial<ServicesStrings> = {
  meta: {
    title: "خدماتنا",
    description:
      "التصنيع وتوليد الطاقة والإنشاءات والتشغيل والاختبار — نموذج EPC متكامل واحد لشبكة المملكة، تقدمه جريد نوفا للطاقة.",
  },
  hero: {
    eyebrow: "خدماتنا",
    title: "توجيه القوة من العمل إلى الإبداع",
    intro:
      "تجمع جريد نوفا للطاقة بين التكنولوجيا والخبرة والإنتاج الاستراتيجي لتقديم حلول طاقة موثوقة، مع التركيز على الابتكار والاستدامة والتميز في كل مرحلة من مراحل الطاقة.",
    imageAlt: "أبراج نقل الجهد العالي تعبر الصحراء عند الغسق",
  },
  deliver: {
    eyebrow: "كيف ننفذ",
    title: "نموذج EPC متكامل واحد، أربع مراحل",
    intro: "كل مكوّن متزامن مع معايير العميل — من المخطط الأول حتى التزويد بالطاقة النهائي.",
    steps: [
      {
        title: "التصميم والهندسة",
        body: "الهندسة المدنية والإنشائية والكهربائية؛ تصميم أنظمة الحماية والتحكم والاتصالات؛ وأتمتة المحطات الفرعية.",
      },
      {
        title: "المشتريات والتوريد",
        body: "محولات عالية السعة، ومفاتيح كهربائية GIS / AIS، ومفاتيح جهد متوسط، ووحدات الطاقة المساعدة.",
      },
      {
        title: "الإنشاء والتركيب",
        body: "تجهيز الموقع، ومباني التحكم وخلايا المحولات، وتجميع قضبان التوزيع، ومد الكابلات وإنهائها.",
      },
      {
        title: "الاختبار والتزويد بالطاقة",
        body: "اختبارات FAT / SAT، والعزل والتأريض وتنسيق مرحّلات الحماية، ثم الدمج في الشبكة الوطنية.",
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة عن الخدمات",
    title: "الأسئلة الأكثر تكراراً",
    intro: "لم تجد ما تبحث عنه؟ يسرّ قسم الهندسة الإنشائية لدينا مراجعة متطلبات موقعك معك.",
    ask: "اطرح سؤالاً",
    items: [
      {
        q: "هل تقدم جريد نوفا للطاقة خدمات EPC متكاملة (الهندسة والمشتريات والإنشاءات)؟",
        a: "نعم. تقدم جريد نوفا للطاقة حلاً شاملاً متكاملاً بنظام تسليم المفتاح، حيث تدير دورة حياة المشروع بأكملها بدءاً من المخطط الأولي وحتى الإنشاء النهائي والتزويد بالطاقة.",
      },
      {
        q: "ما أنواع المعدات الكهربائية التي تصنّعونها داخلياً؟",
        a: "نُنتج محولات طاقة عالية الجودة، ومفاتيح كهربائية متوسطة / منخفضة الجهد، ولوحات توزيع مخصصة. ويضمن تصنيعنا الداخلي أن كل مكوّن يلبي معايير الجودة الداخلية الصارمة لدينا.",
      },
      {
        q: "هل منتجاتكم متوافقة مع المعايير الدولية؟",
        a: "نعم، جميع المعدات التي تغادر مصنعنا متوافقة تماماً مع المعايير الدولية مثل IEC وIEEE، مما يضمن التوافق العالمي وأقصى درجات السلامة.",
      },
      {
        q: "هل يمكنكم دمج محطات توليد الطاقة الجديدة في الشبكة الوطنية الحالية؟",
        a: "يُعدّ الدمج المتخصص في الشبكة الكهربائية خدمةً أساسية لدينا، إذ نضمن تزامن جميع التركيبات الجديدة تماماً مع البنية التحتية القائمة للمرافق لضمان تدفق سلس للطاقة.",
      },
      {
        q: "هل تقدمون صيانة مستمرة بعد الإنشاء؟",
        a: "نعم. إلى جانب الإنشاء، نقدم عقود صيانة طويلة الأجل تشمل الفحوصات الدورية وخدمات الإصلاح سريعة الاستجابة لضمان أقصى وقت تشغيل.",
      },
      {
        q: "ما المدة الزمنية اللازمة لتوريد المعدات المصنّعة؟",
        a: "لأننا نتحكم في خط الإنتاج، فإننا نقدم أوقات تسليم تنافسية للغاية، وغالباً ما نسلّم المعدات الحيوية بشكل أسرع من المنافسين الذين يعتمدون على الموردين الخارجيين.",
      },
    ],
  },
  detail: {
    chairman: {
      quote: "«نهجنا يهدف إلى زيادة الإنتاجية والكفاءة.»",
      name: "أ. توفيق الشرهان",
      role: "رئيس مجلس الإدارة",
      portraitAlt: "أ. توفيق الشرهان، رئيس مجلس إدارة جريد نوفا للطاقة",
    },
    faqTitle: "الأسئلة الشائعة المتعلقة بالخدمة",
    sidebar: {
      navLabel: "صفحات الخدمات",
      brochureTitle: "كتيب الخدمة",
      brochureMeta: "تحميل PDF",
      contactTitle: "لا تتردد في التواصل",
      contactIntro: "أخبرنا عن موقعك والحمل المتوقع — وسيقيّم مهندسونا مدى التوافق.",
      callBack: "اطلب معاودة الاتصال",
    },
  },
};
