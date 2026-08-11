import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { useCart, formatMXN } from "@/lib/cart";
import { pageMeta } from "@/lib/site";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageMeta({
      title: "Checkout · PŪR LABS",
      description: "Finaliza los datos de tu pedido PŪR LABS. Los pagos en línea aún no están conectados.",
      path: "/checkout",
    }),
  component: CheckoutPage,
});

const REQUIRED_FIELDS = [
  { name: "nombre", label: "Nombre completo", type: "text", autoComplete: "name" },
  { name: "email", label: "Correo electrónico", type: "email", autoComplete: "email" },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { name: "calle", label: "Calle y número", type: "text", autoComplete: "street-address" },
  { name: "colonia", label: "Colonia", type: "text", autoComplete: "address-level3" },
  { name: "cp", label: "Código postal", type: "text", autoComplete: "postal-code" },
  { name: "ciudad", label: "Ciudad", type: "text", autoComplete: "address-level2" },
  { name: "estado", label: "Estado", type: "text", autoComplete: "address-level1" },
] as const;

function CheckoutPage() {
  const { items, subtotal, total, clear } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, boolean> = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!values[field.name]?.trim()) nextErrors[field.name] = true;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    track("InitiateCheckout", {
      value: total,
      currency: "MXN",
      content_ids: items.map((i) => i.productId),
      num_items: items.reduce((sum, i) => sum + i.qty, 0),
    });

    // Resumen sólo para esta sesión del navegador: no hay pedido real ni pago.
    try {
      window.sessionStorage.setItem(
        LAST_REQUEST_KEY,
        JSON.stringify({
          name: values['nombre'] ?? "",
          email: values['email'] ?? "",
          total,
          items: items.map((i) => ({
            name: i.name,
            variant: i.variant,
            qty: i.qty,
            unitPrice: i.unitPrice,
          })),
        }),
      );
    } catch {
      /* almacenamiento no disponible */
    }

    setSubmitted(true);
    clear();
    navigate({ to: "/gracias" });
  };


  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-6 pt-[140px] pb-24 sm:px-10">
        <h1
          className="font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Checkout.
        </h1>
        <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-white/60">
          Este es un checkout preparado. Los métodos de pago en línea todavía no están conectados, pero puedes
          dejar tus datos para avanzar tu pedido.
        </p>

        {items.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="font-heading text-2xl italic text-[var(--ivory)]">Tu carrito está vacío.</p>
            <div className="mt-6">
              <BuyButton to="/carrito">Ir al carrito</BuyButton>
            </div>
          </div>
        ) : submitted ? (
          <div className="mt-16 rounded-2xl border border-[var(--tiffany)]/40 bg-white/[0.03] p-10 text-center">
            <p className="font-heading text-2xl italic text-[var(--ivory)]">¡Gracias, {values['nombre']}!</p>
            <p className="mt-4 max-w-lg mx-auto font-body text-[15px] leading-relaxed text-white/70">
              Recibimos los datos de tu pedido por {formatMXN(total)}. El pago en línea aún no está conectado —
              nuestro equipo se pondrá en contacto contigo a {values['email'] || "tu correo"} para confirmar el
              método de pago (OXXO, PayPal o Mercado Pago).
            </p>
            <div className="mt-8">
              <BuyButton to="/">Volver al inicio</BuyButton>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:order-2">
              <h2 className="font-heading text-xl italic text-[var(--ivory)]">Tu pedido</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/5">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm text-[var(--white-soft)]">
                        {item.name} <span className="text-white/50">× {item.qty}</span>
                      </p>
                      <p className="truncate font-body text-[12px] text-white/50">{item.variant}</p>
                    </div>
                    <p className="shrink-0 font-body text-sm tabular-nums text-[var(--white-soft)]">
                      {formatMXN(item.unitPrice * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-3 border-t border-white/10 pt-4 font-body text-sm text-white/75">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Envío</dt>
                  <dd className="text-white/50">Se confirma al enviar</dd>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-[var(--white-soft)]">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatMXN(total)}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">
                  Métodos de pago (próximamente)
                </p>
                <div className="mt-3 space-y-2">
                  {["OXXO", "PayPal", "Mercado Pago"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      disabled
                      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-body text-sm text-white/40 opacity-70"
                    >
                      <span>{method}</span>
                      <span className="text-[10px] uppercase tracking-[0.14em]">Próximamente</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <form noValidate onSubmit={handleSubmit} className="lg:order-1">
              <h2 className="font-heading text-xl italic text-[var(--ivory)]">Contacto y envío</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {REQUIRED_FIELDS.map((field) => (
                  <div key={field.name} className={field.name === "calle" ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={field.name}
                      className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required
                      value={values[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      aria-invalid={errors[field.name] || undefined}
                      className={`mt-2 min-h-[48px] w-full rounded-lg border bg-white/[0.03] px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)] ${
                        errors[field.name] ? "border-red-400/70" : "border-white/15"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="mt-1 font-body text-[12px] text-red-400">Este campo es obligatorio.</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <BuyButton type="submit" onClick={() => {}} fullWidth>
                  Confirmar pedido
                </BuyButton>
                <p className="mt-3 font-body text-[12px] text-white/45">
                  Al confirmar aceptas que el pago en línea todavía no está disponible; te contactaremos para
                  completar el pago.
                </p>
              </div>
            </form>
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/carrito"
            className="font-body text-[13px] tracking-[0.1em] uppercase text-white/70 underline underline-offset-4 hover:text-white"
          >
            ← Volver al carrito
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
