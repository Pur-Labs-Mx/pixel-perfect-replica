import { DOWNSELL_OFFER } from "@/lib/site";
import { PopupShell } from "@/components/conversion/PopupShell";
import { BuyButton } from "@/components/ui/BuyButton";

/**
 * Popup de downsell: aparece sólo si el usuario rechaza o cierra el
 * upsell. Ofrece un descuento sobre el producto ya elegido antes de
 * continuar al carrito. Disparado por useBuyFlow(); no se monta
 * directamente en las rutas.
 */
export function DownsellPopup({
  open,
  onAccept,
  onDecline,
  onClose,
}: {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  return (
    <PopupShell open={open} onClose={onClose} labelledBy="downsell-popup-title">
      <h2 id="downsell-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
        Espera, una última cosa.
      </h2>
      <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
        Quédate con tu elección y llévate {DOWNSELL_OFFER.percentOff}% de descuento adicional.
      </p>
      <p className="mt-2 font-body text-xs uppercase tracking-[0.14em] text-[var(--tiffany)]">
        {DOWNSELL_OFFER.label}: {DOWNSELL_OFFER.code}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <BuyButton onClick={onAccept} fullWidth>
          Aplicar y continuar
        </BuyButton>
        <button
          type="button"
          onClick={onDecline}
          className="min-h-[44px] font-body text-xs uppercase tracking-[0.14em] text-[var(--gray-muted)] underline-offset-4 hover:text-[var(--tiffany)] hover:underline"
        >
          No, gracias, continuar
        </button>
      </div>
    </PopupShell>
  );
}
