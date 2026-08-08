import { marqueeItems } from "@/data/catalog";

/** Aviso comercial superior con marquee infinito (30px de alto, fijo). */
export function AnnouncementBar() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[80] h-[30px] overflow-hidden border-b border-white/10 bg-[var(--black-deep)] text-white/90"
      role="region"
      aria-label="Aviso comercial"
    >
      <div
        className="flex h-full whitespace-nowrap font-body text-[10px] font-medium tracking-[0.28em] uppercase"
        style={{ animation: "pur-marquee 42s linear infinite", willChange: "transform" }}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 1 ? true : undefined}
          >
            {[0, 1, 2].map((repeat) => (
              <span key={repeat} className="inline-flex items-center">
                {marqueeItems.map((item) => (
                  <span key={item} className="mx-6 inline-flex items-center gap-6">
                    <span>{item}</span>
                    <span aria-hidden="true" style={{ color: "var(--tiffany)" }}>
                      ✦
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Barra de progreso de scroll (scroll-driven animation nativa). */
export function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress-native" />;
}

/** Textura de grano sobre toda la página. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        opacity: 0.036,
        mixBlendMode: "soft-light",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
