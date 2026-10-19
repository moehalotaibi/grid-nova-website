import type { ReactNode } from "react";

type Tone = "light" | "dark";
type EyebrowColor = "blue" | "green" | "cyan" | "muted";

/** Label/Eyebrow in brand colour; uppercase + tracking in English, plain in Arabic (type.css). */
export function Eyebrow({ children, color = "blue", className = "" }: { children: ReactNode; color?: EyebrowColor; className?: string }) {
  const colors = { blue: "text-brand-blue", green: "text-brand-green-dark", cyan: "text-brand-cyan", muted: "text-neutral-500" };
  return <p className={`label-eyebrow ${colors[color]} ${className}`}>{children}</p>;
}

type SectionHeaderProps = {
  eyebrow: ReactNode;
  eyebrowColor?: EyebrowColor;
  title: ReactNode;
  /** Intro copy. Sits under the title, or in the end-aligned aside column when `introInAside` is set. */
  intro?: ReactNode;
  introInAside?: boolean;
  /** End-aligned slot (usually a button). Stacks under the copy below 1024. */
  aside?: ReactNode;
  tone?: Tone;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/**
 * Section header pattern used across the site (handoff › board 18): eyebrow + H2 (+ intro),
 * with an optional end-aligned aside. Header copy max 760, intro max 660. Header → content gap 56.
 */
export function SectionHeader({
  eyebrow,
  eyebrowColor = "blue",
  title,
  intro,
  introInAside = false,
  aside,
  tone = "light",
  align = "start",
  as: Tag = "h2",
  className = "",
}: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-white" : "text-neutral-900";
  const introColor = tone === "dark" ? "text-white/70" : "text-neutral-500";

  if (align === "center") {
    return (
      <div className={`mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center ${className}`}>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <Tag className={`heading-h2 ${titleColor}`}>{title}</Tag>
        {intro && <p className={`body-l max-w-[640px] ${introColor}`}>{intro}</p>}
      </div>
    );
  }

  const hasAside = Boolean(aside) || (Boolean(intro) && introInAside);
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 ${className}`}>
      <div className="flex max-w-[760px] flex-col gap-4 lg:flex-1">
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <Tag className={`heading-h2 ${titleColor}`}>{title}</Tag>
        {intro && !introInAside && <p className={`body-l max-w-[660px] ${introColor}`}>{intro}</p>}
      </div>
      {hasAside && (
        <div className={`flex shrink-0 flex-col items-start gap-5 ${intro && introInAside ? "lg:w-[400px] xl:w-[460px]" : ""}`}>
          {intro && introInAside && <p className={`body-l ${introColor}`}>{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
