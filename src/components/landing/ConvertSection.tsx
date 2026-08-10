import { BuyButton } from "@/components/ui/BuyButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
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
          <BuyButton href="#suscripciones">Encontrar mi fragancia</BuyButton>
          <SecondaryButton href="#fragrances" aria-label="Ver la colección">
            Ver la colección
          </SecondaryButton>
        </div>
        <p className="mt-14 font-body text-[10px] tracking-[0.32em] uppercase text-[var(--gray-muted)]">
          Tres perfiles olfativos · Piezas translúcidas perfumadas
        </p>
      </div>
    </section>
  );
}
