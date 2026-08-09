import { useEffect, useState } from "react";

import logoWhite from "@/assets/pur-logo-white.png";

/**
 * Pantalla de carga de marca: logo, "Preparando el ritual" y línea animada.
 * Rápida (≈1.1 s) y con salida suave.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("purlabs.intro") === "1") {
      setPhase("gone");
      return;
    }
    const leave = window.setTimeout(() => setPhase("leaving"), 1100);
    const done = window.setTimeout(() => {
      setPhase("gone");
      window.sessionStorage.setItem("purlabs.intro", "1");
    }, 1800);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden={phase === "leaving"}
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--black-deep)] px-6 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logoWhite}
        alt="PŪR LABS"
        width={320}
        height={80}
        className="h-8 w-auto opacity-0 sm:h-10 intro-logo"
      />
      <p className="mt-6 font-body text-[10px] tracking-[0.36em] uppercase text-white/55">
        Preparando el ritual
      </p>
      <div className="mt-6 h-px w-[180px] overflow-hidden bg-white/15 sm:w-[240px]">
        <span className="intro-bar block h-full w-full bg-[var(--tiffany)]" />
      </div>
    </div>
  );
}
