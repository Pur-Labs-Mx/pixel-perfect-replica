import { useEffect, useRef, useState } from "react";

import { BuyButton } from "@/components/ui/BuyButton";
import { PopupShell } from "@/components/conversion/PopupShell";
import { claimPassiveSlot, releasePassiveSlot } from "@/components/conversion/popupCoordinator";
import { EXIT_OFFER } from "@/lib/site";

/**
 * Popup de intención de salida.
 * Desktop: se dispara con mouseleave hacia arriba del viewport.
 * Móvil: se dispara con un back-gesture razonable (popstate) o al ocultarse
 * la pestaña (visibilitychange), lo cual aproxima el "voy a irme".
 * Solo una vez por sesión, y nunca a la vez que el newsletter
 * (comparten la clave "purlabs.popup.shown").
 */

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!EXIT_OFFER.enabled) return;

    const trigger = () => {
      if (triggeredRef.current) return;
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

    // Aproximación de back-gesture en móvil: empujamos un estado y
    // escuchamos popstate, ya que no existe API estándar de back-gesture.
    history.pushState({ purlabsExitGuard: true }, "");
    const onPopState = () => trigger();

    // Móvil: scroll rápido hacia arriba cerca del tope de la página, señal
    // habitual de "me estoy yendo" cuando no existe mouseleave.
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
        <BuyButton href="/#suscripciones" onClick={handleClose}>
          Reclamar mi ritual
        </BuyButton>
      </div>
    </PopupShell>
  );
}
