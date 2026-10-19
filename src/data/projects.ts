import type { L } from "@/i18n/LocaleProvider";

export type ProjectCategory = "energy-station" | "construction-installation" | "transmission" | "cable-works" | "manufacturing";

/** Scope block on the project detail page (Figma 35:712): numbered title + checklist. */
export type ProjectScope = { title: L; items: L[] };

/** Strategic-impact card (Figma 35:785). Icons are Lucide names rendered by the page. */
export type ProjectImpact = { icon: "shield" | "trend" | "zap"; title: L; body: L };

export type ProjectGalleryItem = { image: string; alt: string };

/** Everything the /projects/:slug page needs beyond the card fields (Figma 35:632). */
export type ProjectDetail = {
  /** page-hero background base name under /public/images (1440 × 640 WebP + @2x) */
  heroImage: string;
  heroImageAlt: string;
  /** hero intro, Body/L max 760 */
  intro: L;
  /** brief bar "Category" (differs from the card tag, e.g. "Construction") */
  category: L;
  startDate?: L;
  endDate?: L;
  overview: L[];
  scopeIntro?: L;
  scope: ProjectScope[];
  /** 2-up photos, 380 × 250 at 1440 */
  gallery?: ProjectGalleryItem[];
  impactIntro?: L;
  impact?: ProjectImpact[];
  commitment?: { title: L; body: L };
  /** green milestone callout */
  milestone?: L;
};

export type Project = {
  slug: string;
  title: L;
  /** short title used on the hero featured card */
  shortTitle?: L;
  tag: L;
  category: ProjectCategory;
  client: L;
  location: L;
  period: L;
  status: "in-progress" | "completed";
  /** card image base name (3:2 → 384 × 256) */
  image: string;
  imageAlt: string;
  summary?: L;
  timeline?: L;
  deliveryModel?: L;
  featured?: boolean;
  /** card description on /projects (Body/M, Figma 34:587) */
  excerpt?: L;
  /** start (or completion) year — drives the "Newest first" sort on /projects */
  year: number;
  detail?: ProjectDetail;
};

/**
 * Project data reconciled with the company's previous website (energy.shrhan.com, Al Sharhan Energy):
 * clients, places, dates, status and the overview / scope / impact copy follow each project's page there.
 * Arabic is transcribed from the old Arabic pages where they exist (Ad-Dayir 2, Khurais, Al Rain) and
 * translated in the same register elsewhere; "National Grid SA" is "الشركة الوطنية لنقل الكهرباء" throughout.
 */
export const projects: Project[] = [
  {
    slug: "ad-dayir-2-substation",
    title: { en: "Construction of New Ad-Dayir 2 132/13.8 kV Substation", ar: "إنشاء محطة الدائر 2 الفرعية الجديدة 132/13.8 ك.ف" },
    shortTitle: { en: "Ad-Dayir 2 132/13.8 kV Substation", ar: "محطة الدائر 2 الفرعية 132/13.8 ك.ف" },
    tag: { en: "Energy station construction", ar: "إنشاء محطة طاقة" },
    category: "energy-station",
    client: { en: "National Grid SA", ar: "الشركة الوطنية لنقل الكهرباء" },
    location: { en: "Jazan Region", ar: "منطقة جازان" },
    period: { en: "2025 – 2026", ar: "2025 – 2026" },
    status: "in-progress",
    image: "proj1",
    imageAlt: "A high-voltage substation with transformers and steel gantries",
    summary: {
      en: "Greenfield EPC delivery for National Grid SA — from site engineering to energization, strengthening the Jazan Region grid.",
      ar: "تنفيذ متكامل (EPC) لصالح الشركة الوطنية لنقل الكهرباء — من هندسة الموقع حتى التشغيل، لتعزيز شبكة منطقة جازان.",
    },
    timeline: { en: "Mar 2025 – Jan 2026", ar: "مارس 2025 – يناير 2026" },
    deliveryModel: { en: "EPC turnkey", ar: "تسليم مفتاح (EPC)" },
    featured: true,
    excerpt: {
      en: "A strategic greenfield substation increasing power capacity and improving distribution stability in one of the Kingdom's fastest-growing regions.",
      ar: "محطة فرعية استراتيجية جديدة تزيد القدرة الكهربائية وتحسّن استقرار شبكة التوزيع في إحدى أسرع مناطق المملكة نمواً.",
    },
    year: 2025,
    detail: {
      heroImage: "proj1-hero",
      heroImageAlt: "Power station chimneys and high-voltage switchgear under a blue sky",
      intro: {
        en: "A strategic greenfield substation designed to drastically enhance the electrical infrastructure of the Jazan Region — commissioned by National Grid SA.",
        ar: "محطة فرعية استراتيجية جديدة صُممت لتطوير البنية التحتية الكهربائية في منطقة جازان بشكل جذري — بتكليف من الشركة الوطنية لنقل الكهرباء.",
      },
      category: { en: "Construction", ar: "إنشاءات" },
      startDate: { en: "09 Mar 2025", ar: "09 مارس 2025" },
      endDate: { en: "09 Jan 2026", ar: "09 يناير 2026" },
      overview: [
        {
          en: "The Ad-Dayir 2 132/13.8 kV Substation is a strategic greenfield project designed to drastically enhance the electrical infrastructure in the Jazan Region. Commissioned by National Grid SA, the project focuses on increasing power capacity and improving the stability of the distribution network for one of the Kingdom's most rapidly developing areas.",
          ar: "محطة الدائر 2 الفرعية 132/13.8 ك.ف مشروع استراتيجي جديد يهدف إلى تطوير البنية التحتية الكهربائية في منطقة جازان بشكل جذري. وبتكليف من الشركة الوطنية لنقل الكهرباء، يركز المشروع على زيادة القدرة الكهربائية وتحسين استقرار شبكة التوزيع في إحدى أسرع المناطق نمواً في المملكة.",
        },
        {
          en: "Our role encompasses the full turnkey delivery — from initial site engineering to the final moment the substation is energized and put into service.",
          ar: "يشمل دورنا التسليم الكامل بنظام تسليم المفتاح — من الهندسة الأولية للموقع إلى اللحظة النهائية التي يتم فيها تشغيل المحطة الفرعية ووضعها في الخدمة.",
        },
      ],
      scopeIntro: {
        en: "The project follows an integrated EPC model, ensuring every component is seamlessly synchronised with National Grid SA's high-performance standards.",
        ar: "يتبع هذا المشروع نموذج EPC (الهندسة والمشتريات والإنشاء) المتكامل، بما يضمن تزامن كل مكوّن بسلاسة مع معايير الأداء العالية للشركة الوطنية لنقل الكهرباء.",
      },
      scope: [
        {
          title: { en: "Design & engineering", ar: "التصميم والهندسة" },
          items: [
            { en: "Detailed civil, structural and electrical engineering", ar: "هندسة مدنية وإنشائية وكهربائية مفصّلة" },
            { en: "Protection, control & communication (PCC) system design", ar: "تصميم نظام الحماية والتحكم والاتصالات (PCC)" },
            { en: "Substation automation system (SAS) for remote monitoring", ar: "نظام أتمتة المحطات الفرعية (SAS) للمراقبة عن بُعد" },
          ],
        },
        {
          title: { en: "Global procurement & supply", ar: "المشتريات والتوريد العالمي" },
          items: [
            { en: "High-capacity 132/13.8 kV power transformers", ar: "محولات طاقة عالية السعة 132/13.8 ك.ف" },
            { en: "Gas-insulated (GIS) or air-insulated (AIS) switchgear", ar: "مفاتيح توزيع معزولة بالغاز (GIS) أو معزولة بالهواء (AIS)" },
            { en: "Medium-voltage switchgear and auxiliary power units", ar: "مفاتيح توزيع الجهد المتوسط ووحدات الطاقة المساعدة" },
          ],
        },
        {
          title: { en: "Construction & installation", ar: "الإنشاء والتركيب" },
          items: [
            { en: "Earthworks and foundations suited to the Jazan terrain", ar: "أعمال الحفر والأساسات المناسبة لتضاريس جازان" },
            { en: "Control building, transformer bays and firewalls", ar: "مبنى التحكم وحجرات المحولات وجدران الحماية من الحرائق" },
            { en: "Busbar assembly, cable laying and panel termination", ar: "تجميع قضبان التوصيل ومد الكابلات وإنهاء لوحات التحكم" },
          ],
        },
        {
          title: { en: "Testing, commissioning & energization", ar: "الاختبار والتشغيل والتفعيل" },
          items: [
            { en: "Factory and site acceptance tests (FAT / SAT)", ar: "اختبارات القبول في المصنع والموقع (FAT / SAT)" },
            { en: "Insulation, grounding and relay coordination testing", ar: "اختبارات العزل والتأريض وتنسيق المرحّلات" },
            { en: "Integration into the National Grid network and handover", ar: "الدمج في شبكة الشركة الوطنية لنقل الكهرباء والتسليم" },
          ],
        },
      ],
      gallery: [
        { image: "proj1", alt: "Power station chimneys and high-voltage switchgear under a blue sky" },
        { image: "proj4", alt: "Crew in high-visibility vests laying an underground power cable in an open trench" },
      ],
      impactIntro: {
        en: "The Jazan Region is a hub of economic and residential growth. The Ad-Dayir 2 Substation addresses three critical needs:",
        ar: "تُعدّ منطقة جازان مركزاً للنمو الاقتصادي والسكني، وتلبي محطة الدائر 2 الفرعية ثلاثة احتياجات أساسية:",
      },
      impact: [
        {
          icon: "shield",
          title: { en: "Grid resilience", ar: "مرونة الشبكة" },
          body: { en: "Prevents overloading of existing regional substations.", ar: "تمنع التحميل الزائد على المحطات الفرعية الإقليمية الحالية." },
        },
        {
          icon: "trend",
          title: { en: "Economic support", ar: "الدعم الاقتصادي" },
          body: {
            en: "Provides power overhead for local businesses and future industrial projects.",
            ar: "توفر فائضاً من الطاقة للشركات المحلية والمشاريع الصناعية المستقبلية.",
          },
        },
        {
          icon: "zap",
          title: { en: "Efficiency", ar: "الكفاءة" },
          body: {
            en: "Modern 132/13.8 kV conversion reduces transmission losses to the end consumer.",
            ar: "تقلل تقنية التحويل الحديثة 132/13.8 ك.ف خسائر النقل حتى المستهلك النهائي.",
          },
        },
      ],
      commitment: {
        title: { en: "Our commitment to excellence", ar: "التزامنا بالتميز" },
        body: {
          en: "Adhering to National Grid SA standards is our top priority. By utilising modern project management techniques, we are committed to delivering this project within the ambitious 10-month timeline — ensuring the Jazan Region benefits from enhanced energy security as scheduled in early 2026.",
          ar: "يُعدّ الالتزام بمعايير الشركة الوطنية لنقل الكهرباء أولويتنا القصوى. ومن خلال استخدام أساليب إدارة المشاريع الحديثة، نلتزم بتسليم هذا المشروع ضمن الجدول الزمني الطموح المحدد بعشرة أشهر — بما يضمن استفادة منطقة جازان من تعزيز أمن الطاقة في الموعد المقرر مطلع عام 2026.",
        },
      },
      milestone: {
        en: "Mobilisation and engineering phases are currently underway to meet the 2026 commissioning target.",
        ar: "تجري حالياً مراحل التعبئة والهندسة لتحقيق هدف التشغيل في عام 2026.",
      },
    },
  },
  {
    slug: "khurais-ohtl-wooden-poles",
    title: { en: "Retirement of 115 kV OHTL Wooden Poles: Khurais BSP to RWPS 3C", ar: "استبدال الأعمدة الخشبية لخط النقل الهوائي 115 ك.ف: من محطة خريص إلى RWPS 3C" },
    shortTitle: { en: "115 kV OHTL Wooden Poles Retirement", ar: "استبدال الأعمدة الخشبية لخط النقل الهوائي 115 ك.ف" },
    tag: { en: "Construction & installation", ar: "إنشاءات وتركيب" },
    category: "construction-installation",
    client: { en: "National Grid SA", ar: "الشركة الوطنية لنقل الكهرباء" },
    location: { en: "Al Ahsa Region", ar: "منطقة الأحساء" },
    period: { en: "2024 – 2026", ar: "2024 – 2026" },
    status: "in-progress",
    image: "proj2",
    imageAlt: "Overhead transmission line on wooden poles",
    timeline: { en: "Oct 2024 – Jul 2026", ar: "أكتوبر 2024 – يوليو 2026" },
    excerpt: {
      en: "Safe retirement of wooden overhead-line poles and installation of modern structures along the Khurais BSP to RWPS 3C corridor.",
      ar: "إزالة آمنة لأعمدة الخطوط الهوائية الخشبية وتركيب هياكل حديثة على امتداد مسار محطة خريص (BSP) إلى RWPS 3C.",
    },
    year: 2024,
    detail: {
      heroImage: "proj2-hero",
      heroImageAlt: "Overhead transmission line on wooden poles against a clear sky",
      intro: {
        en: "Retirement and replacement of ageing 115 kV overhead-line wooden poles between Khurais 380 BSP and RWPS 3C (LV6) with modern steel or concrete structures built to withstand the Eastern Province climate.",
        ar: "استبدال الأعمدة الخشبية المتقادمة لخط النقل الهوائي 115 ك.ف بين محطة خريص 380 BSP وRWPS 3C (LV6) بهياكل حديثة من الفولاذ أو الخرسانة مصممة لتحمل مناخ المنطقة الشرقية.",
      },
      category: { en: "Construction", ar: "إنشاءات" },
      startDate: { en: "17 Oct 2024", ar: "17 أكتوبر 2024" },
      endDate: { en: "01 Jul 2026", ar: "01 يوليو 2026" },
      overview: [
        {
          en: "As part of the ongoing effort to modernise the Kingdom's power infrastructure, this project involves the strategic retirement and replacement of ageing 115 kV overhead transmission line (OHTL) wooden poles. Stretching between the Khurais 380 BSP and RWPS 3C (LV6) substations, the initiative replaces legacy infrastructure with modern, high-durability materials designed to withstand the harsh environmental conditions of the Eastern Province.",
          ar: "في إطار الجهود المستمرة لتحديث البنية التحتية للطاقة في المملكة، يتضمن هذا المشروع استبدالاً استراتيجياً لأعمدة خطوط النقل الهوائية (OHTL) الخشبية المتقادمة ذات الجهد 115 ك.ف. وتمتد هذه المبادرة بين محطتي خريص 380 BSP وRWPS 3C (LV6)، حيث تُستبدل البنية التحتية القديمة بمواد حديثة عالية المتانة مصممة لتحمل الظروف البيئية القاسية في المنطقة الشرقية.",
        },
        {
          en: "This upgrade is essential for maintaining the integrity of the power supply to critical water pumping stations (RWPS) and ensuring National Grid SA maintains peak operational efficiency.",
          ar: "يُعد هذا التحديث ضرورياً للحفاظ على سلامة إمدادات الطاقة لمحطات ضخ المياه الحيوية (RWPS) وضمان حفاظ الشركة الوطنية لنقل الكهرباء على أعلى كفاءة تشغيلية.",
        },
      ],
      scopeIntro: {
        en: "The transition from wooden structures to modern steel or concrete alternatives requires precision engineering and strict adherence to safety protocols.",
        ar: "يتطلب الانتقال من الهياكل الخشبية إلى البدائل الحديثة المصنوعة من الفولاذ أو الخرسانة هندسة دقيقة والتزاماً صارماً ببروتوكولات السلامة.",
      },
      scope: [
        {
          title: { en: "Decommissioning & removal", ar: "إيقاف التشغيل والإزالة" },
          items: [
            { en: "Safe dismantling of the existing 115 kV wooden pole structures", ar: "تفكيك آمن لهياكل الأعمدة الخشبية القائمة ذات الجهد 115 ك.ف" },
            { en: "Environmental disposal and site clearing of retired materials", ar: "التخلص البيئي من المواد المستبعدة وإزالتها من الموقع" },
            { en: "Live-line management to ensure minimal disruption to the existing network", ar: "إدارة ظروف الخطوط الحية لضمان الحد الأدنى من التعطيل للشبكة القائمة" },
          ],
        },
        {
          title: { en: "Supply & procurement", ar: "التوريد والمشتريات" },
          items: [
            { en: "Materials and equipment meeting the latest National Grid SA technical specifications", ar: "مواد ومعدات تلبي أحدث المواصفات الفنية للشركة الوطنية لنقل الكهرباء" },
            { en: "Logistics management for heavy equipment across the Al Ahsa terrain", ar: "إدارة الخدمات اللوجستية للمعدات الثقيلة عبر تضاريس الأحساء" },
          ],
        },
        {
          title: { en: "Construction & installation", ar: "الإنشاء والتركيب" },
          items: [
            { en: "Excavation and casting of robust foundations for the new structures", ar: "حفر وصبّ أساسات متينة للهياكل الجديدة" },
            { en: "Erection of new poles and hardware", ar: "نصب الأعمدة والتجهيزات الجديدة" },
            { en: "Stringing of 115 kV conductors and insulators to the specified tension and clearance", ar: "تمديد موصلات وعوازل 115 ك.ف لضمان الشد الأمثل والمسافة الآمنة" },
          ],
        },
        {
          title: { en: "Testing & commissioning", ar: "الاختبار والتشغيل" },
          items: [
            { en: "Comprehensive electrical testing of the new line segments", ar: "اختبارات كهربائية شاملة لقطاعات الخط الجديدة" },
            { en: "Inspection of grounding and shield wires", ar: "فحص أسلاك التأريض والحماية" },
            { en: "Official energization and handover to National Grid SA operations", ar: "التشغيل الرسمي وتسليم المشروع إلى عمليات الشركة الوطنية لنقل الكهرباء" },
          ],
        },
      ],
      impactIntro: {
        en: "Replacing the wooden poles is a proactive measure to prevent infrastructure failure — over time, wooden poles are susceptible to environmental degradation. By modernising this line we provide:",
        ar: "يُعدّ استبدال الأعمدة الخشبية إجراءً استباقياً لمنع انهيار البنية التحتية؛ فمع مرور الوقت تتعرض الأعمدة الخشبية للتلف بفعل العوامل البيئية. ومن خلال تحديث هذا الخط نوفر ما يلي:",
      },
      impact: [
        {
          icon: "shield",
          title: { en: "Increased durability", ar: "متانة معززة" },
          body: { en: "Modern materials offer superior resistance to wind, heat and sand erosion.", ar: "توفر المواد الحديثة مقاومة فائقة للرياح والحرارة وتآكل الرمال." },
        },
        {
          icon: "trend",
          title: { en: "Higher capacity", ar: "سعة أعلى" },
          body: {
            en: "Optimised transmission to support the heavy loads of the remote water pumping stations (RWPS).",
            ar: "نقل مُحسَّن لدعم الأحمال الثقيلة لمحطات ضخ المياه البعيدة (RWPS).",
          },
        },
        {
          icon: "zap",
          title: { en: "Lower maintenance", ar: "صيانة أقل" },
          body: {
            en: "Reduced need for frequent inspections and repairs compared with wooden infrastructure.",
            ar: "انخفاض الحاجة إلى عمليات الفحص والإصلاح المتكررة مقارنةً بالبنية التحتية الخشبية.",
          },
        },
      ],
      commitment: {
        title: { en: "Safety & compliance", ar: "السلامة والامتثال" },
        body: {
          en: "Given the proximity to high-voltage environments, our team operates under the strictest National Grid SA safety standards. The project is executed with a “Zero-Harm” philosophy, ensuring the safety of our technicians, the public and the surrounding environment in the Al Ahsa region.",
          ar: "نظراً لقرب الموقع من بيئات ذات جهد كهربائي عالٍ، يعمل فريقنا وفق أعلى معايير السلامة المعتمدة لدى الشركة الوطنية لنقل الكهرباء. ويُنفَّذ هذا المشروع وفق فلسفة «السلامة التامة»، لضمان سلامة الفنيين والجمهور والبيئة المحيطة في منطقة الأحساء.",
        },
      },
      milestone: {
        en: "Currently in the active construction phase, with full completion and retirement of the old line scheduled for July 2026.",
        ar: "المشروع حالياً في مرحلة الإنشاء النشطة، ومن المقرر الانتهاء الكامل من الخط القديم وإيقاف تشغيله في يوليو 2026.",
      },
    },
  },
  {
    slug: "al-rain-prefabricated-substation",
    title: { en: "Construction of Al Rain 132/33 kV Prefabricated Substation", ar: "إنشاء محطة الرين الفرعية مسبقة الصنع 132/33 ك.ف" },
    shortTitle: { en: "Al Rain 132/33 kV Prefabricated Substation", ar: "محطة الرين الفرعية مسبقة الصنع 132/33 ك.ف" },
    tag: { en: "Energy station construction", ar: "إنشاء محطة طاقة" },
    category: "energy-station",
    client: { en: "National Grid SA", ar: "الشركة الوطنية لنقل الكهرباء" },
    location: { en: "Al Rain, Riyadh", ar: "الرين، الرياض" },
    period: { en: "2024 – 2026", ar: "2024 – 2026" },
    status: "in-progress",
    image: "proj3",
    imageAlt: "Ceramic insulators on substation equipment",
    timeline: { en: "Oct 2024 – Jan 2026", ar: "أكتوبر 2024 – يناير 2026" },
    deliveryModel: { en: "EPC turnkey", ar: "تسليم مفتاح (EPC)" },
    excerpt: {
      en: "A prefabricated 132/33 kV substation bolstering the Riyadh Rural distribution network — rapid deployment to National Grid SA standards.",
      ar: "محطة فرعية مسبقة الصنع 132/33 ك.ف تعزز شبكة توزيع الطاقة في ريف الرياض — تنفيذ سريع وفق معايير الشركة الوطنية لنقل الكهرباء.",
    },
    year: 2024,
    detail: {
      heroImage: "proj3-hero",
      heroImageAlt: "Ceramic insulators and bushings on high-voltage substation equipment",
      intro: {
        en: "A 132/33 kV prefabricated substation for National Grid SA — advanced prefabricated construction for rapid deployment and high-quality execution in the Riyadh Rural region.",
        ar: "محطة فرعية مسبقة الصنع 132/33 ك.ف للشركة الوطنية لنقل الكهرباء — أساليب بناء جاهزة متطورة لضمان سرعة التنفيذ وجودة عالية في ريف الرياض.",
      },
      category: { en: "Construction", ar: "إنشاءات" },
      startDate: { en: "22 Oct 2024", ar: "22 أكتوبر 2024" },
      endDate: { en: "06 Jan 2026", ar: "06 يناير 2026" },
      overview: [
        {
          en: "The Al Rain 132/33 kV Prefabricated Substation is a critical infrastructure development aimed at bolstering the power distribution network in the Riyadh Rural region. Commissioned by National Grid SA, the project utilises advanced prefabricated construction methodologies to ensure rapid deployment and high-quality execution.",
          ar: "تمثل محطة الرين الفرعية مسبقة الصنع ذات الجهد 132/33 ك.ف مشروعاً حيوياً لتطوير البنية التحتية، يهدف إلى تعزيز شبكة توزيع الطاقة في ريف الرياض. وقد نُفّذ هذا المشروع بتكليف من الشركة الوطنية لنقل الكهرباء، ويعتمد على أساليب بناء جاهزة متطورة لضمان سرعة التنفيذ وجودة عالية.",
        },
        {
          en: "By integrating cutting-edge power transmission technology with robust civil engineering, the substation serves as a cornerstone for regional energy reliability, supporting both residential growth and industrial expansion in Al Rain.",
          ar: "ومن خلال دمج تكنولوجيا نقل الطاقة المتطورة مع الهندسة المدنية القوية، تعمل هذه المحطة الفرعية كحجر الزاوية لموثوقية الطاقة الإقليمية، وتدعم النمو السكني والتوسع الصناعي في منطقة الرين.",
        },
      ],
      scopeIntro: {
        en: "Our team is responsible for the full lifecycle of the substation development, adhering to the rigorous technical standards set by National Grid SA. The scope is divided into four key phases:",
        ar: "يتولى فريقنا مسؤولية دورة حياة تطوير المحطة الفرعية بالكامل، ملتزماً بالمعايير الفنية الصارمة التي وضعتها الشركة الوطنية لنقل الكهرباء. وينقسم نطاق العمل إلى أربع مراحل رئيسية:",
      },
      scope: [
        {
          title: { en: "Engineering & design", ar: "الهندسة والتصميم" },
          items: [
            { en: "Comprehensive site survey and soil analysis", ar: "مسح شامل للموقع وتحليل التربة" },
            { en: "Detailed electrical and civil engineering designs", ar: "تصاميم هندسية كهربائية ومدنية مفصّلة" },
            { en: "Protection and control system integration planning", ar: "تخطيط تكامل أنظمة الحماية والتحكم" },
          ],
        },
        {
          title: { en: "Supply & procurement", ar: "التوريد والمشتريات" },
          items: [
            { en: "High-voltage transformers, switchgear and prefabricated modules", ar: "محولات الجهد العالي ومفاتيح التوزيع والوحدات مسبقة الصنع" },
            { en: "Specialised cabling and auxiliary power systems", ar: "الكابلات المتخصصة وأنظمة الطاقة المساعدة" },
          ],
        },
        {
          title: { en: "Construction & installation", ar: "الإنشاء والتركيب" },
          items: [
            { en: "Civil works: foundation preparation, site levelling and security fencing", ar: "الأعمال المدنية: تجهيز الأساسات وتسوية الموقع وتركيب السياج الأمني" },
            {
              en: "Mechanical & electrical: assembly of prefabricated units, busbar installation and control-panel wiring",
              ar: "الأعمال الميكانيكية والكهربائية: تجميع الوحدات الجاهزة وتركيب قضبان التوصيل وتوصيل لوحات التحكم",
            },
            { en: "Integration: connection to the existing regional grid infrastructure", ar: "التكامل: الربط بالبنية التحتية للشبكة الإقليمية القائمة" },
          ],
        },
        {
          title: { en: "Testing & commissioning", ar: "الاختبار والتشغيل" },
          items: [
            { en: "Rigorous pre-commissioning tests (PCT) to ensure equipment integrity", ar: "اختبارات ما قبل التشغيل الصارمة (PCT) لضمان سلامة المعدات" },
            { en: "Final system synchronisation with the National Grid", ar: "التزامن النهائي للنظام مع الشبكة الوطنية" },
            { en: "Safety and performance validation under varying load conditions", ar: "التحقق من السلامة والأداء في ظل ظروف تحميل متغيرة" },
          ],
        },
      ],
      impactIntro: {
        en: "The Al Rain substation is more than a construction project — it is a vital upgrade to the Riyadh Rural power corridor. Key benefits include:",
        ar: "تُعد محطة الرين الفرعية أكثر من مجرد مشروع بناء؛ فهي نقلة نوعية حيوية لممر الطاقة في ريف الرياض. ومن أهم فوائدها:",
      },
      impact: [
        {
          icon: "shield",
          title: { en: "Network reliability", ar: "موثوقية الشبكة" },
          body: { en: "Minimises power fluctuations and outages in the Al Rain area.", ar: "تقليل تقلبات الطاقة وانقطاعاتها في منطقة الرين." },
        },
        {
          icon: "trend",
          title: { en: "Enhanced stability", ar: "تعزيز الاستقرار" },
          body: {
            en: "Strengthens the 132 kV transmission backbone to handle increased demand.",
            ar: "تقوية العمود الفقري لنقل الطاقة بجهد 132 ك.ف للتعامل مع زيادة الطلب.",
          },
        },
        {
          icon: "zap",
          title: { en: "Operational efficiency", ar: "الكفاءة التشغيلية" },
          body: {
            en: "The prefabricated design allows a reduced footprint and faster maintenance cycles than traditional stick-built substations.",
            ar: "يتيح التصميم مسبق الصنع تقليل المساحة المطلوبة وتسريع دورات الصيانة مقارنةً بالمحطات الفرعية التقليدية.",
          },
        },
      ],
      commitment: {
        title: { en: "Our commitment to excellence", ar: "التزامنا بالتميز" },
        body: {
          en: "Throughout this project our team maintains a steadfast focus on occupational health and safety (OHS) and environmental compliance. By working closely with National Grid SA, we ensure that every phase — from the first excavation to final energization — reflects the highest standards of Saudi Arabia's energy sector.",
          ar: "يولي فريقنا اهتماماً بالغاً بالصحة والسلامة المهنية والامتثال البيئي طوال فترة هذا المشروع. ومن خلال العمل الوثيق مع الشركة الوطنية لنقل الكهرباء، نضمن أن تعكس كل مرحلة — بدءاً من أعمال الحفر وحتى التشغيل النهائي — أعلى معايير قطاع الطاقة في المملكة العربية السعودية.",
        },
      },
      milestone: {
        en: "Currently in progress — scheduled for completion and full commissioning by January 2026.",
        ar: "قيد التنفيذ حالياً — ومن المقرر الانتهاء منه وتشغيله بالكامل بحلول يناير 2026.",
      },
    },
  },
  {
    slug: "132-kv-power-cable-replacement",
    title: { en: "132 kV Power Cable Replacement Project", ar: "مشروع استبدال كابلات الطاقة 132 ك.ف" },
    shortTitle: { en: "132 kV Power Cable Replacement Project", ar: "مشروع استبدال كابلات الطاقة 132 ك.ف" },
    tag: { en: "Underground cable works", ar: "أعمال الكابلات الأرضية" },
    category: "cable-works",
    client: { en: "National Grid SA", ar: "الشركة الوطنية لنقل الكهرباء" },
    location: { en: "Jazan Region", ar: "منطقة جازان" },
    period: { en: "2025 – 2026", ar: "2025 – 2026" },
    status: "in-progress",
    image: "proj4",
    imageAlt: "Crew in high-visibility vests laying an underground power cable in an open trench",
    timeline: { en: "Mar 2025 – Jan 2026", ar: "مارس 2025 – يناير 2026" },
    deliveryModel: { en: "EPC turnkey", ar: "تسليم مفتاح (EPC)" },
    excerpt: {
      en: "Replacement of ageing 132 kV underground power cables to strengthen reliability and reduce transmission losses.",
      ar: "استبدال كابلات الطاقة الأرضية المتقادمة 132 ك.ف لتعزيز الموثوقية وتقليل خسائر النقل.",
    },
    year: 2025,
    detail: {
      heroImage: "proj4-hero",
      heroImageAlt: "Crew in high-visibility vests laying an underground power cable in an open trench",
      intro: {
        en: "Replacement of ageing 132 kV underground power cables in the Jazan Region to strengthen reliability and reduce transmission losses — delivered for National Grid SA.",
        ar: "استبدال كابلات الطاقة الأرضية المتقادمة 132 ك.ف في منطقة جازان لتعزيز الموثوقية وتقليل خسائر النقل — بتنفيذ لصالح الشركة الوطنية لنقل الكهرباء.",
      },
      category: { en: "Construction", ar: "إنشاءات" },
      startDate: { en: "09 Mar 2025", ar: "09 مارس 2025" },
      endDate: { en: "09 Jan 2026", ar: "09 يناير 2026" },
      overview: [
        {
          en: "Sections of the 132 kV underground network in the Jazan Region have reached the end of their design life. The project replaces those circuits with new XLPE cables, joints and terminations, restoring full rating and reducing losses on a heavily loaded part of the grid.",
          ar: "بلغت أجزاء من شبكة الكابلات الأرضية 132 ك.ف في منطقة جازان نهاية عمرها التصميمي. ويستبدل المشروع تلك الدوائر بكابلات XLPE ووصلات ونهايات جديدة، بما يعيد السعة الكاملة ويقلل الفاقد في جزء شديد التحميل من الشبكة.",
        },
        {
          en: "Grid Nova Energy is delivering the works turnkey — route engineering, cable supply, civil works, installation and commissioning — with circuits returned to service in stages to keep supply uninterrupted.",
          ar: "تنفّذ جريد نوفا للطاقة الأعمال بنظام تسليم المفتاح — هندسة المسار، وتوريد الكابلات، والأعمال المدنية، والتركيب، والتشغيل — مع إعادة الدوائر إلى الخدمة على مراحل للحفاظ على استمرارية الإمداد.",
        },
      ],
      scopeIntro: {
        en: "An EPC turnkey delivery sequenced circuit by circuit around the network's outage plan.",
        ar: "تنفيذ متكامل (EPC) بنظام تسليم المفتاح يُنفَّذ دائرة تلو الأخرى وفق خطة الانقطاعات في الشبكة.",
      },
      scope: [
        {
          title: { en: "Route engineering", ar: "هندسة المسار" },
          items: [
            { en: "Route survey, utility detection and trial pits", ar: "مسح المسار وكشف المرافق والحفر التجريبي" },
            { en: "Cable sizing, thermal and short-circuit studies", ar: "تحديد مقاسات الكابلات والدراسات الحرارية ودراسات القصر" },
            { en: "Traffic management and permitting with local authorities", ar: "إدارة الحركة المرورية واستخراج التصاريح من الجهات المحلية" },
          ],
        },
        {
          title: { en: "Supply & installation", ar: "التوريد والتركيب" },
          items: [
            { en: "132 kV XLPE cables, joints and outdoor terminations", ar: "كابلات XLPE بجهد 132 ك.ف ووصلات ونهايات خارجية" },
            { en: "Trenching, ducting and backfill to the specified thermal resistivity", ar: "الحفر والتمديد في المجاري والردم وفق المقاومة الحرارية المحددة" },
            { en: "Cable pulling, jointing and termination by certified crews", ar: "سحب الكابلات ووصلها وإنهاؤها بفرق معتمدة" },
          ],
        },
        {
          title: { en: "Testing & commissioning", ar: "الاختبار والتشغيل" },
          items: [
            { en: "Sheath tests and partial-discharge monitoring", ar: "اختبارات الغلاف ومراقبة التفريغ الجزئي" },
            { en: "VLF / AC withstand tests on every new circuit", ar: "اختبارات التحمل VLF / AC لكل دائرة جديدة" },
            { en: "Staged energization and handover to National Grid SA", ar: "التشغيل على مراحل والتسليم إلى الشركة الوطنية لنقل الكهرباء" },
          ],
        },
      ],
      commitment: {
        title: { en: "Reliability without interruption", ar: "موثوقية دون انقطاع" },
        body: {
          en: "Each circuit is replaced and re-tested inside its own outage window before the next is taken out of service, so the Jazan network keeps its full capacity while the old cables are retired.",
          ar: "تُستبدل كل دائرة ويُعاد اختبارها ضمن نافذة الانقطاع الخاصة بها قبل إخراج الدائرة التالية من الخدمة، بحيث تحافظ شبكة جازان على كامل سعتها أثناء استبعاد الكابلات القديمة.",
        },
      },
      milestone: {
        en: "Mobilisation and engineering phases are currently underway to meet the 2026 commissioning target.",
        ar: "تجري حالياً مراحل التعبئة والهندسة لتحقيق هدف التشغيل في عام 2026.",
      },
    },
  },
];

export const projectBySlug = (slug: string | undefined) => projects.find((p) => p.slug === slug);
export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

/** Filter chips on /projects (Figma 34:589). A chip can cover several data categories. */
export type ProjectFilterId = "all" | "substations" | "transmission-lines" | "cable-works" | "manufacturing";
export type ProjectFilter = { id: ProjectFilterId; label: L; categories: ProjectCategory[] };

export const projectFilters: ProjectFilter[] = [
  { id: "all", label: { en: "All projects", ar: "جميع المشاريع" }, categories: [] },
  { id: "substations", label: { en: "Substations", ar: "المحطات الفرعية" }, categories: ["energy-station"] },
  { id: "transmission-lines", label: { en: "Transmission lines", ar: "خطوط النقل" }, categories: ["transmission", "construction-installation"] },
  { id: "cable-works", label: { en: "Cable works", ar: "أعمال الكابلات" }, categories: ["cable-works"] },
  { id: "manufacturing", label: { en: "Manufacturing", ar: "التصنيع" }, categories: ["manufacturing"] },
];

export const isProjectFilterId = (v: string | null | undefined): v is ProjectFilterId =>
  projectFilters.some((f) => f.id === v);
