import { useState } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { LifestyleCarousel } from "@/components/landing/LifestyleCarousel";
import { VideoTestimonials } from "@/components/landing/VideoTestimonials";
import { WaveBanner } from "@/components/landing/WaveBanner";
import { LandingBuyBar } from "@/components/landing/PersistentBuyCta";
import { NewsletterPopup } from "@/components/conversion/NewsletterPopup";
import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
import { LiveChat } from "@/components/conversion/LiveChat";
import { useBuyFlow } from "@/components/conversion/ConversionFlowProvider";
import { BuyButton } from "@/components/ui/BuyButton";
import { HotBadge } from "@/components/ui/HotBadge";
import { faqs, plans, products, type Product } from "@/data/catalog";
import { markIntent } from "@/lib/intentSignals";

function OtherProducts({ current }: { current: Product }) {
  const others = products.filter((p) => p.id !== current.id).slice(0, 3);
  return (
    <section className="relative bg-[var(--black-deep)] px-6 py-24 text-[var(--white-soft)] sm:px-10 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
          Descubre más
        </span>
        <h2
          className="mt-6 font-heading italic leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          También te puede gustar.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {others.map((p) => (
            <a
              key={p.id}
              href={`/${p.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/25"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={p.bgImage}
                  alt={`${p.name} — jabón perfumado PŪR LABS`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 p-5">
                <p className="truncate font-body text-[10px] tracking-[0.24em] uppercase text-white/50">
                  Nº {p.number} · {p.family}
                </p>
                <h3 className="truncate font-heading text-xl italic">{p.name}</h3>
                <p className="line-clamp-2 font-body text-xs leading-relaxed text-white/60">
                  {p.firstImpression}
                </p>
                <div className="mt-auto flex items-baseline gap-2 tabular-nums">
                  <span className="font-body text-lg font-semibold text-white">${p.price} MXN</span>
                  <span className="font-body text-xs text-white/40 line-through">${p.compareAtPrice} MXN</span>
                </div>
                <span className="font-body text-[10px] tracking-[0.24em] uppercase text-[var(--tiffany)]">
                  Ver producto
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const { start } = useBuyFlow();
  const [planId, setPlanId] = useState(plans[0]!.id);
  const [qty, setQty] = useState(1);
  const c = product.signatureColor;
  const relatedFaqs = faqs.slice(0, 5);

  const selectedPlan = plans.find((p) => p.id === planId) ?? plans[0]!;

  const handleBuy = () => {
    if (selectedPlan.pieces === 1) {
      start({ kind: "product", product, qty });
    } else {
      start({
        kind: "plan",
        plan: selectedPlan,
        fragrances: Array.from({ length: selectedPlan.pieces }, () => product.name),
        qty,
      });
    }
  };

  const goToPlans = () => {
    document.getElementById("planes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="pt-[140px] pb-[calc(6rem+env(safe-area-inset-bottom))]">
        {/* 1-8 · HERO DEL PRODUCTO */}
        <section
          className="relative overflow-hidden text-[var(--white-soft)]"
          style={{ background: `radial-gradient(65% 65% at 50% 40%, ${c}22, transparent 65%), var(--black-deep)` }}
        >
          <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 py-16 sm:px-10 md:grid-cols-[45fr_55fr] md:py-24">
            <div className="relative order-2 md:order-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <img
                  src={product.bgImage}
                  alt={`Ambiente de ${product.name}`}
                  loading="eager"
                  className="h-full w-full object-cover object-center"
                />
                {/* Jabón superpuesto DENTRO del backstage, centrado y sin clipping. */}
                <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[12%] z-10 flex flex-col items-center justify-end">
                  <img
                    src={product.soapImage}
                    alt={`${product.name} — jabón perfumado de ${180} g`}
                    loading="eager"
                    className="relative z-10 h-auto max-h-[66%] w-auto max-w-[86%] object-contain drop-shadow-2xl"
                  />
                  <img
                    src={product.soapImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="soap-reflection h-auto max-h-[16%] w-auto max-w-[86%] object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 min-w-0 md:order-2">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {product.hot && <HotBadge />}
                {product.photoPending && (
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-3 py-1 font-body text-[9px] font-bold tracking-[0.22em] uppercase text-white/70">
                    Fotografía definitiva próximamente
                  </span>
                )}
              </div>
              <p className="font-body text-[10px] tracking-[0.32em] uppercase text-white/50">
                Fragrance soap · Nº {product.number}
              </p>
              <h1
                className="mt-4 font-heading italic leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                {product.name}
              </h1>
              <p className="mt-3 font-heading text-base italic lowercase text-white/55">{product.family}</p>
              <p className="mt-6 max-w-lg font-heading text-2xl italic leading-tight text-white sm:text-3xl">
                {product.firstImpression}
              </p>
              <p className="mt-4 font-body text-[11px] tracking-[0.2em] uppercase text-[var(--tiffany)]">
                Inspirado en: {product.inspiredBy}
              </p>
              <p className="mt-6 max-w-lg font-body text-[15px] leading-relaxed text-white/70">
                {product.description}
              </p>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
                <span className="font-body text-2xl font-semibold text-white md:text-3xl">
                  ${product.price} MXN
                </span>
                <span className="font-body text-sm text-white/45 line-through">${product.compareAtPrice} MXN</span>
                <span
                  className="inline-flex items-center rounded-full border bg-transparent px-2 py-1 font-body text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
                >
                  −{product.discountPercent}%
                </span>
              </div>
              <div className="mt-8">
                <BuyButton onClick={goToPlans} aria-label={`Elegir plan de ${product.name}`}>
                  Comprar ahora
                </BuyButton>
              </div>
            </div>
          </div>
        </section>

        {/* 9-12 · EXPERIENCIA Y PERFIL OLFATIVO */}
        <section className="relative bg-[#0a0a0a] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[1000px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Perfil olfativo
            </span>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {product.notes.map((note, i) => (
                <div key={note.label} className="border-t border-white/12 pt-6">
                  <p className="font-body text-[9px] tracking-[0.32em] uppercase text-white/45">
                    {String(i + 1).padStart(2, "0")} · {note.label}
                  </p>
                  <p className="mt-3 font-heading text-lg italic text-white">{note.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 font-body text-[11px] leading-relaxed text-white/40">
              Las notas describen el perfil aromático de la pieza, no la lista de ingredientes del jabón.
            </p>
          </div>
        </section>

        {/* 13 · STORYTELLING + EXPERIENCIA DE DUCHA */}
        <section className="relative bg-[var(--black-deep)] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">La historia</span>
            <p className="mt-8 font-heading text-2xl italic leading-relaxed text-white sm:text-3xl">
              {product.story}
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 text-left sm:grid-cols-2">
              <div className="border-t border-white/12 pt-6">
                <p className="font-body text-[9px] tracking-[0.32em] uppercase text-white/45">
                  Experiencia de ducha
                </p>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-white/75">{product.shower}</p>
              </div>
              <div className="border-t border-white/12 pt-6">
                <p className="font-body text-[9px] tracking-[0.32em] uppercase text-white/45">Momento ideal</p>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-white/75">{product.moment}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 16 · GALERÍA — jabón superpuesto dentro del backstage */}
        <section className="relative bg-[#0a0a0a] px-6 py-20 sm:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/10]">
              <img
                src={product.bgImage}
                alt={`${product.name} en su ambiente`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(60% 60% at 50% 60%, ${c}26, transparent 70%)` }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src={product.soapImage}
                  alt={`${product.name} — detalle del jabón`}
                  loading="lazy"
                  className="h-auto max-h-[68%] w-auto max-w-[80%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                />
                <img
                  src={product.soapImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="soap-reflection h-auto max-h-[14%] w-auto max-w-[80%] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 14 · CARACTERÍSTICAS / POR QUÉ PŪR LABS */}
        <section className="relative bg-[var(--black-deep)] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[1000px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Por qué PŪR LABS
            </span>
            <p className="mt-8 max-w-[620px] font-heading text-2xl italic leading-relaxed text-white sm:text-3xl">
              Aromaterapia sensorial: perfumería premium convertida en ritual de ducha.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(product.features ?? []).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 border-t border-white/12 pt-4 font-body text-sm text-white/80"
                >
                  <span aria-hidden="true" style={{ color: "var(--tiffany)" }}>
                    ✓
                  </span>
                  <span className="min-w-0">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 15 · CARRUSEL LIFESTYLE (inmediatamente después de características) */}
        <LifestyleCarousel />

        {/* 12 · ONDAS — una sola instancia por página */}
        <WaveBanner height="7rem" />

        {/* 19 · TESTIMONIOS EN VIDEO (inmediatamente antes de planes) */}
        <VideoTestimonials />

        {/* 20-22 · PLANES, CANTIDAD Y CTA */}
        <section id="planes" className="relative bg-[#0a0a0a] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Elige tu plan
            </span>
            <h2 className="mt-6 font-heading text-3xl italic leading-tight sm:text-4xl">
              Tu ritual, a tu medida.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {plans.map((plan) => {
                const selected = plan.id === planId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      setPlanId(plan.id);
                      markIntent("plan");
                    }}
                    aria-pressed={selected}
                    className={`min-h-[44px] rounded-xl border px-4 py-4 text-left transition-colors ${
                      selected
                        ? "border-[var(--tiffany)] bg-[var(--tiffany)]/10"
                        : "border-white/15 hover:border-white/35"
                    }`}
                  >
                    <p className="truncate font-body text-[10px] tracking-[0.2em] uppercase text-white/55">
                      {plan.eyebrow}
                    </p>
                    <p className="mt-2 truncate font-body text-sm font-semibold text-white">
                      ${plan.price} MXN
                    </p>
                    {plan.pricePerPiece && (
                      <p className="mt-1 truncate font-body text-[11px] text-white/60">
                        ${plan.pricePerPiece} MXN / pieza
                      </p>
                    )}
                    {plan.savingLabel && (
                      <p className="mt-1 truncate font-body text-[10px] tracking-[0.12em] uppercase text-[var(--tiffany)]">
                        {plan.savingLabel}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-white/55">Cantidad</span>
                <div className="flex items-center gap-2 rounded-full border border-white/15 px-2 py-1">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() => {
                      setQty((q) => Math.max(1, q - 1));
                      markIntent("qty");
                    }}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-body text-sm tabular-nums text-white">{qty}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => {
                      setQty((q) => Math.min(20, q + 1));
                      markIntent("qty");
                    }}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <BuyButton onClick={handleBuy} fullWidth aria-label={`Comprar ${product.name}`}>
                  Comprar ahora
                </BuyButton>
              </div>
            </div>
            <p className="mt-4 font-body text-[11px] text-white/45">
              Pago único. Sin cargos recurrentes. Envío a todo México.
            </p>
          </div>
        </section>

        {/* 23 · FAQ RELACIONADO */}
        <FaqBlock faqs={relatedFaqs} />

        {/* 24 · PRODUCTOS RELACIONADOS */}
        <OtherProducts current={product} />

        {/* 25 · CTA FINAL */}
        <section
          className="relative overflow-hidden px-6 py-24 text-center text-[var(--white-soft)] sm:px-10"
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${c}22, transparent 70%), var(--black-deep)` }}
        >
          <div className="mx-auto max-w-[700px]">
            <h2
              className="font-heading italic leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {product.name} te está esperando.
            </h2>
            <div className="mt-8 flex justify-center">
              <BuyButton onClick={handleBuy} aria-label={`Comprar ${product.name}`}>
                Comprar ahora
              </BuyButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* 26 · CTA persistente — sólo en landings */}
      <LandingBuyBar onClick={handleBuy} />

      {/* Conversión exclusiva de landings */}
      <NewsletterPopup />
      <ExitIntentPopup />
      <LiveChat />
    </div>
  );
}

function FaqBlock({ faqs: items }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="relative bg-[var(--ivory)] px-6 py-20 text-[var(--black-deep)] sm:px-10 md:py-28">
      <div className="mx-auto max-w-[800px]">
        <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-black/55">
          Preguntas frecuentes
        </span>
        <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-6">
                <button
                  type="button"
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    markIntent("faq");
                  }}
                >
                  <span className="min-w-0 font-heading text-lg italic md:text-xl">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={`font-body text-lg leading-none text-black/50 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-black/70">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
