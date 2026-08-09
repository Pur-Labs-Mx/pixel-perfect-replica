/**
 * Configuración central del sitio.
 * Cambia SITE_URL cuando el dominio final de PŪR LABS esté definido.
 */
export const SITE_URL = "https://structure-star-twin.lovable.app";
export const SITE_NAME = "PŪR LABS";
export const SITE_TAGLINE = "Jabón perfumado de autor";

/** Descuento del popup de salida — configurable. */
export const EXIT_OFFER = {
  enabled: true,
  /** Sin código definitivo todavía. */
  code: "[PENDIENTE: código oficial]",
  label: "Descuento de bienvenida",
};

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
