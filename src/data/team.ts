import type { L } from "@/i18n/LocaleProvider";
import { SITE } from "./site";

export type BoardMember = {
  id: string;
  name: L;
  role: L;
  /** Portrait base name under /public/images (440 × 520 WebP + @2x, handoff › board 21). Omit → initials avatar on navy (board 20). */
  image?: string;
  imageAlt: string;
  /** Profile link shown as the LinkedIn chip; omit to hide the chip. */
  linkedin?: string;
  /** Short biography — not shown on the cards yet (Figma 37:884 has name + role only). */
  bio?: L;
  /** Optional in-page anchor, e.g. "ceo" → /about#ceo (homepage "Read the full message"). */
  anchor?: string;
};

/**
 * Board of directors (Figma 37:884). Names, titles and order follow the previous website's Directors pages
 * (/directors/ and /ar/المديرون): Chairman → Vice President → CEO. No biographies were published there.
 * Personal LinkedIn URLs are not in the handoff — the company page stands in.
 */
export const board: BoardMember[] = [
  {
    id: "tawfik-alsharhan",
    name: { en: "Mr. Tawfik Al Sharhan", ar: "أ. توفيق الشرهان" },
    role: { en: "Chairman of the Board", ar: "رئيس مجلس الإدارة" },
    image: "chairman-tawfik-alsharhan",
    imageAlt: "Mr. Tawfik Al Sharhan, Chairman of the Board of Grid Nova Energy",
    linkedin: SITE.social.linkedin,
  },
  {
    id: "faleh-alsharhan",
    name: { en: "Mr. Faleh Al Sharhan", ar: "أ. فالح الشرهان" },
    role: { en: "Vice President of Business Sector", ar: "نائب الرئيس التنفيذي لقطاع الأعمال" },
    image: "vp-faleh-alsharhan",
    imageAlt: "Mr. Faleh Al Sharhan, Vice President of the Business Sector at Grid Nova Energy",
    linkedin: SITE.social.linkedin,
  },
  {
    id: "mutlaq-alotaibi",
    name: { en: "Eng. Mutlaq Alotaibi", ar: "م. مطلق العتيبي" },
    role: { en: "Chief Executive Officer", ar: "الرئيس التنفيذي" },
    image: "ceo-mutlaq-alotaibi",
    imageAlt: "Eng. Mutlaq Alotaibi, Chief Executive Officer of Grid Nova Energy",
    linkedin: SITE.social.linkedin,
    anchor: "ceo",
  },
];
