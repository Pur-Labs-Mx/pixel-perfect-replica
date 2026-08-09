import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () =>
    pageMeta({
      title: "Contacto · PŪR LABS",
      description: "Escríbenos tus dudas sobre productos, envíos o pedidos PŪR LABS.",
      path: "/contacto",
    }),
  component: ContactoPage,
});

function ContactoPage() {
  const [values, setValues] = useState<{ nombre: string; email: string; mensaje: string }>({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, boolean> = {};
    if (!values['nombre'].trim()) nextErrors['nombre'] = true;
    if (!values['email'].trim()) nextErrors['email'] = true;
    if (!values['mensaje'].trim()) nextErrors['mensaje'] = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
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
          Contacto.
        </h1>
        <p className="mt-4 font-body text-[15px] leading-relaxed text-white/60">
          Cuéntanos qué necesitas. Este formulario aún no está conectado a un sistema de tickets, pero guardamos tu
          mensaje y te confirmamos aquí mismo.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-[var(--tiffany)]/40 bg-white/[0.03] p-8">
            <p className="font-heading text-xl italic text-[var(--ivory)]">Mensaje recibido.</p>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-white/70">
              Gracias, {values['nombre']}. Aún no tenemos un sistema automático de respuestas conectado
              [PENDIENTE], pero tu mensaje quedó registrado y te responderemos a {values['email']} en cuanto
              podamos.
            </p>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="nombre" className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60">
                Nombre
              </label>
              <input
                id="nombre"
                required
                value={values['nombre']}
                onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
                aria-invalid={errors['nombre'] || undefined}
                className={`mt-2 min-h-[48px] w-full rounded-lg border bg-white/[0.03] px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)] ${
                  errors['nombre'] ? "border-red-400/70" : "border-white/15"
                }`}
              />
              {errors['nombre'] && <p className="mt-1 font-body text-[12px] text-red-400">Este campo es obligatorio.</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={values['email']}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                aria-invalid={errors['email'] || undefined}
                className={`mt-2 min-h-[48px] w-full rounded-lg border bg-white/[0.03] px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)] ${
                  errors['email'] ? "border-red-400/70" : "border-white/15"
                }`}
              />
              {errors['email'] && <p className="mt-1 font-body text-[12px] text-red-400">Este campo es obligatorio.</p>}
            </div>
            <div>
              <label htmlFor="mensaje" className="font-body text-[11px] tracking-[0.14em] uppercase text-white/60">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={5}
                required
                value={values['mensaje']}
                onChange={(e) => setValues((v) => ({ ...v, mensaje: e.target.value }))}
                aria-invalid={errors['mensaje'] || undefined}
                className={`mt-2 w-full rounded-lg border bg-white/[0.03] px-4 py-3 font-body text-sm text-[var(--white-soft)] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)] ${
                  errors['mensaje'] ? "border-red-400/70" : "border-white/15"
                }`}
              />
              {errors['mensaje'] && <p className="mt-1 font-body text-[12px] text-red-400">Este campo es obligatorio.</p>}
            </div>
            <BuyButton type="submit" onClick={() => {}} fullWidth>
              Enviar mensaje
            </BuyButton>
          </form>
        )}

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">Otros canales</p>
          <p className="mt-3 font-body text-sm text-white/70">Correo: [PENDIENTE: correo oficial de atención]</p>
          <p className="mt-2 font-body text-sm text-white/70">WhatsApp: [PENDIENTE: número oficial de atención]</p>
          <p className="mt-2 font-body text-sm text-white/70">Instagram: [PENDIENTE: usuario oficial]</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
