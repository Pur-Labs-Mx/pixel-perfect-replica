/**
 * Configuración central del sitio y del motor de conversión comercial.
 * Todo lo "editable" (códigos, URLs, IDs de widgets) vive aquí para que
 * cambiarlo sea cuestión de tocar un solo archivo. Nada de esto está
 * conectado a un procesador de pagos real todavía.
 */
export const SITE_URL = "https://structure-star-twin.lovable.app";
export const SITE_NAME = "PŪR LABS";
export const SITE_TAGLINE = "Jabón perfumado de autor";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const pageMeta = ({
  title,
  description,
  path = "/",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  type?: string;
}) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: absoluteUrl(path) },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: [{ rel: "canonical", href: absoluteUrl(path) }],
});

/**
 * ───────────────────────────────────────────────────────────────────────
 * Códigos de descuento por popup — EDITABLE.
 * Son códigos neutros de marcador de posición: NO están conectados a
 * ningún descuento real en el flujo de pago. Reemplázalos por los códigos
 * oficiales cuando existan, manteniendo el mismo formato de objeto.
 * ───────────────────────────────────────────────────────────────────────
 */
export const EXIT_OFFER = {
  enabled: true,
  /** EDITABLE: código mostrado en el popup de salida. */
  code: "BIENVENIDA10",
  label: "Descuento de bienvenida",
};

export const NEWSLETTER_OFFER = {
  enabled: true,
  /** EDITABLE: código mostrado tras suscribirse al newsletter. */
  code: "RITUAL10",
  label: "Regalo por suscribirte",
};

export const UPSELL_OFFER = {
  enabled: true,
  /** EDITABLE: mensaje del beneficio al subir de plan. */
  label: "Envío incluido al subir de plan",
};

export const DOWNSELL_OFFER = {
  enabled: true,
  /** EDITABLE: código de descuento ofrecido si el usuario rechaza el upsell. */
  code: "AHORA5",
  label: "Descuento por quedarte con tu elección",
  percentOff: 5,
};

/**
 * ───────────────────────────────────────────────────────────────────────
 * Redes sociales y comunidad — EDITABLE.
 * Cadena vacía = el enlace correspondiente se oculta automáticamente en la UI.
 * No se inventan URLs: hasta que no se configuren aquí, no aparecen.
 * ───────────────────────────────────────────────────────────────────────
 */
export const tiktokUrl = "";
export const instagramUrl = "";
export const whatsappCommunityUrl = "";

/**
 * Plantilla del código de referido compartible. `{code}` se sustituye por
 * un identificador generado en cliente (o real, cuando exista backend).
 * EDITABLE.
 */
export const REFERRAL_CODE_TEMPLATE = "PURLABS-{code}";

/**
 * ───────────────────────────────────────────────────────────────────────
 * Tawk.to (chat en vivo) — EDITABLE.
 * Vacíos por defecto: el widget de LiveChat no se monta ni inyecta nada
 * hasta que ambos valores estén configurados.
 * ───────────────────────────────────────────────────────────────────────
 */
/** PENDIENTE DE CONFIGURAR — Tawk.to Property ID. */
export const TAWK_PROPERTY_ID = "";
/** PENDIENTE DE CONFIGURAR — Tawk.to Widget ID. */
export const TAWK_WIDGET_ID = "";
