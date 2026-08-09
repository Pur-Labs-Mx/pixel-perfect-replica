import { useEffect, useRef, useState } from "react";

import { BuyButton } from "@/components/ui/BuyButton";
import { EXIT_OFFER } from "@/lib/site";

/**
 * Popup de intención de salida.
 * Desktop: se dispara con mouseleave hacia arriba del viewport.
 * Móvil: se dispara con un back-gesture razonable (popstate) o al ocultarse
 * la pestaña (visibilitychange), lo cual aproxima el "voy a irme".
 * Solo una vez por sesión, y nunca a la vez que el newsletter
 * (comparten la clave "purlabs.popup.shown").
 */

const SESSION_POPUP_KEY = "purlabs.popup.shown";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!EXIT_OFFER.enabled) return;

    const alreadyShown = sessionStorage.getItem(SESSION_POPUP_KEY) === "1";
    if (alreadyShown) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      const shown = sessionStorage.getItem(SESSION_POPUP_KEY) === "1";
      if (shown) return;
      triggeredRef.current = true;
      sessionStorage.setItem(SESSION_POPUP_KEY, "1");
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") trigger();
    };

    // Aproximación de back-gesture en móvil: empujamos un estado y
    // escuchamos popstate, ya que no existe API estándar de back-gesture.
    history.pushState({ purlabsExitGuard: true }, "");
    const onPopState = () => trigger();

    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || !EXIT_OFFER.enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[96] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-[var(--tiffany-border)] bg-[var(--black-deep)] p-7 sm:p-9 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[var(--gray-muted)] transition-colors hover:text-[var(--tiffany)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)]"
        >
          <span aria-hidden="true" className="text-xl">
            ×
          </span>
        </button>

        <h2 id="exit-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
          Antes de irte...
        </h2>
        <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">Tu ritual todavía te está esperando.</p>

        <p className="mt-5 font-body text-xs uppercase tracking-[0.16em] text-[var(--tiffany)]">
          {EXIT_OFFER.label}: {EXIT_OFFER.code}
        </p>

        <div className="mt-6 flex justify-center">
          <BuyButton href="/#suscripciones" onClick={() => setOpen(false)}>
            Reclamar mi ritual
          </BuyButton>
        </div>
      </div>
    </div>
  );
}
