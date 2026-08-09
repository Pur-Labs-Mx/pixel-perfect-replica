import { useEffect, useRef, useState } from "react";

/**
 * Popup premium de captura de email.
 * Se activa a los ~15s o al 50% de scroll (lo que ocurra primero).
 * Máximo una vez por sesión y nunca vuelve a aparecer si el usuario
 * ya se suscribió o cerró el popup (persistido en localStorage).
 */

const SESSION_POPUP_KEY = "purlabs.popup.shown";
const LOCAL_DISMISS_KEY = "purlabs.newsletter.dismissed";
const LOCAL_SUBSCRIBED_KEY = "purlabs.newsletter.subscribed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const triggeredRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyDismissed = localStorage.getItem(LOCAL_DISMISS_KEY) === "1";
    const alreadySubscribed = localStorage.getItem(LOCAL_SUBSCRIBED_KEY) === "1";
    const shownThisSession = sessionStorage.getItem(SESSION_POPUP_KEY) === "1";

    if (alreadyDismissed || alreadySubscribed || shownThisSession) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      sessionStorage.setItem(SESSION_POPUP_KEY, "1");
      setOpen(true);
    };

    const timer = window.setTimeout(trigger, 15000);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max > 0 && scrolled / max >= 0.5) {
        trigger();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_DISMISS_KEY, "1");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_SUBSCRIBED_KEY, "1");
    }
    setSubmitted(true);
    window.setTimeout(() => setOpen(false), 2200);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="presentation"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-[var(--tiffany-border)] bg-[var(--black-deep)] p-7 sm:p-9 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[var(--gray-muted)] transition-colors hover:text-[var(--tiffany)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)]"
        >
          <span aria-hidden="true" className="text-xl">
            ×
          </span>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="font-heading italic text-2xl text-[var(--tiffany)]">Gracias.</p>
            <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
              Tu ritual comienza pronto. Revisa tu correo.
            </p>
          </div>
        ) : (
          <>
            <h2 id="newsletter-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
              Un ritual, antes que nadie.
            </h2>
            <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
              Suscríbete y recibe acceso anticipado y beneficios exclusivos de PŪR LABS.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="min-h-[48px] w-full rounded-full border border-[var(--tiffany-border)] bg-transparent px-5 font-body text-sm text-[var(--white-soft)] placeholder:text-[var(--gray-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)]"
              />
              <button
                type="submit"
                className="min-h-[48px] w-full rounded-full border-[1.5px] border-[var(--tiffany-border)] bg-[var(--buy-bg)] font-body text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--white-soft)] transition-colors hover:border-[var(--tiffany)]"
              >
                Quiero mi acceso
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
