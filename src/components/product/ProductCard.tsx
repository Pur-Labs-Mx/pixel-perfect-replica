import type { CSSProperties } from "react";

import { BuyButton } from "@/components/ui/BuyButton";
import { HotBadge } from "@/components/ui/HotBadge";
import { products, type Product } from "@/data/catalog";

/**
 * ProductCard — layout único y compartido para los 6 productos.
 *
 * Se usa tanto en la línea de tiempo de la home (SignatureSection) como
 * en cualquier otro listado que necesite mostrar un producto con la
 * MISMA estructura: contenedor de imagen de proporción fija, jabón
 * centrado con reflejo, nombre/descripción/precio/selector/CTA en las
 * mismas posiciones. Los productos 4-6 (placeholder) usan exactamente
 * este mismo componente, solo cambian los datos.
 *
 * Props:
 *  - product: Product (ver src/data/catalog.ts)
 *  - id: string opcional para anclas de sección (por defecto product.slug)
 */
export function ProductCard({ product, id }: { product: Product; id?: string }) {
  const c = product.signatureColor;
  const isHot = product.hot;

  const sectionStyle: CSSProperties = {
    background: `radial-gradient(65% 65% at 50% 40%, ${c}22, transparent 65%), var(--black-deep)`,
    ["--sig-color" as string]: c,
  } as CSSProperties;

  return (
    <section
      id={id ?? product.slug}
      className="signature-timeline relative overflow-hidden bg-[var(--black-deep)] text-[var(--white-soft)]"
      style={sectionStyle}
    >
      <div
        aria-hidden="true"
        className="signature-tint pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
        style={{ background: `radial-gradient(70% 60% at 65% 55%, ${c}55, transparent 75%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden"
      >
        <p
          className="whitespace-nowrap text-center font-heading italic leading-none text-white/[0.05]"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", letterSpacing: "-0.04em" }}
        >
          {product.name}
        </p>
      </div>
      <div className="pointer-events-none absolute left-6 top-10 z-10 font-body text-[10px] tracking-[0.4em] uppercase text-white/40 sm:left-10">
        № {product.number} / {String(products.length).padStart(2, "0")}
      </div>

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-y-12 gap-x-0 px-0 py-20 md:grid-cols-[42fr_58fr] md:gap-y-0 md:py-28">
        {/* ---------- IMAGEN (misma proporción y posición en los 6 productos) ---------- */}
        <div className="relative md:order-1">
          <div className="photo-grade relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={product.bgImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(60% 60% at 50% 60%, ${c}22, transparent 70%)` }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(5,5,5,0.32) 0%, rgba(5,5,5,0) 18%, rgba(5,5,5,0) 82%, rgba(5,5,5,0.4) 100%), linear-gradient(to right, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0) 18%, rgba(5,5,5,0) 82%, rgba(5,5,5,0.2) 100%)",
              }}
            />

            {/* Jabón + reflejo: misma posición/escala para los 6 productos */}
            {/* Jabón ~30% más grande y centrado en los dos ejes dentro del backstage. */}
            <div
              data-settle-soap={product.slug}
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
            >
              <div className="product-bed relative flex justify-center">
                <div
                  aria-hidden="true"
                  className="signature-glow pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(circle at center, ${c} 0%, transparent 62%)` }}
                />
                <img
                  src={product.soapImage}
                  alt={`${product.name} — jabón perfumado`}
                  loading="lazy"
                  className="product-shadow relative z-10 mx-auto h-auto max-h-[68%] w-auto max-w-[92%] object-contain sm:max-h-[75%] md:max-h-[80%]"
                />
              </div>
              <img
                src={product.soapImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="soap-reflection mx-auto h-auto max-h-[16%] w-auto max-w-[92%] object-contain sm:max-h-[18%]"
              />
            </div>
          </div>
        </div>

        {/* ---------- TEXTO (misma estructura y espaciados en los 6 productos) ---------- */}
        <div className="relative z-10 px-6 py-2 sm:px-10 md:order-2 md:px-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Fragrance soap · Nº {product.number}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {isHot && <HotBadge />}
              <span className="inline-flex items-center font-body text-[10px] tracking-[0.16em] uppercase whitespace-nowrap text-white/70">
                <span className="tabular-nums font-semibold">{product.stock}</span>
                <span className="ml-1">disponibles</span>
              </span>
            </div>
          </div>
          <p className="mt-6 font-heading text-base italic lowercase text-white/55">{product.family}</p>
          <h2 className="mt-3 font-heading italic tracking-tight leading-[0.9]" style={{ fontSize: "var(--display-lg)" }}>
            {product.displayName.map((line) => (
              <span key={line} className="inline-block overflow-visible" style={{ marginRight: "0.28em" }}>
                <span className="inline-block will-change-transform">{line}</span>
              </span>
            ))}
          </h2>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular-nums">
                <span className="font-body font-semibold tracking-tight whitespace-nowrap text-2xl md:text-3xl text-white">
                  ${product.price} MXN
                </span>
                <span className="whitespace-nowrap line-through text-sm text-white/45">
                  ${product.compareAtPrice} MXN
                </span>
                <span
                  className="inline-flex items-center rounded-full border bg-transparent font-body font-bold tracking-[0.14em] uppercase whitespace-nowrap text-[11px] px-2 py-1"
                  style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
                >
                  −{product.discountPercent}%
                </span>
              </div>
              <span className="font-body text-[10px] font-medium tracking-[0.24em] uppercase whitespace-nowrap text-white/60">
                Promoción de apertura
              </span>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <BuyButton
                to={`/${product.slug}`}
                fullWidth
                arrow={false}
                className="sm:w-auto"
                aria-label={`Comprar ${product.name}`}
              >
                Comprar ahora
              </BuyButton>
            </div>
          </div>
          <p className="mt-12 font-heading text-2xl italic leading-tight text-white sm:text-3xl">{product.claim}</p>
          <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-white/70">{product.description}</p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {product.notes.map((note) => (
              <div key={note.label} className="border-t border-white/12 pt-4">
                <p className="font-body text-[9px] tracking-[0.32em] uppercase text-white/45">{note.label}</p>
                <p className="mt-2 font-body text-sm text-white/85">{note.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
