import { useEffect, useState } from "react";

import { PopupShell } from "@/components/conversion/PopupShell";
import { claimPassiveSlot, releasePassiveSlot } from "@/components/conversion/popupCoordinator";
import { trackEvent } from "@/lib/tracking";
import { NEWSLETTER_OFFER } from "@/lib/site";

/** Popup de captura de email: 15s o 50% de scroll, lo que ocurra primero. Máximo una vez por sesión. */
const LOCAL_DISMISS_KEY = "purlabs.newsletter.dismissed";
const LOCAL_SUBSCRIBED_KEY = "purlabs.newsletter.subscribed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyDismissed = localStorage.getItem(LOCAL_DISMISS_KEY) === "1";
    const alreadySubscribed = localStorage.getItem(LOCAL_SUBSCRIBED_KEY) === "1";
    if (alreadyDismissed || alreadySubscribed) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      if (!claimPassiveSlot("newsletter")) return;
      triggered = true;
      setOpen(true);
    };

    const timer = window.setTimeout(trigger, 15000);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max > 0 && doc.scrollTop / max >= 0.5) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    releasePassiveSlot("newsletter");
    try {
      localStorage.setItem(LOCAL_DISMISS_KEY, "1");
    } catch {
      /* almacenamiento no disponible */
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      localStorage.setItem(LOCAL_SUBSCRIBED_KEY, "1");
    } catch {
      /* almacenamiento no disponible */
    }
    trackEvent("Lead", { content_name: "newsletter_signup" });
    setSubmitted(true);
    window.setTimeout(() => {
      setOpen(false);
      releasePassiveSlot("newsletter");
    }, 2200);
  };

  return (
    <PopupShell open={open} onClose={handleClose} labelledBy="newsletter-popup-title">
      {submitted ? (
        <div className="py-6 text-center">
          <p className="font-heading italic text-2xl text-[var(--tiffany)]">Gracias.</p>
          <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
            Tu ritual comienza pronto. Revisa tu correo — código: {NEWSLETTER_OFFER.code}.
          </p>
        </div>
      ) : (
        <>
          <h2 id="newsletter-popup-title" className="font-heading italic text-2xl sm:text-3xl text-[var(--ivory)]">
            Un ritual, antes que nadie.
          </h2>
          <p className="mt-3 font-body text-sm text-[var(--gray-muted)]">
            Suscríbete y recibe {NEWSLETTER_OFFER.label.toLowerCase()} y acceso anticipado a PŪR LABS.
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
    </PopupShell>
  );
}
