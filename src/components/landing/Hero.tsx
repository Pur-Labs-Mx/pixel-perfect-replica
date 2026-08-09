import { ArrowUpRight } from "lucide-react";

import { BuyButton } from "@/components/ui/BuyButton";

import heroPoster from "@/assets/hero-model.png";
import { products } from "@/data/catalog";

const hero = products[0]!;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--black)] text-[var(--warm-white)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
          <img
            src={heroPoster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <video
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/media/hero-video-desktop.webm" type="video/webm" />
            <source src="/media/hero-video-desktop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 px-6 pt-32 sm:px-10 md:pt-36">
        <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--gray-muted)]">
          PŪR LABS / FRAGRANCE SOAP
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10">
        <div className="max-w-3xl">
          <h1
            className="font-heading italic leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 8.5rem)" }}
          >
            El perfume también puede tocarse.
          </h1>

          <p className="mt-8 max-w-md font-body text-[15px] leading-relaxed text-[var(--ivory)]/80">
            Piezas translúcidas perfumadas, inspiradas en grandes composiciones olfativas y
            diseñadas para transformar un gesto cotidiano en una experiencia sensorial.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular-nums">
                <span className="font-body text-2xl font-semibold tracking-tight whitespace-nowrap text-white md:text-3xl">
                  ${hero.price} MXN
                </span>
                <span className="text-sm whitespace-nowrap text-white/45 line-through">
                  ${hero.compareAtPrice} MXN
                </span>
                <span
                  className="inline-flex items-center rounded-full border bg-transparent px-2 py-1 font-body text-[11px] font-bold tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
                >
                  −{hero.discountPercent}%
                </span>
              </div>
              <span className="font-body text-[10px] font-medium tracking-[0.24em] uppercase whitespace-nowrap text-white/60">
                Promoción de apertura
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <BuyButton href="#suscripciones" aria-label="Comprar ahora">
                Comprar ahora
              </BuyButton>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 px-8 py-4 font-body text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--white-soft)] transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:outline-none"
                href="#fragrances"
              >
                <span>Ver la colección</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="/faq"
                className="font-body text-[11px] tracking-[0.28em] uppercase text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                Preguntas frecuentes →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between font-body text-[10px] tracking-[0.32em] uppercase text-[var(--smoke)] sm:inset-x-10">
        <span>↓ Desliza para descubrir</span>
        <span className="hidden sm:inline">Jabón perfumado de autor</span>
      </div>
    </section>
  );
}
