import { useEffect, useState } from "react";

import { products } from "@/data/catalog";

/**
 * ⚠️ DEMOSTRACIÓN — datos simulados, no reflejan pedidos reales.
 * Cuando exista backend de pedidos, reemplazar `FAKE_CITIES` y el índice
 * rotativo por un stream real de compras (websocket/polling a la API de
 * órdenes) y quitar la etiqueta "Demo".
 */

const FAKE_CITIES = ["Monterrey", "Guadalajara", "CDMX", "Puebla", "Querétaro"];

const realProducts = products.filter((p) => !p.placeholder);

const ROTATE_MS = 12000;

export function SocialProofDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || realProducts.length === 0) return;

    const showTimer = window.setTimeout(() => setVisible(true), 4000);

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % realProducts.length);
        setVisible(true);
      }, 400);
    }, ROTATE_MS);

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(interval);
    };
  }, []);

  if (realProducts.length === 0) return null;

  const product = realProducts[index % realProducts.length];
  const city = FAKE_CITIES[index % FAKE_CITIES.length];
  const name = product.displayName.join(" ");

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-[70] hidden max-w-[280px] sm:block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
