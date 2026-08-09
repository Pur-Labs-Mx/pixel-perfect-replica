import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingBag, X } from "lucide-react";

import logoWhite from "@/assets/pur-logo-white.png";
import logoBlack from "@/assets/pur-logo-black.png";
import { useCart } from "@/lib/cart";

type NavLink = { label: string; to?: string; href?: string };

const navLinks: NavLink[] = [
  { label: "Productos", href: "/#fragrances" },
  { label: "Suscripción", href: "/#suscripciones" },
  { label: "La marca", href: "/#promise" },
  { label: "FAQ", to: "/faq" },
  { label: "Contacto", to: "/contacto" },
];

const productLinks = [
  { label: "IMAGINA", to: "/imagina" },
  { label: "BACAROUGE", to: "/bacarouge" },
  { label: "PACIFIC CHILL", to: "/pacific-chill" },
];

const navLinkClass =
  "group relative font-body text-[11px] font-medium tracking-[0.24em] uppercase text-white/75 transition-colors hover:text-white";

const underlineClass =
  "pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 bg-[var(--tiffany)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100";

function NavItem({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  if (link.to) {
    return (
      <Link to={link.to} onClick={onClick} className={navLinkClass}>
        {link.label}
        <span aria-hidden="true" className={underlineClass} />
      </Link>
    );
  }
  return (
    <a href={link.href} onClick={onClick} className={navLinkClass}>
      {link.label}
      <span aria-hidden="true" className={underlineClass} />
    </a>
  );
}

function CartButton({ onClick }: { onClick?: () => void }) {
  const { count } = useCart();
  return (
    <Link
      to="/carrito"
      onClick={onClick}
      aria-label={`Abrir carrito (${count} artículos)`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition hover:text-white"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      <span
        aria-live="polite"
        className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--tiffany)] px-1 font-body text-[10px] font-bold text-[#050505] tabular-nums transition ${
          count > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fondo oscuro en cuanto hay scroll (o fuera del home) para que el logo
  // blanco nunca quede sobre una sección clara.
  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solid
            ? "border-b border-white/10 bg-[var(--black-deep)]/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        } ${isHome && !solid ? "md:top-[30px]" : ""}`}
      >
        <div className="mx-auto grid h-[64px] max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-10 md:h-[76px]">
          <Link to="/" className="flex min-w-0 items-center" aria-label="PŪR LABS — inicio">
            <img
              src={logoWhite}
              alt="PŪR LABS"
              width={340}
              height={80}
              className="h-[22px] w-auto sm:h-[28px] md:h-[32px]"
            />
          </Link>

          <nav className="hidden items-center justify-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/#suscripciones"
              className="rounded-full border-[1.5px] border-[var(--tiffany-border)] bg-[var(--buy-bg)] px-5 py-2.5 font-body text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--white-soft)] transition-colors hover:border-[var(--tiffany)]"
            >
              Comprar ahora
            </a>
            <CartButton />
          </div>

          <div className="flex items-center justify-end gap-1 md:hidden">
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
        <div className="fixed inset-0 z-[120] flex flex-col overflow-y-auto bg-[var(--black-deep)] px-6 pt-6 pb-10 md:hidden">
          <div className="flex items-center justify-between">
            <img src={logoWhite} alt="PŪR LABS" width={340} height={80} className="h-[22px] w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/85"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-3xl italic text-[var(--ivory)]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-3xl italic text-[var(--ivory)]"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="font-body text-[10px] tracking-[0.32em] uppercase text-white/45">Fragancias</p>
            <div className="mt-4 flex flex-col gap-4">
              {productLinks.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-[13px] tracking-[0.18em] uppercase text-white/75"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="/#suscripciones"
            onClick={() => setMenuOpen(false)}
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-[var(--tiffany-border)] bg-[var(--buy-bg)] px-6 font-body text-[12px] font-bold tracking-[0.18em] uppercase text-[var(--white-soft)]"
          >
            Comprar ahora
          </a>
        </div>
      )}
      {/* Espaciador visual sólo fuera del home lo aporta cada página */}
      <span aria-hidden="true" className="hidden" />
    </>
  );
}

/** Alto del header fijo, para el padding superior de páginas internas. */
export const HEADER_OFFSET_CLASS = "pt-[104px] md:pt-[128px]";
