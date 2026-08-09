import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Botón de compra único de PŪR LABS.
 * TODOS los CTA de compra del sitio deben usar este componente:
 * fondo #0a0a0a, texto blanco, borde 1.5px Tiffany, forma pill y destello diagonal.
 */
export const BUY_BUTTON_CLASS =
  "buy-shine group relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] " +
  "bg-[var(--buy-bg)] text-[var(--white-soft)] border-[1.5px] border-[var(--tiffany-border)] " +
  "transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:-translate-y-[2px] hover:border-[var(--tiffany)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] focus-visible:ring-offset-[var(--black-deep)] " +
  "disabled:opacity-60 disabled:pointer-events-none";

type Props = {
  children: ReactNode;
  fullWidth?: boolean | undefined;
  className?: string | undefined;
  arrow?: boolean | undefined;
  "aria-label"?: string | undefined;
  to?: string | undefined;
  params?: Record<string, string> | undefined;
  href?: string | undefined;
  onClick?: (() => void) | undefined;
  type?: "button" | "submit" | undefined;
  disabled?: boolean | undefined;
};


export function BuyButton(props: Props) {
  const { children, fullWidth, className = "", arrow = true } = props;
  const cls = `${BUY_BUTTON_CLASS} ${fullWidth ? "w-full" : ""} ${className}`;


  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className="relative z-[2] inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        >
          ↗
        </span>
      )}
    </>
  );

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
