import { useEffect, useState } from "react";

import { products } from "@/data/catalog";

/**
 * ⚠️ DEMOSTRACIÓN — datos simulados, no reflejan pedidos reales.
 * Cuando exista backend de pedidos, reemplazar `DEMO_CITIES` y el índice
 * rotativo por un stream real de compras (websocket/polling a la API de
 * órdenes) y quitar la etiqueta "Demo".
 *
 * Intervalos (EDITABLE): el primer aviso aparece a los 90 s y después
 * alterna 60 s / 90 s / 60 s… para no saturar la experiencia.
 */

/** EDITABLE — 25 ciudades de demostración. */
const DEMO_CITIES = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Querétaro",
  "Mérida",
  "Tijuana",
  "León",
  "Cancún",
  "Toluca",
  "Chihuahua",
  "Aguascalientes",
  "San Luis Potosí",
  "Mexicali",
  "Hermosillo",
  "Saltillo",
  "Morelia",
  "Veracruz",
  "Oaxaca",
  "Tuxtla Gutiérrez",
  "Culiacán",
  "Torreón",
  "Acapulco",
  "Tampico",
  "Villahermosa",
];

/** EDITABLE — secuencia de esperas en segundos: 90 / 60 / 90 / 60… */
const INTERVALS_S = [90, 60];
/** EDITABLE — cuánto permanece visible cada aviso. */
const VISIBLE_MS = 6000;

export function SocialProofDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || products.length === 0) return;

    let step = 0;
    let showTimer = 0;
    let hideTimer = 0;

    const schedule = () => {
      const waitS = INTERVALS_S[step % INTERVALS_S.length] ?? 90;
      showTimer = window.setTimeout(() => {
        setIndex((i) => i + 1);
        setVisible(true);
        hideTimer = window.setTimeout(() => {
          setVisible(false);
          step += 1;
          schedule();
        }, VISIBLE_MS);
      }, waitS * 1000);
    };

    schedule();

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (products.length === 0) return null;

  const product = products[index % products.length];
  const city = DEMO_CITIES[index % DEMO_CITIES.length];
  if (!product) return null;
  const name = product.displayName.join(" ");

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-4 z-[70] hidden max-w-[280px] sm:bottom-40 sm:block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 rounded-xl border border-[var(--tiffany-border)] bg-[var(--black-deep)]/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
        <span className="rounded-full border border-[var(--tiffany-border)] px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--tiffany)]">
          Demo
        </span>
        <p className="font-body text-xs text-[var(--white-soft)]">
          Alguien en {city} eligió <span className="text-[var(--tiffany)]">{name}</span>
        </p>
      </div>
    </div>
  );
}
