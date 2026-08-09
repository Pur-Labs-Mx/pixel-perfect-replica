import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import { BuyButton } from "@/components/ui/BuyButton";
import { products, type Product } from "@/data/catalog";

export function SignatureSection({ product }: { product: Product }) {
  const reversed = parseInt(product.number, 10) % 2 === 0;
  const c = product.signatureColor;
  const isHot = product.hot;

  const sectionStyle: CSSProperties = {
    background: `radial-gradient(65% 65% at 50% 40%, ${c}22, transparent 65%), var(--black-deep)`,
    ["--sig-color" as string]: c,
  } as CSSProperties;

  const ctaClass = isHot
    ? "cta-shine group relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] disabled:opacity-60 disabled:pointer-events-none bg-[var(--tiffany)] text-[#050505] hover:-translate-y-[2px] hover:bg-[var(--tiffany-hover)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 active:bg-[var(--tiffany-active)] w-full sm:w-auto"
    : "cta-shine group relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] disabled:opacity-60 disabled:pointer-events-none bg-[var(--black-deep)] text-[var(--warm-white)] border border-[var(--tiffany)] hover:-translate-y-[2px] hover:bg-[var(--tiffany)] hover:text-[var(--black-deep)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 active:bg-[var(--tiffany-active)] active:text-[var(--black-deep)] w-full sm:w-auto";

  const soapPositionClass = reversed
    ? "pointer-events-none absolute z-20 hidden md:block right-[6%] top-1/2 -translate-y-1/2"
    : "pointer-events-none absolute z-20 hidden md:block right-[6%] bottom-[6%]";

  return (
    <section
      id={product.slug}
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
        № {product.number} / 03
      </div>
      <div
        className={`relative mx-auto grid max-w-[1500px] items-center gap-y-12 gap-x-0 px-0 py-20 md:gap-y-0 md:py-28 ${
          reversed ? "md:grid-cols-[55fr_45fr]" : "md:grid-cols-[42fr_58fr]"
        }`}
      >
        <div className={`relative ${reversed ? "md:order-1" : "md:order-2"}`}>
          <div className="photo-grade relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] md:aspect-[4/5]">
            <img
              src={product.bgImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(60% 60% at 50% 60%, ${c}22, transparent 70%)` }}
            />
          </div>
          <div data-settle-soap={product.slug} className={soapPositionClass}>
            <div className="product-bed relative">
              <div
                aria-hidden="true"
                className="signature-glow pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${c} 0%, transparent 62%)` }}
              />
              <div
                aria-hidden="true"
                className="signature-spill pointer-events-none absolute inset-x-2 bottom-[-22px] h-14 blur-3xl"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${c}, transparent 70%)` }}
              />
              <img
                src={product.soapImage}
                alt={`${product.name} — jabón perfumado`}
                loading="lazy"
                className="product-shadow relative z-10 h-auto max-h-[74vh] w-auto"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-screen">
                <div
                  className="absolute -inset-y-4 -left-1/2 w-1/3 rotate-12"
                  style={{ background: `linear-gradient(90deg, transparent, ${product.glowColor}55, transparent)` }}
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.32) 0%, rgba(5,5,5,0) 18%, rgba(5,5,5,0) 82%, rgba(5,5,5,0.4) 100%), linear-gradient(to right, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0) 18%, rgba(5,5,5,0) 82%, rgba(5,5,5,0.2) 100%)",
            }}
          />
          <div className="pointer-events-none absolute left-1/2 bottom-[-40px] z-20 -translate-x-1/2 md:hidden">
            <div data-settle-soap={product.slug} className="product-bed relative">
              <div
                aria-hidden="true"
                className="signature-glow pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${c} 0%, transparent 62%)` }}
              />
              <div
                aria-hidden="true"
                className="signature-spill pointer-events-none absolute inset-x-2 bottom-[-16px] h-12 blur-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${c}, transparent 70%)` }}
              />
              <img
                src={product.soapImage}
                alt={`${product.name} — jabón perfumado`}
                loading="lazy"
                className="product-shadow product-rim parallax-down relative z-10 h-auto max-h-[52vh] w-auto"
              />
              <img
                src={product.soapImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="product-mirror absolute left-1/2 top-full z-0 h-auto max-h-[26vh] w-auto -translate-x-1/2 -translate-y-[2%]"
              />
            </div>
          </div>
        </div>
        <div className={`relative z-10 px-6 sm:px-10 md:px-16 ${reversed ? "md:order-2" : "md:order-1"} `}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Fragrance soap · Nº {product.number}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {isHot && (
                <span
                  className="inline-flex items-center rounded-full border bg-transparent px-2 py-[3px] font-body text-[9px] font-bold tracking-[0.24em] uppercase whitespace-nowrap"
                  style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
                >
                  Hot
                </span>
              )}
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
                className="sm:w-auto"
                aria-label={`Comprar ${product.name}`}
              >
                {product.placeholder ? "Próximamente" : "Comprar ahora"}
              </BuyButton>
              <Link
                to={`/${product.slug}`}
                className="font-body text-[11px] tracking-[0.28em] uppercase text-white/70 underline-offset-4 hover:text-white hover:underline sm:self-center"
              >
                Ver la ficha →
              </Link>
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
