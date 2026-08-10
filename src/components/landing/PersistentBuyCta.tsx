import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

import { BuyButton } from "@/components/ui/BuyButton";
import { useCart } from "@/lib/cart";

/**
 * CTA de compra persistente.
 * Siempre visible durante el scroll, con la misma identidad visual
 * (negro + borde Tiffany + destello) que el resto de los botones de compra.
 * Se ancla al centro inferior (nunca a las esquinas) para dejar libres
 * la esquina inferior izquierda (botón de audio) y la derecha (chat en vivo).
 */
export function PersistentBuyCta() {
  const [visible, setVisible] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCart = pathname === "/carrito" || pathname === "/checkout";
  if (onCart) return null;

  const hasItems = count > 0;
  const label = hasItems ? `Ver carrito (${count})` : "Comprar ahora";
  const target = hasItems ? "/carrito" : "/#suscripciones";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] flex justify-center px-16 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-24 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {hasItems ? (
        <BuyButton to={target} className="shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
          {label}
        </BuyButton>
      ) : (
        <BuyButton href={target} className="shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
          {label}
        </BuyButton>
      )}
    </div>
  );
}
