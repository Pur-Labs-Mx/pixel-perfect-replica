/**
 * Configuración centralizada de tracking / píxeles.
 *
 * TODOS los IDs de tracking del sitio viven aquí y en ningún otro lugar.
 * Mientras un ID esté vacío, initTracking() no inyecta ningún script y
 * trackEvent() sólo encola el evento y hace console.debug en desarrollo.
 *
 * ⚠️ Purchase NUNCA debe dispararse fuera de src/routes/gracias.tsx, y
 * sólo cuando exista una compra real confirmada (ver CONFIRMED_REAL_PAYMENT
 * en ese archivo).
 */

/** PENDIENTE DE CONFIGURAR — Meta (Facebook) Pixel ID. */
export const metaPixelId = "";
/** PENDIENTE DE CONFIGURAR — TikTok Pixel ID. */
export const tiktokPixelId = "";
/** PENDIENTE DE CONFIGURAR — Google Analytics 4 Measurement ID. */
export const ga4MeasurementId = "";

export type ConversionEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead";

type Payload = Record<string, unknown>;

type QueuedEvent = { event: ConversionEvent; payload: Payload; at: number };

const queue: QueuedEvent[] = [];

let metaLoaded = false;
let tiktokLoaded = false;
let ga4Loaded = false;
let initialized = false;

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void };
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Payload[];
};

function getWindow(): TrackingWindow | null {
  if (typeof window === "undefined") return null;
  return window as unknown as TrackingWindow;
}

/**
 * Inyecta los scripts de terceros SOLO si el ID correspondiente está
 * configurado. No-op total si no hay ningún ID (comportamiento actual
 * por defecto). Debe llamarse una sola vez desde el cliente (p. ej. en un
 * efecto del layout raíz), nunca durante SSR.
 */
export function initTracking() {
  const w = getWindow();
  if (!w || initialized) return;
  initialized = true;

  if (metaPixelId) {
    // Carga diferida y estándar del Meta Pixel.
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.onload = () => {
      metaLoaded = true;
      w.fbq?.("init", metaPixelId);
      flushQueue();
    };
    document.head.appendChild(script);
  }

  if (tiktokPixelId) {
    // Carga diferida del TikTok Pixel (estructura estándar del snippet oficial).
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${tiktokPixelId}`;
    script.onload = () => {
      tiktokLoaded = true;
      flushQueue();
    };
    document.head.appendChild(script);
  }

  if (ga4MeasurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
    script.onload = () => {
      ga4Loaded = true;
      w.dataLayer = w.dataLayer || [];
      w.gtag =
        w.gtag ||
        function gtag(...args: unknown[]) {
          w.dataLayer?.push(args as unknown as Payload);
        };
      w.gtag("js", new Date());
      w.gtag("config", ga4MeasurementId);
      flushQueue();
    };
    document.head.appendChild(script);
  }

  if (!metaPixelId && !tiktokPixelId && !ga4MeasurementId && import.meta.env.DEV) {
    console.debug("[tracking] initTracking(): sin IDs configurados, no-op.");
  }
}

function sendToProviders(event: ConversionEvent, payload: Payload) {
  const w = getWindow();
  if (!w) return false;
  let sentSomewhere = false;

  if (metaPixelId && metaLoaded && w.fbq) {
    w.fbq("track", event, payload);
    sentSomewhere = true;
  }
  if (tiktokPixelId && tiktokLoaded && w.ttq) {
    w.ttq.track(event, payload);
    sentSomewhere = true;
  }
  if (ga4MeasurementId && ga4Loaded && w.gtag) {
    w.gtag("event", event, payload);
    sentSomewhere = true;
  }

  return sentSomewhere;
}

function flushQueue() {
  while (queue.length) {
    const item = queue[0];
    if (!item) break;
    const sent = sendToProviders(item.event, item.payload);
    if (!sent) break;
    queue.shift();
  }
}

/**
 * Registra un evento de conversión. Si hay IDs configurados y los scripts
 * ya cargaron, se envía de inmediato a cada proveedor disponible. Si no,
 * se encola (y se reintenta cuando initTracking() termine de cargar) y en
 * desarrollo se deja constancia por consola con console.debug.
 */
export function trackEvent(event: ConversionEvent, payload: Payload = {}) {
  queue.push({ event, payload, at: Date.now() });

  const sent = sendToProviders(event, payload);

  if (!sent && import.meta.env.DEV) {
    console.debug(`[tracking] "${event}" encolado (sin proveedor activo aún)`, payload);
  }
}

export const getQueuedEvents = () => [...queue];
