import { forwardRef, type ButtonHTMLAttributes, type ForwardedRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Button / primary · blue · outlineLight · outlineDark · ghost (Design System › 06, handoff › 18/19)
 * 48 high, padding 24 × 14, Label/Button, icon 18, gap 8, radius 10.
 * Hover: +10 % black overlay (150 ms) · Active: scale(0.96) · Focus: 2 px ring, 2 px offset
 * Loading: label stays, 16 px spinner replaces the icon, aria-busy · Disabled: neutral/100 fill, neutral/500 label
 * < 480: full width (board 20).
 */
export type ButtonVariant = "primary" | "blue" | "outlineLight" | "outlineDark" | "ghost" | "ghostLight";

const base =
  "label-button inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-10 px-6 " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--dur-micro)] ease-out " +
  "active:scale-[0.96] active:duration-[120ms] " +
  "disabled:pointer-events-none disabled:bg-neutral-100 disabled:text-neutral-500 disabled:border-transparent " +
  "aria-busy:pointer-events-none max-xs:w-full";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-green-dark text-white hover:bg-[#346e2b]",
  blue: "bg-brand-blue text-white hover:bg-brand-blue-dark",
  outlineLight: "border-[1.5px] border-white/55 text-white hover:bg-white/10",
  outlineDark: "border-[1.5px] border-neutral-900/45 text-neutral-900 hover:bg-neutral-900/5",
  ghost: "px-0 h-auto text-brand-blue hover:text-brand-blue-dark",
  ghostLight: "px-0 h-auto text-white hover:text-brand-cyan",
};

type Common = {
  variant?: ButtonVariant;
  /** Trailing icon (18 px). Arrows are mirrored automatically in RTL. */
  icon?: ReactNode;
  /** Leading icon (18 px). */
  leadingIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { to?: undefined; href?: undefined };
type ButtonAsLink = Common & { to: string; href?: undefined; onClick?: () => void; "aria-label"?: string };
type ButtonAsAnchor = Common & { href: string; to?: undefined; target?: string; rel?: string; "aria-label"?: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function Spinner() {
  return (
    <span
      aria-hidden
      className="size-4 shrink-0 animate-spin-slow rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { path } = useLocale();
  const { variant = "primary", icon, leadingIcon, loading, fullWidth, className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const inner = (
    <>
      {leadingIcon && <span className="inline-flex size-[18px] shrink-0 items-center justify-center [&>svg]:size-[18px]">{leadingIcon}</span>}
      <span>{children}</span>
      {loading ? (
        <Spinner />
      ) : icon ? (
        <span className="rtl-flip inline-flex size-[18px] shrink-0 items-center justify-center [&>svg]:size-[18px]">{icon}</span>
      ) : null}
    </>
  );

  if ("to" in props && props.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link ref={ref as ForwardedRef<HTMLAnchorElement>} to={path(to)} className={cls} {...linkRest}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href !== undefined) {
    const { href, ...aRest } = rest as ButtonAsAnchor;
    return (
      <a ref={ref as ForwardedRef<HTMLAnchorElement>} href={href} className={cls} {...aRest}>
        {inner}
      </a>
    );
  }
  const btnRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref as ForwardedRef<HTMLButtonElement>} type={btnRest.type ?? "button"} className={cls} aria-busy={loading || undefined} {...btnRest}>
      {inner}
    </button>
  );
});
