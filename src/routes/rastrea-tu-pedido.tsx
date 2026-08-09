import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/rastrea-tu-pedido")({
  head: () =>
    pageMeta({
      title: "Rastrea tu pedido · PŪR LABS",
      description: "Consulta el estado de tu pedido PŪR LABS con tu número de orden y correo electrónico.",
      path: "/rastrea-tu-pedido",
    }),
  component: RastreaPage,
});

function RastreaPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-6 pt-[140px] pb-24 sm:px-10">
        <h1
          className="font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Rastrea tu pedido.
        </h1>
        <p className="mt-4 font-body text-[15px] leading-relaxed text-white/60">
          El rastreo en tiempo real se conectará con nuestro sistema de pedidos [PENDIENTE]. Mientras tanto,
          déjanos tus datos y te ayudamos manualmente.
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-[var(--tiffany)]/40 bg-white/[0.03] p-8">
            <p className="font-heading text-xl italic text-[var(--ivory)]">Solicitud recibida.</p>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-white/70">
              El rastreo automático todavía no está disponible [PENDIENTE: integración con sistema de pedidos].
              Nuestro equipo revisará el pedido {orderId} y te responderá a {email} en cuanto tenga novedades.
            </p>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="orderId" className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60">
                Número de pedido
              </label>
              <input
                id="orderId"
                name="orderId"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="PL-000123"
                className="mt-2 min-h-[48px] w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)]"
              />
            </div>
            <div>
              <label htmlFor="track-email" className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60">
                Correo electrónico
              </label>
              <input
                id="track-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="mt-2 min-h-[48px] w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)]"
              />
            </div>
            <BuyButton type="submit" onClick={() => {}} fullWidth>
              Rastrear pedido
            </BuyButton>
          </form>
        )}

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">Contacto directo</p>
          <p className="mt-3 font-body text-sm text-white/70">
            Correo: [PENDIENTE: correo oficial de atención]
          </p>
          <p className="mt-2 font-body text-sm text-white/70">
            WhatsApp: [PENDIENTE: número oficial de atención]
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
