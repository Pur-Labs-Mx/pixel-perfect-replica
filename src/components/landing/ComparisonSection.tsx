import { Check, X } from "lucide-react";
import { comparisonRows } from "@/data/catalog";

export function ComparisonSection() {
  return (
    <section className="relative bg-[var(--black-deep)] px-6 py-24 text-[var(--white-soft)] sm:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">La diferencia</span>
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
        <div className="mt-14 overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-white/10 font-body text-[10px] tracking-[0.28em] uppercase text-white/55">
            <div className="px-5 py-4 md:px-8 md:py-5">Característica</div>
            <div
              className="border-l border-white/10 px-4 py-4 text-center md:px-6 md:py-5"
              style={{ color: "var(--tiffany)" }}
            >
              PŪR LABS
            </div>
            <div className="border-l border-white/10 px-4 py-4 text-center text-white/45 md:px-6 md:py-5">
              Jabón común
            </div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.6fr_1fr_1fr] items-center ${
                i < comparisonRows.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="px-5 py-5 font-body text-[13px] leading-relaxed text-white/85 md:px-8 md:py-6 md:text-[15px]">
                {row.feature}
              </div>
              <div className="flex items-center justify-center border-l border-white/10 px-4 py-5 md:px-6 md:py-6">
                {row.pur ? (
                  <Check
                    className="lucide lucide-check h-5 w-5"
                    strokeWidth={2.5}
                    style={{ color: "var(--tiffany)" }}
                    aria-label="Sí"
                  />
                ) : (
                  <X className="lucide lucide-x h-5 w-5 text-white/30" strokeWidth={2} aria-label="No" />
                )}
              </div>
              <div className="flex items-center justify-center border-l border-white/10 px-4 py-5 md:px-6 md:py-6">
                {row.common ? (
                  <Check
                    className="lucide lucide-check h-5 w-5"
                    strokeWidth={2.5}
                    style={{ color: "var(--tiffany)" }}
                    aria-label="Sí"
                  />
                ) : (
                  <X className="lucide lucide-x h-5 w-5 text-white/30" strokeWidth={2} aria-label="No" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
