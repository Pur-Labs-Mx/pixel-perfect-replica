import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { plans, products, type Plan } from "@/data/catalog";

function PlanCard({ plan }: { plan: Plan }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= plan.pieces) return prev;
      return [...prev, name];
    });
  };

  const featured = plan.featured;

  return (
    <article
      className={`relative flex snap-center shrink-0 flex-col overflow-hidden rounded-2xl border p-5 pt-6 text-[var(--warm-white)] md:p-6 md:pt-7
                    w-[80%] sm:w-[62%] md:w-[calc((100%-3rem)/3)]
                    ${
                      featured
                        ? "border-[var(--tiffany)] bg-[#0A0A0A] shadow-[0_30px_80px_-40px_rgba(22,214,210,0.35)]"
                        : "border-white/10 bg-[#0A0A0A]"
                    }`}
    >
      {plan.badge && (
        <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-[var(--tiffany)] bg-[var(--tiffany)]/10 px-2.5 py-0.5 font-body text-[9px] font-bold tracking-[0.22em] uppercase text-[var(--tiffany)]">
          {plan.badge}
        </span>
      )}
      <p className="pr-24 font-body text-[10px] tracking-[0.24em] uppercase text-white/55 truncate">
        {plan.eyebrow}
      </p>
      <h3 className="mt-2 font-heading text-xl italic md:text-2xl">{plan.title}</h3>
      <div className="mt-3 flex items-baseline gap-2 whitespace-nowrap">
        <span className="font-body font-semibold tabular-nums leading-none" style={{ fontSize: "2.2rem" }}>
          ${plan.price} MXN
        </span>
        <span className="font-body text-[10px] tracking-[0.18em] uppercase text-white/55">
          {plan.priceHint === "Precio por pieza" ? "pago único" : plan.priceHint}
        </span>
      </div>
      {plan.pricePerPiece ? (
        <p className="mt-2 font-body text-[13px] whitespace-nowrap text-white/60">
          <span className="font-semibold tabular-nums text-white/85">${plan.pricePerPiece} MXN</span> por pieza{" "}
          <span className="text-white/35 line-through tabular-nums">${plan.compareAtPerPiece} MXN</span>
        </p>
      ) : (
        <p className="mt-2 font-body text-[13px] text-white/55">{plan.priceHint}</p>
      )}
      {plan.savingLabel ? (
        <p
          className="mt-2 font-body text-[11px] font-bold tracking-[0.14em] uppercase whitespace-nowrap"
          style={{ color: "var(--tiffany)" }}
        >
          {plan.savingLabel}
        </p>
      ) : (
        <p className="mt-2 font-body text-[11px] tracking-[0.14em] uppercase text-white/40">{plan.subHint}</p>
      )}
      <ul className="mt-4 space-y-1.5 font-body text-[13px] leading-snug text-white/75">
        {plan.perks.map((perk, i) => {
          const isShipping = i === 0;
          return (
            <li key={perk} className={`flex items-start gap-2 ${i === 2 ? "text-white/70" : ""}`}>
              {isShipping ? (
                <Truck
                  width={13}
                  height={13}
                  strokeWidth={1.75}
                  className="mt-[3px] shrink-0"
                  style={{ color: plan.pieces > 1 ? "var(--tiffany)" : "rgba(255,255,255,0.35)" }}
                  aria-hidden="true"
                />
              ) : (
                <Check
                  width={13}
                  height={13}
                  strokeWidth={2}
                  className="mt-[3px] shrink-0"
                  style={{ color: "var(--tiffany)" }}
                  aria-hidden="true"
                />
              )}
              <span>{perk}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4">
        <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/55">
          Elige tus fragancias
          <span className="ml-2 text-white/40">
            {selected.length}/{plan.pieces}
          </span>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {products.map((product) => {
            const isSelected = selected.includes(product.name);
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggle(product.name)}
                aria-pressed={isSelected}
                className={`rounded-full border px-2.5 py-1 font-body text-[10px] tracking-[0.16em] uppercase transition-colors ${
                  isSelected
                    ? "border-[var(--tiffany)] text-[var(--tiffany)]"
                    : "border-white/25 text-white/70 hover:border-white/60"
                }`}
              >
                {product.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <a
          className="cta-shine group relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] disabled:opacity-60 disabled:pointer-events-none bg-[var(--tiffany)] text-[#050505] hover:-translate-y-[2px] hover:bg-[var(--tiffany-hover)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 active:bg-[var(--tiffany-active)] w-full"
          href="#convert"
        >
          <span>Elige tus fragancias</span>
          <span
            aria-hidden="true"
            className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
          >
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}

export function PlansSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(plans.length - 1, index));
    const card = el.children[clamped] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
    setActiveIndex(clamped);
  };

  return (
    <section
      id="suscripciones"
      className="relative overflow-hidden bg-[var(--ivory)] px-6 py-24 text-[var(--black-deep)] sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-black/55">Planes</span>
          <h2
            className="mt-6 font-heading italic leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Compra un plan y ahorra.
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-black/70">
            Un solo pago por adelantado que cubre todo el periodo. Sin cargos recurrentes, envío incluido a todo
            México y sin renovación automática al finalizar.
          </p>
        </div>
        <div className="relative mt-14">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="absolute top-1/2 left-0 z-20 inline-flex -translate-x-2 -translate-y-1/2 rounded-full border border-black/15 bg-white/85 p-2 text-black/70 backdrop-blur transition-colors hover:border-black/40 hover:text-black md:hidden"
          >
            <ChevronLeft width={18} height={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="absolute top-1/2 right-0 z-20 inline-flex translate-x-2 -translate-y-1/2 rounded-full border border-black/15 bg-white/85 p-2 text-black/70 backdrop-blur transition-colors hover:border-black/40 hover:text-black md:hidden"
          >
            <ChevronRight width={18} height={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <div
            ref={scrollerRef}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-6 sm:-mx-10 sm:px-10 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Planes disponibles">
            {plans.map((plan, index) => (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Ir a ${plan.title}`}
                onClick={() => scrollToIndex(index)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? "22px" : "8px",
                  background: activeIndex === index ? "var(--tiffany)" : "rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
