import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lifestyleSlides } from "@/data/lifestyle";

type LifestyleCarouselProps = {
  className?: string;
};

/**
 * Carrusel editorial horizontal de fotografías de estilo de vida.
 * Usa scroll-snap nativo (sin librería JS) para swipe fluido en móvil,
 * con controles discretos accesibles por teclado para desktop.
 */
export function LifestyleCarousel({ className = "" }: LifestyleCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className={`relative bg-[var(--black-deep)] px-6 py-24 sm:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
              El ritual
            </span>
            <h2
              className="mt-6 font-heading italic leading-[0.95] tracking-tight text-[var(--white-soft)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Vívelo en casa
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition hover:border-[var(--tiffany-border)] hover:text-[var(--tiffany)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition hover:border-[var(--tiffany-border)] hover:text-[var(--tiffany)]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="pur-lifestyle-track mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          tabIndex={0}
          role="region"
          aria-label="Carrusel de fotografías de estilo de vida"
        >
          {lifestyleSlides.map((slide) => (
            <figure
              key={slide.id}
              className="relative w-[78%] shrink-0 snap-start overflow-hidden border border-white/10 sm:w-[46%] lg:w-[30%]"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                width={640}
                height={800}
                className="h-[420px] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 font-body text-[11px] tracking-[0.08em] text-white/85">
                {slide.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .pur-lifestyle-track {
          scrollbar-width: none;
        }
        .pur-lifestyle-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
