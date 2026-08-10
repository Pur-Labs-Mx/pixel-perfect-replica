/**
 * Coordinador de popups "pasivos" (los que se disparan solos: salida y
 * newsletter). Garantiza que:
 *  - nunca se muestren dos a la vez,
 *  - cada uno aparece como máximo una vez por sesión.
 *
 * Los popups de upsell/downsell del flujo de compra son "accionados" por el
 * usuario (clic en Comprar ahora) y quedan fuera de este control: son la
 * excepción explícita mencionada en el brief.
 */

export type PassivePopupId = "exit" | "newsletter";

const SESSION_SHOWN_PREFIX = "purlabs.popup.shown.";
let activeSlot: PassivePopupId | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function hasShown(id: PassivePopupId) {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(SESSION_SHOWN_PREFIX + id) === "1";
  } catch {
    return false;
  }
}

function markShown(id: PassivePopupId) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_SHOWN_PREFIX + id, "1");
  } catch {
    /* almacenamiento no disponible: continuamos sin persistir */
  }
}

/** Intenta reservar el turno para mostrar un popup pasivo. */
export function claimPassiveSlot(id: PassivePopupId): boolean {
  if (typeof window === "undefined") return false;
  if (hasShown(id)) return false;
  if (activeSlot !== null) return false;
  activeSlot = id;
  markShown(id);
  notify();
  return true;
}

/** Libera el turno cuando el popup se cierra, para no bloquear el resto de la sesión. */
export function releasePassiveSlot(id: PassivePopupId) {
  if (activeSlot === id) {
    activeSlot = null;
    notify();
  }
}

export function isPassiveSlotTaken() {
  return activeSlot !== null;
}
