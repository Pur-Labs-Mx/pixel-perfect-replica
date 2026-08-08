import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";

import logoWhite from "@/assets/pur-logo-white.png";

const navLinks = [
  { label: "Imagina", href: "#imagina" },
  { label: "Bacarouge", href: "#bacarouge" },
  { label: "Pacific Chill", href: "#pacific-chill" },
  { label: "Suscripción", href: "#suscripciones" },
  { label: "Selector", href: "#suscripciones" },
];

const navLinkClass =
  "group relative font-body text-[11px] font-medium tracking-[0.24em] uppercase text-white/75 transition-colors hover:text-white";

const underlineClass =
  "pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 bg-[var(--tiffany)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100";

function CartButton() {
  return (
    <button
      type="button"
      aria-label="Abrir carrito (0 artículos)"
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition hover:text-white"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      <span
        aria-live="polite"
        className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--tiffany)] px-1 font-body text-[10px] font-bold text-black tabular-nums opacity-0 transition"
      >
        0
      </span>
    </button>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-[30px] z-[70] bg-transparent transition-all duration-700">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between px-6 sm:px-10 md:h-[76px]">
          <a href="#top" className="flex items-center" aria-label="PŪR LABS">
            <img
              src={logoWhite}
              alt="PŪR LABS"
              className="h-[26px] w-auto sm:h-[30px] md:h-[34px]"
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
                <span aria-hidden="true" className={underlineClass} />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#suscripciones"
              className="rounded-full bg-[var(--tiffany)] px-5 py-2.5 font-body text-[11px] font-bold tracking-[0.22em] uppercase text-[#050505] transition-colors hover:bg-[var(--tiffany-hover)]"
            >
              Comprar ahora
            </a>
            <CartButton />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
              aria-label="Abrir menú"
            >
              <span className="h-px w-7 bg-white" />
              <span className="h-px w-7 bg-white" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[var(--black-deep)] px-6 pt-8 md:hidden">
          <div className="flex items-center justify-between">
            <img src={logoWhite} alt="PŪR LABS" className="h-[26px] w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/85"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl italic text-[var(--ivory)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#suscripciones"
            onClick={() => setMenuOpen(false)}
            className="mt-auto mb-10 inline-flex items-center justify-center rounded-full bg-[var(--tiffany)] px-6 py-4 font-body text-[12px] font-bold tracking-[0.18em] uppercase text-[#050505]"
          >
            Comprar ahora
          </a>
        </div>
      )}
    </>
  );
}
