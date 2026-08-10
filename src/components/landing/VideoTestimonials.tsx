import { useEffect, useRef, useState } from "react";
import { Play, Star, X } from "lucide-react";
import { videoTestimonials, type VideoTestimonial } from "@/data/testimonials";

type VideoTestimonialsProps = {
  /** Si se define, filtra a 2-3 testimonios de ese producto (variante ligera). */
  productSlug?: string;
  variant?: "grid" | "compact";
  className?: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3 w-3"
          strokeWidth={1.5}
          fill={i < rating ? "var(--tiffany)" : "transparent"}
          style={{ color: "var(--tiffany)" }}
        />
      ))}
    </div>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: VideoTestimonial;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonio de ${testimonial.name}`}
    >
      <div className="relative w-full max-w-[420px]">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition hover:border-[var(--tiffany-border)] hover:text-[var(--tiffany)]"
        >
          <X className="h-4 w-4" />
        </button>
        <video
          src={testimonial.videoSrc}
          poster={testimonial.thumbnail}
          controls
          autoPlay
          playsInline
          className="aspect-[9/16] w-full border border-white/10 bg-black"
        >
          Tu navegador no soporta video.
        </video>
        <p className="mt-3 font-body text-[11px] tracking-[0.08em] text-white/50">
          Demo ilustrativa · {testimonial.name} · {testimonial.city}
        </p>
      </div>
    </div>
  );
}

/**
 * Grid de testimonios en video estilo UGC.
 * Los videos NUNCA se autoreproducen ni se descargan al cargar la página:
 * solo se muestra una miniatura estática hasta que el usuario hace clic.
 *
 * ⚠️ Los datos provienen de src/data/testimonials.ts y son DEMO / EDITABLES,
 * no reseñas reales de clientes.
 */
export function VideoTestimonials({ productSlug, variant = "grid", className = "" }: VideoTestimonialsProps) {
  const [active, setActive] = useState<VideoTestimonial | null>(null);

  const source = productSlug
    ? videoTestimonials.filter((t) => t.productSlug === productSlug).slice(0, 3)
    : videoTestimonials;

  if (source.length === 0) return null;

  const isCompact = variant === "compact";

  return (
    <section className={`relative bg-[var(--black-deep)] px-6 py-24 sm:px-10 md:py-32 ${className}`}>
      <div className={`mx-auto ${isCompact ? "max-w-[900px]" : "max-w-[1200px]"}`}>
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-white/50">
            Voces · contenido demo
          </span>
          <h2
            className="mt-6 font-heading italic leading-[0.95] tracking-tight text-[var(--white-soft)]"
            style={{ fontSize: isCompact ? "clamp(1.75rem, 4vw, 2.75rem)" : "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Testimonios en video
          </h2>
          <p className="mt-4 max-w-xl font-body text-[13px] leading-relaxed text-white/50">
            Contenido de demostración, editable. No representan reseñas reales de clientes.
          </p>
        </div>

        <div
          className={`mt-12 grid gap-4 ${
            isCompact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {source.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t)}
              className="group relative aspect-[9/16] w-full overflow-hidden border border-white/10 text-left"
              aria-label={`Reproducir testimonio de ${t.name}, ${t.city}`}
            >
              <img
                src={t.thumbnail}
                alt={`Miniatura del testimonio en video de ${t.name}`}
                loading="lazy"
                decoding="async"
                width={360}
                height={640}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition group-hover:border-[var(--tiffany-border)] group-hover:text-[var(--tiffany)]">
                  <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 space-y-1 p-3">
                <Stars rating={t.rating} />
                <p className="font-body text-[12px] font-medium text-white">{t.name}</p>
                <p className="font-body text-[10px] tracking-[0.06em] text-white/60">{t.city}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <TestimonialModal testimonial={active} onClose={() => setActive(null)} />}
    </section>
  );
}
