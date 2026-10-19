import { useId, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, FileText, Paperclip, Plus, Upload, X } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { CAREERS_EMAIL, roleById, roles } from "@/data/careers";
import { careersEn, careersAr } from "@/i18n/pages/careers";
import {
  submitApplication,
  type ApplicationPayload,
  type CertificationEntry,
  type EducationEntry,
  type WorkEntry,
} from "@/lib/application";

type Scalars = Omit<ApplicationPayload, "workHistory" | "education" | "certifications" | "consent">;
type ScalarKey = keyof Scalars;
type Errors = Record<string, string | undefined>;
type Option = { value: string; label: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?\d{8,15}$/;
const YEAR = /^(19|20)\d{2}$/;
const CV_TYPES = /\.(pdf|docx?)$/i;
const DOC_TYPES = /\.(pdf|docx?|jpe?g|png)$/i;
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_DOCS = 3;

/** Value of the "General application" option in the Position select. */
export const GENERAL_APPLICATION = "general";

const emptyWork = (): WorkEntry => ({ title: "", employer: "", from: "", to: "", current: false, summary: "" });
const emptyEducation = (): EducationEntry => ({ degree: "", field: "", institution: "", year: "" });
const emptyCertification = (): CertificationEntry => ({ name: "", issuer: "", year: "" });
const isBlank = (entry: object) => Object.values(entry).every((v) => v === "" || v === false);

function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Job application form (/careers/apply) — same card, field and validation patterns as the contact form
 * (handoff › 18/19/20): white card radius 20, `.field-control` inputs, inline errors + role="status"
 * summary, first invalid field focused, failure keeps the entered values.
 * Groups: position · personal · work experience (repeatable) · technical background · education (repeatable) ·
 * certifications (repeatable) · languages · documents (CV drop zone, PDF / DOC / DOCX ≤ 5 MB, + up to 3 supporting files).
 */
export function ApplicationForm({ initialRole = "", className = "" }: { initialRole?: string; className?: string }) {
  const { s, l } = useLocale();
  const { application: t } = useStrings(careersEn, careersAr);
  const f = s.form;
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const docsRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<Scalars & { consent: boolean }>({
    position: roleById(initialRole) ? initialRole : "",
    source: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    city: "",
    country: "",
    linkedin: "",
    relocate: "",
    experience: "",
    notice: "",
    expectedSalary: "",
    secExperience: "",
    voltage: "",
    arabic: "",
    english: "",
    coverLetter: "",
    consent: false,
  });
  const [work, setWork] = useState<WorkEntry[]>([emptyWork()]);
  const [education, setEducation] = useState<EducationEntry[]>([emptyEducation()]);
  const [certifications, setCertifications] = useState<CertificationEntry[]>([emptyCertification()]);
  const [cv, setCv] = useState<File | null>(null);
  const [docs, setDocs] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const clearError = (key: string) => {
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    clearError(key);
  };
  const setRow = <T,>(setter: (fn: (rows: T[]) => T[]) => void, index: number, patch: Partial<T>, errorKey: string) => {
    setter((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    clearError(errorKey);
  };
  const removeRow = <T,>(setter: (fn: (rows: T[]) => T[]) => void, index: number) =>
    setter((rows) => rows.filter((_, i) => i !== index));

  const cvError = (file: File | null): string | undefined => {
    if (!file) return t.cvRequired;
    if (!CV_TYPES.test(file.name)) return t.cvType;
    if (file.size > MAX_BYTES) return t.cvSize;
    return undefined;
  };
  const pickCv = (file: File | null) => {
    setCv(file);
    setErrors((e) => ({ ...e, cv: file ? cvError(file) : undefined }));
  };
  const onDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragging(false);
    const file = ev.dataTransfer.files?.[0];
    if (file) pickCv(file);
  };
  const addDocs = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);
    const bad = incoming.find((file) => !DOC_TYPES.test(file.name) || file.size > MAX_BYTES);
    if (bad) {
      setErrors((e) => ({ ...e, documents: t.documentsType }));
      return;
    }
    if (docs.length + incoming.length > MAX_DOCS) {
      setErrors((e) => ({ ...e, documents: t.documentsMax }));
      return;
    }
    setDocs((d) => [...d, ...incoming]);
    clearError("documents");
    if (docsRef.current) docsRef.current.value = "";
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.position) e.position = f.required;
    if (!values.name.trim()) e.name = f.required;
    if (!values.email.trim()) e.email = f.required;
    else if (!EMAIL.test(values.email)) e.email = f.invalidEmail;
    const phone = values.phone.replace(/[\s()-]/g, "");
    if (!phone) e.phone = f.required;
    else if (!PHONE.test(phone)) e.phone = t.invalidPhone;
    if (values.linkedin.trim() && !/^https:\/\/\S+$/i.test(values.linkedin.trim())) e.linkedin = t.invalidUrl;
    if (!values.experience) e.experience = f.required;
    work.forEach((row, i) => {
      if (!isBlank(row) && (!row.title.trim() || !row.employer.trim())) e[`work-${i}`] = t.work.error;
    });
    education.forEach((row, i) => {
      const required = i === 0 || !isBlank(row);
      if (required && (!row.degree || !row.field.trim() || !row.institution.trim())) e[`edu-${i}`] = t.education.error;
      else if (row.year.trim() && !YEAR.test(row.year.trim())) e[`edu-${i}`] = t.invalidYear;
    });
    certifications.forEach((row, i) => {
      if (isBlank(row)) return;
      if (!row.name.trim()) e[`cert-${i}`] = t.certifications.error;
      else if (row.year.trim() && !YEAR.test(row.year.trim())) e[`cert-${i}`] = t.invalidYear;
    });
    const cvErr = cvError(cv);
    if (cvErr) e.cv = cvErr;
    if (!values.consent) e.consent = f.consentRequired;
    return e;
  };

  const focusSelector = (key: string): string => {
    const row = key.match(/^(work|edu|cert)-(\d+)$/);
    if (!row) return `[name="${key}"]`;
    const field = row[1] === "work" ? `workHistory.${row[2]}.title` : row[1] === "edu" ? `education.${row[2]}.degree` : `certifications.${row[2]}.name`;
    return `[name="${field}"]`;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstInvalid = Object.keys(e).find((k) => e[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(focusSelector(firstInvalid))?.focus();
      return;
    }
    setStatus("sending");
    const { consent, ...scalars } = values;
    try {
      await submitApplication(
        {
          ...scalars,
          consent,
          workHistory: work.filter((row) => !isBlank(row)),
          education: education.filter((row) => !isBlank(row)),
          certifications: certifications.filter((row) => !isBlank(row)),
        },
        cv as File,
        docs,
      );
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const fieldId = (name: string) => `${id}-${name}`;
  const errId = (name: string) => `${id}-${name}-error`;
  const positionOptions: Option[] = [
    ...roles.map((r) => ({ value: r.id, label: l(r.title) })),
    { value: GENERAL_APPLICATION, label: t.generalOption },
  ];
  const toOptions = (labels: string[]): Option[] => labels.map((label, i) => ({ value: `${i + 1}:${label}`, label }));
  const yesNo = toOptions(t.yesNo);
  const levels = toOptions(t.levelOptions);

  // Render helpers (plain functions, not components, so inputs keep focus across re-renders).
  const a11y = (key: string) => ({
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? errId(key) : undefined,
  });
  const labelEl = (name: string, text: string) => (
    <label htmlFor={fieldId(name)} className="label-caption text-neutral-700">
      {text}
    </label>
  );
  const errorText = (key: string) =>
    errors[key] ? (
      <p id={errId(key)} className="label-caption flex items-center gap-1.5 text-error">
        <AlertCircle className="size-3.5 shrink-0" aria-hidden />
        {errors[key]}
      </p>
    ) : null;
  type InputExtra = {
    type?: string;
    autoComplete?: string;
    inputMode?: "email" | "tel" | "url" | "numeric";
    dir?: "ltr";
    required?: boolean;
    max?: string;
  };
  const input = (
    name: string,
    text: string,
    value: string,
    onChange: (v: string) => void,
    placeholder = "",
    extra: InputExtra = {},
    errorKey = name,
  ) => (
    <div className="flex flex-col gap-1.5">
      {labelEl(name, text)}
      <input
        id={fieldId(name)}
        name={name}
        type={extra.type ?? "text"}
        autoComplete={extra.autoComplete}
        inputMode={extra.inputMode}
        required={extra.required}
        dir={extra.dir}
        max={extra.max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field-control"
        {...(errorKey === name ? a11y(name) : {})}
      />
      {errorKey === name && errorText(name)}
    </div>
  );
  const select = (
    name: string,
    text: string,
    value: string,
    onChange: (v: string) => void,
    options: Option[],
    placeholder = t.select,
    required = false,
    errorKey = name,
  ) => (
    <div className="flex flex-col gap-1.5">
      {labelEl(name, text)}
      <div className="relative">
        <select
          id={fieldId(name)}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`field-control appearance-none pe-10 ${value ? "" : "text-neutral-500"}`}
          {...(errorKey === name ? a11y(name) : {})}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-[18px] -translate-y-1/2 text-neutral-500" aria-hidden />
      </div>
      {errorKey === name && errorText(name)}
    </div>
  );
  const scalarInput = (k: ScalarKey, text: string, placeholder = "", extra: InputExtra = {}) =>
    input(k, text, values[k], (v) => set(k, v), placeholder, extra);
  const scalarSelect = (k: ScalarKey, text: string, options: Option[], placeholder = t.select, required = false) =>
    select(k, text, values[k], (v) => set(k, v), options, placeholder, required);
  const group = (title: string, hint?: string) => (
    <div className="mt-2 flex flex-col gap-1">
      <h3 className="label-eyebrow text-neutral-500">{title}</h3>
      {hint && <p className="body-s text-neutral-500">{hint}</p>}
    </div>
  );
  const rowCard = (key: string, children: ReactNode, onRemove: (() => void) | undefined, removeLabel: string) => (
    <div key={key} className={`relative flex flex-col gap-3.5 rounded-16 border p-4 pt-5 md:p-5 ${errors[key] ? "border-error bg-error-50/40" : "border-neutral-200 bg-neutral-50/60"}`}>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="absolute end-2 top-2 inline-flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
      {children}
      {errorText(key)}
    </div>
  );
  const addButton = (label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className="label-button inline-flex w-fit items-center gap-2 rounded-10 border-[1.5px] border-dashed border-neutral-300 px-4 py-2.5 text-brand-blue transition-colors hover:border-brand-blue hover:bg-tint-blue-50"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  );

  if (status === "sent") {
    const role = roleById(values.position);
    return (
      <div className={`flex flex-col gap-5 rounded-20 border border-neutral-200 bg-white p-6 md:p-9 ${className}`} role="status">
        <span className="inline-flex size-[52px] items-center justify-center rounded-[14px] bg-tint-green-50 text-brand-green-dark">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="heading-h3 text-neutral-900">{t.successTitle}</h2>
          <p className="body-m text-neutral-700">{role ? t.successFor(l(role.title)) : t.successGeneral}</p>
        </div>
        <div className="flex flex-col gap-3 xs:flex-row">
          {role && (
            <Button to={`/careers/${role.id}`} variant="outlineDark">
              {t.backToRole}
            </Button>
          )}
          <Button to="/careers" icon={<ArrowRight />}>
            {t.otherRoles}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      encType="multipart/form-data"
      data-analytics="form_submit:application"
      className={`flex w-full flex-col gap-[18px] rounded-20 border border-neutral-200 bg-white p-6 text-neutral-900 md:p-9 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="heading-h3 text-neutral-900">{t.formTitle}</h2>
        <p className="body-s text-neutral-500">{t.formSub}</p>
      </div>

      {errorCount > 0 && (
        <p role="status" className="label-caption rounded-10 bg-error-50 px-3.5 py-2.5 text-error">
          {t.summary(errorCount)}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="label-caption rounded-10 bg-error-50 px-3.5 py-2.5 text-error">
          {t.failure(CAREERS_EMAIL)}
        </p>
      )}

      {/* Position */}
      {group(t.groups.position)}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {scalarSelect("position", t.position, positionOptions, t.positionPlaceholder, true)}
        {scalarSelect("source", t.source, toOptions(t.sourceOptions))}
      </div>

      {/* Personal details */}
      {group(t.groups.personal)}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {scalarInput("name", t.fullName, t.fullNamePlaceholder, { autoComplete: "name", required: true })}
        {scalarInput("email", t.email, t.emailPlaceholder, { type: "email", autoComplete: "email", inputMode: "email", dir: "ltr", required: true })}
        {scalarInput("phone", t.phone, t.phonePlaceholder, { type: "tel", autoComplete: "tel", inputMode: "tel", dir: "ltr", required: true })}
        {scalarInput("dateOfBirth", t.dateOfBirth, "", { type: "date", autoComplete: "bday", dir: "ltr", max: new Date().toISOString().slice(0, 10) })}
        {scalarInput("nationality", t.nationality, t.nationalityPlaceholder)}
        {scalarInput("city", t.city, t.cityPlaceholder, { autoComplete: "address-level2" })}
        {scalarInput("country", t.country, t.countryPlaceholder, { autoComplete: "country-name" })}
        {scalarInput("linkedin", t.linkedin, t.linkedinPlaceholder, { type: "url", autoComplete: "url", inputMode: "url", dir: "ltr" })}
        {scalarSelect("relocate", t.relocate, yesNo)}
      </div>

      {/* Work experience (repeatable) */}
      {group(t.groups.work)}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {scalarSelect("experience", t.experience, toOptions(t.experienceOptions), t.select, true)}
        {scalarSelect("notice", t.notice, toOptions(t.noticeOptions))}
        {scalarInput("expectedSalary", t.expectedSalary, t.expectedSalaryPlaceholder, { inputMode: "numeric", dir: "ltr" })}
      </div>
      <div className="flex flex-col gap-3">
        {work.map((row, i) =>
          rowCard(
            `work-${i}`,
            <>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {input(`workHistory.${i}.title`, t.work.title, row.title, (v) => setRow(setWork, i, { title: v }, `work-${i}`), t.work.titlePlaceholder, { autoComplete: "organization-title" }, `work-${i}`)}
                {input(`workHistory.${i}.employer`, t.work.employer, row.employer, (v) => setRow(setWork, i, { employer: v }, `work-${i}`), t.work.employerPlaceholder, { autoComplete: "organization" }, `work-${i}`)}
                {input(`workHistory.${i}.from`, t.work.from, row.from, (v) => setRow(setWork, i, { from: v }, `work-${i}`), "", { type: "month", dir: "ltr" }, `work-${i}`)}
                <div className="flex flex-col gap-1.5">
                  {labelEl(`workHistory.${i}.to`, t.work.to)}
                  <input
                    id={fieldId(`workHistory.${i}.to`)}
                    name={`workHistory.${i}.to`}
                    type="month"
                    dir="ltr"
                    disabled={row.current}
                    value={row.current ? "" : row.to}
                    onChange={(e) => setRow(setWork, i, { to: e.target.value }, `work-${i}`)}
                    className="field-control disabled:text-neutral-500"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={row.current}
                      onChange={(e) => setRow(setWork, i, { current: e.target.checked, to: "" }, `work-${i}`)}
                      className="size-4 cursor-pointer rounded-[4px] border-[1.5px] border-neutral-300 accent-brand-green-dark"
                    />
                    <span className="body-s text-neutral-700">{t.work.current}</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {labelEl(`workHistory.${i}.summary`, t.work.summary)}
                <textarea
                  id={fieldId(`workHistory.${i}.summary`)}
                  name={`workHistory.${i}.summary`}
                  value={row.summary}
                  onChange={(e) => setRow(setWork, i, { summary: e.target.value }, `work-${i}`)}
                  placeholder={t.work.summaryPlaceholder}
                  className="field-control min-h-[88px] resize-y"
                />
              </div>
            </>,
            work.length > 1 ? () => removeRow(setWork, i) : undefined,
            t.work.remove,
          ),
        )}
        {addButton(t.work.add, () => setWork((rows) => [...rows, emptyWork()]))}
      </div>

      {/* Technical background */}
      {group(t.groups.technical)}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {scalarSelect("secExperience", t.secExperience, yesNo)}
        {scalarSelect("voltage", t.voltage, toOptions(t.voltageOptions))}
      </div>

      {/* Education (repeatable) */}
      {group(t.groups.education)}
      <div className="flex flex-col gap-3">
        {education.map((row, i) =>
          rowCard(
            `edu-${i}`,
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {select(`education.${i}.degree`, t.education.degree, row.degree, (v) => setRow(setEducation, i, { degree: v }, `edu-${i}`), toOptions(t.education.degreeOptions), t.select, i === 0, `edu-${i}`)}
              {input(`education.${i}.field`, t.education.field, row.field, (v) => setRow(setEducation, i, { field: v }, `edu-${i}`), t.education.fieldPlaceholder, { required: i === 0 }, `edu-${i}`)}
              {input(`education.${i}.institution`, t.education.institution, row.institution, (v) => setRow(setEducation, i, { institution: v }, `edu-${i}`), t.education.institutionPlaceholder, { required: i === 0 }, `edu-${i}`)}
              {input(`education.${i}.year`, t.education.year, row.year, (v) => setRow(setEducation, i, { year: v }, `edu-${i}`), t.education.yearPlaceholder, { inputMode: "numeric", dir: "ltr" }, `edu-${i}`)}
            </div>,
            education.length > 1 ? () => removeRow(setEducation, i) : undefined,
            t.education.remove,
          ),
        )}
        {addButton(t.education.add, () => setEducation((rows) => [...rows, emptyEducation()]))}
      </div>

      {/* Certifications (repeatable) */}
      {group(t.groups.certifications, t.certifications.hint)}
      <div className="flex flex-col gap-3">
        {certifications.map((row, i) =>
          rowCard(
            `cert-${i}`,
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
              {input(`certifications.${i}.name`, t.certifications.name, row.name, (v) => setRow(setCertifications, i, { name: v }, `cert-${i}`), t.certifications.namePlaceholder, {}, `cert-${i}`)}
              {input(`certifications.${i}.issuer`, t.certifications.issuer, row.issuer, (v) => setRow(setCertifications, i, { issuer: v }, `cert-${i}`), t.certifications.issuerPlaceholder, {}, `cert-${i}`)}
              {input(`certifications.${i}.year`, t.certifications.year, row.year, (v) => setRow(setCertifications, i, { year: v }, `cert-${i}`), t.certifications.yearPlaceholder, { inputMode: "numeric", dir: "ltr" }, `cert-${i}`)}
            </div>,
            certifications.length > 1 ? () => removeRow(setCertifications, i) : undefined,
            t.certifications.remove,
          ),
        )}
        {addButton(t.certifications.add, () => setCertifications((rows) => [...rows, emptyCertification()]))}
      </div>

      {/* Languages */}
      {group(t.groups.languages)}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {scalarSelect("arabic", t.arabic, levels)}
        {scalarSelect("english", t.english, levels)}
      </div>

      {/* Documents */}
      {group(t.groups.documents)}
      <div className="flex flex-col gap-1.5">
        {labelEl("cv", t.cv)}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-10 border border-dashed p-5 transition-colors ${
            errors.cv ? "border-error bg-error-50" : dragging ? "border-brand-blue bg-tint-blue-50" : "border-neutral-300 bg-neutral-50"
          }`}
        >
          <input
            ref={cvRef}
            id={fieldId("cv")}
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => pickCv(e.target.files?.[0] ?? null)}
            className="sr-only"
            {...a11y("cv")}
          />
          {cv ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-10 bg-tint-blue-50 text-brand-blue">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="body-s truncate font-medium text-neutral-900" dir="ltr">
                  {cv.name}
                </span>
                <span className="label-caption num text-neutral-500">{formatBytes(cv.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  pickCv(null);
                  setErrors((e) => ({ ...e, cv: undefined }));
                  if (cvRef.current) cvRef.current.value = "";
                }}
                aria-label={t.cvRemove}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
                <Upload className="size-[18px]" aria-hidden />
              </span>
              <p className="body-s text-neutral-700">
                {t.cvDrop}{" "}
                <button type="button" onClick={() => cvRef.current?.click()} className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-blue-dark">
                  {t.cvBrowse}
                </button>
              </p>
              <p className="label-caption text-neutral-500">{t.cvHint}</p>
            </div>
          )}
        </div>
        {errorText("cv")}
      </div>

      <div className="flex flex-col gap-1.5">
        {labelEl("documents", t.documents)}
        <p className="body-s text-neutral-500">{t.documentsHint}</p>
        <input
          ref={docsRef}
          id={fieldId("documents")}
          name="documents"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => addDocs(e.target.files)}
          className="sr-only"
          {...a11y("documents")}
        />
        {docs.length > 0 && (
          <ul className="flex flex-col gap-2">
            {docs.map((file, i) => (
              <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-10 border border-neutral-200 bg-neutral-50 px-3.5 py-2.5">
                <Paperclip className="size-4 shrink-0 text-brand-blue" aria-hidden />
                <span className="body-s min-w-0 flex-1 truncate text-neutral-900" dir="ltr">
                  {file.name}
                </span>
                <span className="label-caption num text-neutral-500">{formatBytes(file.size)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setDocs((d) => d.filter((_, j) => j !== i));
                    clearError("documents");
                  }}
                  aria-label={t.cvRemove}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        {docs.length < MAX_DOCS && addButton(t.documentsAdd, () => docsRef.current?.click())}
        {errorText("documents")}
      </div>

      <div className="flex flex-col gap-1.5">
        {labelEl("coverLetter", t.coverLetter)}
        <textarea
          id={fieldId("coverLetter")}
          name="coverLetter"
          value={values.coverLetter}
          onChange={(e) => set("coverLetter", e.target.value)}
          placeholder={t.coverLetterPlaceholder}
          className="field-control min-h-[140px] resize-y"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5">
          <input
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded-[5px] border-[1.5px] border-neutral-300 accent-brand-green-dark"
            {...a11y("consent")}
          />
          <span className="body-s text-neutral-500">{t.consent}</span>
        </label>
        {errorText("consent")}
      </div>

      <Button type="submit" fullWidth icon={<ArrowRight />} loading={status === "sending"}>
        {status === "sending" ? t.submitting : t.submit}
      </Button>
    </form>
  );
}
