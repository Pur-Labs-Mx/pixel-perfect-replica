/**
 * Señales de intención de compra dentro de una landing.
 *
 * El popup de salida SOLO puede aparecer si el visitante lleva al menos
 * 30 s en la landing Y ha mostrado alguna de estas señales:
 *   A) eligió/cambió plan o cantidad
 *   B) abrió una pregunta del FAQ
 *   C) escribió al menos un carácter en un formulario
 *
 * Los componentes llaman a `markIntent()`; el popup consulta `hasIntent()`.
 * El estado es por pestaña (memoria), se reinicia al recargar.
 */

export type IntentSignal = "plan" | "qty" | "faq" | "form";

let intent: IntentSignal | null = null;
const listeners = new Set<() => void>();

export function markIntent(signal: IntentSignal) {
  if (intent) return;
  intent = signal;
  listeners.forEach((fn) => fn());
}

export function hasIntent() {
  return intent !== null;
}

export function onIntent(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetIntent() {
  intent = null;
}
