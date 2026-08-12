import { useCallback, useEffect, useRef, useState } from "react";

import { BuyButton } from "@/components/ui/BuyButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

import heroPoster from "@/assets/hero-model.webp";
import { products } from "@/data/catalog";

const hero = products[0]!;

/** Volumen máximo del video del hero cuando el usuario activa el sonido. */
const HERO_VOLUME = 0.35;

/**
 * Sólo se omite el video en conexiones explícitamente limitadas
 * (ahorro de datos o 2G/3G). El movimiento reducido no lo desactiva:
 * el hero es el elemento principal de la página y el video es su contenido.
 */
function shouldSkipVideo(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const connection = nav.connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /(^|\b)(slow-2g|2g|3g)\b/.test(connection.effectiveType)) return true;
  return false;
}

export function Hero() {
  /** true sólo cuando el video está realmente reproduciéndose (evento `playing`). */
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // El video se monta en el primer frame tras la hidratación (el hero es
  // visible de inmediato), salvo en conexiones limitadas.
  useEffect(() => {
    if (shouldSkipVideo()) return;
    setVideoAllowed(true);
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay bloqueado: se reintenta en el primer gesto del usuario.
      });
    }
  }, []);

  useEffect(() => {
    if (!videoAllowed) return;
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setVideoPlaying(true);
    const onPause = () => setVideoPlaying(false);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("canplay", tryPlay);

    video.load();
    tryPlay();

    // Reintento en el primer gesto del usuario y al volver a la pestaña.
    const onGesture = () => tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoAllowed, tryPlay]);

  /**
   * El sonido sólo puede activarse con un gesto explícito del usuario
   * (política de autoplay de los navegadores).
   */
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }
    video.muted = false;
    video.volume = HERO_VOLUME;
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.then(() => setSoundOn(true)).catch(() => {
        video.muted = true;
        setSoundOn(false);
      });
    } else {
      setSoundOn(true);
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--black)] text-[var(--warm-white)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
          <img
            src={heroPoster}
            alt=""
            width={1448}
            height={1086}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {videoAllowed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                videoPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/media/hero-video-desktop.webm" type="video/webm" />
              <source src="/media/hero-video-desktop.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 px-6 pt-32 sm:px-10 md:pt-36">
        <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--gray-muted)]">
          PŪR LABS / FRAGRANCE SOAP
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10">
        <div className="max-w-3xl">
          <h1
            className="font-heading italic leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 8.5rem)" }}
          >
            El perfume también puede tocarse.
          </h1>

          <p className="mt-8 max-w-md font-body text-[15px] leading-relaxed text-[var(--ivory)]/80">
            Piezas translúcidas perfumadas, inspiradas en grandes composiciones olfativas y
            diseñadas para transformar un gesto cotidiano en una experiencia sensorial.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular-nums">
                <span className="font-body text-2xl font-semibold tracking-tight whitespace-nowrap text-white md:text-3xl">
                  ${hero.price} MXN
                </span>
                <span className="text-sm whitespace-nowrap text-white/45 line-through">
                  ${hero.compareAtPrice} MXN
                </span>
                <span
                  className="inline-flex items-center rounded-full border bg-transparent px-2 py-1 font-body text-[11px] font-bold tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
                >
                  −{hero.discountPercent}%
                </span>
              </div>
              <span className="font-body text-[10px] font-medium tracking-[0.24em] uppercase whitespace-nowrap text-white/60">
                Promoción de apertura
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <BuyButton to={`/${hero.slug}`} aria-label={`Comprar ${hero.name}`}>
                Comprar ahora
              </BuyButton>

              <SecondaryButton href="#fragrances" aria-label="Ver la colección">
                Ver la colección
              </SecondaryButton>

              <a
                href="/faq"
                className="font-body text-[11px] tracking-[0.28em] uppercase text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                Preguntas frecuentes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Control discreto de sonido del video (sólo si el video se reproduce). */}
      {videoPlaying && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Silenciar el video" : "Activar el sonido del video"}
          className="absolute right-6 bottom-16 z-20 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-3 py-2 font-body text-[10px] tracking-[0.24em] uppercase text-white/80 backdrop-blur transition-colors duration-300 hover:border-[var(--tiffany)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)] sm:right-10"
        >
          <span aria-hidden="true">{soundOn ? "🔊" : "🔇"}</span>
          <span className="hidden sm:inline">{soundOn ? "Sonido" : "Activar sonido"}</span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between font-body text-[10px] tracking-[0.32em] uppercase text-[var(--smoke)] sm:inset-x-10">
        <span>Desliza para descubrir</span>
        <span className="hidden sm:inline">Jabón perfumado de autor</span>
      </div>
    </section>
  );
}
