import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/envios")({
  head: () =>
    pageMeta({
      title: "Política de envíos · PŪR LABS",
      description: "Conoce cómo funcionan los envíos de PŪR LABS a todo México.",
      path: "/envios",
    }),
  component: EnviosPage,
});

const sections = [
  {
    title: "Cobertura",
    body: "Enviamos a todo México.",
  },
  {
    title: "Plazos de entrega",
    body: "[PENDIENTE: dato oficial de plazos de entrega]. El plazo estimado para tu dirección se confirma en el checkout antes de pagar.",
  },
  {
    title: "Costo de envío",
    body: "El costo se confirma en el checkout según tu dirección. En los planes de 3 y 6 meses el envío está incluido sin costo adicional.",
  },
  {
    title: "Empaque y cuidado",
    body: "[PENDIENTE: información oficial sobre empaque y manejo en tránsito].",
  },
  {
    title: "Seguimiento",
    body: "Puedes dar seguimiento a tu pedido desde la página de Rastrea tu pedido en cuanto la integración esté disponible [PENDIENTE].",
  },
];

function EnviosPage() {
  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-6 pt-[140px] pb-24 sm:px-10">
        <h1
          className="font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Política de envíos.
        </h1>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/10 pb-8">
              <h2 className="font-heading text-xl italic text-[var(--ivory)]">{section.title}</h2>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-white/65">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-body text-sm text-white/60">
            ¿Dudas sobre tu envío? Escríbenos desde{" "}
            <a href="/contacto" className="underline underline-offset-4 hover:text-white">
              nuestra página de contacto
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
