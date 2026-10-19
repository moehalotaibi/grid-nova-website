/** One row of the repeatable Work experience block. */
export type WorkEntry = { title: string; employer: string; from: string; to: string; current: boolean; summary: string };
/** One row of the repeatable Education block. */
export type EducationEntry = { degree: string; field: string; institution: string; year: string };
/** One row of the repeatable Certifications block. */
export type CertificationEntry = { name: string; issuer: string; year: string };

/** Fields of the job application form (src/components/forms/ApplicationForm.tsx). */
export type ApplicationPayload = {
  position: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  city: string;
  country: string;
  linkedin: string;
  relocate: string;
  experience: string;
  notice: string;
  expectedSalary: string;
  secExperience: string;
  voltage: string;
  arabic: string;
  english: string;
  workHistory: WorkEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  coverLetter: string;
  consent: boolean;
};

/**
 * Posts the application as multipart/form-data to VITE_CAREERS_ENDPOINT when configured
 * (e.g. a Formspree / serverless URL that accepts uploads): scalar fields as-is, the repeatable
 * blocks (`workHistory`, `education`, `certifications`) as JSON strings, the CV under `cv` and any
 * supporting files under `documents`. Without an endpoint it resolves after a short delay so the
 * UI flow can be exercised locally.
 */
export async function submitApplication(payload: ApplicationPayload, cv: File, documents: File[] = []): Promise<void> {
  const endpoint = import.meta.env.VITE_CAREERS_ENDPOINT as string | undefined;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    return;
  }
  const body = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    body.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
  }
  body.append("cv", cv, cv.name);
  for (const file of documents) body.append("documents", file, file.name);
  const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body });
  if (!res.ok) throw new Error(`Careers endpoint responded ${res.status}`);
}
