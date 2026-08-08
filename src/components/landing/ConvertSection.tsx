import purLogoWhite from "@/assets/pur-logo-white.png";

export function ConvertSection() {
  return (
    <section
      id="convert"
      className="relative overflow-hidden bg-[var(--black-deep)] text-[var(--white-soft)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 75% 30%, rgba(129,216,208,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 15% 80%, rgba(129,216,208,0.08), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "repeating-linear-gradient(115deg, transparent 0 40px, rgba(255,255,255,0.4) 40px 41px, transparent 41px 90px)",
            mixBlendMode: "screen",
          }}
        />
        <img
          src={purLogoWhite}
          alt=""
          aria-hidden="true"
          className="absolute right-[-4vw] bottom-[-4vw] h-[46vh] w-auto opacity-[0.04]"
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1400px] flex-col items-start justify-center px-6 py-28 sm:px-10 md:py-36">
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--gray-muted)]">
            PŪR LABS / Fragrance Soap
          </span>
        </div>
        <h2
          className="mt-8 max-w-4xl font-heading italic leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--display-lg)" } as React.CSSProperties}
        >
          Tu perfume habla
          <br />
          antes que tú.
        </h2>
        <div
          className="mt-8 max-w-xl space-y-3 font-body leading-relaxed text-[var(--white-soft)]/75"
          style={{ fontSize: "var(--body-desktop)" } as React.CSSProperties}
        >
          <p>Ahora también puede formar parte de tu ritual de baño.</p>
          <p>Elige la presencia que quieres dejar.</p>
        </div>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            className="cta-shine group relative inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] disabled:opacity-60 disabled:pointer-events-none bg-[var(--tiffany)] text-[#050505] hover:-translate-y-[2px] hover:bg-[var(--tiffany-hover)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 active:bg-[var(--tiffany-active)]"
            href="#suscripciones"
          >
            <span>Encontrar mi fragancia</span>
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              ↗
            </span>
          </a>
          <a
            href="#suscripciones"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/45 px-8 font-body text-[13px] font-bold tracking-[0.18em] uppercase text-[var(--white-soft)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Ver la colección
          </a>
        </div>
        <p className="mt-14 font-body text-[10px] tracking-[0.32em] uppercase text-[var(--gray-muted)]">
          Tres perfiles olfativos · Piezas translúcidas perfumadas
        </p>
      </div>
    </section>
  );
}
