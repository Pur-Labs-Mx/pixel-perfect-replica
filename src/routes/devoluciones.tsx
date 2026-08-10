import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/devoluciones")({
  head: () =>
    pageMeta({
      title: "Devoluciones y cambios · PŪR LABS",
      description: "Información sobre devoluciones y cambios de pedidos PŪR LABS.",
      path: "/devoluciones",
    }),
  component: DevolucionesPage,
});

function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-6 pt-[140px] pb-24 sm:px-10">
        <h1
          className="font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Devoluciones y cambios.
        </h1>

        <div className="mt-10 space-y-6 font-body text-[15px] leading-relaxed text-white/70">
          <p>
            Si recibiste tu pedido dañado, incompleto o con un error, contáctanos y revisaremos tu caso de forma
            individual lo antes posible.
          </p>
          <p>
            Para solicitar una devolución o cambio, escríbenos indicando tu número de pedido y el motivo; te
            confirmaremos los siguientes pasos según el caso.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">Contáctanos</p>
          <p className="mt-3 font-body text-sm text-white/70">
            Escríbenos desde{" "}
            <a href="/contacto" className="underline underline-offset-4 hover:text-white">
              nuestra página de contacto
            </a>{" "}
            contándonos tu número de pedido y el motivo, y te responderemos lo antes posible.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
