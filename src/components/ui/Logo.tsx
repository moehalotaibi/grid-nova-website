import colourLockup from "@/assets/logo/gridnova-horizontal-colour.svg";
import whiteLockup from "@/assets/logo/gridnova-horizontal-white.svg";
import colourMark from "@/assets/logo/gridnova-mark-colour.svg";
import whiteMark from "@/assets/logo/gridnova-mark-white.svg";

type Props = {
  /** horizontal lockup (nav, footer) or mark only (below 120 px wide — Design System › 01) */
  variant?: "horizontal" | "mark";
  tone?: "colour" | "white";
  /** rendered height in px — lockup is 234 × 36 in the nav at 1440 */
  height?: number;
  className?: string;
};

const RATIO = { horizontal: 233.63 / 36, mark: 111.398 / 64.1842 };

/** Client-supplied logo; never recolour, rebuild or stretch (Design System › 01). */
export function Logo({ variant = "horizontal", tone = "colour", height = 36, className = "" }: Props) {
  const src =
    variant === "horizontal" ? (tone === "white" ? whiteLockup : colourLockup) : tone === "white" ? whiteMark : colourMark;
  const width = Math.round(RATIO[variant] * height);
  return <img src={src} alt="Grid Nova Energy" width={width} height={height} className={`block shrink-0 ${className}`} style={{ height, width }} />;
}
