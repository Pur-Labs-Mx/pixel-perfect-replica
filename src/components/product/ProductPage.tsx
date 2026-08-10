import { useState } from "react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BuyButton } from "@/components/ui/BuyButton";
import { useCart } from "@/lib/cart";
import { HotBadge } from "@/components/ui/HotBadge";
import { faqs, plans, products, type Product } from "@/data/catalog";

function OtherProducts({ current }: { current: Product }) {
  const others = products.filter((p) => p.id !== current.id);
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
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.placeholder && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/30 bg-black/60 px-2 py-1 font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/80">
                    Próximamente
                  </span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 p-5">
                <p className="truncate font-body text-[10px] tracking-[0.24em] uppercase text-white/50">
                  Nº {p.number} · {p.family}
                </p>
                <h3 className="truncate font-heading text-xl italic">{p.name}</h3>
                <div className="mt-auto flex items-baseline gap-2 tabular-nums">
                  <span className="font-body text-lg font-semibold text-white">${p.price} MXN</span>
                  <span className="font-body text-xs text-white/40 line-through">${p.compareAtPrice} MXN</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const cart = useCart();
  const [planId, setPlanId] = useState(plans[0]!.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const c = product.signatureColor;
  const relatedFaqs = faqs.slice(0, 4);

  const selectedPlan = plans.find((p) => p.id === planId) ?? plans[0]!;
  const unitPrice = selectedPlan.pricePerPiece ?? selectedPlan.price;

  const handleAdd = () => {
    if (product.placeholder) return;
    cart.add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.bgImage,
      variant: selectedPlan.title,
      fragrances: [product.name],
      unitPrice,
      qty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="pt-[140px]">
        {/* HERO */}
        <section
          className="relative overflow-hidden text-[var(--white-soft)]"
          style={{ background: `radial-gradient(65% 65% at 50% 40%, ${c}22, transparent 65%), var(--black-deep)` }}
        >
          <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 py-16 sm:px-10 md:grid-cols-[45fr_55fr] md:py-24">
            <div className="relative order-2 md:order-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <img src={product.bgImage} alt="" loading="eager" className="h-full w-full object-cover object-center" />
                <div className="pointer-events-none absolute inset-x-0 bottom-[24%] z-10 flex flex-col items-center">
                  <img
                    src={product.soapImage}
                    alt={`${product.name} — jabón perfumado`}
                    loading="eager"
                    className="relative z-10 h-auto max-h-[34vh] w-auto drop-shadow-2xl sm:max-h-[38vh]"
                  />
                  <img
                    src={product.soapImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="soap-reflection h-auto max-h-[16vh] w-auto sm:max-h-[18vh]"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 min-w-0 md:order-2">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {product.hot && <HotBadge />}
                {product.placeholder && (
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-3 py-1 font-body text-[9px] font-bold tracking-[0.22em] uppercase text-white/70">
                    Próximamente
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
              <p className="mt-6 max-w-lg font-heading text-2xl italic leading-tight text-white">
                {product.claim}
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
            </div>
          </div>
        </section>

        {/* COMPRA */}
        <section className="relative bg-[#0a0a0a] px-6 py-16 text-[var(--white-soft)] sm:px-10">
          <div className="mx-auto max-w-[900px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Elige tu plan
            </span>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {plans.map((plan) => {
                const selected = plan.id === planId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setPlanId(plan.id)}
                    aria-pressed={selected}
                    className={`min-h-[44px] rounded-xl border px-4 py-3 text-left transition-colors ${
                      selected
                        ? "border-[var(--tiffany)] bg-[var(--tiffany)]/10"
                        : "border-white/15 hover:border-white/35"
                    }`}
                  >
                    <p className="truncate font-body text-[10px] tracking-[0.2em] uppercase text-white/55">
                      {plan.pieces === 1 ? "1 pieza" : plan.title}
                    </p>
                    <p className="mt-1 truncate font-body text-sm font-semibold text-white">
                      ${plan.pricePerPiece ?? plan.price} MXN {plan.pricePerPiece ? "/ pieza" : ""}
                    </p>
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
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-6 text-center tabular-nums font-body text-sm text-white">{qty}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <BuyButton onClick={handleAdd} disabled={product.placeholder ?? false} fullWidth arrow={false}>
                  {added ? "Añadido" : "Comprar ahora"}
                </BuyButton>
                <BuyButton to="/carrito" fullWidth arrow={false}>
                  Ver carrito
                </BuyButton>
              </div>
            </div>
          </div>
        </section>

        {/* STORYTELLING */}
        <section className="relative bg-[var(--black-deep)] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[800px] text-center">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">La historia</span>
            <p className="mt-8 font-heading text-2xl italic leading-relaxed text-white sm:text-3xl">
              {product.story}
            </p>
            <p className="mt-8 font-body text-[15px] leading-relaxed text-white/70">{product.description}</p>
          </div>
        </section>

        {/* PIRÁMIDE OLFATIVA */}
        <section className="relative bg-[#0a0a0a] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[900px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Pirámide olfativa
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
          </div>
        </section>

        {/* GALERÍA */}
        <section className="relative bg-[var(--black-deep)] px-6 py-20 sm:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <img src={product.bgImage} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0a0a0a]">
              <img src={product.soapImage} alt={`${product.name} — detalle`} loading="lazy" className="h-full w-full object-contain p-8" />
            </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        {product.features && product.features.length > 0 && (
          <section className="relative bg-[#0a0a0a] px-6 py-20 text-[var(--white-soft)] sm:px-10 md:py-28">
            <div className="mx-auto max-w-[900px]">
              <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
                Características
              </span>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 border-t border-white/12 pt-4 font-body text-sm text-white/80">
                    <span aria-hidden="true" style={{ color: "var(--tiffany)" }}>✓</span>
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* POR QUÉ PŪR LABS */}
        <section className="relative bg-[var(--black-deep)] px-6 py-20 text-center text-[var(--white-soft)] sm:px-10 md:py-28">
          <div className="mx-auto max-w-[700px]">
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              Por qué PŪR LABS
            </span>
            <p className="mt-8 font-heading text-2xl italic leading-relaxed text-white sm:text-3xl">
              El perfume también puede tocarse.
            </p>
            <p className="mt-6 font-body text-[15px] leading-relaxed text-white/70">
              Cada pieza se cura durante cuatro semanas, se vierte a mano y se inspira en la alta perfumería para
              transformar un gesto cotidiano en una experiencia sensorial.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FaqBlock faqs={relatedFaqs} />

        {/* TAMBIÉN TE PUEDE GUSTAR */}
        <OtherProducts current={product} />

        {/* CTA FINAL */}
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
              <BuyButton onClick={handleAdd} disabled={product.placeholder ?? false} arrow={false}>
                Comprar ahora
              </BuyButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
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
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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
