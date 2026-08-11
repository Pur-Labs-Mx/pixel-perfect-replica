import { useEffect } from "react";

import { TAWK_PROPERTY_ID, TAWK_WIDGET_ID } from "@/lib/site";

/**
 * Chat en vivo (Tawk.to) — esquina inferior DERECHA.
 * No se inyecta absolutamente nada si falta cualquiera de los dos IDs:
 * así nunca se muestra un widget roto o vacío. Para activarlo, configura
 * TAWK_PROPERTY_ID y TAWK_WIDGET_ID en src/lib/site.ts con los IDs reales
 * del panel de Tawk.to (Administration → Chat Widget).
 */
export function LiveChat() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) return;
    if (typeof document === "undefined") return;
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
