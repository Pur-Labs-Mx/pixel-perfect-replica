import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { products } from "@/data/catalog";
import { formatMXN } from "@/lib/cart";
import {
  DOWNSELL_OFFER,
  REFERRAL_CODE_TEMPLATE,
  pageMeta,
  whatsappCommunityUrl,
} from "@/lib/site";
import { trackEvent } from "@/lib/tracking";

export const Route = createFileRoute("/gracias")({
  head: () =>
    pageMeta({
      title: "Gracias por tu pedido · PŪR LABS",
      description:
        "Recibimos tu solicitud de pedido PŪR LABS. Aquí encuentras el resumen, tu código para compartir y los siguientes pasos.",
      path: "/gracias",
    }),
  component: GraciasPage,
});

/** Clave donde el checkout guarda el resumen de la última solicitud (sólo en esta sesión). */
export const LAST_REQUEST_KEY = "purlabs.lastRequest.v1";

type RequestLine = { name: string; variant: string; qty: number; unitPrice: number };
type LastRequest = { name?: string; email?: string; total?: number; items?: RequestLine[] };

const crossSell = products.slice(0, 3);

function makeReferralCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return REFERRAL_CODE_TEMPLATE.replace("{code}", code);
}

function GraciasPage() {
  const [request, setRequest] = useState<LastRequest | null>(null);
  const [referral, setReferral] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(LAST_REQUEST_KEY);
      if (raw) setRequest(JSON.parse(raw) as LastRequest);
    } catch {
      /* almacenamiento no disponible */
    }
    setReferral(makeReferralCode());
    trackEvent("Lead", { context: "thank_you_page" });
  }, []);

  const lines = useMemo(() => request?.items ?? [], [request]);
  const total = request?.total;

  const copyReferral = () => {
    if (!referral) return;
    navigator.clipboard
      ?.writeText(referral)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => setCopied(false));
  };

  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1100px] px-6 pt-[130px] pb-24 sm:px-10 sm:pt-[140px]">
        <span className="font-body text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--tiffany)]">
          Solicitud recibida
        </span>
        <h1
          className="mt-5 font-heading italic leading-[0.95] tracking-tight text-[var(--ivory)]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
        >
          {request?.name ? `Gracias, ${request.name}.` : "Gracias por tu pedido."}
        </h1>
        <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-white/65">
          Registramos tu solicitud. El pago en línea todavía no está conectado, así que nuestro equipo
          te escribirá {request?.email ? <span className="text-white/85">a {request.email}</span> : "al correo que dejaste"} para
          confirmar el método de pago y el envío.
        </p>

        {/* RESUMEN */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-heading text-xl italic text-[var(--ivory)]">Resumen de tu solicitud</h2>
          {lines.length === 0 ? (
            <p className="mt-4 font-body text-[14px] leading-relaxed text-white/55">
              No encontramos un resumen en esta sesión. Si ya enviaste tus datos, no te preocupes: los
              recibimos y te contactaremos. También puedes volver a la colección para revisar tu selección.
            </p>
          ) : (
            <>
              <ul className="mt-6 space-y-4">
                {lines.map((line, i) => (
                  <li key={`${line.name}-${i}`} className="flex min-w-0 items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-body text-sm text-[var(--white-soft)]">
                        {line.name} <span className="text-white/50">× {line.qty}</span>
                      </p>
                      <p className="font-body text-[12px] text-white/50">{line.variant}</p>
                    </div>
                    <p className="shrink-0 font-body text-sm tabular-nums text-[var(--white-soft)]">
                      {formatMXN(line.unitPrice * line.qty)}
                    </p>
                  </li>
                ))}
              </ul>
              {typeof total === "number" && (
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-body text-base font-semibold text-[var(--white-soft)]">
                  <span>Total estimado</span>
                  <span className="tabular-nums">{formatMXN(total)}</span>
                </div>
              )}
              <p className="mt-3 font-body text-[12px] text-white/45">
                El costo de envío se confirma al contactarte. Aún no se realizó ningún cargo.
              </p>
            </>
          )}
        </section>

        {/* ÚLTIMA OPORTUNIDAD */}
        {DOWNSELL_OFFER.enabled && (
          <section className="mt-10 rounded-2xl border-2 border-[var(--tiffany-border)] bg-[#0a0a0a] p-6 sm:p-8">
            <span className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-white/55">
              Última oportunidad
            </span>
            <h2 className="mt-4 font-heading text-2xl italic text-[var(--ivory)]">
              Suma otra fragancia con {DOWNSELL_OFFER.percentOff}% adicional.
            </h2>
            <p className="mt-3 max-w-xl font-body text-[14px] leading-relaxed text-white/65">
              Usa este código al confirmar tu pedido con nuestro equipo. Válido solo desde esta página.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-dashed border-[var(--tiffany)] px-5 py-3 font-body text-sm font-bold tracking-[0.22em] uppercase text-[var(--tiffany)]">
                {DOWNSELL_OFFER.code}
              </span>
              <BuyButton href="/#fragrances">Ver la colección</BuyButton>
            </div>
          </section>
        )}

        {/* REFERIDOS */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-heading text-xl italic text-[var(--ivory)]">Comparte PŪR LABS</h2>
          <p className="mt-3 max-w-xl font-body text-[14px] leading-relaxed text-white/65">
            Este es tu código para compartir con quien quieras que descubra la colección.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <code className="rounded-lg border border-white/15 bg-black/40 px-4 py-3 font-body text-sm tracking-[0.14em] text-[var(--white-soft)]">
              {referral || "…"}
            </code>
            <SecondaryButton onClick={copyReferral} aria-label="Copiar código de referido">
              {copied ? "Copiado" : "Copiar código"}
            </SecondaryButton>
            {whatsappCommunityUrl && (
              <a
                href={whatsappCommunityUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-[11px] tracking-[0.24em] uppercase text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                Únete a la comunidad de WhatsApp
              </a>
            )}
          </div>
        </section>

        {/* CROSS-SELL */}
        {crossSell.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl italic text-[var(--ivory)]">También te puede gustar.</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {crossSell.map((p) => (
                <a
                  key={p.id}
                  href={`/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/25"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={p.bgImage}
                      alt={`${p.name} — jabón perfumado PŪR LABS`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2 p-5">
                    <p className="truncate font-body text-[10px] tracking-[0.24em] uppercase text-white/50">
                      Nº {p.number} · {p.family}
                    </p>
                    <h3 className="truncate font-heading text-xl italic text-[var(--ivory)]">{p.name}</h3>
                    <span className="font-body text-lg font-semibold tabular-nums text-white">
                      ${p.price} MXN
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <BuyButton to="/">Volver al inicio</BuyButton>
          <Link
            to="/rastrea-tu-pedido"
            className="font-body text-[12px] tracking-[0.2em] uppercase text-white/70 underline underline-offset-4 hover:text-white"
          >
            Rastrear mi pedido
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
