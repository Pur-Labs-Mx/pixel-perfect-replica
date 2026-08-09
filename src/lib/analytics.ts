/**
 * Arquitectura de eventos de conversión.
 * Sin Pixel ID todavía: los eventos se registran en cola y se envían
 * a window.fbq / window.dataLayer si algún día existen.
 * Purchase NO debe dispararse hasta que exista una compra real.
 */
export type ConversionEvent = "AddToCart" | "InitiateCheckout" | "Purchase";

type Payload = Record<string, unknown>;

const queue: { event: ConversionEvent; payload: Payload; at: number }[] = [];

export function track(event: ConversionEvent, payload: Payload = {}) {
  queue.push({ event, payload, at: Date.now() });
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Payload[];
  };
  w.fbq?.("track", event, payload);
  w.dataLayer?.push({ event, ...payload });
  if (import.meta.env.DEV) console.info(`[analytics] ${event}`, payload);
}

export const getTrackedEvents = () => [...queue];
