import type { L } from "@/i18n/LocaleProvider";
import { SITE } from "@/data/site";

export type LegalBlock =
  | { type: "paragraph"; text: L }
  | { type: "list"; items: L[] }
  | { type: "table"; head: L[]; rows: L[][] };

export type LegalSection = { id: string; heading: L; blocks: LegalBlock[] };

export type LegalSlug = "privacy" | "terms" | "cookies";

export type LegalDoc = {
  slug: LegalSlug;
  title: L;
  description: L;
  /** ISO date shown as "Last updated". */
  updated: string;
  intro: L;
  sections: LegalSection[];
};

/**
 * Legal pages linked from the footer (/privacy, /terms, /cookies). Drafted for a Saudi company against the
 * Personal Data Protection Law (PDPL) and describing what this website actually does: contact, newsletter and
 * job-application forms, a Google Maps embed on the contact page, no analytics or advertising cookies.
 * Editorial choices to confirm with legal counsel: retention periods (§6 of the privacy policy), governing law and
 * venue (§10 of the terms) and the supervisory-authority reference (SDAIA).
 */
const p = (text: L): LegalBlock => ({ type: "paragraph", text });
const list = (items: L[]): LegalBlock => ({ type: "list", items });

const UPDATED = "2026-10-19";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
    description: { en: "How Grid Nova Energy collects, uses, shares and protects personal data through this website, and the rights you have under the Saudi Personal Data Protection Law.", ar: "كيف تقوم جريد نوفا للطاقة بجمع البيانات الشخصية واستخدامها ومشاركتها وحمايتها من خلال هذا الموقع الإلكتروني، والحقوق المكفولة لكم بموجب نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية." },
    updated: UPDATED,
    intro: {
      en: "This policy explains what personal data Grid Nova Energy collects through this website, why we collect it, who we share it with and how long we keep it. It also sets out your rights under the Personal Data Protection Law of the Kingdom of Saudi Arabia (PDPL).",
      ar: "توضح هذه السياسة البيانات الشخصية التي تجمعها جريد نوفا للطاقة من خلال هذا الموقع الإلكتروني، وأسباب جمعها، والجهات التي نشاركها معها، ومدة الاحتفاظ بها. كما تبين حقوقكم بموجب نظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL).",
    },
    sections: [
      {
        id: "who-we-are",
        heading: { en: "1. Who we are", ar: "1. من نحن" },
        blocks: [
          p({ en: `Grid Nova Energy (“Grid Nova”, “we”, “us”) is an energy infrastructure company headquartered at ${SITE.address}. We are the data controller for the personal data collected through this website, including its Arabic version.`, ar: "جريد نوفا للطاقة («جريد نوفا» أو «نحن») هي شركة متخصصة في البنية التحتية للطاقة ويقع مقرها الرئيسي في 3842 طريق مكة المكرمة، الرياض 12421، المملكة العربية السعودية. ونحن جهة التحكم في البيانات الشخصية التي يتم جمعها من خلال هذا الموقع الإلكتروني، بما في ذلك نسخته العربية." }),
          p({ en: `Questions about this policy or about your personal data can be sent to \u2066${SITE.email}\u2069 or by post to the address above.`, ar: `يمكن إرسال الاستفسارات المتعلقة بهذه السياسة أو ببياناتكم الشخصية إلى البريد الإلكتروني \u2066${SITE.email}\u2069 أو بالبريد إلى العنوان المذكور أعلاه.` }),
        ],
      },
      {
        id: "data-we-collect",
        heading: { en: "2. Personal data we collect", ar: "2. البيانات الشخصية التي نجمعها" },
        blocks: [
          p({ en: "We only collect the personal data you choose to give us through the website, together with limited technical data generated when you visit it.", ar: "لا نجمع سوى البيانات الشخصية التي تختارون تزويدنا بها من خلال الموقع الإلكتروني، إلى جانب بيانات تقنية محدودة تُنشأ عند زيارتكم له." }),
          list([
            { en: "Contact form — your name, work email, company, the service you are interested in and the content of your message.", ar: "نموذج التواصل — اسمكم، وبريدكم الإلكتروني الخاص بالعمل، واسم شركتكم، والخدمة التي تهتمون بها، ومحتوى رسالتكم." },
            { en: "Job applications — your name, email, mobile number, date of birth, nationality, city and country of residence, LinkedIn profile, willingness to relocate, employment history, years of experience, notice period, salary expectation, technical background, education, certifications, language proficiency, your CV, any supporting documents and your cover letter.", ar: "طلبات التوظيف — اسمكم، وبريدكم الإلكتروني، ورقم جوالكم، وتاريخ ميلادكم، وجنسيتكم، ومدينة ودولة إقامتكم، وملفكم الشخصي على LinkedIn، واستعدادكم للانتقال، وسجلكم الوظيفي، وسنوات خبرتكم، ومدة الإشعار، وتوقعاتكم للراتب، وخلفيتكم التقنية، ومؤهلاتكم العلمية، وشهاداتكم المهنية، ومستوى إتقانكم للغات، وسيرتكم الذاتية (CV)، وأي مستندات داعمة، وخطاب التقديم." },
            { en: "Newsletter — your email address.", ar: "النشرة البريدية — عنوان بريدكم الإلكتروني." },
            { en: "Technical data — your IP address, browser and device type, the pages you visit and the referring page, recorded in the standard server logs of our hosting provider.", ar: "البيانات التقنية — عنوان بروتوكول الإنترنت (IP) الخاص بكم، ونوع المتصفح والجهاز، والصفحات التي تزورونها والصفحة المُحيلة، وتُسجَّل في سجلات الخادم القياسية لدى مزود الاستضافة." },
          ]),
          p({ en: "We do not ask for national ID or iqama numbers, passport numbers, bank details or payment information through this website. Please do not include them in free-text fields or uploaded documents unless we have asked for them in a later stage of recruitment.", ar: "لا نطلب عبر هذا الموقع أرقام الهوية الوطنية أو الإقامة (iqama)، ولا أرقام جوازات السفر، ولا البيانات المصرفية أو معلومات الدفع. ويرجى عدم إدراجها في الحقول النصية الحرة أو المستندات المرفوعة ما لم نطلبها منكم في مرحلة لاحقة من إجراءات التوظيف." }),
        ],
      },
      {
        id: "how-we-use-it",
        heading: { en: "3. How we use personal data", ar: "3. كيف نستخدم البيانات الشخصية" },
        blocks: [
          list([
            { en: "To answer your enquiry and follow up on potential projects or partnerships.", ar: "للرد على استفساراتكم ومتابعة المشاريع أو الشراكات المحتملة." },
            { en: "To assess your job application, contact you about the role you applied for and, with your agreement, consider you for future vacancies.", ar: "لتقييم طلب توظيفكم، والتواصل معكم بشأن الوظيفة التي تقدمتم إليها، والنظر في ترشيحكم للوظائف الشاغرة مستقبلاً بموافقتكم." },
            { en: "To send the newsletter you subscribed to, until you unsubscribe.", ar: "لإرسال النشرة البريدية التي اشتركتم فيها، إلى حين إلغاء اشتراككم." },
            { en: "To operate, secure and improve the website, including detecting misuse and fixing errors.", ar: "لتشغيل الموقع الإلكتروني وتأمينه وتحسينه، بما في ذلك كشف إساءة الاستخدام وإصلاح الأخطاء." },
            { en: "To comply with our legal and regulatory obligations in the Kingdom of Saudi Arabia.", ar: "للامتثال لالتزاماتنا النظامية والتنظيمية في المملكة العربية السعودية." },
          ]),
        ],
      },
      {
        id: "legal-basis",
        heading: { en: "4. Legal basis", ar: "4. الأساس النظامي" },
        blocks: [
          p({ en: "Under the PDPL we process your personal data on the following bases: your consent, which you give when you submit a form or subscribe to the newsletter and may withdraw at any time; the steps needed to respond to your request or to assess your application before entering into a contract with you; our legitimate interest in running a secure website; and compliance with legal obligations.", ar: "نعالج بياناتكم الشخصية بموجب نظام حماية البيانات الشخصية استناداً إلى الأسس التالية: موافقتكم التي تمنحونها عند إرسال أي نموذج أو الاشتراك في النشرة البريدية، ويجوز لكم سحبها في أي وقت؛ والخطوات اللازمة للرد على طلبكم أو تقييم طلب توظيفكم قبل إبرام عقد معكم؛ ومصلحتنا المشروعة في تشغيل موقع إلكتروني آمن؛ والامتثال للالتزامات النظامية." }),
        ],
      },
      {
        id: "sharing",
        heading: { en: "5. Who we share it with", ar: "5. الجهات التي نشارك معها البيانات" },
        blocks: [
          p({ en: "We do not sell personal data. We share it only with:", ar: "لا نبيع البيانات الشخصية، ولا نشاركها إلا مع:" }),
          list([
            { en: "Service providers who host the website, deliver email and process form submissions on our behalf, under contracts that restrict them to our instructions.", ar: "مزودي الخدمات الذين يستضيفون الموقع الإلكتروني، ويقدمون خدمات البريد الإلكتروني، ويعالجون النماذج المرسلة نيابةً عنا، بموجب عقود تقصر تصرفهم على تعليماتنا." },
            { en: "Our professional advisers, such as lawyers and auditors, where necessary.", ar: "مستشارينا المهنيين، مثل المحامين ومراجعي الحسابات، عند الاقتضاء." },
            { en: "Government authorities, courts or regulators where the law requires it.", ar: "الجهات الحكومية أو المحاكم أو الجهات التنظيمية متى اقتضى النظام ذلك." },
          ]),
          p({ en: "Where a service provider processes data outside the Kingdom of Saudi Arabia, we do so only as permitted by the PDPL and its implementing regulations.", ar: "وحيثما يعالج مزود خدمة البيانات خارج المملكة العربية السعودية، فإننا لا نقوم بذلك إلا وفق ما يجيزه نظام حماية البيانات الشخصية ولوائحه التنفيذية." }),
        ],
      },
      {
        id: "retention",
        heading: { en: "6. How long we keep it", ar: "6. مدة الاحتفاظ بالبيانات" },
        blocks: [
          list([
            { en: "Enquiries — up to 24 months after our last exchange, unless they lead to a contract, in which case the data is kept as part of the contract records.", ar: "الاستفسارات — لمدة تصل إلى 24 شهراً بعد آخر مراسلة بيننا، ما لم تُفضِ إلى عقد، فتُحفظ البيانات حينئذ ضمن سجلات العقد." },
            { en: "Job applications — for the duration of the recruitment process and up to 12 months afterwards so we can consider you for other roles, unless you ask us to delete your application earlier.", ar: "طلبات التوظيف — طوال مدة إجراءات التوظيف ولمدة تصل إلى 12 شهراً بعدها لنتمكن من النظر في ترشيحكم لوظائف أخرى، ما لم تطلبوا منا حذف طلبكم قبل ذلك." },
            { en: "Newsletter — until you unsubscribe.", ar: "النشرة البريدية — إلى حين إلغاء اشتراككم." },
            { en: "Server logs — typically 12 months.", ar: "سجلات الخادم — 12 شهراً عادةً." },
          ]),
        ],
      },
      {
        id: "your-rights",
        heading: { en: "7. Your rights", ar: "7. حقوقكم" },
        blocks: [
          p({ en: "Subject to the PDPL, you have the right to:", ar: "مع مراعاة أحكام نظام حماية البيانات الشخصية، يحق لكم:" }),
          list([
            { en: "Know what personal data we hold about you and how we use it.", ar: "معرفة البيانات الشخصية التي نحتفظ بها عنكم وكيفية استخدامنا لها." },
            { en: "Access and obtain a copy of your personal data.", ar: "الاطلاع على بياناتكم الشخصية والحصول على نسخة منها." },
            { en: "Ask us to correct, complete or update inaccurate data.", ar: "طلب تصحيح البيانات غير الدقيقة أو استكمالها أو تحديثها." },
            { en: "Ask us to delete your data when it is no longer needed for the purpose it was collected for.", ar: "طلب حذف بياناتكم عندما لا تعود لازمة للغرض الذي جُمعت من أجله." },
            { en: "Withdraw your consent at any time, without affecting processing carried out before the withdrawal.", ar: "سحب موافقتكم في أي وقت، دون أن يؤثر ذلك على المعالجة التي تمت قبل السحب." },
            { en: "Lodge a complaint with the Saudi Data & AI Authority (SDAIA) as the competent authority.", ar: "تقديم شكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA) بصفتها الجهة المختصة." },
          ]),
          p({ en: `To exercise any of these rights, email \u2066${SITE.email}\u2069 with “Personal data request” in the subject line. We may ask you to verify your identity before responding, and we respond within the period set by the PDPL.`, ar: `لممارسة أي من هذه الحقوق، يرجى مراسلتنا عبر البريد الإلكتروني \u2066${SITE.email}\u2069 مع كتابة «طلب بيانات شخصية» في سطر الموضوع. وقد نطلب منكم التحقق من هويتكم قبل الرد، ونرد خلال المدة المحددة في نظام حماية البيانات الشخصية.` }),
        ],
      },
      {
        id: "security",
        heading: { en: "8. Security", ar: "8. الأمن" },
        blocks: [
          p({ en: "We apply technical and organisational measures appropriate to the sensitivity of the data, including encrypted connections (HTTPS), access controls and limiting who can view applications and enquiries. No transmission over the internet is completely secure, so we cannot guarantee absolute security, but we will notify you and the competent authority of any breach as the PDPL requires.", ar: "نطبق تدابير تقنية وتنظيمية تتناسب مع حساسية البيانات، بما في ذلك الاتصالات المشفرة (HTTPS)، وضوابط الوصول، وتقييد عدد من يمكنهم الاطلاع على طلبات التوظيف والاستفسارات. ولا يوجد نقل للبيانات عبر الإنترنت آمن تماماً، ولذلك لا يمكننا ضمان الأمن المطلق، غير أننا سنخطركم والجهة المختصة بأي اختراق وفق ما يقتضيه نظام حماية البيانات الشخصية." }),
        ],
      },
      {
        id: "children",
        heading: { en: "9. Children", ar: "9. الأطفال" },
        blocks: [p({ en: "This website and our vacancies are intended for people aged 18 or over. We do not knowingly collect personal data from children; if you believe a child has provided us with data, contact us and we will delete it.", ar: "هذا الموقع الإلكتروني ووظائفنا الشاغرة موجهان للأشخاص الذين تبلغ أعمارهم 18 عاماً فأكثر. ولا نجمع عن علم بيانات شخصية من الأطفال؛ فإذا كنتم تعتقدون أن طفلاً قد زودنا ببيانات، فيرجى التواصل معنا وسنقوم بحذفها." })],
      },
      {
        id: "third-parties",
        heading: { en: "10. Third-party links and embedded content", ar: "10. روابط الجهات الخارجية والمحتوى المضمّن" },
        blocks: [
          p({ en: "The website links to our LinkedIn page and embeds a Google Maps view of our headquarters on the contact page. These services are governed by their own privacy policies, and the map may set Google cookies when it loads. See our cookies page for details.", ar: "يتضمن الموقع الإلكتروني رابطاً إلى صفحتنا على LinkedIn، كما يُضمّن خريطة Google Maps لمقرنا الرئيسي في صفحة التواصل. وتخضع هذه الخدمات لسياسات الخصوصية الخاصة بها، وقد تقوم الخريطة بتعيين ملفات تعريف ارتباط من Google عند تحميلها. ويرجى الاطلاع على صفحة ملفات تعريف الارتباط لمزيد من التفاصيل." }),
        ],
      },
      {
        id: "changes",
        heading: { en: "11. Changes to this policy", ar: "11. التغييرات على هذه السياسة" },
        blocks: [p({ en: "We may update this policy from time to time. The date at the top shows when it was last revised; material changes will be highlighted on this page.", ar: "قد نقوم بتحديث هذه السياسة من وقت لآخر. ويبين التاريخ المذكور في أعلى الصفحة موعد آخر مراجعة لها؛ وسيتم إبراز التغييرات الجوهرية في هذه الصفحة." })],
      },
      {
        id: "contact",
        heading: { en: "12. Contact", ar: "12. التواصل" },
        blocks: [p({ en: `Grid Nova Energy, ${SITE.address}. Email \u2066${SITE.email}\u2069, telephone \u2066${SITE.phone}\u2069.`, ar: `جريد نوفا للطاقة، 3842 طريق مكة المكرمة، الرياض 12421، المملكة العربية السعودية. البريد الإلكتروني: \u2066${SITE.email}\u2069، الهاتف: \u2066${SITE.phone}\u2069.` })],
      },
    ],
  },
  {
    slug: "terms",
    title: { en: "Terms of use", ar: "شروط الاستخدام" },
    description: { en: "The terms that apply when you browse the Grid Nova Energy website, use its forms or rely on the information it publishes.", ar: "الشروط التي تسري عند تصفحكم للموقع الإلكتروني لجريد نوفا للطاقة، أو استخدام نماذجه، أو الاعتماد على المعلومات المنشورة فيه." },
    updated: UPDATED,
    intro: {
      en: "These terms govern your use of the Grid Nova Energy website, including its Arabic version and the forms it provides. By using the website you accept these terms; if you do not agree with them, please do not use the website.",
      ar: "تحكم هذه الشروط استخدامكم للموقع الإلكتروني لجريد نوفا للطاقة، بما في ذلك نسخته العربية والنماذج التي يوفرها. وباستخدامكم للموقع فإنكم تقبلون هذه الشروط؛ فإذا لم توافقوا عليها، يرجى عدم استخدام الموقع.",
    },
    sections: [
      {
        id: "about",
        heading: { en: "1. About this website", ar: "1. عن هذا الموقع" },
        blocks: [
          p({ en: "The website is published by Grid Nova Energy to present the company, its services, projects, news and vacancies, and to let you contact us. Its content is provided for general information only. It is not an offer, quotation or commitment to supply any product or service; those are made only in writing under a separate agreement.", ar: "تنشر جريد نوفا للطاقة هذا الموقع الإلكتروني للتعريف بالشركة وخدماتها ومشاريعها وأخبارها ووظائفها الشاغرة، ولتمكينكم من التواصل معنا. ويُقدَّم محتواه لأغراض المعلومات العامة فقط، ولا يُعد عرضاً أو عرض سعر أو التزاماً بتوريد أي منتج أو خدمة؛ فتلك لا تتم إلا كتابةً بموجب اتفاقية مستقلة." }),
        ],
      },
      {
        id: "permitted-use",
        heading: { en: "2. Permitted use", ar: "2. الاستخدام المسموح به" },
        blocks: [
          p({ en: "You may browse the website and use its forms for legitimate business and personal purposes. You must not:", ar: "يجوز لكم تصفح الموقع الإلكتروني واستخدام نماذجه للأغراض التجارية والشخصية المشروعة. ولا يجوز لكم:" }),
          list([
            { en: "Use the website in any way that breaches applicable laws or regulations of the Kingdom of Saudi Arabia.", ar: "استخدام الموقع بأي طريقة تخالف الأنظمة أو اللوائح المعمول بها في المملكة العربية السعودية." },
            { en: "Copy, scrape or harvest content or data from the website by automated means.", ar: "نسخ المحتوى أو البيانات من الموقع أو استخراجها أو جمعها بوسائل آلية." },
            { en: "Attempt to gain unauthorised access to the website, its servers or any connected system, or interfere with its operation.", ar: "محاولة الوصول غير المصرح به إلى الموقع أو خوادمه أو أي نظام متصل به، أو التدخل في تشغيله." },
            { en: "Upload files containing malware or submit false, misleading or defamatory information through our forms.", ar: "رفع ملفات تحتوي على برمجيات خبيثة، أو تقديم معلومات كاذبة أو مضللة أو تشهيرية من خلال نماذجنا." },
            { en: "Use our name, logo or project images in a way that suggests endorsement or partnership without our written permission.", ar: "استخدام اسمنا أو شعارنا أو صور مشاريعنا بطريقة توحي بتأييدنا أو بوجود شراكة معنا دون إذن كتابي منا." },
          ]),
        ],
      },
      {
        id: "intellectual-property",
        heading: { en: "3. Content and intellectual property", ar: "3. المحتوى والملكية الفكرية" },
        blocks: [
          p({ en: "The website and its content — text, photographs, graphics, logos, page layouts and software — are owned by or licensed to Grid Nova Energy and protected by copyright and trademark law. Partner and client logos remain the property of their respective owners and are shown only to identify those organisations.", ar: "الموقع الإلكتروني ومحتواه — من نصوص وصور فوتوغرافية ورسومات وشعارات وتصاميم صفحات وبرمجيات — مملوكة لجريد نوفا للطاقة أو مرخصة لها، ومحمية بموجب أنظمة حقوق المؤلف والعلامات التجارية. وتظل شعارات الشركاء والعملاء ملكاً لأصحابها، ولا تُعرض إلا للتعريف بتلك الجهات." }),
          p({ en: "You may view, download and print pages for your own reference, and share our news articles with attribution. Any other reproduction, distribution or modification requires our prior written consent.", ar: "يجوز لكم عرض الصفحات وتنزيلها وطباعتها للرجوع إليها شخصياً، ومشاركة مقالاتنا الإخبارية مع الإشارة إلى المصدر. وأي استنساخ أو توزيع أو تعديل آخر يتطلب موافقتنا الكتابية المسبقة." }),
        ],
      },
      {
        id: "submissions",
        heading: { en: "4. Enquiries and job applications", ar: "4. الاستفسارات وطلبات التوظيف" },
        blocks: [
          p({ en: "Information you provide through the contact, newsletter and application forms must be accurate and up to date. Job applicants confirm that the qualifications, experience and documents they submit are genuine; we may verify them and may withdraw an offer if they prove otherwise. Submitting an application does not create any obligation on Grid Nova Energy to respond, interview or hire. Personal data you submit is handled in line with our privacy policy.", ar: "يجب أن تكون المعلومات التي تقدمونها من خلال نماذج التواصل والنشرة البريدية والتوظيف دقيقة ومحدّثة. ويقر المتقدمون للوظائف بأن المؤهلات والخبرات والمستندات التي يقدمونها صحيحة؛ ويجوز لنا التحقق منها وسحب أي عرض إذا ثبت خلاف ذلك. ولا يترتب على تقديم الطلب أي التزام على جريد نوفا للطاقة بالرد أو إجراء مقابلة أو التوظيف. وتُعالج البيانات الشخصية التي تقدمونها وفقاً لسياسة الخصوصية الخاصة بنا." }),
        ],
      },
      {
        id: "third-party-links",
        heading: { en: "5. Third-party links", ar: "5. روابط الجهات الخارجية" },
        blocks: [p({ en: "Links to other websites, including LinkedIn and Google Maps, are provided for convenience. We do not control those sites and are not responsible for their content, availability or privacy practices.", ar: "تُقدَّم الروابط إلى المواقع الإلكترونية الأخرى، بما في ذلك LinkedIn وGoogle Maps، لتسهيل الوصول فقط. ولا نتحكم في تلك المواقع ولسنا مسؤولين عن محتواها أو توافرها أو ممارساتها المتعلقة بالخصوصية." })],
      },
      {
        id: "disclaimer",
        heading: { en: "6. Accuracy and availability", ar: "6. الدقة والتوافر" },
        blocks: [
          p({ en: "We take care to keep the website accurate and up to date, but it is provided “as is”. Project descriptions, capacities, voltage levels, dates and statuses are indicative and may change without notice. We do not warrant that the website will be uninterrupted, error-free or free of harmful components, and we may suspend or change it at any time.", ar: "نحرص على إبقاء الموقع الإلكتروني دقيقاً ومحدّثاً، غير أنه يُقدَّم «كما هو». وتُعد أوصاف المشاريع وسعاتها ومستويات الجهد وتواريخها وحالاتها إرشادية وقابلة للتغيير دون إشعار. ولا نضمن أن يكون الموقع متاحاً دون انقطاع أو خالياً من الأخطاء أو من المكونات الضارة، ويجوز لنا تعليقه أو تغييره في أي وقت." }),
        ],
      },
      {
        id: "liability",
        heading: { en: "7. Limitation of liability", ar: "7. تحديد المسؤولية" },
        blocks: [
          p({ en: "To the fullest extent permitted by law, Grid Nova Energy is not liable for any direct, indirect or consequential loss arising from your use of, or inability to use, the website or your reliance on its content. Nothing in these terms excludes liability that cannot be excluded under the laws of the Kingdom of Saudi Arabia.", ar: "إلى أقصى حد يجيزه النظام، لا تتحمل جريد نوفا للطاقة المسؤولية عن أي خسارة مباشرة أو غير مباشرة أو تبعية تنشأ عن استخدامكم للموقع الإلكتروني أو عدم قدرتكم على استخدامه أو اعتمادكم على محتواه. ولا يوجد في هذه الشروط ما يستبعد مسؤولية لا يجوز استبعادها بموجب أنظمة المملكة العربية السعودية." }),
        ],
      },
      {
        id: "privacy",
        heading: { en: "8. Privacy and cookies", ar: "8. الخصوصية وملفات تعريف الارتباط" },
        blocks: [p({ en: "Our privacy policy and cookies page explain how we handle personal data and which cookies the website uses. They form part of these terms.", ar: "توضح سياسة الخصوصية وصفحة ملفات تعريف الارتباط الخاصتان بنا كيفية تعاملنا مع البيانات الشخصية وملفات تعريف الارتباط التي يستخدمها الموقع، وتشكلان جزءاً لا يتجزأ من هذه الشروط." })],
      },
      {
        id: "changes",
        heading: { en: "9. Changes to these terms", ar: "9. التغييرات على هذه الشروط" },
        blocks: [p({ en: "We may revise these terms at any time by updating this page. The date at the top shows the current version; continued use of the website after a change means you accept the revised terms.", ar: "يجوز لنا تعديل هذه الشروط في أي وقت بتحديث هذه الصفحة. ويبين التاريخ المذكور في أعلى الصفحة النسخة الحالية؛ ويُعد استمراركم في استخدام الموقع بعد أي تغيير قبولاً منكم للشروط المعدلة." })],
      },
      {
        id: "governing-law",
        heading: { en: "10. Governing law", ar: "10. النظام الواجب التطبيق" },
        blocks: [
          p({ en: "These terms are governed by the laws of the Kingdom of Saudi Arabia. Any dispute arising from them or from your use of the website is subject to the exclusive jurisdiction of the competent courts in Riyadh.", ar: "تخضع هذه الشروط لأنظمة المملكة العربية السعودية. ويخضع أي نزاع ينشأ عنها أو عن استخدامكم للموقع الإلكتروني للاختصاص القضائي الحصري للمحاكم المختصة في مدينة الرياض." }),
        ],
      },
      {
        id: "contact",
        heading: { en: "11. Contact", ar: "11. التواصل" },
        blocks: [p({ en: `Grid Nova Energy, ${SITE.address}. Email \u2066${SITE.email}\u2069, telephone \u2066${SITE.phone}\u2069.`, ar: `جريد نوفا للطاقة، 3842 طريق مكة المكرمة، الرياض 12421، المملكة العربية السعودية. البريد الإلكتروني: \u2066${SITE.email}\u2069، الهاتف: \u2066${SITE.phone}\u2069.` })],
      },
    ],
  },
  {
    slug: "cookies",
    title: { en: "Cookies", ar: "ملفات تعريف الارتباط" },
    description: { en: "Which cookies and similar technologies the Grid Nova Energy website uses, what they are for and how to control them.", ar: "ملفات تعريف الارتباط والتقنيات المشابهة التي يستخدمها الموقع الإلكتروني لجريد نوفا للطاقة، والغرض منها، وكيفية التحكم فيها." },
    updated: UPDATED,
    intro: {
      en: "This page explains which cookies and similar technologies the Grid Nova Energy website uses. In short: we do not set tracking, analytics or advertising cookies, and the only third-party cookies come from the Google Maps embed on our contact page.",
      ar: "توضح هذه الصفحة ملفات تعريف الارتباط والتقنيات المشابهة التي يستخدمها الموقع الإلكتروني لجريد نوفا للطاقة. وباختصار: لا نعيّن ملفات تعريف ارتباط للتتبع أو التحليلات أو الإعلانات، وملفات تعريف الارتباط الوحيدة من جهات خارجية تأتي من خريطة Google Maps المضمّنة في صفحة التواصل.",
    },
    sections: [
      {
        id: "what-are-cookies",
        heading: { en: "1. What cookies are", ar: "1. ما هي ملفات تعريف الارتباط" },
        blocks: [
          p({ en: "Cookies are small text files that a website stores on your device so it can recognise your browser on later visits. Similar technologies include local storage and pixels. Cookies can be set by the website you are visiting (first-party) or by other services embedded in it (third-party), and they can expire at the end of your session or persist for a set period.", ar: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يخزنها الموقع الإلكتروني على جهازكم ليتمكن من التعرف على متصفحكم في الزيارات اللاحقة. وتشمل التقنيات المشابهة التخزين المحلي وبكسلات التتبع. ويمكن أن يعيّن ملفات تعريف الارتباط الموقع الذي تزورونه (ملفات الطرف الأول) أو خدمات أخرى مضمّنة فيه (ملفات الطرف الثالث)، وقد تنتهي صلاحيتها بانتهاء جلستكم أو تبقى لمدة محددة." }),
        ],
      },
      {
        id: "cookies-we-use",
        heading: { en: "2. Cookies this website uses", ar: "2. ملفات تعريف الارتباط التي يستخدمها هذا الموقع" },
        blocks: [
          p({ en: "Grid Nova Energy does not set its own cookies at present. The website does not require an account or login, your language choice is carried in the address (for example /ar) rather than stored, and the forms do not store what you type between visits. We do not run analytics, advertising or social-media tracking cookies.", ar: "لا تعيّن جريد نوفا للطاقة ملفات تعريف ارتباط خاصة بها في الوقت الحالي. فالموقع الإلكتروني لا يتطلب إنشاء حساب أو تسجيل الدخول، ويُحمل اختياركم للغة في عنوان الصفحة (مثل ‎/ar) بدلاً من تخزينه، ولا تحتفظ النماذج بما تكتبونه بين الزيارات. ولا نشغّل ملفات تعريف ارتباط للتحليلات أو الإعلانات أو تتبع وسائل التواصل الاجتماعي." }),
          p({ en: "The only cookies you may receive come from third-party content embedded in the website:", ar: "ملفات تعريف الارتباط الوحيدة التي قد تتلقونها تأتي من محتوى جهات خارجية مضمّن في الموقع الإلكتروني:" }),
          {
            type: "table",
            head: [{ en: "Provider", ar: "المزود" }, { en: "Where", ar: "الموضع" }, { en: "Purpose", ar: "الغرض" }, { en: "Type", ar: "النوع" }],
            rows: [
              [
                { en: "Google Maps (Google LLC)", ar: "خرائط Google Maps (شركة Google LLC)" },
                { en: "Contact page map", ar: "خريطة صفحة التواصل" },
                { en: "Loads the interactive map of our headquarters and remembers map preferences; may be used by Google for its own purposes as described in Google’s privacy policy.", ar: "تحمّل الخريطة التفاعلية لمقرنا الرئيسي وتتذكر تفضيلات الخريطة؛ وقد تستخدمها Google لأغراضها الخاصة وفق ما هو موضح في سياسة الخصوصية الخاصة بشركة Google." },
                { en: "Third-party, persistent", ar: "طرف ثالث، دائمة" },
              ],
              [
                { en: "Hosting provider", ar: "مزود الاستضافة" },
                { en: "All pages", ar: "جميع الصفحات" },
                { en: "May set a strictly necessary cookie to balance traffic across servers or protect the site from abuse. It contains no personal data and expires with your session.", ar: "قد يعيّن ملف تعريف ارتباط ضرورياً للغاية لموازنة حركة الزيارات بين الخوادم أو لحماية الموقع من إساءة الاستخدام. ولا يحتوي على أي بيانات شخصية وتنتهي صلاحيته بانتهاء جلستكم." },
                { en: "Strictly necessary, session", ar: "ضرورية للغاية، جلسة" },
              ],
            ],
          },
        ],
      },
      {
        id: "managing",
        heading: { en: "3. Managing cookies", ar: "3. إدارة ملفات تعريف الارتباط" },
        blocks: [
          p({ en: "You can block or delete cookies through your browser settings. Blocking Google cookies will not affect the rest of the website; the map on the contact page may not load, but our address and directions are also shown as text.", ar: "يمكنكم حظر ملفات تعريف الارتباط أو حذفها من خلال إعدادات المتصفح. ولن يؤثر حظر ملفات تعريف ارتباط Google على بقية الموقع الإلكتروني؛ فقد لا تُحمَّل الخريطة في صفحة التواصل، غير أن عنواننا وإرشادات الوصول إلينا معروضة أيضاً كنص." }),
          list([
            { en: "Google Chrome — Settings › Privacy and security › Third-party cookies.", ar: "Google Chrome — الإعدادات › الخصوصية والأمان › ملفات تعريف الارتباط التابعة لجهات خارجية (Settings › Privacy and security › Third-party cookies)." },
            { en: "Safari — Settings › Privacy › Manage Website Data.", ar: "Safari — الإعدادات › الخصوصية › إدارة بيانات مواقع الويب (Settings › Privacy › Manage Website Data)." },
            { en: "Mozilla Firefox — Settings › Privacy & Security › Cookies and Site Data.", ar: "Mozilla Firefox — الإعدادات › الخصوصية والأمان › ملفات تعريف الارتباط وبيانات المواقع (Settings › Privacy & Security › Cookies and Site Data)." },
            { en: "Microsoft Edge — Settings › Cookies and site permissions.", ar: "Microsoft Edge — الإعدادات › ملفات تعريف الارتباط وأذونات المواقع (Settings › Cookies and site permissions)." },
          ]),
        ],
      },
      {
        id: "changes",
        heading: { en: "4. Changes", ar: "4. التغييرات" },
        blocks: [
          p({ en: "If we add analytics or other cookies in the future, we will update this page before they go live and, where the law requires it, ask for your consent first. The date at the top shows when this page was last revised.", ar: "إذا أضفنا ملفات تعريف ارتباط للتحليلات أو غيرها مستقبلاً، فسنحدّث هذه الصفحة قبل تفعيلها، وسنطلب موافقتكم أولاً حيثما يقتضي النظام ذلك. ويبين التاريخ المذكور في أعلى الصفحة موعد آخر مراجعة لهذه الصفحة." }),
        ],
      },
      {
        id: "contact",
        heading: { en: "5. Contact", ar: "5. التواصل" },
        blocks: [p({ en: `Questions about cookies or this page can be sent to \u2066${SITE.email}\u2069.`, ar: `يمكن إرسال الاستفسارات المتعلقة بملفات تعريف الارتباط أو بهذه الصفحة إلى \u2066${SITE.email}\u2069.` })],
      },
    ],
  },
];

export const legalBySlug = (slug: LegalSlug) => legalDocs.find((d) => d.slug === slug) as LegalDoc;
