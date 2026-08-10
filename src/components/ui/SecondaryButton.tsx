import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Botón secundario de PŪR LABS (p. ej. "Ver la colección").
 * Misma tipografía y escala que BuyButton, pero con superficie translúcida
 * ivory/Tiffany en lugar del negro sólido. Sin flechas ni glifos.
 */
export const SECONDARY_BUTTON_CLASS =
  "secondary-btn relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[13px] sm:text-[14px] tracking-[0.16em] sm:tracking-[0.18em] " +
  "bg-[color-mix(in_oklab,var(--white-soft)_12%,transparent)] text-[var(--white-soft)] border-2 border-[color-mix(in_oklab,var(--white-soft)_55%,transparent)] backdrop-blur-sm " +
  "transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:-translate-y-[2px] hover:bg-[color-mix(in_oklab,var(--tiffany)_16%,transparent)] hover:border-[var(--tiffany-border-strong)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] focus-visible:ring-offset-[var(--black-deep)] " +
  "disabled:opacity-60 disabled:pointer-events-none";

type Props = {
  children: ReactNode;
  fullWidth?: boolean | undefined;
  className?: string | undefined;
  "aria-label"?: string | undefined;
  to?: string | undefined;
  params?: Record<string, string> | undefined;
  href?: string | undefined;
  onClick?: (() => void) | undefined;
  type?: "button" | "submit" | undefined;
  disabled?: boolean | undefined;
};

export function SecondaryButton(props: Props) {
  const { children, fullWidth, className = "" } = props;
  const cls = `${SECONDARY_BUTTON_CLASS} ${fullWidth ? "w-full" : ""} ${className}`;

  const inner = <span className="relative z-[2]">{children}</span>;

  if ("to" in props && props.to) {
    return (
      <Link
        to={props.to}
        params={props.params as never}
        onClick={props.onClick}
        className={cls}
        aria-label={props["aria-label"]}
      >
        {inner}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a href={props.href} onClick={props.onClick} className={cls} aria-label={props["aria-label"]}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={("type" in props && props.type) || "button"}
      onClick={props.onClick}
      disabled={"disabled" in props ? props.disabled : undefined}
      className={cls}
      aria-label={props["aria-label"]}
    >
      {inner}
    </button>
  );
}
