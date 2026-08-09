import { useEffect, useRef, useState } from "react";

/**
 * Botón flotante de audio ambiental.
 * Empieza en mute. Solo intenta reproducir tras la primera interacción
 * del usuario (respeta políticas de autoplay). Fade-in de ~2s hasta un
 * volumen máximo de 0.35. Si el archivo no existe o falla, el botón se
 * oculta silenciosamente.
 */

const MAX_VOLUME = 0.35;
const FADE_MS = 2000;

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const interactedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio("/media/ambient-loop.mp3");
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    const onError = () => setFailed(true);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const markInteracted = () => {
      interactedRef.current = true;
    };

    window.addEventListener("pointerdown", markInteracted, { once: true });
    window.addEventListener("keydown", markInteracted, { once: true });

    return () => {
      window.removeEventListener("pointerdown", markInteracted);
      window.removeEventListener("keydown", markInteracted);
    };
  }, []);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio || typeof window === "undefined") return;
    if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);

    const steps = 20;
    const stepMs = FADE_MS / steps;
    let step = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = Math.min(MAX_VOLUME, (MAX_VOLUME * step) / steps);
      if (step >= steps && fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepMs);
  };

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio
        .play()
        .then(() => {
          setMuted(false);
          fadeIn();
        })
        .catch(() => setFailed(true));
    } else {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      audio.pause();
      audio.volume = 0;
      setMuted(true);
    }
  };

  if (failed || !ready) return null;

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={muted ? "Activar audio ambiental" : "Silenciar audio ambiental"}
      aria-pressed={!muted}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-[75] flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[var(--tiffany-border)] bg-[var(--black-deep)]/90 text-[var(--white-soft)] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)] backdrop-blur transition-colors duration-300 hover:border-[var(--tiffany)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)] sm:bottom-8"
    >
      <span aria-hidden="true" className="text-base">
        {muted ? "🔇" : "🔊"}
      </span>
    </button>
  );
}
