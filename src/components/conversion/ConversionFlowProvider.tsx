import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { plans, type Plan, type Product } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { trackEvent } from "@/lib/tracking";
import { DOWNSELL_OFFER, UPSELL_OFFER } from "@/lib/site";
import { PopupShell } from "@/components/conversion/PopupShell";
import { BuyButton } from "@/components/ui/BuyButton";

/**
 * Ítem que dispara el flujo de compra: una fragancia individual (equivale
 * al plan "single") o un plan ya armado con sus fragancias elegidas.
 */
export type BuyFlowItem =
  | { kind: "product"; product: Product }
  | { kind: "plan"; plan: Plan; fragrances: string[] };

type FlowStage = "idle" | "upsell" | "downsell";

type BuyFlowContextValue = {
  start: (item: BuyFlowItem) => void;
};

const BuyFlowContext = createContext<BuyFlowContextValue | null>(null);

/** Encuentra, si existe, un plan con más piezas que el actual para ofrecer como upsell. */
function findUpsellPlan(currentPieces: number): Plan | null {
  const bigger = plans
    .filter((p) => p.pieces > currentPieces)
    .sort((a, b) => a.pieces - b.pieces);
  return bigger[0] ?? null;
}

function itemPieces(item: BuyFlowItem) {
  return item.kind === "product" ? 1 : item.plan.pieces;
}

function itemLabel(item: BuyFlowItem) {
  return item.kind === "product" ? item.product.displayName.join(" ") : item.plan.title;
}

function itemUnitPrice(item: BuyFlowItem) {
  return item.kind === "product" ? item.product.price : item.plan.price;
}

export function ConversionFlowProvider({ children }: { children: ReactNode }) {
  const { add } = useCart();
  const navigate = useNavigate();

  const [stage, setStage] = useState<FlowStage>("idle");
  const [pendingItem, setPendingItem] = useState<BuyFlowItem | null>(null);
  const [upsellPlan, setUpsellPlan] = useState<Plan | null>(null);

  const addToCartAndGo = useCallback(
    (item: BuyFlowItem, opts?: { discountCode?: string }) => {
      if (item.kind === "product") {
        add({
          productId: item.product.id,
          name: item.product.displayName.join(" "),
          slug: item.product.slug,
          image: item.product.soapImage,
          variant: opts?.discountCode ? `${DOWNSELL_OFFER.label}` : "Pieza única",
          fragrances: [item.product.name],
          unitPrice: item.product.price,
        });
      } else {
        add({
          productId: item.plan.id,
          name: item.plan.title,
          slug: "",
          image: "",
          variant: opts?.discountCode ? `${item.plan.title} · ${DOWNSELL_OFFER.label}` : item.plan.title,
          fragrances: item.fragrances,
          unitPrice: item.plan.price,
        });
      }
      setStage("idle");
      setPendingItem(null);
      setUpsellPlan(null);
      void navigate({ to: "/carrito" });
    },
    [add, navigate],
  );

  const start = useCallback(
    (item: BuyFlowItem) => {
      trackEvent("InitiateCheckout", {
        content_name: itemLabel(item),
        value: itemUnitPrice(item),
        currency: "MXN",
      });

      const bigger = findUpsellPlan(itemPieces(item));
      setPendingItem(item);

      if (bigger && UPSELL_OFFER.enabled) {
        setUpsellPlan(bigger);
        setStage("upsell");
      } else {
        addToCartAndGo(item);
      }
    },
    [addToCartAndGo],
  );

  const acceptUpsell = useCallback(() => {
    if (!upsellPlan || !pendingItem) return;
    const fragrances =
      pendingItem.kind === "product" ? [pendingItem.product.name] : pendingItem.fragrances;
    addToCartAndGo({ kind: "plan", plan: upsellPlan, fragrances }, undefined);
  }, [upsellPlan, pendingItem, addToCartAndGo]);

  const declineUpsell = useCallback(() => {
    if (DOWNSELL_OFFER.enabled) {
      setStage("downsell");
    } else if (pendingItem) {
      addToCartAndGo(pendingItem);
    }
  }, [pendingItem, addToCartAndGo]);

  const acceptDownsell = useCallback(() => {
    if (!pendingItem) return;
    addToCartAndGo(pendingItem, { discountCode: DOWNSELL_OFFER.code });
  }, [pendingItem, addToCartAndGo]);

  const declineDownsell = useCallback(() => {
    if (!pendingItem) return;
    addToCartAndGo(pendingItem);
  }, [pendingItem, addToCartAndGo]);

  const closeAll = useCallback(() => {
    // Cerrar sin elegir equivale a continuar con la selección original.
    if (pendingItem) {
      addToCartAndGo(pendingItem);
    } else {
      setStage("idle");
    }
  }, [pendingItem, addToCartAndGo]);

  const value = useMemo<BuyFlowContextValue>(() => ({ start }), [start]);

  return (
    <BuyFlowContext.Provider value={value}>
      {children}

      <PopupShell
        open={stage === "upsell" && !!upsellPlan}
        onClose={closeAll}
        labelledBy="upsell-popup-title"
      >
        <h2 id="upsell-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
          Lleva más, ahorra más.
        </h2>
        {upsellPlan && (
          <>
            <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
              Sube a {upsellPlan.title.toLowerCase()} ({upsellPlan.pieces} piezas) por solo{" "}
              <span className="text-[var(--tiffany)]">${upsellPlan.price} MXN</span>.
              {upsellPlan.savingLabel ? ` ${upsellPlan.savingLabel}.` : ""}
            </p>
            <p className="mt-2 font-body text-xs uppercase tracking-[0.14em] text-[var(--tiffany)]">
              {UPSELL_OFFER.label}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <BuyButton onClick={acceptUpsell} fullWidth>
                Sí, quiero {upsellPlan.title.toLowerCase()}
              </BuyButton>
              <button
                type="button"
                onClick={declineUpsell}
                className="min-h-[44px] font-body text-xs uppercase tracking-[0.14em] text-[var(--gray-muted)] underline-offset-4 hover:text-[var(--tiffany)] hover:underline"
              >
                Continuar con mi selección
              </button>
            </div>
          </>
        )}
      </PopupShell>

      <PopupShell
        open={stage === "downsell"}
        onClose={closeAll}
        labelledBy="downsell-popup-title"
      >
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
          <BuyButton onClick={acceptDownsell} fullWidth>
            Aplicar y continuar
          </BuyButton>
          <button
            type="button"
            onClick={declineDownsell}
            className="min-h-[44px] font-body text-xs uppercase tracking-[0.14em] text-[var(--gray-muted)] underline-offset-4 hover:text-[var(--tiffany)] hover:underline"
          >
            No, gracias, continuar
          </button>
        </div>
      </PopupShell>
    </BuyFlowContext.Provider>
  );
}

/**
 * Hook para lanzar el flujo de compra (upsell → downsell → carrito) desde
 * cualquier CTA de compra. Uso:
 *
 *   const { start } = useBuyFlow();
 *   start({ kind: "product", product });
 *   start({ kind: "plan", plan, fragrances: ["IMAGINA", "PACIFIC CHILL"] });
 */
export function useBuyFlow() {
  const ctx = useContext(BuyFlowContext);
  if (!ctx) throw new Error("useBuyFlow debe usarse dentro de <ConversionFlowProvider>");
  return ctx;
}
