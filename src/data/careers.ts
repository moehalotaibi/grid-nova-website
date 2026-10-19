import type { L } from "@/i18n/LocaleProvider";

/** Careers inbox (Figma 39:1184 "CV card"). */
export const CAREERS_EMAIL = "careers@grid-nova.com";

/** A titled list block on the job page (responsibilities, requirements, KPIs…). */
/** Picks the bullet icon + colour of a section on /careers/:slug (SECTION_STYLE in src/pages/JobDetail.tsx). */
export type SectionKind = "duties" | "requirements" | "skills" | "kpi" | "reporting" | "authority" | "certifications" | "environment";
export type RoleSection = { title: L; items: L[]; kind: SectionKind };

export type Role = {
  id: string;
  title: L;
  department: L;
  location: L;
  /** Employment type shown in the meta row (Full-time, Contract…). */
  type: L;
  /** Position summary — hero intro on /careers/:slug. */
  summary: L;
  /** Deep-dive sections, in display order. */
  sections: RoleSection[];
  /** Original posting on the previous website. */
  source?: string;
};

/**
 * Open positions — the roles listed on the previous website's Current Jobs page
 * (https://energy.shrhan.com/current-jobs/, newest first) with the full descriptions from each posting.
 * That site lists no employment type and no location (the HSE posting says "Kingdom of Saudi Arabia, based on
 * project locations"), so `type` is editorial and `location` is Riyadh for every role as confirmed by the company. The generic "People & Organization
 * Responsibilities" boilerplate that every posting repeats is left out.
 * Empty this array to show the "No open roles right now — send your CV" state (handoff › board 20 "Edge cases").
 */
const RIYADH = { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" };
const FULL_TIME = { en: "Full-time", ar: "دوام كامل" };
const ENGINEERING = { en: "Engineering", ar: "الهندسة" };

const KPIS: RoleSection = {
  kind: "kpi",
  title: { en: "Key performance indicators", ar: "مؤشرات الأداء الرئيسية" },
  items: [
    { en: "Construction schedule adherence", ar: "الالتزام بالجدول الزمني للتنفيذ" },
    { en: "Construction cost performance index", ar: "مؤشر أداء تكلفة التنفيذ" },
    { en: "Safety compliance rate (LTIFR focus)", ar: "معدل الالتزام بالسلامة (مع التركيز على مؤشر LTIFR)" },
    { en: "Quality compliance rate", ar: "معدل الالتزام بالجودة" },
    { en: "Maintenance work order completion rate", ar: "معدل إنجاز أوامر عمل الصيانة" },
    { en: "Contractor performance index", ar: "مؤشر أداء المقاولين" },
  ],
};

const SITE_RESPONSIBILITIES: L[] = [
  { en: "Supervise site works including excavation, installation and structural works", ar: "الإشراف على أعمال الموقع بما في ذلك أعمال الحفر والتركيب والأعمال الإنشائية" },
  { en: "Monitor daily construction progress and report variances to the Project Manager", ar: "متابعة سير أعمال التنفيذ اليومية ورفع تقارير الانحرافات إلى مدير المشروع" },
  { en: "Ensure site compliance with safety standards and project specifications", ar: "ضمان التزام الموقع بمعايير السلامة ومواصفات المشروع" },
  { en: "Coordinate subcontractors and workforce deployment", ar: "التنسيق مع مقاولي الباطن وتوزيع القوى العاملة" },
  { en: "Resolve on-site issues and escalate critical matters", ar: "معالجة المشكلات في الموقع وتصعيد الأمور الحرجة" },
  { en: "Review and validate site inspection and QA/QC documentation", ar: "مراجعة واعتماد وثائق الفحص الموقعي ووثائق ضمان ومراقبة الجودة (QA/QC)" },
  { en: "Manage site logistics, equipment and material deliveries", ar: "إدارة الخدمات اللوجستية للموقع والمعدات وتوريد المواد" },
  { en: "Support handover preparation and commissioning readiness", ar: "دعم التحضير للتسليم وجاهزية التشغيل التجريبي" },
  { en: "Enforce adherence to company policies and site discipline standards", ar: "فرض الالتزام بسياسات الشركة ومعايير الانضباط في الموقع" },
  { en: "Maintain records of site activities, manpower and resource utilisation", ar: "حفظ سجلات أنشطة الموقع والقوى العاملة واستخدام الموارد" },
];

const SITE_SKILLS: L[] = [
  { en: "Strong knowledge of EPC construction processes and multidisciplinary coordination", ar: "معرفة قوية بعمليات التنفيذ في مشاريع EPC والتنسيق بين التخصصات المتعددة" },
  { en: "Ability to interpret engineering drawings, specifications and method statements", ar: "القدرة على قراءة وتفسير المخططات الهندسية والمواصفات وبيانات طرق التنفيذ" },
  { en: "Experience in site planning, resource allocation and productivity management", ar: "خبرة في تخطيط الموقع وتخصيص الموارد وإدارة الإنتاجية" },
  { en: "Understanding of QA/QC procedures, testing requirements and inspection workflows", ar: "فهم إجراءات ضمان ومراقبة الجودة (QA/QC) ومتطلبات الاختبار وسير عمليات الفحص" },
  { en: "Knowledge of HSE standards and the ability to enforce safety requirements", ar: "الإلمام بمعايير الصحة والسلامة والبيئة (HSE) والقدرة على فرض متطلبات السلامة" },
];

const SITE_REPORTING: L[] = [
  { en: "Reports directly to Project Engineer 2 or the Project Manager", ar: "يرفع التقارير مباشرة إلى مهندس المشروع 2 أو مدير المشروع" },
  { en: "Works closely with Project Engineer 2 and Project Engineer 3", ar: "يعمل بشكل وثيق مع مهندس المشروع 2 ومهندس المشروع 3" },
  { en: "Engineering discipline teams (civil, electrical, mechanical, telecom)", ar: "فرق التخصصات الهندسية (المدنية والكهربائية والميكانيكية والاتصالات)" },
  { en: "Procurement and supply chain, for technical document tracking", ar: "المشتريات وسلسلة الإمداد، لمتابعة الوثائق الفنية" },
  { en: "Construction and site teams, for engineering clarifications", ar: "فرق التنفيذ والموقع، للاستيضاحات الهندسية" },
  { en: "QA/QC, for inspection requirements and technical NCR support", ar: "ضمان ومراقبة الجودة (QA/QC)، لمتطلبات الفحص ودعم تقارير عدم المطابقة (NCR) الفنية" },
];

const SITE_AUTHORITIES: L[] = [
  { en: "Manage and control day-to-day site operations in line with approved plans", ar: "إدارة ومراقبة العمليات اليومية في الموقع وفقاً للخطط المعتمدة" },
  { en: "Supervise site teams and subcontractors to ensure compliance with specifications and schedules", ar: "الإشراف على فرق الموقع ومقاولي الباطن لضمان الالتزام بالمواصفات والجداول الزمنية" },
  { en: "Enforce HSE, quality and environmental requirements on site", ar: "فرض متطلبات الصحة والسلامة (HSE) والجودة والبيئة في الموقع" },
  { en: "Coordinate with Project Management, Engineering and Procurement to resolve site issues", ar: "التنسيق مع إدارة المشاريع والهندسة والمشتريات لحل مشكلات الموقع" },
];

export const roles: Role[] = [
  {
    id: "hse-engineer",
    title: { en: "HSE Engineer", ar: "مهندس الصحة والسلامة (HSE)" },
    department: ENGINEERING,
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/hse-engineer/",
    summary: {
      en: "A job opportunity is available for the position of HSE Engineer (Health & Safety Engineer), based in the Kingdom of Saudi Arabia on project locations.",
      ar: "تتوفر فرصة وظيفية لشغل وظيفة مهندس الصحة والسلامة (HSE)، ومقر العمل في المملكة العربية السعودية بحسب مواقع المشاريع.",
    },
    sections: [
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree in any engineering discipline", ar: "درجة البكالوريوس في أي تخصص هندسي" },
          { en: "Minimum of 10 years of experience in health & safety within construction projects", ar: "خبرة لا تقل عن 10 سنوات في مجال الصحة والسلامة في مشاريع الإنشاءات" },
          { en: "Strong experience in high-voltage projects, including 132 kV substation projects", ar: "خبرة قوية في مشاريع الجهد العالي، بما في ذلك مشاريع محطات التحويل بجهد 132 kV" },
          { en: "Professional safety certifications such as NEBOSH / IOSH or equivalent", ar: "شهادات مهنية في السلامة مثل NEBOSH / IOSH أو ما يعادلها" },
          { en: "Previous approval from Saudi Electricity Company (SEC approved) is preferred", ar: "يفضل الحصول على اعتماد سابق من الشركة السعودية للكهرباء (SEC)" },
          { en: "Strong knowledge of safety systems, procedures and risk management on construction sites", ar: "معرفة قوية بأنظمة وإجراءات السلامة وإدارة المخاطر في مواقع الإنشاءات" },
          { en: "Ability to implement and monitor safety procedures in large-scale projects", ar: "القدرة على تطبيق إجراءات السلامة ومتابعتها في المشاريع الكبرى" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Job responsibilities", ar: "المهام والمسؤوليات" },
        items: [
          { en: "Develop, implement and monitor HSE plans and procedures across project sites", ar: "إعداد خطط وإجراءات الصحة والسلامة والبيئة (HSE) وتطبيقها ومتابعتها في مواقع المشاريع" },
          { en: "Ensure compliance with safety regulations, standards and client requirements", ar: "ضمان الالتزام بأنظمة ومعايير السلامة ومتطلبات العميل" },
          { en: "Conduct site inspections, risk assessments and safety audits", ar: "إجراء عمليات التفتيش الموقعي وتقييمات المخاطر والتدقيق على السلامة" },
          { en: "Investigate incidents and prepare safety reports with corrective actions", ar: "التحقيق في الحوادث وإعداد تقارير السلامة مع الإجراءات التصحيحية" },
          { en: "Deliver safety training and awareness programmes for site personnel", ar: "تقديم برامج التدريب والتوعية بالسلامة للعاملين في الموقع" },
          { en: "Coordinate with project teams, consultants and contractors to ensure a safe working environment", ar: "التنسيق مع فرق المشاريع والاستشاريين والمقاولين لضمان بيئة عمل آمنة" },
        ],
      },
    ],
  },
  {
    id: "document-controller",
    title: { en: "Document Controller", ar: "مراقب وثائق" },
    department: { en: "Projects", ar: "المشاريع" },
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/document-controller/",
    summary: {
      en: "The Document Controller (project level) is responsible for managing, controlling, tracking and archiving all project documents and correspondence in accordance with company document-control procedures, SEC requirements and contractual obligations, so that the project team always works with the latest approved documents and every record is complete and retrievable.",
      ar: "يتولى مراقب الوثائق (على مستوى المشروع) مسؤولية إدارة جميع وثائق ومراسلات المشروع ومراقبتها ومتابعتها وأرشفتها وفقاً لإجراءات مراقبة الوثائق المعتمدة في الشركة ومتطلبات الشركة السعودية للكهرباء (SEC) والالتزامات التعاقدية، بحيث يعمل فريق المشروع دائماً بأحدث الوثائق المعتمدة وتكون جميع السجلات مكتملة وقابلة للاسترجاع.",
    },
    sections: [
      {
        kind: "duties",
        title: { en: "Document control & DMS management", ar: "مراقبة الوثائق وإدارة نظام إدارة الوثائق (DMS)" },
        items: [
          { en: "Register, control and distribute all incoming and outgoing project documents", ar: "تسجيل جميع وثائق المشروع الواردة والصادرة ومراقبتها وتوزيعها" },
          { en: "Maintain document registers for design submittals, SEC correspondence, RFIs, NCRs and technical submissions", ar: "حفظ سجلات الوثائق الخاصة بتقديمات التصميم ومراسلات SEC وطلبات المعلومات (RFI) وتقارير عدم المطابقة (NCR) والتقديمات الفنية" },
          { en: "Ensure correct document numbering, revision control and approval status", ar: "ضمان صحة ترقيم الوثائق وضبط المراجعات وحالة الاعتماد" },
          { en: "Upload and manage documents in the DMS (SharePoint, Aconex, Asite or similar)", ar: "رفع الوثائق وإدارتها في نظام إدارة الوثائق (DMS) مثل SharePoint أو Aconex أو Asite أو ما يماثلها" },
        ],
      },
      {
        kind: "duties",
        title: { en: "SEC & client correspondence support", ar: "دعم مراسلات SEC والعميل" },
        items: [
          { en: "Log all SEC incoming letters and comments", ar: "تسجيل جميع الخطابات والملاحظات الواردة من SEC" },
          { en: "Distribute documents to the relevant project team members", ar: "توزيع الوثائق على أعضاء فريق المشروع المعنيين" },
          { en: "Track response deadlines and follow up with the responsible parties", ar: "متابعة المواعيد النهائية للردود والمتابعة مع الجهات المسؤولة" },
          { en: "Ensure official transmission records are maintained", ar: "ضمان حفظ سجلات الإرسال الرسمية" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Compliance & audit readiness", ar: "الالتزام والجاهزية للتدقيق" },
        items: [
          { en: "Ensure document-control procedures are followed", ar: "ضمان الالتزام بإجراءات مراقبة الوثائق" },
          { en: "Maintain complete and retrievable project records", ar: "حفظ سجلات مشروع مكتملة وقابلة للاسترجاع" },
          { en: "Support audits, claims and handover documentation", ar: "دعم أعمال التدقيق والمطالبات ووثائق التسليم" },
        ],
      },
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree or diploma in Business Administration, Engineering or a related field", ar: "درجة البكالوريوس أو الدبلوم في إدارة الأعمال أو الهندسة أو مجال ذي صلة" },
          { en: "Training in document-control systems is desirable", ar: "يفضل الحصول على تدريب في أنظمة مراقبة الوثائق" },
          { en: "Minimum 4 years in document control, preferably on EPC projects", ar: "خبرة لا تقل عن 4 سنوات في مراقبة الوثائق، ويفضل في مشاريع EPC" },
        ],
      },
      {
        kind: "skills",
        title: { en: "Skills & competencies", ar: "المهارات والكفاءات" },
        items: [
          { en: "Strong understanding of document-control processes and workflows", ar: "فهم قوي لعمليات مراقبة الوثائق وسير إجراءاتها" },
          { en: "Ability to manage large volumes of documents with accuracy and discipline", ar: "القدرة على إدارة كميات كبيرة من الوثائق بدقة وانضباط" },
          { en: "Proficiency in document management systems (Aconex, SharePoint, EDMS or similar)", ar: "إتقان أنظمة إدارة الوثائق (Aconex أو SharePoint أو EDMS أو ما يماثلها)" },
          { en: "Familiarity with engineering drawings, submittals, QA/QC documents and construction records", ar: "الإلمام بالمخططات الهندسية والتقديمات ووثائق QA/QC وسجلات التنفيذ" },
        ],
      },
      KPIS,
      {
        kind: "reporting",
        title: { en: "Reporting lines & interactions", ar: "خطوط التبعية والتعاملات" },
        items: [
          { en: "Reports to the Project Manager", ar: "يرفع التقارير إلى مدير المشروع" },
          { en: "Key interactions: Design Coordinator, Planning Engineer, engineering teams, QA/QC and the PMO / DMS administrator", ar: "التعاملات الرئيسية: منسق التصميم، ومهندس التخطيط، والفرق الهندسية، وضمان ومراقبة الجودة (QA/QC)، ومكتب إدارة المشاريع (PMO) / مسؤول نظام إدارة الوثائق (DMS)" },
          { en: "Works closely with engineering discipline teams, procurement and supply chain, QA/QC and HSE, construction and site teams, and the PMO for documentation governance and reporting", ar: "يعمل بشكل وثيق مع فرق التخصصات الهندسية، والمشتريات وسلسلة الإمداد، وQA/QC وHSE، وفرق التنفيذ والموقع، ومكتب إدارة المشاريع (PMO) فيما يخص حوكمة الوثائق والتقارير" },
        ],
      },
      {
        kind: "authority",
        title: { en: "Authorities", ar: "الصلاحيات" },
        items: [
          { en: "Authorised to issue and receive documents as per the approved document-control procedures", ar: "مخول بإصدار الوثائق واستلامها وفقاً لإجراءات مراقبة الوثائق المعتمدة" },
          { en: "No authority to modify technical content or make commitments", ar: "لا يملك صلاحية تعديل المحتوى الفني أو تقديم أي التزامات" },
        ],
      },
    ],
  },
  {
    id: "site-manager",
    title: { en: "Site Manager", ar: "مدير موقع" },
    department: { en: "Construction", ar: "الإنشاءات" },
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/site-manager/",
    summary: {
      en: "The Site Manager is responsible for overseeing daily site operations, coordinating contractors, manpower and equipment to ensure the safe, timely and quality delivery of construction activities.",
      ar: "يتولى مدير الموقع مسؤولية الإشراف على العمليات اليومية في الموقع، والتنسيق بين المقاولين والقوى العاملة والمعدات لضمان تنفيذ أعمال الإنشاء بأمان وجودة وفي الوقت المحدد.",
    },
    sections: [
      { kind: "duties", title: { en: "Core responsibilities", ar: "المهام والمسؤوليات الأساسية" }, items: SITE_RESPONSIBILITIES },
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree in Civil, Electrical or Mechanical Engineering", ar: "درجة البكالوريوس في الهندسة المدنية أو الكهربائية أو الميكانيكية" },
          { en: "PMP or an equivalent certification is desirable", ar: "يفضل الحصول على شهادة PMP أو ما يعادلها" },
          { en: "Minimum 8 years in EPC project delivery, with experience in substation and transmission site works", ar: "خبرة لا تقل عن 8 سنوات في تنفيذ مشاريع EPC، مع خبرة في الأعمال الموقعية لمحطات التحويل وخطوط النقل" },
        ],
      },
      { kind: "skills", title: { en: "Skills & competencies", ar: "المهارات والكفاءات" }, items: SITE_SKILLS },
      KPIS,
      { kind: "reporting", title: { en: "Reporting lines & interactions", ar: "خطوط التبعية والتعاملات" }, items: SITE_REPORTING },
      { kind: "authority", title: { en: "Authorities", ar: "الصلاحيات" }, items: SITE_AUTHORITIES },
    ],
  },
  {
    id: "project-engineer-design-coordinator",
    title: { en: "Project Engineer / Design Coordinator", ar: "مهندس مشروع / منسق تصميم" },
    department: ENGINEERING,
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/project-engineer-design-coordinator/",
    summary: {
      en: "The Project Engineer / Design Coordinator (project level) is the primary coordination interface between the Project Manager, SEC, the Engineering Department and the design consultant, ensuring that all design submittals, SEC comments, approvals and revisions are coordinated, tracked and closed in a timely and controlled manner. The role also supports the Project Manager in reporting, progress tracking and progress invoicing — effectively the operational right hand of the Project Manager for all design-related matters.",
      ar: "يمثل مهندس المشروع / منسق التصميم (على مستوى المشروع) حلقة التنسيق الرئيسية بين مدير المشروع والشركة السعودية للكهرباء (SEC) وإدارة الهندسة والاستشاري المصمم، ويضمن تنسيق جميع تقديمات التصميم وملاحظات SEC والاعتمادات والمراجعات ومتابعتها وإغلاقها في الوقت المناسب وبشكل منضبط. كما يدعم مدير المشروع في إعداد التقارير ومتابعة سير العمل وإعداد فواتير الإنجاز، ليكون بذلك الذراع التشغيلي لمدير المشروع في جميع الأمور المتعلقة بالتصميم.",
    },
    sections: [
      {
        kind: "duties",
        title: { en: "SEC interface & design submittals", ar: "التواصل مع SEC وتقديمات التصميم" },
        items: [
          { en: "Act as the primary point of contact with SEC for all design-related submittals at project level", ar: "العمل كنقطة الاتصال الرئيسية مع SEC لجميع تقديمات التصميم على مستوى المشروع" },
          { en: "Submit design documents to SEC and follow up on review status and approvals", ar: "تقديم وثائق التصميم إلى SEC ومتابعة حالة المراجعة والاعتمادات" },
          { en: "Receive SEC comments and officially log, track and distribute them to the Engineering Department and design consultants", ar: "استلام ملاحظات SEC وتسجيلها رسمياً ومتابعتها وتوزيعها على إدارة الهندسة والاستشاريين المصممين" },
          { en: "Coordinate responses, revisions and resubmissions until final approval", ar: "تنسيق الردود والمراجعات وإعادة التقديم حتى الحصول على الاعتماد النهائي" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Design coordination & control", ar: "تنسيق التصميم وضبطه" },
        items: [
          { en: "Coordinate with the engineering teams (primary, secondary, civil, mechanical) on design clarifications", ar: "التنسيق مع الفرق الهندسية (الأنظمة الأولية والثانوية والمدنية والميكانيكية) بشأن استيضاحات التصميم" },
          { en: "Interface with design consultants to ensure timely incorporation of SEC and client comments", ar: "التواصل مع الاستشاريين المصممين لضمان إدراج ملاحظات SEC والعميل في الوقت المناسب" },
          { en: "Track design submissions, approvals, revisions and outstanding comments using design registers", ar: "متابعة تقديمات التصميم والاعتمادات والمراجعات والملاحظات المعلقة باستخدام سجلات التصميم" },
          { en: "Ensure design deliverables align with project scope, schedule and construction requirements", ar: "ضمان توافق مخرجات التصميم مع نطاق المشروع وجدوله الزمني ومتطلبات التنفيذ" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Project reporting & documentation", ar: "تقارير المشروع والتوثيق" },
        items: [
          { en: "Prepare and maintain weekly and monthly project progress reports", ar: "إعداد تقارير سير العمل الأسبوعية والشهرية للمشروع وتحديثها" },
          { en: "Support the preparation of progress invoices, including progress percentages, supporting documents and design approval milestones", ar: "دعم إعداد فواتير الإنجاز، بما في ذلك نسب الإنجاز والمستندات الداعمة ومراحل اعتماد التصميم" },
          { en: "Maintain up-to-date design and approval status reports for Project Manager review", ar: "تحديث تقارير حالة التصميم والاعتمادات باستمرار لمراجعتها من قبل مدير المشروع" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Project coordination support", ar: "دعم تنسيق المشروع" },
        items: [
          { en: "Support the Project Manager in coordinating design-related meetings, technical review sessions and SEC coordination meetings", ar: "دعم مدير المشروع في تنسيق الاجتماعات المتعلقة بالتصميم وجلسات المراجعة الفنية واجتماعات التنسيق مع SEC" },
          { en: "Prepare minutes of meetings and track design-related action items", ar: "إعداد محاضر الاجتماعات ومتابعة بنود العمل المتعلقة بالتصميم" },
          { en: "Support schedule updates related to design activities and approvals", ar: "دعم تحديثات الجدول الزمني المتعلقة بأنشطة التصميم والاعتمادات" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Control, compliance & communication", ar: "الضبط والالتزام والتواصل" },
        items: [
          { en: "Ensure design submittals comply with SEC requirements, project specifications and contractual obligations", ar: "ضمان التزام تقديمات التصميم بمتطلبات SEC ومواصفات المشروع والالتزامات التعاقدية" },
          { en: "Maintain proper filing and document control of all design correspondence and approvals", ar: "الحفظ السليم وضبط الوثائق لجميع مراسلات التصميم والاعتمادات" },
          { en: "Ensure formal communication channels are followed for all SEC and consultant interactions", ar: "ضمان اتباع قنوات التواصل الرسمية في جميع التعاملات مع SEC والاستشاريين" },
        ],
      },
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree in Engineering (Civil or Electrical) as per the contract", ar: "درجة البكالوريوس في الهندسة (المدنية أو الكهربائية) وفقاً لمتطلبات العقد" },
          { en: "CAPM, PMP or equivalent is desirable", ar: "يفضل الحصول على شهادة CAPM أو PMP أو ما يعادلها" },
          { en: "Minimum 6–10 years’ experience on EPC projects", ar: "خبرة من 6 إلى 10 سنوات كحد أدنى في مشاريع EPC" },
          { en: "Strong experience dealing with SEC design submittals and approvals", ar: "خبرة قوية في التعامل مع تقديمات التصميم واعتماداتها لدى SEC" },
          { en: "Proven coordination experience with design consultants and engineering teams", ar: "خبرة مثبتة في التنسيق مع الاستشاريين المصممين والفرق الهندسية" },
        ],
      },
      {
        kind: "kpi",
        title: { en: "Key performance indicators", ar: "مؤشرات الأداء الرئيسية" },
        items: [
          { en: "Timely closure of SEC design comments", ar: "إغلاق ملاحظات SEC على التصميم في الوقت المحدد" },
          { en: "Design approval cycle time", ar: "مدة دورة اعتماد التصميم" },
          { en: "Accuracy and timeliness of project reports", ar: "دقة تقارير المشروع والالتزام بمواعيدها" },
          { en: "Support effectiveness to the Project Manager", ar: "فعالية الدعم المقدم لمدير المشروع" },
          { en: "Reduction of design-related delays impacting construction", ar: "تقليل التأخيرات المتعلقة بالتصميم والمؤثرة على التنفيذ" },
        ],
      },
      {
        kind: "skills",
        title: { en: "Skills & competencies", ar: "المهارات والكفاءات" },
        items: [
          { en: "Strong communication and coordination skills", ar: "مهارات قوية في التواصل والتنسيق" },
          { en: "Excellent document-control and reporting capability", ar: "قدرة ممتازة على مراقبة الوثائق وإعداد التقارير" },
          { en: "Good understanding of EPC workflows and SEC processes", ar: "فهم جيد لسير عمل مشاريع EPC وإجراءات SEC" },
          { en: "High attention to detail and follow-up discipline", ar: "اهتمام عالٍ بالتفاصيل وانضباط في المتابعة" },
        ],
      },
      {
        kind: "reporting",
        title: { en: "Reporting lines & interactions", ar: "خطوط التبعية والتعاملات" },
        items: [
          { en: "Reports directly to the Project Manager", ar: "يرفع التقارير مباشرة إلى مدير المشروع" },
          { en: "Internal: Project Manager, Engineering Department (primary, secondary, civil, mechanical), Planning Engineer, QA/QC and the PMO", ar: "داخلياً: مدير المشروع، وإدارة الهندسة (الأنظمة الأولية والثانوية والمدنية والميكانيكية)، ومهندس التخطيط، وQA/QC، ومكتب إدارة المشاريع (PMO)" },
          { en: "External: SEC representatives (design submittals, comments, approvals), design consultants, and client or consultant representatives", ar: "خارجياً: ممثلو SEC (تقديمات التصميم والملاحظات والاعتمادات)، والاستشاريون المصممون، وممثلو العميل أو الاستشاري" },
        ],
      },
      {
        kind: "authority",
        title: { en: "Authorities", ar: "الصلاحيات" },
        items: [
          { en: "Authorised to submit and follow up design documents with SEC on behalf of the Project Manager", ar: "مخول بتقديم وثائق التصميم إلى SEC ومتابعتها نيابة عن مدير المشروع" },
          { en: "Authorised to coordinate and communicate SEC comments to Engineering and the design consultants", ar: "مخول بتنسيق ملاحظات SEC وإبلاغها إلى إدارة الهندسة والاستشاريين المصممين" },
          { en: "Authorised to prepare project reports and draft progress invoices for Project Manager approval", ar: "مخول بإعداد تقارير المشروع ومسودات فواتير الإنجاز لاعتمادها من مدير المشروع" },
          { en: "No authority to approve design changes, contractual variations or commercial matters; all commitments remain subject to Project Manager and DoA approvals", ar: "لا يملك صلاحية اعتماد تغييرات التصميم أو الأوامر التغييرية التعاقدية أو الأمور التجارية؛ وتظل جميع الالتزامات خاضعة لاعتماد مدير المشروع ومصفوفة تفويض الصلاحيات (DoA)" },
        ],
      },
    ],
  },
  {
    id: "site-engineer",
    title: { en: "Site Engineer", ar: "مهندس موقع" },
    department: ENGINEERING,
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/4550/",
    summary: {
      en: "The Site Engineer is responsible for overseeing daily site operations, coordinating contractors, manpower and equipment to ensure the safe, timely and quality delivery of construction activities.",
      ar: "يتولى مهندس الموقع مسؤولية الإشراف على العمليات اليومية في الموقع، والتنسيق بين المقاولين والقوى العاملة والمعدات لضمان تنفيذ أعمال الإنشاء بأمان وجودة وفي الوقت المحدد.",
    },
    sections: [
      { kind: "duties", title: { en: "Core responsibilities", ar: "المهام والمسؤوليات الأساسية" }, items: SITE_RESPONSIBILITIES },
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree in Civil, Electrical or Mechanical Engineering", ar: "درجة البكالوريوس في الهندسة المدنية أو الكهربائية أو الميكانيكية" },
          { en: "PMP or an equivalent certification is desirable", ar: "يفضل الحصول على شهادة PMP أو ما يعادلها" },
          { en: "Minimum 6 years in EPC project delivery, with experience in substation and transmission site works", ar: "خبرة لا تقل عن 6 سنوات في تنفيذ مشاريع EPC، مع خبرة في الأعمال الموقعية لمحطات التحويل وخطوط النقل" },
        ],
      },
      { kind: "skills", title: { en: "Skills & competencies", ar: "المهارات والكفاءات" }, items: SITE_SKILLS },
      KPIS,
      { kind: "reporting", title: { en: "Reporting lines & interactions", ar: "خطوط التبعية والتعاملات" }, items: SITE_REPORTING },
      { kind: "authority", title: { en: "Authorities", ar: "الصلاحيات" }, items: SITE_AUTHORITIES },
    ],
  },
  {
    id: "protection-engineer",
    title: { en: "Protection Engineer", ar: "مهندس حماية" },
    department: ENGINEERING,
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/protection-engineer/",
    summary: {
      en: "Protection engineer for HV substation and transmission projects, covering protection schemes, relay settings and coordination studies, and support for protection testing and commissioning.",
      ar: "مهندس حماية لمشاريع محطات التحويل وخطوط النقل ذات الجهد العالي (HV)، يغطي أنظمة الحماية وإعدادات مرحّلات الحماية ودراسات التنسيق، ودعم اختبارات الحماية والتشغيل التجريبي.",
    },
    sections: [
      {
        kind: "duties",
        title: { en: "Key responsibilities", ar: "المهام والمسؤوليات الرئيسية" },
        items: [
          { en: "Review and develop protection schemes for HV substations and transmission systems", ar: "مراجعة وتطوير أنظمة الحماية لمحطات التحويل وأنظمة النقل ذات الجهد العالي (HV)" },
          { en: "Perform protection relay settings, coordination studies and calculations", ar: "إعداد إعدادات مرحّلات الحماية وإجراء دراسات التنسيق والحسابات" },
          { en: "Support protection testing and commissioning, including secondary injection and field application", ar: "دعم اختبارات الحماية والتشغيل التجريبي، بما في ذلك الحقن الثانوي والتطبيق الميداني" },
          { en: "Review protection drawings, single-line diagrams and protection philosophies", ar: "مراجعة مخططات الحماية ومخططات الخط الواحد (SLD) وفلسفات الحماية" },
          { en: "Support site activities, testing and commissioning works", ar: "دعم أنشطة الموقع وأعمال الاختبار والتشغيل التجريبي" },
          { en: "Interface with engineering, project and commissioning teams", ar: "التواصل مع فرق الهندسة والمشاريع والتشغيل التجريبي" },
        ],
      },
      {
        kind: "requirements",
        title: { en: "Requirements", ar: "المتطلبات" },
        items: [
          { en: "Bachelor’s degree in Electrical Engineering", ar: "درجة البكالوريوس في الهندسة الكهربائية" },
          { en: "Experience in protection relay testing and commissioning for substation projects", ar: "خبرة في اختبار مرحّلات الحماية وتشغيلها التجريبي في مشاريع محطات التحويل" },
          { en: "Familiarity with distance, differential, transformer, line and busbar protection schemes", ar: "الإلمام بأنظمة حماية المسافة والحماية التفاضلية وحماية المحولات والخطوط وقضبان التوزيع" },
          { en: "Hands-on experience with protection relays from Siemens, ABB, GE or SEL is an advantage", ar: "تعد الخبرة العملية في مرحّلات الحماية من Siemens أو ABB أو GE أو SEL ميزة إضافية" },
          { en: "Familiarity with SEC standards is a strong advantage", ar: "يعد الإلمام بمعايير الشركة السعودية للكهرباء (SEC) ميزة قوية" },
          { en: "Strong technical and coordination skills", ar: "مهارات فنية وتنسيقية قوية" },
        ],
      },
    ],
  },
  {
    id: "project-manager",
    title: { en: "Project Manager", ar: "مدير مشروع" },
    department: { en: "Projects Management", ar: "إدارة المشاريع" },
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/project-manager/",
    summary: {
      en: "The Project Manager leads the execution of EPC projects by managing construction activities, resources, contractors and stakeholders to achieve safety, quality, cost and schedule objectives.",
      ar: "يقود مدير المشروع تنفيذ مشاريع EPC من خلال إدارة أعمال الإنشاء والموارد والمقاولين وأصحاب المصلحة لتحقيق أهداف السلامة والجودة والتكلفة والجدول الزمني.",
    },
    sections: [
      {
        kind: "duties",
        title: { en: "Core responsibilities", ar: "المهام والمسؤوليات الأساسية" },
        items: [
          { en: "Lead planning and execution of the project construction scope, cost and schedule", ar: "قيادة تخطيط وتنفيذ نطاق أعمال الإنشاء للمشروع وتكلفته وجدوله الزمني" },
          { en: "Manage contractor performance and ensure compliance with contractual terms", ar: "إدارة أداء المقاولين وضمان الالتزام بالشروط التعاقدية" },
          { en: "Coordinate with engineering teams to resolve technical queries", ar: "التنسيق مع الفرق الهندسية لحل الاستفسارات الفنية" },
          { en: "Oversee resource allocation, mobilisation and site operations", ar: "الإشراف على تخصيص الموارد والتجهيز والعمليات الموقعية" },
          { en: "Monitor construction progress, identify delays and implement recovery measures", ar: "متابعة سير أعمال التنفيذ وتحديد التأخيرات وتطبيق إجراءات التعويض" },
          { en: "Conduct QA/QC inspections and validate construction deliverables", ar: "إجراء فحوصات QA/QC والتحقق من مخرجات التنفيذ" },
          { en: "Ensure full compliance with HSE and regulatory standards", ar: "ضمان الالتزام التام بمعايير HSE والمتطلبات النظامية" },
          { en: "Manage project budgets, change orders and reporting to leadership", ar: "إدارة ميزانيات المشروع وأوامر التغيير ورفع التقارير إلى الإدارة العليا" },
          { en: "Conduct risk assessments and develop mitigation strategies", ar: "إجراء تقييمات المخاطر ووضع استراتيجيات التخفيف منها" },
          { en: "Capture and share lessons learned for future projects", ar: "توثيق الدروس المستفادة ومشاركتها للاستفادة منها في المشاريع المستقبلية" },
        ],
      },
      {
        kind: "requirements",
        title: { en: "Qualifications & requirements", ar: "المؤهلات والمتطلبات" },
        items: [
          { en: "Bachelor’s degree in Civil, Electrical or Mechanical Engineering", ar: "درجة البكالوريوس في الهندسة المدنية أو الكهربائية أو الميكانيكية" },
          { en: "PMP or an equivalent certification is desirable", ar: "يفضل الحصول على شهادة PMP أو ما يعادلها" },
          { en: "Minimum 8 years in EPC project management", ar: "خبرة لا تقل عن 8 سنوات في إدارة مشاريع EPC" },
        ],
      },
      {
        kind: "skills",
        title: { en: "Skills & competencies", ar: "المهارات والكفاءات" },
        items: [
          { en: "Strong understanding of the EPC lifecycle and multidisciplinary coordination", ar: "فهم قوي لدورة حياة مشاريع EPC والتنسيق بين التخصصات المتعددة" },
          { en: "Proficiency in project scheduling tools (Primavera P6, MS Project)", ar: "إتقان أدوات جدولة المشاريع (Primavera P6 وMS Project)" },
          { en: "Knowledge of engineering deliverables, procurement cycles, construction methods and commissioning processes", ar: "الإلمام بالمخرجات الهندسية ودورات المشتريات وطرق التنفيذ وعمليات التشغيل التجريبي" },
          { en: "Experience managing contractors, claims, variations and commercial issues", ar: "خبرة في إدارة المقاولين والمطالبات والأوامر التغييرية والأمور التجارية" },
          { en: "Understanding of QA/QC, HSE and testing & commissioning requirements", ar: "فهم متطلبات QA/QC وHSE والاختبار والتشغيل التجريبي" },
        ],
      },
      KPIS,
      {
        kind: "reporting",
        title: { en: "Reporting lines & interactions", ar: "خطوط التبعية والتعاملات" },
        items: [
          { en: "Reports directly to the Senior Project Manager or the Director of Construction & Maintenance", ar: "يرفع التقارير مباشرة إلى مدير المشاريع الأول أو مدير إدارة الإنشاءات والصيانة" },
          { en: "Works functionally with engineering, procurement, construction, QA/QC, HSE, PMO and testing & commissioning teams", ar: "يعمل وظيفياً مع فرق الهندسة والمشتريات والإنشاءات وQA/QC وHSE ومكتب إدارة المشاريع (PMO) والاختبار والتشغيل التجريبي" },
          { en: "Works closely with engineering discipline leads, procurement and supply chain, construction and site management, QA/QC and HSE, the PMO for reporting, scheduling and governance, and the testing & commissioning teams", ar: "يعمل بشكل وثيق مع رؤساء التخصصات الهندسية، والمشتريات وسلسلة الإمداد، وإدارة الإنشاءات والموقع، وQA/QC وHSE، ومكتب إدارة المشاريع (PMO) فيما يخص التقارير والجدولة والحوكمة، وفرق الاختبار والتشغيل التجريبي" },
        ],
      },
      {
        kind: "authority",
        title: { en: "Authorities", ar: "الصلاحيات" },
        items: [
          { en: "Manage and deliver the project from initiation to close-out in accordance with the approved scope", ar: "إدارة المشروع وتسليمه من مرحلة البدء حتى الإغلاق وفقاً للنطاق المعتمد" },
          { en: "Plan and control project schedule, cost and quality performance", ar: "تخطيط ومراقبة أداء المشروع من حيث الجدول الزمني والتكلفة والجودة" },
          { en: "Lead project teams and coordinate engineering, procurement and construction activities", ar: "قيادة فرق المشروع وتنسيق أنشطة الهندسة والمشتريات والإنشاءات" },
          { en: "Manage risks and changes, and implement corrective actions", ar: "إدارة المخاطر والتغييرات وتطبيق الإجراءات التصحيحية" },
          { en: "Approve detailed execution and resource plans for the project", ar: "اعتماد خطط التنفيذ التفصيلية وخطط الموارد للمشروع" },
          { en: "Communicate with clients and stakeholders and report project progress", ar: "التواصل مع العملاء وأصحاب المصلحة ورفع تقارير سير العمل في المشروع" },
          { en: "Ensure compliance with HSE, quality and regulatory requirements", ar: "ضمان الالتزام بمتطلبات HSE والجودة والمتطلبات النظامية" },
        ],
      },
    ],
  },
  {
    id: "qc-engineer",
    title: { en: "QC Engineer", ar: "مهندس مراقبة الجودة (QC)" },
    department: { en: "Quality Control", ar: "مراقبة الجودة" },
    location: RIYADH,
    type: FULL_TIME,
    source: "https://energy.shrhan.com/jobs/qc-engineer/",
    summary: {
      en: "The QC Engineer ensures that all electrical and power-related works are executed in accordance with approved drawings, specifications, standards and quality requirements. The role involves inspection, testing, documentation and coordination with engineering, construction and client teams to ensure high-quality, compliant project delivery.",
      ar: "يضمن مهندس مراقبة الجودة تنفيذ جميع الأعمال الكهربائية وأعمال الطاقة وفقاً للمخططات المعتمدة والمواصفات والمعايير ومتطلبات الجودة. وتشمل الوظيفة الفحص والاختبار والتوثيق والتنسيق مع فرق الهندسة والتنفيذ والعميل لضمان تسليم المشروع بجودة عالية ومطابقة للمتطلبات.",
    },
    sections: [
      {
        kind: "duties",
        title: { en: "Quality control & inspection", ar: "مراقبة الجودة والفحص" },
        items: [
          { en: "Inspect electrical installation works including substations, switchgear, transformers, cables, grounding, lighting and power distribution systems", ar: "فحص أعمال التركيبات الكهربائية بما في ذلك محطات التحويل ولوحات المفاتيح الكهربائية (Switchgear) والمحولات والكابلات والتأريض والإنارة وأنظمة توزيع الطاقة" },
          { en: "Verify that works comply with approved drawings, technical specifications and method statements", ar: "التحقق من مطابقة الأعمال للمخططات المعتمدة والمواصفات الفنية وبيانات طرق التنفيذ" },
          { en: "Ensure compliance with applicable standards (IEC, IEEE, NEC, BS and local codes)", ar: "ضمان الالتزام بالمعايير المعمول بها (IEC وIEEE وNEC وBS والكودات المحلية)" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Testing & commissioning support", ar: "دعم الاختبار والتشغيل التجريبي" },
        items: [
          { en: "Witness and record electrical tests such as insulation resistance, continuity and HV/LV cable testing", ar: "حضور وتوثيق الاختبارات الكهربائية مثل اختبارات مقاومة العزل والاستمرارية واختبار كابلات الجهد العالي والمنخفض (HV/LV)" },
          { en: "Transformer testing, switchgear testing and protection relay testing", ar: "اختبار المحولات ولوحات المفاتيح الكهربائية (Switchgear) ومرحّلات الحماية" },
          { en: "Review test reports and ensure acceptance criteria are met", ar: "مراجعة تقارير الاختبار والتأكد من استيفاء معايير القبول" },
          { en: "Support pre-commissioning, commissioning and energisation activities", ar: "دعم أنشطة ما قبل التشغيل والتشغيل التجريبي والإحياء (Energization)" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Documentation & reporting", ar: "التوثيق وإعداد التقارير" },
        items: [
          { en: "Prepare and maintain quality records: inspection & test plans (ITPs), inspection requests (IRs), non-conformance reports (NCRs) and corrective-action reports", ar: "إعداد سجلات الجودة وحفظها: خطط الفحص والاختبار (ITP)، وطلبات الفحص (IR)، وتقارير عدم المطابقة (NCR)، وتقارير الإجراءات التصحيحية" },
          { en: "Review vendor and subcontractor quality documentation", ar: "مراجعة وثائق الجودة الخاصة بالموردين ومقاولي الباطن" },
          { en: "Assist in the preparation of as-built drawings and handover dossiers", ar: "المساعدة في إعداد المخططات التنفيذية النهائية (As-built) وملفات التسليم" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Vendor & subcontractor control", ar: "ضبط الموردين ومقاولي الباطن" },
        items: [
          { en: "Inspect materials upon delivery and verify compliance with approved submittals", ar: "فحص المواد عند التوريد والتحقق من مطابقتها للتقديمات المعتمدة" },
          { en: "Monitor subcontractor works and ensure quality standards are followed", ar: "متابعة أعمال مقاولي الباطن وضمان الالتزام بمعايير الجودة" },
          { en: "Coordinate with suppliers for factory acceptance tests (FAT) when required", ar: "التنسيق مع الموردين لإجراء اختبارات القبول في المصنع (FAT) عند الحاجة" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Non-conformance & corrective actions", ar: "حالات عدم المطابقة والإجراءات التصحيحية" },
        items: [
          { en: "Identify quality issues and raise NCRs", ar: "تحديد مشكلات الجودة وإصدار تقارير عدم المطابقة (NCR)" },
          { en: "Follow up on corrective and preventive actions", ar: "متابعة الإجراءات التصحيحية والوقائية" },
          { en: "Verify closure of quality issues before work acceptance", ar: "التحقق من إغلاق مشكلات الجودة قبل قبول الأعمال" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Coordination & communication", ar: "التنسيق والتواصل" },
        items: [
          { en: "Coordinate with the QA/QC Manager, Project Manager, engineers and site teams", ar: "التنسيق مع مدير QA/QC ومدير المشروع والمهندسين وفرق الموقع" },
          { en: "Attend quality meetings with clients and consultants", ar: "حضور اجتماعات الجودة مع العملاء والاستشاريين" },
          { en: "Provide technical support to construction teams to resolve quality issues", ar: "تقديم الدعم الفني لفرق التنفيذ لحل مشكلات الجودة" },
        ],
      },
      {
        kind: "duties",
        title: { en: "Safety & compliance", ar: "السلامة والالتزام" },
        items: [
          { en: "Ensure quality activities are performed in compliance with HSE requirements", ar: "ضمان تنفيذ أنشطة الجودة وفقاً لمتطلبات HSE" },
          { en: "Promote safe work practices during inspections and testing", ar: "تعزيز ممارسات العمل الآمنة أثناء الفحص والاختبار" },
        ],
      },
      {
        kind: "requirements",
        title: { en: "Required qualifications", ar: "المؤهلات المطلوبة" },
        items: [
          { en: "Bachelor’s degree in Electrical Engineering or equivalent", ar: "درجة البكالوريوس في الهندسة الكهربائية أو ما يعادلها" },
          { en: "3–10 years of experience in electrical QC for power or infrastructure projects", ar: "خبرة من 3 إلى 10 سنوات في مراقبة الجودة الكهربائية لمشاريع الطاقة أو البنية التحتية" },
        ],
      },
      {
        kind: "skills",
        title: { en: "Skills & competencies", ar: "المهارات والكفاءات" },
        items: [
          { en: "Strong knowledge of electrical systems and installation practices", ar: "معرفة قوية بالأنظمة الكهربائية وممارسات التركيب" },
          { en: "Familiarity with electrical testing instruments and procedures", ar: "الإلمام بأجهزة وإجراءات الاختبار الكهربائي" },
          { en: "Ability to read and interpret electrical drawings and specifications", ar: "القدرة على قراءة وتفسير المخططات والمواصفات الكهربائية" },
          { en: "Knowledge of quality systems (ISO 9001)", ar: "الإلمام بأنظمة الجودة (ISO 9001)" },
          { en: "Good documentation, reporting and communication skills", ar: "مهارات جيدة في التوثيق وإعداد التقارير والتواصل" },
        ],
      },
      {
        kind: "certifications",
        title: { en: "Preferred certifications", ar: "الشهادات المفضلة" },
        items: [
          { en: "Certified Quality Engineer (CQE) or equivalent", ar: "مهندس جودة معتمد (CQE) أو ما يعادلها" },
          { en: "ISO 9001 internal auditor", ar: "مدقق داخلي ISO 9001" },
          { en: "Electrical safety certifications (OSHA, NEBOSH or similar)", ar: "شهادات السلامة الكهربائية (OSHA أو NEBOSH أو ما يماثلها)" },
        ],
      },
      {
        kind: "environment",
        title: { en: "Work environment", ar: "بيئة العمل" },
        items: [
          { en: "Primarily site-based, with coordination with office teams", ar: "العمل بشكل أساسي في الموقع، مع التنسيق مع فرق المكتب" },
          { en: "May involve working in energised or high-risk electrical areas", ar: "قد يتطلب العمل في مناطق كهربائية مكهربة أو عالية الخطورة" },
        ],
      },
    ],
  },
];

export const roleById = (id: string | undefined) => roles.find((r) => r.id === id);
