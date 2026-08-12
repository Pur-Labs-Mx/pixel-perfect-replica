import { BuyButton } from "@/components/ui/BuyButton";

/**
 * CTA persistente de las LANDINGS individuales.
 *
 * Reglas del brief:
 *  - La TIENDA (home) no lleva CTA fijo durante el scroll.
 *  - Todas las landings de producto sí: visible siempre, de lado a lado,
 *    negro con borde Tiffany y flash sincronizado (mismo BuyButton),
 *    respetando safe areas y sin tapar contenido (la landing reserva
 *    padding inferior).
 */
export function LandingBuyBar({
  onClick,
  label = "Comprar ahora",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        <BuyButton
          onClick={onClick}
          fullWidth
          className="shadow-[0_18px_40px_-14px_rgba(0,0,0,0.95)]"
          aria-label={label}
        >
          {label}
        </BuyButton>
      </div>
    </div>
  );
}
