import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { submitContact } from "@/lib/contact";

type Values = { name: string; email: string; company: string; service: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Module-level so React keeps the same element types between renders (inputs keep focus). */
function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="label-caption text-neutral-700">
      {children}
    </label>
  );
}
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="label-caption flex items-center gap-1.5 text-error">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

/**
 * Contact form card (Figma 24:35, handoff › 18/19/20): white card, radius 20, padding 36 · field rows gap 14 ·
 * label gap 6 · message 120–140 high · consent checkbox · full-width 48 submit.
 * Errors inline + role="status" summary; first invalid field focused; failure keeps the entered values.
 */
export function ContactForm({
  className = "",
  messageHeight = 120,
  initialService = "",
}: {
  className?: string;
  messageHeight?: number;
  /** Preselects the Service field, e.g. from /contact?service=manufacturing */
  initialService?: string;
}) {
  const { s, l } = useLocale();
  const f = s.form;
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    company: "",
    service: services.some((svc) => svc.slug === initialService) ? initialService : "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = f.required;
    if (!values.email.trim()) e.email = f.required;
    else if (!EMAIL.test(values.email)) e.email = f.invalidEmail;
    if (!values.message.trim()) e.message = f.required;
    if (!values.consent) e.consent = f.consentRequired;
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstInvalid = (Object.keys(e) as (keyof Values)[]).find((k) => e[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitContact(values);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const fieldId = (k: keyof Values) => `${id}-${k}`;
  const errId = (k: keyof Values) => `${id}-${k}-error`;


  if (status === "sent") {
    return (
      <div className={`flex flex-col gap-3 rounded-20 bg-white p-6 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.35)] md:p-9 ${className}`} role="status">
        <h3 className="heading-h3 text-neutral-900">{s.home.contact.formTitle}</h3>
        <p className="body-m text-brand-green-dark">{f.success}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      data-analytics="form_submit"
      className={`flex w-full flex-col gap-[18px] rounded-20 bg-white p-6 text-neutral-900 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.35)] md:p-9 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="heading-h3 text-neutral-900">{s.home.contact.formTitle}</h3>
        <p className="body-s text-neutral-500">{s.home.contact.formSub}</p>
      </div>

      {errorCount > 0 && (
        <p role="status" className="label-caption rounded-10 bg-error-50 px-3.5 py-2.5 text-error">
          {f.summary(errorCount)}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="label-caption rounded-10 bg-error-50 px-3.5 py-2.5 text-error">
          {f.failure}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor={fieldId("name")}>{f.fullName}</FieldLabel>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder={f.fullNamePlaceholder}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? errId("name") : undefined}
            className="field-control"
          />
          <FieldError id={errId("name")} message={errors.name} />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor={fieldId("email")}>{f.workEmail}</FieldLabel>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder={f.emailPlaceholder}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? errId("email") : undefined}
            className="field-control"
            dir="ltr"
          />
          <FieldError id={errId("email")} message={errors.email} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor={fieldId("company")}>{f.company}</FieldLabel>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder={f.companyPlaceholder}
            className="field-control"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor={fieldId("service")}>{f.service}</FieldLabel>
          <div className="relative">
            <select
              id={fieldId("service")}
              name="service"
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              className={`field-control appearance-none pe-10 ${values.service ? "" : "text-neutral-500"}`}
            >
              <option value="">{f.servicePlaceholder}</option>
              {services.map((svc) => (
                <option key={svc.slug} value={svc.slug}>
                  {l(svc.title)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-[18px] -translate-y-1/2 text-neutral-500" aria-hidden />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <FieldLabel htmlFor={fieldId("message")}>{f.message}</FieldLabel>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={f.messagePlaceholder}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? errId("message") : undefined}
          className="field-control resize-y"
          style={{ minHeight: messageHeight }}
        />
        <FieldError id={errId("message")} message={errors.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5">
          <input
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? errId("consent") : undefined}
            className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded-[5px] border-[1.5px] border-neutral-300 accent-brand-green-dark"
          />
          <span className="body-s text-neutral-500">{f.consent}</span>
        </label>
        <FieldError id={errId("consent")} message={errors.consent} />
      </div>

      <Button type="submit" fullWidth icon={<ArrowRight />} loading={status === "sending"}>
        {status === "sending" ? f.sending : f.send}
      </Button>
    </form>
  );
}
