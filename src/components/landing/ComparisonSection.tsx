import { Check, Minus } from "lucide-react";
import { comparisonRows } from "@/data/catalog";

export function ComparisonSection() {
  return (
    <section className="relative bg-[var(--black-deep)] px-6 py-24 text-[var(--white-soft)] sm:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
            La diferencia
          </span>
          <h2
            className="mt-6 font-heading italic leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            ¿Por qué PŪR LABS?
          </h2>
          <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-white/70">
            No es un jabón más. Es una manera distinta de habitar el momento del baño.
          </p>
        </div>

        {/* Desktop / tablet: table layout */}
        <div className="mt-14 hidden overflow-hidden rounded-lg border border-white/10 md:block">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-white/10 font-body text-[10px] tracking-[0.28em] uppercase text-white/55">
            <div className="px-8 py-5">Característica</div>
            <div
              className="border-l border-white/10 px-6 py-5 text-center font-semibold"
              style={{ color: "var(--tiffany)" }}
            >
              PŪR LABS
            </div>
            <div className="border-l border-white/10 px-6 py-5 text-center text-white/45">
              Jabón común
            </div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.6fr_1fr_1fr] items-stretch ${
                i % 2 === 1 ? "bg-white/[0.02]" : ""
              } ${i < comparisonRows.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <div className="flex items-center px-8 py-6 font-body text-[15px] leading-relaxed text-white/85">
                {row.feature}
              </div>
              <div className="flex items-center justify-center border-l border-white/10 px-6 py-6">
                {row.pur ? (
                  <Check
                    className="h-5 w-5"
                    strokeWidth={2.5}
                    style={{ color: "var(--tiffany)" }}
                    aria-label="Sí incluido"
                  />
                ) : (
                  <Minus className="h-4 w-4 text-white/25" strokeWidth={2} aria-label="No incluido" />
                )}
              </div>
              <div className="flex items-center justify-center border-l border-white/10 px-6 py-6">
                {row.common ? (
                  <Check className="h-5 w-5 text-white/40" strokeWidth={2.5} aria-label="Sí incluido" />
                ) : (
                  <Minus className="h-4 w-4 text-white/25" strokeWidth={2} aria-label="No incluido" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked card layout, no overflow */}
        <div className="mt-12 space-y-3 md:hidden">
          {comparisonRows.map((row) => (
            <div key={row.feature} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <p className="font-body text-[14px] leading-relaxed text-white/85">{row.feature}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "var(--tiffany)" }}>
                    PŪR LABS
                  </span>
                  {row.pur ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} style={{ color: "var(--tiffany)" }} aria-label="Sí" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/25" aria-label="No" />
                  )}
                </div>
                <div className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/45">Común</span>
                  {row.common ? (
                    <Check className="h-4 w-4 text-white/40" strokeWidth={2.5} aria-label="Sí" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/25" aria-label="No" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
