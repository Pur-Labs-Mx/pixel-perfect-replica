/**
 * Capa de compatibilidad de analítica.
 * Toda la lógica real vive en src/lib/tracking.ts (única fuente de verdad
 * para IDs de píxeles y envío de eventos). Este módulo se mantiene para no
 * romper los imports existentes (`track`, `getTrackedEvents`).
 */
import { trackEvent, getQueuedEvents, type ConversionEvent as TrackingEvent } from "@/lib/tracking";

export type ConversionEvent = TrackingEvent;

type Payload = Record<string, unknown>;

export function track(event: ConversionEvent, payload: Payload = {}) {
  trackEvent(event, payload);
}

export const getTrackedEvents = () => getQueuedEvents();
