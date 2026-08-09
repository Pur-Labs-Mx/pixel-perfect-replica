import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { useCart, formatMXN } from "@/lib/cart";
import { pageMeta } from "@/lib/site";
import { plans, availableProducts } from "@/data/catalog";

export const Route = createFileRoute("/carrito")({
  head: () =>
    pageMeta({
      title: "Carrito · PŪR LABS",
      description: "Revisa tu carrito de jabones perfumados de autor PŪR LABS antes de finalizar tu compra.",
      path: "/carrito",
    }),
  component: CarritoPage,
});

function CartLine({
  item,
}: {
  item: ReturnType<typeof useCart>["items"][number];
}) {
  const { setQty, remove } = useCart();
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 py-6 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 sm:flex-1 min-w-0">
        <div className="aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-lg italic text-[var(--ivory)]">{item.name}</p>
          <p className="mt-1 truncate font-body text-[12px] tracking-[0.1em] uppercase text-white/50">
            {item.variant}
          </p>
          {item.fragrances.length > 0 && (
            <p className="mt-1 truncate font-body text-[13px] text-white/60">
              {item.fragrances.join(" · ")}
            </p>
          )}
          <p className="mt-1 font-body text-[13px] text-white/50">{formatMXN(item.unitPrice)} c/u</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-8">
        <div className="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
          <button
            type="button"
            aria-label="Disminuir cantidad"
            onClick={() => setQty(item.key, item.qty - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-[var(--tiffany)]"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-6 text-center font-body text-sm tabular-nums text-[var(--white-soft)]">
            {item.qty}
          </span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => setQty(item.key, item.qty + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-[var(--tiffany)]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="w-24 shrink-0 text-right font-body text-sm font-semibold tabular-nums text-[var(--white-soft)]">
          {formatMXN(item.unitPrice * item.qty)}
        </p>

        <button
          type="button"
          aria-label={`Eliminar ${item.name} del carrito`}
          onClick={() => remove(item.key)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function CarritoPage() {
  const { items, subtotal, total } = useCart();

  const suggested = useMemo(() => {
    const inCart = new Set(items.map((i) => i.productId));
    return availableProducts.filter((p) => !inCart.has(p.id)).slice(0, 3);
  }, [items]);

  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-6 pt-[140px] pb-24 sm:px-10">
        <h1
          className="font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Tu carrito.
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <p className="font-heading text-2xl italic text-[var(--ivory)]">Tu carrito está vacío.</p>
            <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-white/60">
              Descubre nuestras fragancias de autor o elige un plan y ahorra en tu ritual diario.
            </p>
            <div className="mt-8">
              <BuyButton to="/" href={undefined as never} className="hidden" />
              <BuyButton href="/#suscripciones">Ver suscripciones</BuyButton>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              {items.map((item) => (
                <CartLine key={item.key} item={item} />
              ))}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/"
                  className="font-body text-[13px] tracking-[0.1em] uppercase text-white/70 underline underline-offset-4 hover:text-white"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h2 className="font-heading text-xl italic text-[var(--ivory)]">Resumen</h2>
              <dl className="mt-6 space-y-3 font-body text-sm text-white/75">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Envío</dt>
                  <dd className="text-right text-white/50">Se calcula en el siguiente paso</dd>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-[var(--white-soft)]">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatMXN(total)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <BuyButton to="/checkout" fullWidth>
                  Proceder al checkout
                </BuyButton>
              </div>
            </aside>
          </div>
        )}

        {items.length > 0 && (
          <section className="mt-24">
            <h2
              className="font-heading italic tracking-tight text-[var(--ivory)]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Mejora tu ritual.
            </h2>
            <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-white/60">
              Cambia a un plan y ahorra en cada pieza, con envío incluido. También puedes continuar con tu compra
              actual sin cambiar nada.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {plans
                .filter((p) => p.id === "plan-3" || p.id === "plan-6")
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6"
                  >
                    <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">
                      {plan.eyebrow}
                    </p>
                    <h3 className="mt-2 font-heading text-xl italic text-[var(--ivory)]">{plan.title}</h3>
                    <p className="mt-2 font-body text-2xl font-semibold tabular-nums text-[var(--white-soft)]">
                      {formatMXN(plan.price)}
                    </p>
                    {plan.savingLabel && (
                      <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--tiffany)]">
                        {plan.savingLabel}
                      </p>
                    )}
                    <div className="mt-4">
                      <BuyButton href="/#suscripciones" fullWidth>
                        Ver este plan
                      </BuyButton>
                    </div>
                  </div>
                ))}
            </div>
            <p className="mt-6 font-body text-[13px] text-white/50">
              ¿Prefieres seguir así?{" "}
              <Link
                to="/checkout"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                Continuar con mi compra actual
              </Link>
            </p>
          </section>
        )}

        {suggested.length > 0 && (
          <section className="mt-24">
            <h2
              className="font-heading italic tracking-tight text-[var(--ivory)]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              También te puede gustar.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {suggested.map((product) => (
                <Link
                  key={product.id}
                  to="/producto/$slug"
                  params={{ slug: product.slug }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/5">
                    <img
                      src={product.soapImage}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-heading text-lg italic text-[var(--ivory)]">{product.name}</p>
                  <p className="mt-1 font-body text-sm text-white/60">{formatMXN(product.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
