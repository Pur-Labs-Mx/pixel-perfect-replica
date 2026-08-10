import type { Plan } from "@/data/catalog";
import { UPSELL_OFFER } from "@/lib/site";
import { PopupShell } from "@/components/conversion/PopupShell";
import { BuyButton } from "@/components/ui/BuyButton";

/**
 * Popup de upsell: se muestra cuando el usuario pulsa "Comprar ahora" y
 * existe un plan con más piezas que la selección actual. Aceptar o
 * continuar con la selección original debe ser igual de fácil (sin fricción).
 * Disparado por useBuyFlow(); no se monta directamente en las rutas.
 */
export function UpsellPopup({
  open,
  plan,
  onAccept,
  onDecline,
  onClose,
}: {
  open: boolean;
  plan: Plan | null;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  return (
    <PopupShell open={open && !!plan} onClose={onClose} labelledBy="upsell-popup-title">
      <h2 id="upsell-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
        Lleva más, ahorra más.
      </h2>
      {plan && (
        <>
          <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
            Sube a {plan.title.toLowerCase()} ({plan.pieces} piezas) por solo{" "}
            <span className="text-[var(--tiffany)]">${plan.price} MXN</span>.
            {plan.savingLabel ? ` ${plan.savingLabel}.` : ""}
          </p>
          <p className="mt-2 font-body text-xs uppercase tracking-[0.14em] text-[var(--tiffany)]">
            {UPSELL_OFFER.label}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <BuyButton onClick={onAccept} fullWidth>
              Sí, quiero {plan.title.toLowerCase()}
            </BuyButton>
            <button
              type="button"
              onClick={onDecline}
              className="min-h-[44px] font-body text-xs uppercase tracking-[0.14em] text-[var(--gray-muted)] underline-offset-4 hover:text-[var(--tiffany)] hover:underline"
            >
              Continuar con mi selección
            </button>
          </div>
        </>
      )}
    </PopupShell>
  );
}
