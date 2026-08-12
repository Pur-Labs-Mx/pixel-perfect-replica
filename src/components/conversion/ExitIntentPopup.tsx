import { useEffect, useRef, useState } from "react";

import { BuyButton } from "@/components/ui/BuyButton";
import { PopupShell } from "@/components/conversion/PopupShell";
import { claimPassiveSlot, releasePassiveSlot } from "@/components/conversion/popupCoordinator";
import { hasIntent } from "@/lib/intentSignals";
import { EXIT_OFFER } from "@/lib/site";

/**
 * Popup de intención de salida — SOLO se monta en las landings de producto.
 *
 * Condiciones obligatorias (ambas):
 *  1. Al menos MIN_TIME_MS dentro de la landing (30 s, EDITABLE).
 *  2. Alguna señal de intención: plan/cantidad, FAQ abierto o un carácter
 *     escrito en un formulario (ver src/lib/intentSignals.ts).
 *
 * Disparadores de salida: mouseleave por arriba (desktop), back-gesture
 * (popstate), pestaña oculta o scroll rápido hacia arriba (móvil).
 * Una sola vez por sesión y nunca simultáneo al newsletter.
 */

/** EDITABLE — tiempo mínimo de permanencia antes de poder mostrarse. */
const MIN_TIME_MS = 30000;

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!EXIT_OFFER.enabled) return;

    const mountedAt = Date.now();

    const trigger = () => {
      if (triggeredRef.current) return;
      if (Date.now() - mountedAt < MIN_TIME_MS) return;
      if (!hasIntent()) return;
      if (!claimPassiveSlot("exit")) return;
      triggeredRef.current = true;
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") trigger();
    };

    // Aproximación de back-gesture en móvil: no existe API estándar.
    history.pushState({ purlabsExitGuard: true }, "");
    const onPopState = () => trigger();

    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT;
      const dy = lastY - y;
      if (dt > 0 && y < 400 && dy / dt > 1.2) trigger();
      lastY = y;
      lastT = now;
    };

    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    releasePassiveSlot("exit");
  };

  if (!EXIT_OFFER.enabled) return null;

  return (
    <PopupShell open={open} onClose={handleClose} labelledBy="exit-popup-title">
      <h2 id="exit-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
        Antes de irte...
      </h2>
      <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">Tu ritual todavía te está esperando.</p>

      <p className="mt-5 font-body text-xs uppercase tracking-[0.16em] text-[var(--tiffany)]">
        {EXIT_OFFER.label}: {EXIT_OFFER.code}
      </p>

      <div className="mt-6 flex justify-center">
        <BuyButton href="#planes" onClick={handleClose}>
          Reclamar mi ritual
        </BuyButton>
      </div>
    </PopupShell>
  );
}
