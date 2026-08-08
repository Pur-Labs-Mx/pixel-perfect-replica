import purLogoWhite from "@/assets/pur-logo-white.png";

export function PromiseSection() {
  return (
    <section
      id="promise"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-[var(--black-deep)] py-40 text-[var(--white-soft)] md:min-h-[95svh] md:py-56"
    >
      <img
        src={purLogoWhite}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[42vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.035] md:block"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center sm:px-10">
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--gray-muted)]">
            PŪR LABS / THE FRAGRANCE RITUAL
          </span>
        </div>
        <h2
          className="mt-14 font-heading italic tracking-tight leading-[0.95]"
          style={{ fontSize: "var(--display-lg)" } as React.CSSProperties}
        >
          El perfume también puede tocarse.
        </h2>
        <p
          className="mt-14 max-w-[55ch] font-body leading-relaxed text-white/75"
          style={{ fontSize: "var(--body-desktop)" } as React.CSSProperties}
        >
          Cada pieza PŪR LABS convierte una interpretación olfativa en parte del cuerpo, el agua y la memoria.
        </p>
        <p
          className="mt-6 max-w-[55ch] font-body leading-relaxed text-white/75"
          style={{ fontSize: "var(--body-desktop)" } as React.CSSProperties}
        >
          No eliges solamente un aroma. Eliges la presencia que quieres dejar.
        </p>
        <p className="mt-28 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-[11px] tracking-[0.4em] uppercase text-[var(--gray-muted)] sm:text-[12px] md:mt-36">
          <span className="inline-flex items-center gap-5">
            <span>Fragancia</span>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          </span>
          <span className="inline-flex items-center gap-5">
            <span>Piel</span>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          </span>
          <span className="inline-flex items-center gap-5">
            <span>Agua</span>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          </span>
          <span className="inline-flex items-center gap-5">
            <span>Memoria</span>
          </span>
        </p>
      </div>
    </section>
  );
}
