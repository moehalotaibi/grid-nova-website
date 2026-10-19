export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
};

/**
 * Posts the enquiry to VITE_CONTACT_ENDPOINT when configured (e.g. a Formspree / serverless URL).
 * Without an endpoint it resolves after a short delay so the UI flow can be exercised locally.
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 800));
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
}
