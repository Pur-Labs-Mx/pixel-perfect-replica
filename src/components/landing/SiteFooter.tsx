import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import purLogoWhite from "@/assets/pur-logo-white.png";
import { tiktokUrl, instagramUrl } from "@/lib/site";

/** Ícono monocromo de Instagram (trazo, coherente con el resto de iconografía). */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Ícono monocromo de TikTok (nota musical estilizada), mismo grosor de trazo. */
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4c.6 2.3 2.2 3.7 4.5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialLinks() {
  if (!tiktokUrl && !instagramUrl) return null;
  return (
    <div className="mt-6 flex items-center gap-3">
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="PŪR LABS en Instagram"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-white/40 hover:text-white"
        >
          <InstagramIcon />
        </a>
      )}
      {tiktokUrl && (
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="PŪR LABS en TikTok"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-white/40 hover:text-white"
        >
          <TikTokIcon />
        </a>
      )}
    </div>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-20 text-[var(--white-soft)] sm:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-5vw] flex justify-center"
      >
        <span
          className="font-heading italic leading-none text-white/[0.045]"
          style={{ fontSize: "clamp(6rem, 24vw, 24rem)", letterSpacing: "-0.02em" }}
        >
          PŪR LABS
        </span>
      </div>
      <div className="relative mx-auto grid max-w-[1400px] gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
        <div>
          <img src={purLogoWhite} alt="PŪR LABS" width={340} height={140} className="h-10 w-auto sm:h-14" />
          <h3
            className="mt-8 font-heading italic leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
          >
            Entra al universo
            <br />
            PŪR LABS.
          </h3>
          <p className="mt-4 max-w-sm font-body text-[15px] leading-relaxed text-[var(--gray-muted)]">
            Recibe nuevos lanzamientos, historias olfativas y acceso anticipado.
          </p>
          <form
            noValidate
            className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/25 sm:p-1 sm:pl-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@correo.com"
              className="min-h-[48px] flex-1 rounded-full border border-white/25 bg-transparent px-4 font-body text-sm text-[var(--white-soft)] placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--tiffany-active)] sm:border-0 sm:px-0 sm:focus:ring-0"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="cta-shine group relative inline-flex items-center justify-center gap-3 rounded-full sm:px-8 min-h-[52px] font-body font-bold uppercase whitespace-nowrap text-[12px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[background-color,transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tiffany-active)] disabled:opacity-60 disabled:pointer-events-none bg-[var(--tiffany)] text-[#050505] hover:-translate-y-[2px] hover:bg-[var(--tiffany-hover)] hover:shadow-[0_14px_30px_-14px_var(--tiffany-glow)] active:translate-y-0 active:bg-[var(--tiffany-active)] px-6"
            >
              <span>Unirme</span>
            </button>
          </form>
          <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] font-body text-[13px] text-[var(--tiffany)]" />
          <SocialLinks />
        </div>
        <div>
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-[var(--gray-muted)]">Colección</p>
          <ul className="mt-6 space-y-3 font-body text-[15px] text-[var(--white-soft)]/85">
            <li>
              <Link to="/imagina" className="inline-block min-h-[44px] py-1 hover:text-white">
                IMAGINA
              </Link>
            </li>
            <li>
              <Link to="/bacarouge" className="inline-block min-h-[44px] py-1 hover:text-white">
                BACAROUGE
              </Link>
            </li>
            <li>
              <Link to="/pacific-chill" className="inline-block min-h-[44px] py-1 hover:text-white">
                PACIFIC CHILL
              </Link>
            </li>
            <li>
              <a href="/#suscripciones" className="inline-block min-h-[44px] py-1 hover:text-white">
                Comprar
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-[var(--gray-muted)]">Ayuda</p>
          <ul className="mt-6 space-y-3 font-body text-[15px] text-[var(--white-soft)]/85">
            <li>
              <Link to="/faq" className="inline-block min-h-[44px] py-1 hover:text-white">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link to="/rastrea-tu-pedido" className="inline-block min-h-[44px] py-1 hover:text-white">
                Rastrea tu Pedido
              </Link>
            </li>
            <li>
              <Link to="/envios" className="inline-block min-h-[44px] py-1 hover:text-white">
                Política de Envío
              </Link>
            </li>
            <li>
              <Link to="/devoluciones" className="inline-block min-h-[44px] py-1 hover:text-white">
                Política de Devolución
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="inline-block min-h-[44px] py-1 hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <div className="flex items-center gap-2 font-body text-[11px] tracking-[0.06em] text-[var(--white-soft)]/70 justify-start py-1">
                <Truck size={13} aria-hidden="true" style={{ color: "rgba(255,255,255,0.55)" }} />
                <span className="whitespace-nowrap">Envío a todo México</span>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-[10px] tracking-[0.32em] uppercase text-[var(--gray-muted)]">Casa</p>
          <ul className="mt-6 space-y-3 font-body text-[15px] text-[var(--white-soft)]/85">
            <li>
              <a href="/#promise" className="inline-block min-h-[44px] py-1 hover:text-white">
                La marca
              </a>
            </li>
            <li>
              <a href="/#suscripciones" className="inline-block min-h-[44px] py-1 hover:text-white">
                Encontrar mi fragancia
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 font-body text-[10px] tracking-[0.28em] uppercase text-white/70">
            <span aria-hidden="true">🔒</span>
            <span>Pago seguro · SSL</span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-body text-[10px] tracking-[0.28em] uppercase text-white/55">Pago</span>
              <span className="inline-flex items-center rounded-md border px-2 py-[3px] font-body text-[10px] font-semibold tracking-[0.1em] uppercase border-white/20 text-white/80 bg-white/[0.03]">
                OXXO
              </span>
              <span className="inline-flex items-center rounded-md border px-2 py-[3px] font-body text-[10px] font-semibold tracking-[0.1em] uppercase border-white/20 text-white/80 bg-white/[0.03]">
                PayPal
              </span>
              <span className="inline-flex items-center rounded-md border px-2 py-[3px] font-body text-[10px] font-semibold tracking-[0.1em] uppercase border-white/20 text-white/80 bg-white/[0.03]">
                Mercado Pago
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-16 max-w-[1400px] border-t border-white/10 pt-8">
        <p className="font-body text-[12px] leading-relaxed text-white/55">
          Las marcas y fragancias mencionadas se utilizan exclusivamente como referencias olfativas. PŪR LABS es una
          marca independiente y no mantiene afiliación, patrocinio ni relación comercial con las marcas mencionadas.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-body text-[10px] tracking-[0.28em] uppercase text-[var(--gray-muted)]">
          <span>© 2026 PŪR LABS · México</span>
          <span>
            <Link to="/devoluciones" className="hover:text-white">
              Privacidad
            </Link>
            <span className="mx-3 text-white/25">·</span>
            <Link to="/envios" className="hover:text-white">
              Términos
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
